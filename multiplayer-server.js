const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.bmp': 'image/bmp',
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const normalized = path.normalize(decoded === '/' ? '/index.html' : decoded);
  const full = path.join(root, normalized);
  return full.startsWith(root) ? full : null;
}

const server = http.createServer((req, res) => {
  const file = safePath(req.url || '/');
  if (!file) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404).end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
});

const rooms = new Map();
const wss = new WebSocket.Server({ server, path: '/multiplayer' });

function send(ws, msg) {
  if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(msg));
}

wss.on('connection', (ws) => {
  ws.id = Math.random().toString(36).slice(2, 10);
  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }
    const roomId = String(msg.room || '').slice(0, 64);
    if (!roomId) return send(ws, { type: 'error', message: 'Missing room.' });
    let room = rooms.get(roomId);

    if (msg.type === 'host') {
      if (room && room.host && room.host !== ws) return send(ws, { type: 'error', message: 'Room already has a host.' });
      room = room || { guests: new Map() };
      room.host = ws;
      ws.role = 'host';
      ws.room = roomId;
      rooms.set(roomId, room);
      send(ws, { type: 'ready', room: roomId });
      for (const guest of room.guests.values()) send(ws, { type: 'guest_open', clientId: guest.id });
      return;
    }

    if (msg.type === 'guest') {
      if (!room || !room.host) return send(ws, { type: 'error', message: 'Host is not online yet.' });
      if (room.guests.size >= 10) return send(ws, { type: 'error', message: 'Lobby is full.' });
      ws.role = 'guest';
      ws.room = roomId;
      room.guests.set(ws.id, ws);
      send(room.host, { type: 'guest_open', clientId: ws.id });
      send(ws, { type: 'ready', room: roomId, clientId: ws.id });
      return;
    }

    if (!room) return;
    if (ws.role === 'host' && (msg.type === 'server_data' || msg.type === 'server_close')) {
      send(room.guests.get(msg.clientId), { type: msg.type, payload: msg.payload });
    } else if (ws.role === 'guest' && (msg.type === 'guest_data' || msg.type === 'guest_close')) {
      send(room.host, { type: msg.type, clientId: ws.id, payload: msg.payload });
    }
  });

  ws.on('close', () => {
    const room = rooms.get(ws.room);
    if (!room) return;
    if (ws.role === 'host') {
      for (const guest of room.guests.values()) send(guest, { type: 'host_left' });
      rooms.delete(ws.room);
    } else if (ws.role === 'guest') {
      room.guests.delete(ws.id);
      send(room.host, { type: 'guest_close', clientId: ws.id });
      if (!room.host && room.guests.size === 0) rooms.delete(ws.room);
    }
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Woomy multiplayer server listening on http://localhost:${port}`);
});
