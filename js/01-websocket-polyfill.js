window.__NativeWebSocket = window.WebSocket;
window.__websocketPolyfill = {
                client: {
                    receive: (data, url) => {
                        window.__websocketPolyfill.client.sockets[url].onmessage(data)
                    },
                    sockets: {}
                },
                server: {
                    receive: (data, url) => {
                        window.__websocketPolyfill.server.sockets[url].onmessage(data)
                    },
                    sockets: {}
                }
            }

            window.WebSocket = class WebSocket {
                constructor(url, platform) {
                    if (platform === "client" && window.__woomyMultiplayer && window.__woomyMultiplayer.role === "join") return window.__woomyCreateGuestSocket(url);
                    this.url = url
                    this.__platform = platform // "client" or "server"
                    window.__websocketPolyfill[this.__platform].sockets[url] = this
                    if (platform === "server" && window.__woomyMultiplayer && window.__woomyMultiplayer.role === "host") setTimeout(() => window.__woomyCreateRelay(this), 0);
                    this.binaryType = "blob";
                    this.bufferedAmount = 0;
                    this.close = () => {
                        if (this.readyState === 3) return
                        this.readyState = 3
                        // Notify the peer endpoint too so server-side cleanup runs (fixes "Back" then can't Play again).
                        try {
                            const otherPlatform = this.__platform === "server" ? "client" : "server"
                            const other = window.__websocketPolyfill[otherPlatform] && window.__websocketPolyfill[otherPlatform].sockets && window.__websocketPolyfill[otherPlatform].sockets[url]
                            if (other && other !== this && other.readyState !== 3) {
                                other.readyState = 3
                                try { other.onclose && other.onclose() } catch (e) { }
                            }
                        } catch (e) { }
                        try { this.onclose && this.onclose() } catch (e) { }
                        try { delete window.__websocketPolyfill[this.__platform].sockets[url] } catch (e) { }
                    };
                    this.terminate = this.close
                    this.onclose = () => { };
                    this.onerror = () => { };
                    this.extensions = "";
                    this.onmessage = () => { };
                    this.onopen = () => { };
                    this.on = (word, funct) => {
                        // Compose handlers instead of overwriting.
                        // The offline client and server both attach listeners on the same polyfilled socket object.
                        const prop = "on" + word
                        const prev = this[prop]
                        this[prop] = (...args) => {
                            try { prev && prev(...args) } catch (e) { }
                            try { funct && funct(...args) } catch (e) { }
                        }
                    }
                    this.protocol = "";
                    this.readyState = 2;
                    setTimeout(() => { this.readyState = 1; this.onopen() }, 3000)
                    this.send = (data, platform) => {
                        if (platform === "server") {
                            this.onmessage(data)
                            return
                        }
                        this.msgToServer(data)
                        //window.__websocketPolyfill[this.__platform==="server"?"client":"server"].receive(data, this.url)
                    }

                    this.msgToServer = () => { }

                }
            }
;(function () {
    const NativeWebSocket = window.__NativeWebSocket || window.WebSocket;
    window.__woomyMultiplayer = (() => {
        const params = new URLSearchParams(window.location.search);
        const role = params.get("multiplayer") || params.get("mp") || "offline";
        const room = params.get("room") || localStorage.getItem("woomyMultiplayerRoom") || Math.random().toString(36).slice(2, 8);
        const relayUrl = params.get("relay") || ((location.protocol === "https:" ? "wss://" : "ws://") + location.host + "/multiplayer");
        if (room) localStorage.setItem("woomyMultiplayerRoom", room);
        return { role, room, relayUrl, clients: {}, relay: null, connected: false };
    })();

    function encodeWire(data) {
        if (data instanceof ArrayBuffer) {
            let binary = "";
            const bytes = new Uint8Array(data);
            for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
            return { binary: true, data: btoa(binary) };
        }
        return { binary: false, data: data };
    }
    function decodeWire(packet) {
        if (!packet || !packet.binary) return packet ? packet.data : packet;
        const binary = atob(packet.data || "");
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        return bytes.buffer;
    }

    window.__woomyCreateRelay = function (serverSocket) {
        const mp = window.__woomyMultiplayer;
        if (mp.role !== "host" || !NativeWebSocket || mp.relay) return;
        const relay = new NativeWebSocket(mp.relayUrl);
        mp.relay = relay;
        relay.onopen = () => relay.send(JSON.stringify({ type: "host", room: mp.room }));
        relay.onmessage = (event) => {
            let msg;
            try { msg = JSON.parse(event.data); } catch (e) { return; }
            if (msg.type === "ready") mp.connected = true;
            if (msg.type === "guest_open") {
                const id = msg.clientId;
                const remote = {
                    binaryType: "arraybuffer", readyState: 1, bufferedAmount: 0,
                    on: (word, fn) => { remote["on" + word] = fn; },
                    send: (data) => relay.readyState === 1 && relay.send(JSON.stringify({ type: "server_data", room: mp.room, clientId: id, payload: encodeWire(data) })),
                    close: () => { remote.readyState = 3; relay.readyState === 1 && relay.send(JSON.stringify({ type: "server_close", room: mp.room, clientId: id })); remote.onclose && remote.onclose(); },
                    terminate: () => remote.close(), onclose: () => {}, onerror: () => {}, onmessage: () => {}
                };
                mp.clients[id] = remote;
                if (window.connectRemoteToGame) window.connectRemoteToGame(remote);
            }
            if (msg.type === "guest_data" && mp.clients[msg.clientId]) {
                mp.clients[msg.clientId].msgToServer && mp.clients[msg.clientId].msgToServer(decodeWire(msg.payload));
            }
            if (msg.type === "guest_close" && mp.clients[msg.clientId]) {
                mp.clients[msg.clientId].close();
                delete mp.clients[msg.clientId];
            }
        };
        relay.onclose = () => { mp.relay = null; setTimeout(() => window.__woomyCreateRelay(serverSocket), 2000); };
    };

    window.__woomyCreateGuestSocket = function (url) {
        const mp = window.__woomyMultiplayer;
        const relay = new NativeWebSocket(mp.relayUrl);
        const sock = { url, __platform: "client", binaryType: "blob", bufferedAmount: 0, readyState: 0, onclose: () => {}, onerror: () => {}, onmessage: () => {}, onopen: () => {} };
        sock.on = (word, fn) => { sock["on" + word] = fn; };
        sock.close = () => { sock.readyState = 3; if (relay.readyState === 1) relay.send(JSON.stringify({ type: "guest_close", room: mp.room })); sock.onclose(); relay.close(); };
        sock.terminate = sock.close;
        sock.send = (data) => { if (relay.readyState === 1) relay.send(JSON.stringify({ type: "guest_data", room: mp.room, payload: encodeWire(data) })); };
        relay.onopen = () => relay.send(JSON.stringify({ type: "guest", room: mp.room }));
        relay.onmessage = (event) => {
            let msg;
            try { msg = JSON.parse(event.data); } catch (e) { return; }
            if (msg.type === "ready") { sock.readyState = 1; sock.onopen(); }
            if (msg.type === "server_data") sock.onmessage(decodeWire(msg.payload));
            if (msg.type === "server_close" || msg.type === "host_left" || msg.type === "error") sock.close();
        };
        relay.onerror = (e) => { sock.onerror(e); };
        relay.onclose = () => { if (sock.readyState !== 3) { sock.readyState = 3; sock.onclose(); } };
        return sock;
    };
})();
