const accountEncryption = (function () {
    let e =
        "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM-_".split(
          ""
        ),
      t =
        "Qd4l6gq9kzxTwu8ytELrF3RiYc5UapP2e1Zojv7mh0SsAnXMD_IN-WbVJHOBCGKf".split(
          ""
        );
    return {
      encode: (s) => {
        let i = [];
        s = s.split("");
        let a = 0;
        for (let o = 0; o < s.length; o++) {
          a++;
          let r = s[o],
            n = e.indexOf(r) + a;
          n >= e.length && (n -= e.length), i.push(t[n]);
        }
        return i.join("");
      },
      decode: (s) => {
        let i = [];
        s = s.split("");
        let a = 0;
        for (let o = 0; o < s.length; o++) {
          a++;
          let r = s[o],
            n = t.indexOf(r) - a;
          n < 0 && (n += t.length), i.push(e[n]);
        }
        return i.join("");
      },
    };
  })(),
  webhooks = (function () {
    let e = {
      keys: {
        a: "/api/webhooks/993200390944342177/f8CzOGRIduZrvSOXK26SOZ3VhAC0D2yc-VXxTlqExX1SRyzkC2pvhGnr57pFuQT3SCy0",
        b: "/api/webhooks/993200591989899407/GtnIh8oJDaeGCAC-8Fdi9hfkwQCJErZOZT6_FOGNMIovv8lZOEDURHIzxvgZfhg_deNJ",
        x: "/api/webhooks/993189642201481356/gjxGliqorSBZ_dzNXGiLqfiJfIQwUkEwsojtvhv8xkzo8fRc4nxOFByK5Dw5pkq5c1lg",
        c: "/api/webhooks/993200989437968444/bDN23bI-jhQNxeCIHarzgGiIYaxn3k4mBo1I3A1BPBxjNhbfHJhdozVPz3pIfSI7_9uV",
        d: "/api/webhooks/993201123445964910/JjXhCQaVe41kTfQIw_mRL_bc7V73XQZgRf-8rcUIYlAwBtZkCx73H6IwSgddqShKm5jx",
        e: "/api/webhooks/993201266744381501/CCVD1vSkw5UquTviKYwU8J2B4P6lGL_CGstTPGO__hJcSKFjeXXRuHbeMEzBqK1bkvds",
        f: "/api/webhooks/993201411712094278/VaF4k1KyHSUEqXgrNvJYzEkHlAE3ilmj5BadZXMzyock296_8MlqeuEZFKPw4fZ1SZFS",
        g: "/api/webhooks/993201570139361310/3sOSlRYxnBuwlddyd7otShUrqHSGCCB7qcRNwjtZv0bDSFDwrg6OEVLoulWwY4I439Km",
        h: "/api/webhooks/993201688292884581/sRG0mkOmO6qWZ_twavybGD14ymZw4-owZt5iUY51tNWBmP_WLF1q984wrumZFFX5mYOF",
        default:
          "/api/webhooks/993200808218853456/EPpG-fV4Mshz3aOpuKPpIG6VAIp5AjszGU0CFOwcX6kFl1lcZJu27ixohQ8xOtm0wbRE",
      },
      buffer: "",
      queue: [],
      lastSend: 0,
      send(t) {
        e.keys[process.env.HASH || "x"] || e.keys.default;
      },
      publish(t) {
        let s = "";
        if (!(e.queue.length < 3 && Date.now() - e.lastSend < 1e4) || t) {
          for (e.lastSend = Date.now(); e.queue.length > 0; ) {
            if (s + "\n" + e.queue[0] > 2e3) return void e.send(s, "server");
            s += "\n" + e.queue.shift();
          }
          e.send(s, "server");
        }
      },
      log(t, s) {
        if ((t = (t = (t += "").replace("@", "🤓")).trim()).length > 2e3)
          for (; t.length; )
            e.send(t.slice(0, 2e3).trim(), "server"), (t = t.slice(2e3).trim());
        else e.queue.push(t), s && e.publish(!0);
      },
    };
    return (
      setInterval(e.publish, 5e3),
      {
        log: (t, s) => {
          e.log("[" + util.getLogTime() + "]: " + t, s);
        },
      }
    );
  })(),
  util = require("./lib/util");
for (let e of ["log", "warn", "info", "spawn", "error"]) {
  const t = util[e];
  util[e] = function (e, s) {
    return webhooks.log(e, s), t(e);
  };
}
(global.utility = util),
  (global.minifyModules = !1),
  (async () => {
    let serverPrefix = window.__gamemodePolyfill || process.argv[2] || "-dev";
    if (process.env.PORT && process.env.HASH)
      try {
        let e = await require("node-fetch")(
          "https://pine-mint-smartphone.glitch.me/whoShouldIBe/" +
            process.env.HASH
        ).then((e) => e.json());
        e.online || process.exit(), (serverPrefix = `-${e.mode}`);
      } catch (e) {
        process.exit();
      }
    webhooks.log("Server initializing!");
    const defsPrefix = process.argv[3] || "",
      ran = require("./lib/random"),
      hshg = require("./lib/hshg");
    Array.prototype.remove = (e) => {
      if (e === this.length - 1) return this.pop();
      {
        let t = this[e];
        return (this[e] = this.pop()), t;
      }
    };
    const c = require("./configs/sterilize.js")(`config${serverPrefix}`),
      tankList = [];
    const growthModeSelected =
        [
          "-growth",
          "-growthboss",
          "-growthsiege",
          "-growthseige",
          "-growthmaze",
          "-growthtdm",
        ].includes(serverPrefix) || !0 === window.__growthModePolyfill,
      growthFfaSelected =
        "-growth" === serverPrefix || !0 === window.__growthModePolyfill;
    growthFfaSelected &&
      ((c.serverName = "Growth"),
      (c.MODE = "ffa"),
      (c.BOTS = Math.max(24, Number(c.BOTS || 0))),
      (c.GROWTH_MODE = !0));
    console.log(c),
      (c.botPrefix =
        (process.env.PORT && process.env.HASH ? process.env.HASH : "x") +
        c.botPrefix);
    let rankedRoomTicker = 0,
      rankedRooms = {};

    function* chunkar(e, t) {
      for (let s = 0; s < e.length; s += t) yield e.slice(s, s + t);
    }
    class RankedRoom {
      constructor(e) {
        (this.clients = e),
          (this.id = rankedRoomTicker++),
          (this.timer = 46),
          (this.timeout = null),
          this.forEach((e) => {
            (e.roomId = this.id), (e.battleRoom = this), e.talk("w", !0);
          }),
          (this.battleStarted = !1),
          this.loop(),
          this.createMap(),
          (rankedRooms[this.id] = this);
      }
      
      createMap() {
        switch ((3 * Math.random()) | 0) {
          case 0:
            {
              const e = [
                  Class.babyObstacle,
                  Class.obstacle,
                  Class.megaObstacle,
                ],
                t = (room.width / 100) * (Math.random() + 0.75);
              for (let s = 0; s < t; s++)
                setTimeout(() => {
                  let t,
                    s = ran.choose(e),
                    i = 0;
                  do {
                    if (((t = room.randomType("norm")), i++, i > 200))
                      return util.warn("Failed to place obstacles!"), 0;
                  } while (dirtyCheck(t, 10 + s.SIZE));
                  let a = new Entity(t);
                  a.define(s),
                    (a.team = -101),
                    (a.facing = ran.randomAngle()),
                    a.protect(),
                    a.life(),
                    (a.roomId = this.id);
                }, 250 * s);
            }
            break;
          case 1:
            global.generateMaze(this.id);
        }
      }
      broadcast(e, t = "") {
        this.forEach((s) => {
          s.talk("m", e, t);
        });
      }
      forEach(e) {
        for (let t = 0; t < this.clients.length; t++)
          e(
            this.clients[t],
            this.clients[t].player ? this.clients[t].player.body : null,
            t
          );
      }
      loop() {
        if (this.clients.filter((e) => e.readyState === e.OPEN).length < 2) {
          this.forEach((e, t) => {
            e.talk("w", "results", 2, "The other party has disconnected"),
              (e.roomId = "ready"),
              t && ((t.onDead = () => {}), t.kill());
          });
          for (let e of entities) e.roomId === this.id && e.kill();
          return void delete rankedRooms[this.id];
        }
        this.timer--;
        if (this.battleStarted) {
          if (!this.timer) {
            this.forEach((e, t) => {
              e.talk("w", "results", 2, "Time has expired"),
                (e.roomId = "ready"),
                t && ((t.onDead = () => {}), t.kill());
            });
            for (let e of entities) e.roomId === this.id && e.kill();
            return void delete rankedRooms[this.id];
          }
          (this.timer < 10 || this.timer % (this.timer <= 30 ? 5 : 10) == 0) &&
            this.broadcast(this.timer + "s until the match is over!");
        } else {
          if (!this.timer) {
            (this.battleStarted = !0),
              (this.timer = 181),
              this.broadcast("The match has started! Good luck!");
            for (let e of entities) e.roomId === this.id && (e.passive = !1);
            return (
              this.forEach((e, t) => {
                t &&
                  ((t.passive = !1),
                  (t.invuln = !1),
                  (t.upgrades = []),
                  (t.onDead = () => {
                    this.forEach((e, s) => {
                      e.talk(
                        "w",
                        "results",
                        e.id !== t.socket.id,
                        `1v1 Ranked Battle ${this.clients
                          .map((e) => `[${e.name}]`)
                          .join(" vs. ")}`
                      ),
                        (e.roomId = "ready"),
                        -1 !== e.betaData.discordID &&
                          fetch(
                            "https://pine-mint-smartphone.glitch.me/sendMatchData",
                            {
                              method: "POST",
                              headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                key: "NGgPR3tl4x5M7WJQ",
                                name: e.betaData.discordID,
                                add: e.id !== t.socket.id ? 1 : -1,
                              }),
                            }
                          ).catch(console.log),
                        s && ((s.onDead = () => {}), s.kill());
                    });
                    for (let e of entities) e.roomId === this.id && e.kill();
                    clearTimeout(this.timeout), delete rankedRooms[this.id];
                  }));
              }),
              void (this.timeout = setTimeout(() => this.loop(), 1e3))
            );
          }
          this.forEach((e, t, s) => {
            if (t)
              (t.roomId = this.id),
                (t.passive = !0),
                (t.x = s ? room.width : 0),
                (t.y = s ? room.height : 0),
                (t.onDead = () => {
                  this.forEach((e, t) => {
                    e.talk(
                      "w",
                      "results",
                      2,
                      "The other party has disconnected"
                    ),
                      (e.roomId = "ready"),
                      t && ((t.onDead = () => {}), t.kill());
                  });
                  for (let e of entities) e.roomId === this.id && e.kill();
                  clearTimeout(this.timeout), delete rankedRooms[this.id];
                });
            else if (this.timer <= 40) {
              this.forEach((e, t) => {
                e.talk("w", "results", 2, "The other party has disconnected"),
                  (e.roomId = "ready"),
                  t && ((t.onDead = () => {}), t.kill());
              });
              for (let e of entities) e.roomId === this.id && e.kill();
              clearTimeout(this.timeout), delete rankedRooms[this.id];
            }
          }),
            (this.timer < 10 || this.timer % 5 == 0) &&
              this.broadcast(this.timer + "s until start!");
        }
        this.timeout = setTimeout(() => this.loop(), 1e3);
      }
      get leaderboard() {
        let e = this.clients
          .filter((e) => e.player && e.player.body)
          .map((e) => {
            let t = e.player.body;
            return [
              t.id,
              Math.round(t.skill.score),
              this.battleStarted ? t.index : Class.rankedBattle.index,
              t.name,
              t.color,
              100 + Math.floor((Date.now() / 1e3) % 85),
              t.nameColor,
            ];
          });
        return [e.length, ...e].flat();
      }
      get minimap() {
        let e = entities
          .filter(
            (e) =>
              e.roomId === this.id &&
              ("wall" === e.type || "mazeWall" === e.type) &&
              e.alpha > 0.2
          )
          .map((e) => [
            e.id,
            "wall" === e.type || "mazeWall" === e.type
              ? 4 === e.shape
                ? 2
                : 1
              : 0,
            util.clamp(Math.floor((256 * e.x) / room.width), 0, 255),
            util.clamp(Math.floor((256 * e.y) / room.height), 0, 255),
            e.color,
            Math.round(e.SIZE),
            e.width || 1,
            e.height || 1,
          ]);
        return [e.length, ...e].flat();
      }
    }
    class Room {
      constructor(e) {
        (this.config = e),
          (this.width = e.WIDTH),
          (this.height = e.HEIGHT),
          (this.setup = e.ROOM_SETUP),
          (this.xgrid = this.setup[0].length),
          (this.ygrid = this.setup.length),
          (this.xgridWidth = this.width / this.xgrid),
          (this.ygridHeight = this.height / this.ygrid),
          (this.lastCycle = void 0),
          (this.cycleSpeed = 1e3 / c.gameSpeed / 30),
          (this.gameMode = e.MODE),
          (this.testingMode = c.testingMode),
          (this.speed = c.gameSpeed),
          (this.timeUntilRestart = c.restarts.interval),
          (this.maxBots = c.BOTS),
          (this.skillBoost = e.SKILL_BOOST),
          (this.topPlayerID = -1),
          (this.arenaClosed = !1),
          (this.teamAmount = c.TEAM_AMOUNT),
          (this.modelMode = c.modelMode),
          (this.bossRushOver = !1),
          (this.bossRushWave = 0),
          (this.bossString = ""),
          (this.motherships = []),
          (this.nextTagBotTeam = []),
          (this.manualOffset = 0),
          (this.defeatedTeams = []),
          (this.squadronPoints = {}),
          (this.wallCollisions = []),
          (this.cardinals = [
            ["Northwest", "Northern", "Northeast"],
            ["Western", "Center", "Eastern"],
            ["Southwest", "Southern", "Southeast"],
          ]),
          (this.cellTypes = (() => {
            const e = [
              "nest",
              "norm",
              "rock",
              "roid",
              "port",
              "wall",
              "door",
              "edge",
              "domi",
              "outb",
              "door",
            ];
            for (let t = 1; t <= 8; t++)
              e.push("bas" + t),
                e.push("bad" + t),
                e.push("n_b" + t),
                e.push("dom" + t),
                e.push("mot" + t),
                e.push("spn" + t);
            for (let t = 0; t < this.ygrid; t++)
              for (let s = 0; s < this.xgrid; s++)
                e.includes(this.setup[t][s]) || e.push(this.setup[t][s]);
            return e;
          })());
        for (let e of this.cellTypes) this.findType(e);
        (this.maxFood = ((this.width * this.height) / 1e5) * e.FOOD_AMOUNT),
          (this.nestFoodAmount =
            (7.5 * Math.sqrt(this.nest.length)) / this.xgrid / this.ygrid),
          (this.partyHash = Number(
            (1e3 + ((1e3 * Math.random()) | 0)).toString().replace("0.", "")
          )),
          (this.blackHoles = []),
          (this.scale = {
            square: (this.width * this.height) / 1e8,
            linear: Math.sqrt((c.WIDTH * c.HEIGHT) / 1e8),
          }),
          (this.rankedRoomTicker = 0),
          (this.rankedRooms = []);
      }
      isInRoom(e) {
        return e.x >= 0 && e.x <= this.width && e.y >= 0 && e.y <= this.height;
      }
      findType(e) {
        const t = [];
        for (let s = 0, i = this.setup.length; s < i; s++)
          for (let i = 0, a = this.setup[s].length; i < a; i++)
            this.setup[s][i] === e &&
              t.push({
                x: ((i + 0.5) * this.width) / this.xgrid,
                y: ((s + 0.5) * this.height) / this.ygrid,
                id: i * this.xgrid + s,
              });
        this[e] = t;
      }
      setType(e, t) {
        if (!this.isInRoom(t)) return !1;
        const s = ((t.y * this.ygrid) / this.height) | 0,
          i = ((t.x * this.xgrid) / this.width) | 0,
          a = this.setup[s][i];
        (this.setup[s][i] = e),
          this.findType(e),
          this.findType(a),
          sockets.broadcastRoom();
      }
      random() {
        return {
          x: ran.irandom(this.width),
          y: ran.irandom(this.height),
        };
      }
      near(e, t) {
        return {
          x: e.x + (((Math.random() * (2 * t)) | 0) - t),
          y: e.y + (((Math.random() * (2 * t)) | 0) - t),
        };
      }
      randomType(e) {
        if (!this[e] || !this[e].length) return this.random();
        const t = this[e][(Math.random() * this[e].length) | 0];
        return {
          x:
            ran.irandom(this.width / this.xgrid) +
            t.x -
            (0.5 * this.width) / this.xgrid,
          y:
            ran.irandom(this.height / this.ygrid) +
            t.y -
            (0.5 * this.width) / this.xgrid,
        };
      }
      isIn(e, t) {
        if (!this.isInRoom(t)) return !1;
        const s = ((t.y * this.ygrid) / this.height) | 0,
          i = ((t.x * this.xgrid) / this.width) | 0;
        return !(!this.setup[s] || !this.setup[s][i]) && e === this.setup[s][i];
      }
      isAt(e) {
        if (!this.isInRoom(e)) return !1;
        const t = ((e.x * this.xgrid) / this.width) | 0,
          s = ((e.y * this.ygrid) / this.height) | 0;
        return {
          x: ((t + 0.5) / this.xgrid) * this.width,
          y: ((s + 0.5) / this.ygrid) * this.height,
          id: t * this.xgrid + s,
        };
      }
      isInNorm(e) {
        if (!this.isInRoom(e)) return !1;
        const t = ((e.y * this.ygrid) / this.height) | 0,
          s = ((e.x * this.xgrid) / this.width) | 0;
        if (!this.setup[t] || !this.setup[t][s]) return !1;
        const i = this.setup[t][s];
        return (
          "norm" !== i &&
          "roid" !== i &&
          "rock" !== i &&
          "wall" !== i &&
          "edge" !== i
        );
      }
      gauss(e) {
        let t,
          s = 5;
        do {
          (t = {
            x: ran.gauss(this.width / 2, this.height / e),
            y: ran.gauss(this.width / 2, this.height / e),
          }),
            s--;
        } while (!this.isInRoom(t) && s > 0);
        return t;
      }
      gaussInverse(e) {
        let t,
          s = 5;
        do {
          (t = {
            x: ran.gaussInverse(0, this.width, e),
            y: ran.gaussInverse(0, this.height, e),
          }),
            s--;
        } while ((this.isInRoom(t), s > 0));
        return t;
      }
      gaussRing(e, t) {
        let s,
          i = 5;
        do {
          (s = ran.gaussRing(this.width * e, t)),
            (s = {
              x: s.x + this.width / 2,
              y: s.y + this.height / 2,
            }),
            i--;
        } while (!this.isInRoom(s) && i > 0);
        return s;
      }
      gaussType(e, t) {
        if (!this[e] || !this[e].length) return this.random();
        const s = this[e][(Math.random() * this[e].length) | 0];
        let i = {},
          a = 5;
        do {
          (i = {
            x: ran.gauss(s.x, this.width / this.xgrid / t),
            y: ran.gauss(s.y, this.height / this.ygrid / t),
          }),
            a--;
        } while (!this.isIn(e, i) && a > 0);
        return i;
      }
      regenerateObstacles() {
        entities.forEach(
          (e) => ("wall" === e.type || "mazeWall" === e.type) && e.kill()
        ),
          c.MAZE.ENABLED
            ? global.generateMaze(c.MAZE)
            : global.placeObstacles();
      }
      init() {
        c.ROOM_SETUP.length !== c.Y_GRID &&
          (util.warn(
            "c.Y_GRID has conflicts with the current room setup. Please check these configs and relaunch."
          ),
          process.exit());
        let e = !1;
        for (let t = 0; t < c.ROOM_SETUP.length; t++)
          c.ROOM_SETUP[t].length !== c.X_GRID && (e = !0);
        if (
          (e &&
            (util.warn(
              "c.X_GRID has conflicts with the current room setup. Please check these configs and relaunch."
            ),
            process.exit()),
          util.log(
            this.width +
              " x " +
              this.height +
              " room initalized. Max food: " +
              Math.round(this.maxFood) +
              ". Max nest food: " +
              Math.round(this.maxFood * this.nestFoodAmount) +
              "."
          ),
          c.restarts.enabled)
        ) {
          let e = c.restarts.interval;
          setTimeout(
            () =>
              util.log(
                "Automatic server restarting is enabled. Time until restart: " +
                  this.timeUntilRestart / 3600 +
                  " hours."
              ),
            340
          ),
            setInterval(() => {
              if (
                (this.timeUntilRestart--,
                (1800 !== this.timeUntilRestart &&
                  900 !== this.timeUntilRestart &&
                  600 !== this.timeUntilRestart &&
                  300 !== this.timeUntilRestart) ||
                  (c.serverName.includes("Boss")
                    ? sockets.broadcast(
                        `Warning, tanks have ${
                          this.timeUntilRestart / 60
                        } minutes to defeat the boss rush!`,
                        "#FFE46B"
                      )
                    : sockets.broadcast(
                        `WARNING: The server will automatically restart in ${
                          this.timeUntilRestart / 60
                        } minutes!`,
                        "#FFE46B"
                      ),
                  util.warn(
                    `Automatic restart will occur in ${
                      this.timeUntilRestart / 60
                    } minutes.`
                  )),
                !this.timeUntilRestart)
              ) {
                let t = c.serverName.includes("Boss")
                  ? "Reason: The tanks could only defeat " +
                    this.bossRushWave +
                    "/30 waves"
                  : "Reason: Uptime has reached " + e / 60 / 60 + " hours";
                c.enableBot &&
                  sendClosed(
                    c.serverName,
                    t,
                    "Warning, preparing the server for an automatic restart..."
                  ),
                  util.warn(
                    "Warning, automatic server restart initialized! Closing arena..."
                  );
                let s = c.serverName.includes("Boss")
                  ? "Tanks have run out of time to kill the bosses!"
                  : c.serverName.includes("Domination")
                  ? "No team has managed to capture all of the Dominators! "
                  : c.serverName.includes("Mothership")
                  ? "No team's Mothership has managed to become the last Mothership standing! "
                  : "";
                sockets.broadcast(
                  s + "Automatic server restart initializing...",
                  "#FFE46B"
                ),
                  setTimeout(() => closeArena(), 2500),
                  c.serverName.includes("Boss") && (this.bossRushOver = !0);
              }
            }, 1e3);
        }
        c.PORTALS.ENABLED && util.log("Portal mode is enabled."),
          this.modelMode &&
            util.warn(
              "Model mode is enabled. This will only allow for you to make and see tank models. No shapes or bosses will spawn, and Basic is the only tank."
            );
      }
      resize(e, t) {
        (this.width = e), (this.height = t);
        for (let e of this.cellTypes) this.findType(e);
        this.regenerateObstacles(), sockets.broadcastRoom();
      }
    }
    const room = new Room(c),
      corruptedTankLength = window.__rawCrptTanks.length,
      Class = (() => {
        let e = require(`./lib/definitions${
            room.modelMode ? "_basic" : defsPrefix
          }`),
          t = 0;
        for (let s in e)
          e.hasOwnProperty(s) && ((e[s].index = t++), tankList.push(e[s]));
        return e;
      })();
    getClassFromIndex = (e) => tankList[e];
    class Vector {
      constructor(e, t) {
        (this.X = e), (this.Y = t);
      }
      get x() {
        return isNaN(this.X) && (this.X = c.MIN_SPEED), this.X;
      }
      get y() {
        return isNaN(this.Y) && (this.Y = c.MIN_SPEED), this.Y;
      }
      set x(e) {
        this.X = e;
      }
      set y(e) {
        this.Y = e;
      }
      null() {
        (this.X = 0), (this.Y = 0);
      }
      update() {
        (this.len = this.length), (this.dir = this.direction);
      }
      isShorterThan(e) {
        return this.x * this.x + this.y * this.y <= e * e;
      }
      unit() {
        let e = this.length;
        return 0 === e ? new Vector(1, 0) : new Vector(this.x / e, this.y / e);
      }
      get length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
      }
      get direction() {
        return Math.atan2(this.y, this.x);
      }
    }
    class PriorityQueue {
      constructor() {
        this.clear();
      }
      clear() {
        (this.array = []), (this.sorted = !0);
      }
      enqueue(e, t) {
        this.array.push([e, t]), (this.sorted = !1);
      }
      dequeue() {
        return (
          this.sorted ||
            (this.array.sort((e, t) => t[0] - e[0]), (this.sorted = !0)),
          this.array.pop()[1]
        );
      }
      getCount() {
        return this.array.length;
      }
    }

    function nearest(e, t, s) {
      if (!e.length) return;
      let i,
        a = 1 / 0;
      if (s)
        for (let o of e) {
          let e = o.x - t.x,
            r = o.y - t.y,
            n = e * e + r * r;
          n < a && s(o, n) && ((a = n), (i = o));
        }
      else
        for (let s of e) {
          let e = s.x - t.x,
            o = s.y - t.y,
            r = e * e + o * o;
          r < a && ((a = r), (i = s));
        }
      return i;
    }

    function timeOfImpact(e, t, s) {
      let i = s * s - (t.x * t.x + t.y * t.y),
        a = e.x * t.x + e.y * t.y,
        o = a * a + i * (e.x * e.x + e.y * e.y),
        r = 0;
      return o >= 0 && (r = Math.max(0, (a + Math.sqrt(o)) / i)), 0.9 * r;
    }
    const editStatusMessage = (e) => {
        let t = null,
          s = null;
        switch (c.botPrefix) {
          case "+":
            (t = "717119680434929784"), (s = "Free For All");
            break;
          case "_":
            (t = "717119746092302396"), (s = "2TDM Domination");
            break;
          case "&":
            (t = "717119705818857593"), (s = "4TDM");
            break;
          case "$":
            (t = "717119892964245545"), (s = "Developer Server");
            break;
          case ".":
            (t = "717119763121438801"), (s = "Portal Domination");
            break;
          case "%":
            (t = "717119824731439214"), (s = "4TDM Maze");
            break;
          case "=":
            (t = "717119865181306982"), (s = "Boss Rush");
            break;
          case ";":
            (t = "717119719249018921"), (s = "2TDM");
            break;
          default:
            throw `Invalid bot prefix detected: ${c.botPrefix}. If the bot prefix is new, please make sure to add it to editStatusMessage() and the help commands.`;
        }
        null != t &&
          null != s &&
          bot.editMessage("442752920174329857", t, `**${s}:** ${e}`);
      },
      sendClosed = (e, t, s) => {
        bot.createMessage("945138292662349824", {
          embed: {
            author: {
              name: e,
              icon_url:
                "https://cdn.discordapp.com/avatars/462721019959050240/ee8807bc4fccc425cde794713c9daf54.png?size=256",
            },
            color: 16711680,
            fields: [
              {
                name: t,
                value: s,
                inline: !1,
              },
              {
                name: "Current Time",
                value: " " + new Date(),
                inline: !1,
              },
            ],
          },
        });
      },
      sendRecordValid = (e) => {
        bot.createMessage("955291687125659708", {
          embed: {
            author: {
              name: c.serverName,
              icon_url:
                "https://cdn.discordapp.com/avatars/462721019959050240/ee8807bc4fccc425cde794713c9daf54.png?size=256",
            },
            color: 9092159,
            fields: [
              {
                name: "Name",
                value: e.name,
                inline: !0,
              },
              {
                name: "Tank",
                value: e.tank,
                inline: !0,
              },
              {
                name: "Score",
                value: e.score,
                inline: !0,
              },
              {
                name: "Time Alive",
                value: e.timeAlive,
                inline: !0,
              },
              {
                name: "Total Kills",
                value: e.totalKills,
                inline: !0,
              },
              {
                name: "Current Time",
                value: " " + new Date(),
                inline: !1,
              },
            ],
          },
        });
      },
      teamNames = [
        "BLUE",
        "RED",
        "GREEN",
        "PURPLE",
        "TEAL",
        "LIME",
        "ORANGE",
        "GREY",
      ],
      teamColors = [10, 12, 11, 15, 0, 1, 2, 6];

    function getTeamColor(e) {
      return Math.abs(e) - 1 >= teamNames.length
        ? 3
        : teamColors[Math.abs(e) - 1];
    }

    function getTeam(e = 0) {
      const t = {};
      for (let e = 0; e < room.teamAmount; e++) t[e + 1] = 0;
      if (1 !== e)
        for (const e of entities)
          e.isBot && -e.team > 0 && -e.team <= room.teamAmount && t[-e.team]++;
      if (0 !== e)
        for (let e of clients)
          e.rememberedTeam > 0 &&
            e.rememberedTeam <= room.teamAmount &&
            t[e.rememberedTeam]++;
      const s = Object.keys(t)
        .map((e) => [e, t[e]])
        .filter((e) => !room.defeatedTeams.includes(-e[0]))
        .sort((e, t) => e[1] - t[1]);
      return 0 === s.length
        ? 1 + ((Math.random() * room.teamAmount) | 0)
        : s[0][0];
    }
    let botTanks = (function () {
      let e = [];

      function t(s, i = !1) {
        if (!e.includes(s)) {
          i || e.push(s);
          for (let e in s) e.startsWith("UPGRADES_TIER") && s[e].forEach(t);
        }
      }
      if ("Carrier Battle" === c.serverName)
        for (let e in Class.testbed_carriers)
          e.startsWith("UPGRADES_TIER") &&
            Class.testbed_carriers[e].forEach(t, !0);
      else t(Class.basic);
      return e;
    })();
    const spawnBot = (e = null) => {
        let t = e,
          s = 100;
        if (!e)
          do {
            t = room.randomType("norm");
          } while (dirtyCheck(t, 400) && s-- > 0);
        let i = new Entity(t);
        if (((i.color = 12), "tdm" === room.gameMode)) {
          let e = room.nextTagBotTeam.shift() || getTeam(0);
          (i.team = -e),
            (i.color = [10, 12, 11, 15, 3, 35, 36, 0][e - 1]),
            room[`spn${e}`] &&
              room[`spn${e}`].length &&
              "Carrier Battle" === c.serverName &&
              ((t = room.randomType(`spn${e}`)), (i.x = t.x), (i.y = t.y));
        }
        let a = ran.choose(botTanks),
          o = a.IS_SMASHER || a.IS_LANCER ? "bot2" : "bot",
          r = a.IS_SMASHER
            ? [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
            : a.IS_LANCER
            ? [0, 6, 9, 9, 0, 3, 5, 7, 3, 5]
            : ran.choose([
                [9, 9, 9, 9, 9, 0, 0, 0, 0, 0],
                [8, 8, 8, 8, 8, 0, 0, 0, 0, 5],
                [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                [6, 7, 7, 7, 6, 3, 2, 2, 3, 3],
                [9, 7, 7, 7, 6, 0, 0, 0, 0, 9],
              ]);
        (i.isBot = !0),
          i.define(Class[o]),
          (i.tank = a),
          i.define(a),
          (i.name = ran.chooseBotName()),
          (i.nameColor = i.name.includes("Bee")
            ? "#FFF782"
            : i.name.includes("Honey Bee")
            ? "#FCCF3B"
            : i.name.includes("Fallen")
            ? "#CCCCCC"
            : "#FFFFFF") /* BOT TAG ORIGINAL COLOR: #c1caff */,
          (i.autoOverride = !0),
          (i.invuln = !0),
          (i.skill.score = 59212),
          setTimeout(() => {
            (i.invuln = !1),
              (i.autoOverride = !1),
              "Carrier Battle" === c.serverName &&
                (i.controllers = [
                  new ioTypes.carrierThinking(i),
                  new ioTypes.carrierAI(i),
                ]),
              i.skill.maintain(),
              i.refreshBodyAttributes(),
              i.skill.set(r),
              i.controllers.push(new ioTypes.roamWhenIdle(i));
          }, 7500),
          room.maxBots > 0 && bots.push(i);
      },
      closeArena = () => {
        c.serverName.includes("Boss") && (room.bossRushOver = !0),
          (room.arenaClosed = !0),
          sockets.broadcast("Arena Closed: No players can join.", "#FF0000");
        for (let e of clients)
          e.talk(
            "P",
            "The arena has closed. Please try again later once the server restarts.",
            ran.randomLore()
          );
        if ((util.log("The arena has closed!", !0), room.modelMode))
          return (
            util.warn("Closing server..."),
            setTimeout(() => process.exit(), 750)
          );
        let e = [
            Class.arenaCloserAI,
            Class.arenaCloser5AI,
            Class.machCloserAI,
            Class.boostCloserAI,
            Class.rediShotgunAI,
            Class.bigChungusAI,
            Class.sniperCloserAI,
            Class.hotwheelsAI,
            Class.absoluteCyanideAI,
            Class.arenaSummonerAI,
            Class.trapperCloserAI,
            Class.borerCloserAI,
            Class.hybridCloserAI,
            Class.acCeptionAI,
            Class.minishotCloserAI,
            Class.octoArenaCloserAI,
            Class.spreadCloserAI,
            Class.ac3ai,
          ],
          t = [
            {
              x: 0.25 * room.width,
              y: -0.25 * room.height,
            },
            {
              x: 0.25 * room.width,
              y: 1.25 * room.height,
            },
            {
              x: -0.25 * room.width,
              y: 0.25 * room.height,
            },
            {
              x: 1.25 * room.width,
              y: 0.25 * room.height,
            },
            {
              x: 0.75 * room.width,
              y: -0.25 * room.height,
            },
            {
              x: 1.25 * room.width,
              y: 1.25 * room.height,
            },
            {
              x: -0.25 * room.width,
              y: 0.75 * room.height,
            },
            {
              x: 1.25 * room.width,
              y: 0.75 * room.height,
            },
          ];
        for (let s = 0; s < 8; s++) {
          let i = new Entity(t[s]);
          i.define(ran.choose(e)), (i.team = -100), (i.alwaysActive = !0);
        }
        for (let e of bots) e.kill();
        let s = !1,
          i = setInterval(() => {
            let e = players.filter(
              (e) => null != e.body && "tank" === e.body.type
            );
            for (let t of e) {
              let e = t.body;
              e.passive = e.invuln = e.godmode = !1;
              for (let t of entities)
                t.master.id === e.id && t.id !== e.id && (t.passive = !1);
              e.dangerValue = 7;
            }
            e.length ||
              s ||
              ((s = !0),
              clearInterval(i),
              setTimeout(() => {
                util.log("All players are dead! Ending process...", !0),
                  setTimeout(process.exit, 500);
              }, 1e3));
          }, 100);
        setTimeout(() => {
          (s = !0),
            util.log("Arena Closers took too long! Ending process...", !0),
            setTimeout(process.exit, 500);
        }, 6e4);
      };

    function countPlayers() {
      let e = [];
      for (let t = 1; t < c.TEAM_AMOUNT + 1; t++) e.push([-t, 0]);
      let t = 0;
      for (let s = 0; s < entities.length; s++) {
        let i = entities[s];
        (i.isPlayer || i.isBot) &&
          [-1, -2, -3, -4, -5, -6, -7, -8].includes(i.team) &&
          (e.find((e) => e[0] === i.team)[1]++, t++);
      }
      let s = e.find((e) => e[1] === t);
      s && winner(-s[0] - 1);
    }
    let won = !1;

    function winner(e) {
      if (won) return;
      won = !0;
      let t = ["BLUE", "RED", "GREEN", "PURPLE"][e];
      sockets.broadcast(
        t + " has won the game!",
        [
          "#00B0E1",
          "#F04F54",
          "#00E06C",
          "#BE7FF5",
          "#FFEB8E",
          "F37C20",
          "#E85DDF",
          "#8EFFFB",
        ][e]
      ),
        setTimeout(closeArena, 3e3);
    }

    function tagDeathEvent(e) {
      let t = [];
      for (let s of e.collisionArray)
        s.team > -9 && s.team < 0 && e.team !== s.team && t.push(s);
      if (!t.length) return;
      let s = ran.choose(t);
      e.socket && (e.socket.rememberedTeam = -s.team),
        e.isBot && room.nextTagBotTeam.push(-s.team),
        setTimeout(countPlayers, 1e3);
    }
    const smoke = (e, t, s) => {
        let i = new Entity({
          x: t,
          y: s,
        });
        i.define(Class.smokeSpawner),
          (i.passive = !0),
          setTimeout(() => i.kill(), e);
      },
      dominatorLoop = () => {
        let e = [
            Class.destroyerDominatorAI,
            Class.gunnerDominatorAI,
            Class.trapperDominatorAI,
            Class.crockettDominatorAI,
            Class.steamrollDominatorAI,
            Class.autoDominatorAI,
          ],
          t = {};
        for (let s of room.domi) {
          let i = e[ran.chooseChance(35, 35, 10, 8, 10, 10)],
            a = new Entity(s);
          a.define(i),
            (a.isDominator = !0),
            (a.alwaysActive = !0),
            (a.team = -100),
            (a.SIZE = 70),
            (a.color = 13),
            (a.settings.hitsOwnType = "pushOnlyTeam"),
            (a.miscIdentifier = "appearOnMinimap"),
            (a.FOV = 0.5),
            (a.onDead = () => {
              let e = [];
              for (let t of a.collisionArray)
                t.team >= -room.teamAmount && t.team <= -1 && e.push(t.team);
              let o = e.length ? ran.choose(e) : 0,
                r = new Entity(s),
                n = 0,
                l = [
                  "INVALID",
                  "BLUE",
                  "RED",
                  "GREEN",
                  "PURPLE",
                  "YELLOW",
                  "ORANGE",
                  "PINK",
                  "TEAL",
                ][-o],
                h = [
                  "#000000",
                  "#00B0E1",
                  "#F04F54",
                  "#00E06C",
                  "#BE7FF5",
                  "#FFEB8E",
                  "#F37C20",
                  "#E85DDF",
                  "#8EFFFB",
                ][-o];
              -100 !== a.team && (o = 0);
              for (let e of Object.keys(t)) t[e] !== o && n++;
              for (let e of entities)
                e.team !== o ||
                  "tank" !== e.type ||
                  e.underControl ||
                  e.sendMessage(
                    "Press H to control the dominator. (Unavaliable in Boss Rush)"
                  );
              sockets.broadcast(
                "The " +
                  room.cardinals[Math.floor((3 * s.y) / room.height)][
                    Math.floor((3 * s.x) / room.height)
                  ] +
                  " Dominator is " +
                  (o ? "now captured by " + l : "being contested") +
                  "!",
                o ? h : "#FFE46B"
              ),
                room.setType(`dom${-o || "i"}`, s),
                r.define(i),
                (r.isDominator = !0),
                (r.alwaysActive = !0),
                (r.team = o || -100),
                (r.SIZE = 70),
                (r.color = [13, 10, 12, 11, 15, 3, 35, 36, 0][-o]),
                (r.onDead = a.onDead),
                (r.settings.hitsOwnType = "pushOnlyTeam"),
                (r.miscIdentifier = "appearOnMinimap"),
                (r.FOV = 0.5),
                (a = r),
                (t[s.id] = o || -100),
                1 === n &&
                  o &&
                  !room.arenaClosed &&
                  c.serverName.includes("Domination") &&
                  (util.warn(l + " has won the game! Closing arena..."),
                  setTimeout(
                    () => sockets.broadcast(l + " has won the game!", h),
                    2e3
                  ),
                  c.enableBot &&
                    sendClosed(
                      c.serverName,
                      "Reason: Round Over",
                      l + " has won the game! Closing arena..."
                    ),
                  setTimeout(() => closeArena(), 5e3));
            }),
            (t[s.id] = -100);
        }
      },
      mothershipLoop = (e, t) => {
        let s = new Entity(e),
          i = [
            "BLUE",
            "RED",
            "GREEN",
            "PURPLE",
            "YELLOW",
            "ORANGE",
            "PINK",
            "TEAL",
          ],
          a = [
            "#00B0E1",
            "#F04F54",
            "#00E06C",
            "#BE7FF5",
            "#FFEB8E",
            "#F37C20",
            "#E85DDF",
            "#8EFFFB",
          ];
        s.define(Class.mothership),
          (s.isMothership = !0),
          (s.miscIdentifier = "appearOnMinimap"),
          (s.alwaysActive = !0),
          (s.team = -t),
          s.controllers.push(
            new ioTypes.nearestDifferentMaster(s),
            new ioTypes.mapTargetToGoal(s),
            new ioTypes.roamWhenIdle(s)
          ),
          (s.color = [10, 12, 11, 15, 3, 35, 36, 0][t - 1]),
          (s.nameColor = a[t - 1]),
          (s.settings.hitsOwnType = "pushOnlyTeam"),
          (s.name = "Mothership"),
          (s.onDead = () => {
            room.defeatedTeams.push(s.team),
              sockets.broadcast(
                i[t - 1] + "'s Mothership has been killed!",
                a[t - 1]
              ),
              1 !== room.motherships.length &&
                util.remove(room.motherships, room.motherships.indexOf(s));
            for (let e of entities)
              e.team === s.team &&
                (e.isBot || e.isPlayer) &&
                (e.sendMessage("Your team has been defeated!"), e.kill());
            room.arenaClosed ||
              1 !== room.motherships.length ||
              (util.warn(
                i[-room.motherships[0].team - 1] +
                  " has won the game! Closing arena..."
              ),
              setTimeout(
                () =>
                  sockets.broadcast(
                    i[-room.motherships[0].team - 1] + " has won the game!",
                    a[-room.motherships[0].team - 1]
                  ),
                2e3
              ),
              c.enableBot &&
                sendClosed(
                  c.serverName,
                  "Reason: Round Over",
                  i[-room.motherships[0].team - 1] +
                    " has won the game! Closing arena..."
                ),
              setTimeout(() => closeArena(), 5e3));
          }),
          room.motherships.push(s);
      };
    let bossRushBosses = [
      Class.eggQueenTier1AI,
      Class.eggQueenTier2AI,
      Class.eggQueenTier3AI,
      Class.AWP_1AI,
      Class.AWP_14AI,
      Class.AWP_sin16AI,
      Class.AWP_tan54AI,
      Class.AWP_log24AI,
      Class.AWP_69AI,
      Class.AWP_cos39AI,
      Class.AWP_IceAI,
      Class.AWP_24AI,
      Class.AWP_RingAI,
      Class.AWP_cos5AI,
      Class.AWP_psAI,
      Class.AWP_11AI,
      Class.AWP_8AI,
      Class.AWP_21AI,
      Class.AWP_28AI,
      Class.eliteRifleAI,
      Class.RK_1AI,
      Class.hexashipAI,
      Class.eliteDestroyerAI,
      Class.eliteGunnerAI,
      Class.eliteSprayerAI,
      Class.eliteTwinAI,
      Class.eliteMachineAI,
      Class.eliteTrapAI,
      Class.eliteBorerAI,
      Class.eliteSniperAI,
      Class.eliteBasicAI,
      Class.eliteInfernoAI,
      Class.fallenBoosterAI,
      Class.fallenOverlordAI,
      Class.fallenPistonAI,
      Class.fallenAutoTankAI,
      Class.fallenCavalcadeAI,
      Class.fallenFighterAI,
      Class.reanimFarmerAI,
      Class.reanimHeptaTrapAI,
      Class.reanimUziAI,
      Class.palisadeAI,
      Class.skimBossAI,
      Class.leviathanAI,
      Class.ultMultitoolAI,
      Class.nailerAI,
      Class.gravibusAI,
      Class.cometAI,
      Class.brownCometAI,
      Class.orangicusAI,
      Class.atriumAI,
      Class.constructionistAI,
      Class.dropshipAI,
      Class.armySentrySwarmAI,
      Class.armySentryGunAI,
      Class.armySentryTrapAI,
      Class.armySentryRangerAI,
      Class.armySentrySwarmAI,
      Class.armySentryGunAI,
      Class.armySentryTrapAI,
      Class.armySentryRangerAI,
      Class.derogatorAI,
      Class.hexadecagorAI,
      Class.blitzkriegAI,
      Class.demolisherAI,
      Class.octogeddonAI,
      Class.octagronAI,
      Class.ultimateAI,
      Class.cutterAI,
      Class.alphaSentryAI,
      Class.asteroidAI,
      Class.trapeFighterAI,
      Class.visUltimaAI,
      Class.gunshipAI,
      Class.messengerAI,
      Class.pulsarAI,
      Class.colliderAI,
      Class.deltrabladeAI,
      Class.aquamarineAI,
      Class.kioskAI,
      Class.vanguardAI,
      Class.magnetarAI,
      Class.guardianAI,
      Class.summonerAI,
      Class.defenderAI,
      Class.xyvAI,
      Class.conquistadorAI,
      Class.sassafrasAI,
      Class.constAI,
      Class.bowAI,
      Class.snowflakeAI,
      Class.greenGuardianAI,
    ].filter((e) => null != e);
    const bossRushLoop = () => {
        room.bossRushWave++,
          sockets.broadcast(`Warning, wave ${room.bossRushWave} has started.`),
          (bossRushBosses = bossRushBosses.sort(() => 0.5 - Math.random()));
        let e = 0,
          t = 50 === room.bossRushWave ? 1 : Math.round(5 * Math.random() + 5);
        for (let s = 0; s < t; s++) {
          const t = new Entity(room.random());
          (t.team = -100),
            50 === room.bossRushWave
              ? t.define(ran.choose([Class.gaea, Class.eggBossTier5AI]))
              : t.define(bossRushBosses[s]),
            (t.modeDead = function () {
              e--,
                e <= 0
                  ? 50 === room.bossRushWave
                    ? (sockets.broadcast("Victory."),
                      setTimeout(closeArena, 2500))
                    : (sockets.broadcast("Wave cleared. Next wave incoming."),
                      setTimeout(bossRushLoop, 1e4))
                  : sockets.broadcast(`${e} boss${e > 1 ? "es" : ""} left.`);
            }),
            e++;
        }
        sockets.broadcast(e + " bosses have been detected, get to work.");
      },
      trenchWarefare = function () {
        const e = [];
        let t = [],
          s = 0,
          i = !1;

        function a(s, i = -101) {
          const a = new Entity(s);
          a.define(Class.mazeObstacle),
            (a.team = i),
            (a.SIZE = room.width / room.xgrid / 2),
            a.protect(),
            a.life(),
            (a.color = 45),
            e.push(a);
          const o = e.indexOf(a);
          a.onDead = function () {
            for (const e of t)
              e.doorID === o && ((e.ignoreButtonKill = 2), e.kill());
          };
        }

        function o(s, a, r) {
          const n = new Entity(s);
          n.define(Class.button),
            (n.pushability = n.PUSHABILITY = 0),
            (n.team = i ? -101 : -1),
            (n.doorID = r),
            (n.color = i ? (a ? 12 : 11) : a ? 45 : 46),
            (n.onDead = function () {
              if (((t = t.filter((e) => e.id !== n.id)), !n.ignoreButtonKill)) {
                const s = e[n.doorID];
                if (a) {
                  if (
                    ((s.alpha = 0.2),
                    (s.passive = !0),
                    !i && s.isAlive() && 0.2 === s.alpha && s.passive)
                  ) {
                    let e = t.find((e) => e.doorID === n.doorID);
                    e && e.kill();
                  }
                } else (s.alpha = 1), (s.passive = !1);
                for (const e of t)
                  n !== e &&
                    n.doorID === e.doorID &&
                    ((e.ignoreButtonKill = !0), e.kill());
              }
              2 !== n.ignoreButtonKill && o(s, !a, r);
            }),
            t.push(n);
        }

        function r(a, o, n) {
          const l = new Entity(a);
          l.define(Class[n]),
            (l.team = o),
            (l.color = getTeamColor(o)),
            (l.SIZE = 43),
            (l.name = "Dominator"),
            (l.isDominator = !0),
            (l.alwaysActive = !0),
            (l.settings.hitsOwnType = "pushOnlyTeam"),
            (l.miscIdentifier = "appearOnMinimap"),
            (l.FOV = 0.5),
            (l.controllers = [
              new ioTypes.nearestDifferentMaster(l),
              new ioTypes.spinWhileIdle(l),
            ]),
            (l.onDead = function () {
              room.arenaClosed
                ? room.setType("domi", a)
                : -1 === l.team
                ? (r(a, -2, n),
                  room.setType("dom2", a),
                  sockets.broadcast("A dominator has been captured by RED!"),
                  s++,
                  s > 2 &&
                    i &&
                    (sockets.broadcast("RED's base has been relocked!"),
                    (i = !1),
                    t.forEach((e) => (e.ignoreButtonKill = e.kill())),
                    (e[0].passive = !1),
                    (e[0].alpha = 1)))
                : (s--,
                  r(a, -1, n),
                  room.setType("dom1", a),
                  sockets.broadcast("A dominator has been captured by BLUE!"),
                  s < 3 &&
                    !i &&
                    (sockets.broadcast("RED's base has been unlocked!"),
                    (i = !0),
                    t.forEach((e) => (e.ignoreButtonKill = e.kill())),
                    (e[0].passive = !0),
                    (e[0].alpha = 0.2)));
            });
        }
        !(function () {
          for (const t of room.door) {
            a(t);
            let s = [
              {
                x: t.x + room.width / room.xgrid,
                y: t.y - room.height / room.ygrid / 2,
              },
              {
                x: t.x - room.width / room.xgrid,
                y: t.y - room.height / room.ygrid / 2,
              },
            ];
            s = s.filter(function (e) {
              return ["norm", "nest"].includes(
                room.setup[Math.floor((e.y * room.ygrid) / room.height)][
                  Math.floor((e.x * room.xgrid) / room.width)
                ]
              );
            });
            for (const t of s) o(t, 1, e.length - 1);
          }
        })();
        let n = setInterval(
          (function () {
            let e = 1800;
            return function () {
              e--,
                e <= 0
                  ? (clearInterval(n),
                    sockets.broadcast("Red has won the game!"),
                    setTimeout(closeArena, 2500))
                  : e <= 15 || (e < 60 && e % 5 == 0)
                  ? sockets.broadcast(e + " seconds until RED wins!")
                  : e % 60 == 0 &&
                    sockets.broadcast(e / 60 + " minutes until RED wins!");
            };
          })(),
          1e3
        );
        room.dom2.forEach((e) => {
          s++,
            r(
              e,
              -2,
              ran.choose([
                "destroyerDominatorAI",
                "gunnerDominatorAI",
                "trapperDominatorAI",
                "droneDominatorAI",
                "steamrollDominatorAI",
                "autoDominatorAI",
                "crockettDominatorAI",
              ])
            );
        }),
          (function e(t, s) {
            const i = new Entity(t);
            i.define(
              -2 === s ? Class.trapperDominatorAISanctuary : Class.dominatorAI
            ),
              (i.team = s),
              (i.color = getTeamColor(s)),
              (i.SIZE = 43),
              (i.name = "Dominator"),
              (i.isDominator = !0),
              (i.alwaysActive = !0),
              (i.settings.hitsOwnType = "pushOnlyTeam"),
              (i.miscIdentifier = "appearOnMinimap"),
              (i.FOV = 0.5),
              (i.controllers = [
                new ioTypes.nearestDifferentMaster(i),
                new ioTypes.spinWhileIdle(i),
              ]),
              (i.onDead = function () {
                room.arenaClosed
                  ? room.setType("domi", t)
                  : -2 === i.team
                  ? (e(t, -1),
                    room.setType("dom1", t),
                    sockets.broadcast(
                      "RED's Sanctuary has been captured by BLUE!"
                    ),
                    sockets.broadcast("BLUE has won the game!"),
                    setTimeout(closeArena, 2500),
                    clearInterval(n))
                  : room.setType("domi", t);
              });
          })(room.bas2[0], -2);
      },
      carrierBattle = function () {
        let e = (t, s, i = !1) => {
          let a = new Entity(t);
          a.define(i),
            (a.team = s),
            (a.color = -100 === s ? 13 : getTeamColor(s)),
            (a.SIZE = 60),
            (a.name = "Outpost"),
            (a.isDominator = !0),
            (a.alwaysActive = !0),
            (a.settings.hitsOwnType = "pushOnlyTeam"),
            (a.miscIdentifier = "appearOnMinimap"),
            (a.FOV = 0.5),
            (a.onDead = function () {
              if (room.arenaClosed) room.setType("domi", t);
              else if (-100 === a.team) {
                let s = [];
                for (let e of a.collisionArray)
                  e.team >= -room.teamAmount && e.team <= -1 && s.push(e.team);
                let o = s.length ? ran.choose(s) : 0;
                e(t, o, i),
                  room.setType("dom" + -o, t),
                  sockets.broadcast(
                    "An outpost has been captured by " +
                      ["BLUE", "RED"][-o - 1],
                    ["#00B0E1", "#F04F54"][-o - 1]
                  );
              } else
                e(t, -100, i),
                  room.setType("domi", t),
                  sockets.broadcast("A outpost is being contested!", "#FFE46B");
            });
        };
        room.domi.forEach((t) => {
          sanctuaries++, e(t, -100, Class.carrierBattleOutpost);
        });
      },
      getEntity = (e) => entities.find((t) => t.id === e),
      trimName = (e) =>
        (e || "").replace("‮", "").trim() || "An unnamed player",
      quickCombine = (e) => {
        if (null == e) return "Please input a valid array of gun settings.";
        if (13 === e.length)
          return "Please make sure to place the gun settings in an array.";
        let t = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        for (let s of e) for (let e = 0; e < t.length; ++e) t[e] *= s[e];
        return t;
      };
    room.init();
    class IO {
      constructor(e) {
        (this.body = e), (this.acceptsFromTop = !0);
      }
      think() {
        return {
          target: null,
          goal: null,
          fire: null,
          main: null,
          alt: null,
          power: null,
        };
      }
    }
    const ioTypes = {
      squadronManager: class {
        constructor(e) {
          (this.body = e), (this.squadrons = {});
        }
        think() {
          for (let e in this.squadrons) {
            let t = this.squadrons[e];
            if (null != t.target && t.children.length) {
              let e = t.target.velocity,
                s = timeOfImpact(
                  {
                    x: t.target.x - t.x,
                    y: t.target.y - t.y,
                  },
                  e,
                  t.children[0].topSpeed
                );
              (t.x = t.target.x + s * e.x), (t.y = t.target.y + s * e.x);
            }
            if (
              ((room.squadronPoints[t.pointID] = {
                showsOnMap: !0,
                isSquadron: !0,
                x: t.x,
                y: t.y,
                SIZE: 1,
                color: this.body.color,
                id: t.pointID,
              }),
              (t.children = t.children.filter((e) => !!e && e.isAlive())),
              0 == t.children.length)
            ) {
              let [s, i] = e.split("_");
              const a = this.body.guns.filter((e) => e.launchSquadron === s)[
                +i
              ];
              a && (a.coolDown.time = Date.now()),
                delete room.squadronPoints[t.pointID],
                delete this.squadrons[e];
              continue;
            }
            let s = 0,
              i = {
                x: 0,
                y: 0,
              };
            for (let e of t.children) {
              const a = ((2 * Math.PI) / t.children.length) * s;
              if (
                ((e.moveToPlane = {
                  x: t.x + Math.cos(a) * (4 * e.SIZE),
                  y: t.y + Math.sin(a) * (4 * e.SIZE),
                  alt: !1,
                }),
                null != t.target && t.target.isAlive)
              ) {
                let s = util.getDistance(e, t.target),
                  i =
                    t.type.includes("Bomb") && "skipBomb" !== t.type
                      ? e.size + t.target.size
                      : 7.5 * (e.size + t.target.size);
                e.moveToPlane.alt = s <= i;
              }
              (e.alwaysActive = !0), (i.x += e.x), (i.y += e.y), s++;
            }
            if (
              ((i.x /= t.children.length),
              (i.y /= t.children.length),
              util.getDistance(i, t) <
                t.children[0].SIZE * t.children.length * 3 && null == t.target)
            ) {
              let e = entities
                .filter(
                  (e) =>
                    "tank" === e.type &&
                    e.dangerValue > 0 &&
                    !e.passive &&
                    !e.invuln &&
                    e.master.master.team !== this.body.master.team &&
                    util.getDistance(e, t) < 0.75 * this.body.fov
                )
                .sort(
                  (e, s) => util.getDistance(e, t) - util.getDistance(s, t)
                );
              e.length && (t.target = e[0]);
            }
          }
        }
        setSquadron(e, t, s, i) {
          let a = e + "_" + t;
          if (this.squadrons[a])
            (this.squadrons[a].target = null),
              (this.squadrons[a].x = s),
              (this.squadrons[a].y = i);
          else {
            const o = this.body.guns.filter((t) => t.launchSquadron === e)[t];
            if (
              o &&
              Date.now() - o.coolDown.time >=
                1e4 + o.countsOwnKids * (1e3 * o.coolDown.max) &&
              !this.body.controllingSquadron &&
              !this.body.isInMyBase()
            ) {
              let t =
                  o.offset * Math.cos(o.direction + o.angle + o.body.facing) +
                  (1.5 * o.length - (o.width * o.settings.size) / 2) *
                    Math.cos(o.angle + o.body.facing),
                r =
                  o.offset * Math.sin(o.direction + o.angle + o.body.facing) +
                  (1.5 * o.length - (o.width * o.settings.size) / 2) *
                    Math.sin(o.angle + o.body.facing),
                n = [];
              for (let e = 0; e < o.countsOwnKids; e++)
                n.push(o.fire(t, r, o.body.skill, !0));
              n.forEach((e, t) => {
                const s = ((2 * Math.PI) / n.length) * t;
                (e.x = this.body.x + Math.cos(s) * (4 * e.SIZE)),
                  (e.y = this.body.y + Math.sin(s) * (4 * e.SIZE));
              }),
                (this.squadrons[a] = {
                  id: a,
                  pointID: n[0].id,
                  x: s,
                  y: i,
                  children: n,
                  target: null,
                  type: e,
                });
            }
          }
        }
      },
    };
    (ioTypes.doNothing = class extends IO {
      constructor(e) {
        super(e), (this.acceptsFromTop = !1);
      }
      think() {
        return {
          goal: {
            x: this.body.x,
            y: this.body.y,
          },
          main: !1,
          alt: !1,
          fire: !1,
        };
      }
    }),
      (ioTypes.droneTrap = class extends IO {
        constructor(e) {
          super(e), (this.done = !1);
        }
        think(e) {
          e.alt &&
            !this.done &&
            ((this.done = !0), this.body.define(Class.droneTrapTrap));
        }
      });
    const quartPI = Math.PI / 4;
    (ioTypes.plane = class extends IO {
      constructor(e) {
        super(e);
      }
      think(e) {
        if (null != this.body.moveToPlane) {
          let e = this.body.moveToPlane;
          return (
            e.alt &&
              (this.body.facing = Math.atan2(
                e.y - this.body.y,
                e.x - this.body.x
              )),
            {
              target: {
                x: e.x - this.body.x,
                y: e.y - this.body.y,
              },
              goal: e,
              power: 1,
              alt: e.alt,
            }
          );
        }
        if (
          this.body.master.master.controllingSquadron &&
          this.body.master.master.control.target
        )
          return (
            (e.target = this.body.master.master.control.target),
            {
              goal: {
                x: e.target.x + this.body.x,
                y: e.target.y + this.body.y,
              },
              power: 1,
            }
          );
      }
    }),
      (ioTypes.carrierThinking = class extends IO {
        constructor(e) {
          super(e),
            (this.targetLock = void 0),
            (this.tick = ran.irandom(30)),
            (this.lead = 0),
            (this.validTargets = this.buildList(10 * e.fov)),
            (this.oldHealth = e.health.display());
        }
        validate(e, t, s, i, a) {
          return (
            e.health.amount > 0 &&
            e.dangerValue > 0 &&
            !e.invuln &&
            !e.master.master.passive &&
            !this.body.master.master.passive &&
            e.master.master.team !== this.body.master.master.team &&
            -101 !== e.master.master.team &&
            (this.body.aiSettings.seeInvisible || e.alpha > 0.5) &&
            (!c.SANDBOX ||
              this.body.master.master.sandboxId ===
                e.master.master.sandboxId) &&
            (this.body.settings.targetPlanes
              ? e.isPlane
              : this.body.settings.targetMissiles
              ? e.settings.missile
              : this.body.settings.targetAmmo
              ? "drone" === e.type ||
                "minion" === e.type ||
                "swarm" === e.type ||
                "crasher" === e.type
              : "tank" === e.type || "miniboss" === e.type) &&
            (this.body.aiSettings.blind ||
              ((e.x - t.x) * (e.x - t.x) < i &&
                (e.y - t.y) * (e.y - t.y) < i)) &&
            (this.body.aiSettings.skynet ||
              ((e.x - s.x) * (e.x - s.x) < a && (e.y - s.y) * (e.y - s.y) < a))
          );
        }
        buildList(e) {
          let t = 0,
            s = !1,
            i = [];
          for (let a = 0, o = entities.length; a < o; a++) {
            let o = entities[a];
            (this.body.controllingSquadron && this.body.lastCameraPos) ||
              (this.validate(
                o,
                {
                  x: this.body.x,
                  y: this.body.y,
                },
                {
                  x: this.body.master.master.x,
                  y: this.body.master.master.y,
                },
                e * e,
                (e * e * 4) / 3
              ) &&
                (null == this.body.firingArc ||
                  this.body.aiSettings.view360 ||
                  Math.abs(
                    util.angleDifference(
                      util.getDirection(this.body, o),
                      this.body.firingArc[0]
                    )
                  ) < this.body.firingArc[1]) &&
                ((t = Math.max(o.dangerValue, t)),
                (this.body.aiSettings.farm || o.dangerValue === t) &&
                  (this.targetLock && o.id === this.targetLock.id && (s = !0),
                  i.push(o))));
          }
          return s || (this.targetLock = void 0), i;
        }
        think(e) {
          if (e.main || e.alt || this.body.master.autoOverride)
            return (this.targetLock = void 0), {};
          let t = this.body.topSpeed,
            s = this.body.fov;
          for (let e = 0; e < this.body.guns.length; e++)
            if (this.body.guns[e].canShoot && !this.body.aiSettings.skynet) {
              let i = this.body.guns[e].getTracking();
              (t = i.speed),
                (s =
                  this.body.isPlayer &&
                  "miniboss" !== this.body.type &&
                  this.body.master === this.body
                    ? Math.min(s, (i.speed || 1) * (i.range || 90))
                    : 640 * this.body.FOV);
              break;
            }
          if (
            (Number.isFinite(t) || (t = this.body.topSpeed + 0.01),
            Number.isFinite(s) || (s = 640 * this.body.FOV),
            this.targetLock &&
              (this.body.controllingSquadron && this.body.lastCameraPos
                ? this.validate(
                    this.targetLock,
                    {
                      x: this.body.lastCameraPos[0],
                      y: this.body.lastCameraPos[1],
                    },
                    {
                      x: this.body.lastCameraPos[0],
                      y: this.body.lastCameraPos[1],
                    },
                    s * s,
                    (s * s * 4) / 3
                  ) || ((this.targetLock = void 0), (this.tick = 100))
                : this.validate(
                    this.targetLock,
                    {
                      x: this.body.x,
                      y: this.body.y,
                    },
                    {
                      x: this.body.master.master.x,
                      y: this.body.master.master.y,
                    },
                    s * s,
                    (s * s * 4) / 3
                  ) || ((this.targetLock = void 0), (this.tick = 100))),
            this.tick++ > 15 * room.speed &&
              ((this.tick = 0),
              (this.validTargets = this.buildList(10 * s)),
              this.targetLock &&
                -1 === this.validTargets.indexOf(this.targetLock) &&
                (this.targetLock = void 0),
              null == this.targetLock &&
                this.validTargets.length &&
                ((this.targetLock =
                  1 === this.validTargets.length
                    ? this.validTargets[0]
                    : nearest(this.validTargets, {
                        x: this.body.x,
                        y: this.body.y,
                      })),
                (this.tick = -90))),
            null != this.targetLock)
          ) {
            const e = this.body.controllingSquadron && this.body.lastCameraPos;
            let s = this.targetLock.velocity,
              i = {
                x:
                  this.targetLock.x -
                  (e ? this.body.lastCameraPos[0] : this.body.x),
                y:
                  this.targetLock.y -
                  (e ? this.body.lastCameraPos[1] : this.body.y),
              };
            if (
              this.tick % 4 == 0 &&
              ((this.lead = 0), !this.body.aiSettings.chase)
            ) {
              let e = timeOfImpact(i, s, t);
              this.lead = e;
            }
            return (
              Number.isFinite(this.lead) || (this.lead = 0),
              {
                target: {
                  x: i.x + this.lead * s.x,
                  y: i.y + this.lead * s.y,
                },
                fire: !0,
                main: !0,
                alt:
                  e &&
                  util.getDistance(this.targetLock, {
                    x: this.body.lastCameraPos[0],
                    y: this.body.lastCameraPos[1],
                  }) <
                    3 * this.targetLock.SIZE,
              }
            );
          }
          return {};
        }
      }),
      (ioTypes.carrierAI = class extends IO {
        constructor(e) {
          super(e), (this.goal = room.random()), (this.goalDate = Date.now());
        }
        summon() {
          const e = this.body.guns.filter(
            (e) => "string" == typeof e.launchSquadron
          );
          if (e.length) {
            const t = e[(Math.random() * e.length) | 0];
            if (
              t &&
              Date.now() - t.coolDown.time >= 1e4 + 1e3 * t.countsOwnKids &&
              !this.body.controllingSquadron
            ) {
              t.coolDown.time = Date.now();
              let e =
                  t.offset * Math.cos(t.direction + t.angle + t.body.facing) +
                  (1.35 * t.length - (t.width * t.settings.size) / 2) *
                    Math.cos(t.angle + t.body.facing),
                s =
                  t.offset * Math.sin(t.direction + t.angle + t.body.facing) +
                  (1.35 * t.length - (t.width * t.settings.size) / 2) *
                    Math.sin(t.angle + t.body.facing),
                i = [];
              for (let a = 0; a < t.countsOwnKids; a++)
                i.push(t.fire(e, s, t.body.skill, !0));
              i.forEach((e, t) => {
                const s = ((2 * Math.PI) / i.length) * t;
                (e.x = this.body.x + Math.cos(s) * (4 * e.SIZE)),
                  (e.y = this.body.y + Math.sin(s) * (4 * e.SIZE));
              }),
                setTimeout(() => {
                  null != this.body && (this.body.controllingSquadron = !0);
                }, 75 * t.countsOwnKids);
            }
          }
        }
        think(e) {
          if (
            (!this.body.controllingSquadron &&
              Math.random() > 0.95 &&
              this.summon(),
            this.body.controllingSquadron)
          ) {
            const e = this.body.guns.find(
              (e) => "string" == typeof e.launchSquadron && e.children.length
            );
            if (e) {
              let t = 0,
                s = 0;
              for (const i of e.children) (t += i.x), (s += i.y);
              (t /= e.children.length),
                (s /= e.children.length),
                (this.body.lastCameraPos = [t, s]),
                (this.body.cameraLingerTime = 35),
                (room.squadronPoints[this.body.id] = {
                  showsOnMap: !0,
                  isSquadron: !0,
                  x: t,
                  y: s,
                  SIZE: 1,
                  color: this.body.color,
                  id: e.children[0].id,
                });
            } else
              delete room.squadronPoints[this.body.id],
                this.body.cameraLingerTime--,
                this.body.cameraLingerTime <= 0 &&
                  (this.body.controllingSquadron = !1);
          } else
            room.squadronPoints[this.body.id] &&
              delete room.squadronPoints[this.body.id];
          return (
            (Date.now() - this.goalDate > 1e4 ||
              util.getDistance(this.goal, this.body) < 250) &&
              ((this.goal = room.random()), (this.goalDate = Date.now())),
            (e.goal = {
              x: this.goal.x,
              y: this.goal.y,
            }),
            e
          );
        }
      }),
      (ioTypes.moveInCircles = class extends IO {
        constructor(e) {
          super(e),
            (this.acceptsFromTop = !1),
            (this.timer = ran.irandom(10) + 3),
            (this.goal = {
              x: this.body.x + 7.5 * Math.cos(-this.body.facing),
              y: this.body.y + 7.5 * Math.sin(-this.body.facing),
            });
        }
        think() {
          return (
            this.timer-- ||
              ((this.timer = 10),
              (this.goal = {
                x: this.body.x + 7.5 * Math.cos(-this.body.facing),
                y: this.body.y + 7.5 * Math.sin(-this.body.facing),
              })),
            {
              goal: this.goal,
            }
          );
        }
      }),
      (ioTypes.listenToPlayer = class extends IO {
        constructor(e, t) {
          super(e), (this.player = t), (this.acceptsFromTop = !1);
        }
        think() {
          let e = {
            x: this.player.target.x,
            y: this.player.target.y,
          };
          if (this.player.command.autospin) {
            let t =
              Math.atan2(
                this.body.control.target.y,
                this.body.control.target.x
              ) + this.body.spinSpeed;
            e = {
              x: 275 * Math.cos(t),
              y: 275 * Math.sin(t),
            };
          }
          return (
            this.body.invuln &&
              (this.player.command.right ||
                this.player.command.left ||
                this.player.command.up ||
                this.player.command.down ||
                this.player.command.lmb) &&
              (this.body.invuln = !1),
            (this.body.autoOverride =
              this.body.passive || this.player.command.override),
            {
              target: e,
              goal: {
                x:
                  this.body.x +
                  this.player.command.right -
                  this.player.command.left,
                y:
                  this.body.y +
                  this.player.command.down -
                  this.player.command.up,
              },
              fire: this.player.command.lmb || this.player.command.autofire,
              main:
                this.player.command.lmb ||
                this.player.command.autospin ||
                this.player.command.autofire,
              alt: this.player.command.rmb,
            }
          );
        }
      }),
      (ioTypes.listenToPlayerStatic = class extends IO {
        constructor(e, t) {
          super(e), (this.player = t), (this.acceptsFromTop = !1);
        }
        think() {
          let e = {
            x: this.player.target.x,
            y: this.player.target.y,
          };
          if (this.player.command.autospin) {
            let t =
              Math.atan2(
                this.body.control.target.y,
                this.body.control.target.x
              ) + 0.02;
            e = {
              x: 275 * Math.cos(t),
              y: 275 * Math.sin(t),
            };
          }
          return (
            this.body.invuln &&
              (this.player.command.right ||
                this.player.command.left ||
                this.player.command.up ||
                this.player.command.down ||
                this.player.command.lmb) &&
              (this.body.invuln = !1),
            (this.body.autoOverride =
              this.body.passive || this.player.command.override),
            {
              target: e,
              fire: this.player.command.lmb || this.player.command.autofire,
              main:
                this.player.command.lmb ||
                this.player.command.autospin ||
                this.player.command.autofire,
              alt: this.player.command.rmb,
            }
          );
        }
      }),
      (ioTypes.mapTargetToGoal = class extends IO {
        constructor(e) {
          super(e);
        }
        think(e) {
          if (e.main || e.alt)
            return {
              goal: {
                x: e.target.x + this.body.x,
                y: e.target.y + this.body.y,
              },
              power: 1,
            };
        }
      }),
      (ioTypes.boomerang = class extends IO {
        constructor(e) {
          super(e),
            (this.r = 0),
            (this.b = e),
            (this.m = e.master),
            (this.turnover = !1),
            (this.myGoal = {
              x: 3 * e.master.control.target.x + e.master.x,
              y: 3 * e.master.control.target.y + e.master.y,
            });
        }
        think(e) {
          this.b.range > this.r && (this.r = this.b.range);
          return this.turnover
            ? {
                goal: {
                  x: this.m.x,
                  y: this.m.y,
                },
                power: 1,
              }
            : (this.r && this.b.range < 0.5 * this.r && (this.turnover = !0),
              {
                goal: this.myGoal,
                power: 1,
              });
        }
      }),
      (ioTypes.goToMasterTarget = class extends IO {
        constructor(e) {
          super(e),
            (this.myGoal = {
              x: e.master.control.target.x + e.master.x,
              y: e.master.control.target.y + e.master.y,
            }),
            (this.countdown = 5);
        }
        think() {
          if (this.countdown)
            return (
              util.getDistance(this.body, this.myGoal) < 1 && this.countdown--,
              {
                goal: {
                  x: this.myGoal.x,
                  y: this.myGoal.y,
                },
              }
            );
        }
      }),
      (ioTypes.goAwayFromMasterTarget = class extends IO {
        constructor(e) {
          super(e),
            (this.myGoal = {
              x: -e.master.control.target.x + e.master.x,
              y: -e.master.control.target.y + e.master.y,
            }),
            (this.countdown = 5);
        }
        think() {
          if (this.countdown)
            return (
              util.getDistance(this.body, this.myGoal) < 1 && this.countdown--,
              {
                goal: {
                  x: this.myGoal.x,
                  y: this.myGoal.y,
                },
              }
            );
        }
      }),
      (ioTypes.block = class extends IO {
        constructor(e) {
          super(e),
            (this.blockAngle =
              Math.atan2(e.y - e.master.y, e.x - e.master.x) -
              Math.atan2(e.master.control.target.y, e.master.control.target.x)),
            Math.abs(this.blockAngle) === 1 / 0 && (this.blockAngle = 0),
            (this.myGoal = {
              x:
                e.master.control.target.x * Math.cos(this.blockAngle) -
                e.master.control.target.y * Math.sin(this.blockAngle) +
                e.master.x,
              y:
                e.master.control.target.x * Math.sin(this.blockAngle) +
                e.master.control.target.y * Math.cos(this.blockAngle) +
                e.master.y,
            }),
            (this.countdown = 5);
        }
        think() {
          if (this.countdown)
            return (
              util.getDistance(this.body, this.myGoal) < 1 && this.countdown--,
              {
                goal: {
                  x: this.myGoal.x,
                  y: this.myGoal.y,
                },
              }
            );
        }
      }),
      (ioTypes.triBoomerang = class extends IO {
        constructor(e) {
          super(e),
            (this.r = 0),
            (this.b = e),
            (this.m = e.master),
            (this.turnover = !1),
            (this.boomAngle =
              Math.atan2(e.y - e.master.y, e.x - e.master.x) -
              Math.atan2(e.master.control.target.y, e.master.control.target.x)),
            Math.abs(this.boomAngle) === 1 / 0 && (this.boomAngle = 0),
            (this.myGoal = {
              x:
                3 * e.master.control.target.x * Math.cos(this.boomAngle) -
                3 * e.master.control.target.y * Math.sin(this.boomAngle) +
                e.master.x,
              y:
                3 * e.master.control.target.x * Math.sin(this.boomAngle) +
                3 * e.master.control.target.y * Math.cos(this.boomAngle) +
                e.master.y,
            });
        }
        think(e) {
          this.b.range > this.r && (this.r = this.b.range);
          return this.turnover
            ? {
                goal: {
                  x: this.m.x,
                  y: this.m.y,
                },
                power: 1,
              }
            : (this.r && this.b.range < 0.5 * this.r && (this.turnover = !0),
              {
                goal: this.myGoal,
                power: 1,
              });
        }
      }),
      (ioTypes.canRepel = class extends IO {
        constructor(e) {
          super(e);
        }
        think(e) {
          if (
            e.alt &&
            e.target &&
            util.getDistance(this.body, this.body.master) <
              this.body.master.fov / 1.5
          )
            return {
              target: {
                x: -e.target.x,
                y: -e.target.y,
              },
              main: !0,
            };
        }
      }),
      (ioTypes.alwaysFire = class extends IO {
        constructor(e) {
          super(e);
        }
        think() {
          return {
            fire: !0,
          };
        }
      }),
      (ioTypes.targetSelf = class extends IO {
        constructor(e) {
          super(e);
        }
        think() {
          return {
            main: !0,
            target: {
              x: 0,
              y: 0,
            },
          };
        }
      }),
      (ioTypes.mapAltToFire = class extends IO {
        constructor(e) {
          super(e);
        }
        think(e) {
          if (e.alt)
            return {
              fire: !0,
            };
        }
      }),
      (ioTypes.onlyAcceptInArc = class extends IO {
        constructor(e) {
          super(e);
        }
        think(e) {
          if (
            e.target &&
            null != this.body.firingArc &&
            Math.abs(
              util.angleDifference(
                Math.atan2(e.target.y, e.target.x),
                this.body.firingArc[0]
              )
            ) >= this.body.firingArc[1]
          )
            return {
              fire: !1,
              alt: !1,
              main: !1,
            };
        }
      }),
      (ioTypes.onlyFireWhenInRange = class extends IO {
        constructor(e) {
          super(e);
        }
        think(e) {
          if (
            e.target &&
            null != this.body.firingArc &&
            Math.abs(
              util.angleDifference(
                Math.atan2(e.target.y, e.target.x),
                this.body.facing
              )
            ) >= 0.0334
          )
            return {
              fire: !1,
            };
        }
      }),
      (ioTypes.skipBomb = class extends IO {
        constructor(e) {
          super(e),
            (this.time = 15),
            (this.initialAngle = e.velocity.direction);
        }
        think(e) {
          if ((this.time--, this.time <= 0)) {
            this.time = 15;
            let e =
              this.initialAngle + (Math.random() * (Math.PI / 2) - Math.PI / 4);
            this.body.velocity = new Vector(
              Math.cos(e) * this.body.initialBulletSpeed,
              Math.sin(e) * this.body.initialBulletSpeed
            );
          }
        }
      }),
      (ioTypes.nearestDifferentMaster = class extends IO {
        constructor(e) {
          super(e),
            (this.targetLock = void 0),
            (this.tick = ran.irandom(30)),
            (this.lead = 0),
            (this.validTargets = this.buildList(e.fov)),
            (this.oldHealth = e.health.display()),
            (this.lastView = Date.now());
        }
        validate(e, t, s, i, a) {
          return (
            (!c.RANKED_BATTLE || e.roomId === this.body.roomId) &&
            e.health.amount > 0 &&
            !isNaN(e.dangerValue) &&
            !e.invuln &&
            !e.master.master.passive &&
            !this.body.master.master.passive &&
            e.master.master.team !== this.body.master.master.team &&
            -101 !== e.master.master.team &&
            (this.body.aiSettings.seeInvisible ||
              this.body.isArenaCloser ||
              e.alpha > 0.5) &&
            (this.body.settings.targetPlanes
              ? e.isPlane && ("drone" === e.type || "minion" === e.type)
              : "miniboss" === e.type ||
                "tank" === e.type ||
                "crasher" === e.type ||
                (!this.body.aiSettings.IGNORE_SHAPES && "food" === e.type)) &&
            (this.body.aiSettings.BLIND ||
              ((e.x - t.x) * (e.x - t.x) < i &&
                (e.y - t.y) * (e.y - t.y) < i)) &&
            (this.body.aiSettings.SKYNET ||
              ((e.x - s.x) * (e.x - s.x) < a && (e.y - s.y) * (e.y - s.y) < a))
          );
        }
        buildList(e) {
          newLogs.buildList.start();
          let t = 0,
            s = !1,
            i = [];
          for (let a = 0, o = targetableEntities.length; a < o; a++) {
            let o = targetableEntities[a];
            this.validate(
              o,
              {
                x: this.body.x,
                y: this.body.y,
              },
              {
                x: this.body.master.master.x,
                y: this.body.master.master.y,
              },
              e * e,
              (e * e * 4) / 3
            ) &&
              (null == this.body.firingArc ||
                this.body.aiSettings.view360 ||
                Math.abs(
                  util.angleDifference(
                    util.getDirection(this.body, o),
                    this.body.firingArc[0]
                  )
                ) < this.body.firingArc[1]) &&
              ((t = Math.max(o.dangerValue, t)),
              (this.body.aiSettings.farm || o.dangerValue === t) &&
                (this.targetLock && o.id === this.targetLock.id && (s = !0),
                i.push(o)));
          }
          return s || (this.targetLock = void 0), newLogs.buildList.stop(), i;
        }
        think(e) {
          if (e.main || e.alt || this.body.master.autoOverride)
            return (this.targetLock = void 0), {};
          newLogs.targeting.start();
          let t = this.body.topSpeed,
            s = this.body.fov;
          for (let e = 0; e < this.body.guns.length; e++)
            if (this.body.guns[e].canShoot) {
              let i = this.body.guns[e].getTracking();
              (t = i.speed),
                (s = this.isBot
                  ? Math.min(s, this.body.fov)
                  : Math.min(
                      s,
                      (i.speed || 1.5) *
                        (i.range < 2 * this.body.size ? this.body.fov : i.range)
                    ));
              break;
            }
          if (
            (Number.isFinite(t) || (t = this.body.topSpeed + 0.01),
            (!Number.isFinite(s) || s < this.body.size) && (s = this.body.fov),
            this.targetLock &&
              (this.validate(
                this.targetLock,
                {
                  x: this.body.x,
                  y: this.body.y,
                },
                {
                  x: this.body.master.master.x,
                  y: this.body.master.master.y,
                },
                s * s,
                (s * s * 4) / 3
              ) ||
                ((this.targetLock = void 0), (this.tick = 100))),
            this.tick++ > 25 * room.speed &&
              ((this.tick = 0),
              (this.validTargets = this.buildList(
                this.body.isBot || this.body.isMothership ? 0.65 * s : s
              )),
              this.targetLock &&
                -1 === this.validTargets.indexOf(this.targetLock) &&
                (this.targetLock = void 0),
              null == this.targetLock &&
                this.validTargets.length &&
                ((this.targetLock =
                  1 === this.validTargets.length
                    ? this.validTargets[0]
                    : nearest(this.validTargets, {
                        x: this.body.x,
                        y: this.body.y,
                      })),
                (this.tick = -90))),
            this.body.isBot)
          ) {
            let e = this.body.bond || this.body;
            e.collisionArray.length &&
              e.health.display() < this.oldHealth &&
              ((this.oldHealth = e.health.display()),
              -1 === this.validTargets.indexOf(e.collisionArray[0]) &&
                (this.targetLock =
                  -1 === e.collisionArray[0].master.id
                    ? e.collisionArray[0].source
                    : e.collisionArray[0].master));
          }
          if (null != this.targetLock) {
            let e = this.targetLock.velocity,
              s = {
                x: this.targetLock.x - this.body.x,
                y: this.targetLock.y - this.body.y,
              };
            if (
              this.tick % 4 == 0 &&
              ((this.lead = 0), !this.body.aiSettings.CHASE)
            ) {
              let i = timeOfImpact(s, e, t);
              this.lead = i;
            }
            return (
              Number.isFinite(this.lead) || (this.lead = 0),
              newLogs.targeting.stop(),
              {
                target: {
                  x: s.x + this.lead * e.x,
                  y: s.y + this.lead * e.y,
                },
                fire: !0,
                main: !0,
              }
            );
          }
          return newLogs.targeting.stop(), {};
        }
      }),
      (ioTypes.roamWhenIdle = class extends IO {
        constructor(e) {
          super(e), (this.goal = room.randomType("norm"));
        }
        think(e) {
          if (e.main || e.alt || this.body.master.autoOverride) return {};
          for (; util.getDistance(this.goal, this.body) < 2 * this.body.SIZE; )
            this.goal = room.randomType(Math.random() > 0.8 ? "nest" : "norm");
          return {
            goal: this.goal,
          };
        }
      }),
      (ioTypes.minion = class extends IO {
        constructor(e) {
          super(e), (this.turnwise = 1);
        }
        think(e) {
          if (null != e.target && (e.alt || e.main)) {
            let t,
              s = Math.sqrt(this.body.master.size / this.body.master.SIZE),
              i = 60 * s,
              a = 120 * s,
              o = 135 * s,
              r = 1,
              n = new Vector(e.target.x, e.target.y);
            if (e.alt)
              if (n.length < i)
                t = {
                  x: this.body.x + n.x,
                  y: this.body.y + n.y,
                };
              else if (n.length < o) {
                let e = -this.turnwise * n.direction + Math.PI / 5;
                t = {
                  x: this.body.x + Math.cos(e),
                  y: this.body.y + Math.sin(e),
                };
              } else
                t = {
                  x: this.body.x - n.x,
                  y: this.body.y - n.y,
                };
            else if (e.main) {
              let e = this.turnwise * n.direction + 0.01;
              (t = {
                x: this.body.x + n.x - a * Math.cos(e),
                y: this.body.y + n.y - a * Math.sin(e),
              }),
                Math.abs(n.length - a) < 2 * this.body.size && (r = 0.7);
            }
            return {
              goal: t,
              power: r,
            };
          }
        }
      }),
      (ioTypes.minionNoRepel = class extends IO {
        constructor(e) {
          super(e), (this.turnwise = 1);
        }
        think(e) {
          if (null != e.target && e.main) {
            let t,
              s =
                120 * Math.sqrt(this.body.master.size / this.body.master.SIZE),
              i = 1,
              a = new Vector(e.target.x, e.target.y);
            if (e.main) {
              let e = this.turnwise * a.direction + 0.01;
              (t = {
                x: this.body.x + a.x - s * Math.cos(e),
                y: this.body.y + a.y - s * Math.sin(e),
              }),
                Math.abs(a.length - s) < 2 * this.body.size && (i = 0.7);
            }
            return {
              goal: t,
              power: i,
            };
          }
        }
      }),
      (ioTypes.hangOutNearMaster = class extends IO {
        constructor(e) {
          super(e),
            (this.acceptsFromTop = !1),
            (this.orbit = 30),
            (this.currentGoal = {
              x: this.body.source.x,
              y: this.body.source.y,
            }),
            (this.timer = 0);
        }
        think(e) {
          if (this.body.source !== this.body) {
            let e = 0.8 * this.orbit + this.body.source.size + this.body.size,
              t = 1.5 * this.orbit + this.body.source.size + this.body.size,
              s = util.getDistance(this.body, this.body.source) + Math.PI / 8,
              i = {
                target: {
                  x: this.body.velocity.x,
                  y: this.body.velocity.y,
                },
                goal: this.currentGoal,
                power: void 0,
              };
            if (s > t || this.timer > 30) {
              this.timer = 0;
              let s =
                  util.getDirection(this.body, this.body.source) +
                  Math.PI * ran.random(0.5),
                i = ran.randomRange(e, t),
                a = this.body.source.x - i * Math.cos(s),
                o = this.body.source.y - i * Math.sin(s);
              this.currentGoal = {
                x: a,
                y: o,
              };
            }
            return (
              s < t && ((i.power = 0.15), ran.chance(0.3) && this.timer++), i
            );
          }
        }
      }),
      (ioTypes.circleTarget = class extends IO {
        constructor(e) {
          super(e);
        }
        think(e) {
          if (null != e.target && (e.alt || e.main)) {
            let t,
              s = 280,
              i = 5,
              a = new Vector(e.target.x, e.target.y),
              o = a.direction + i;
            return (
              e.alt && ((s /= 2), (this.body.range -= 0.5)),
              (t = {
                x: this.body.x + a.x - s * Math.cos(o),
                y: this.body.y + a.y - s * Math.sin(o),
              }),
              {
                goal: t,
                power: i,
              }
            );
          }
        }
      }),
      (ioTypes.spin = class extends IO {
        constructor(e) {
          super(e), (this.a = 0);
        }
        think(e) {
          this.a += 0.05;
          let t = 0;
          return (
            null != this.body.bond && (t = this.body.bound.angle),
            {
              target: {
                x: Math.cos(this.a + t),
                y: Math.sin(this.a + t),
              },
              main: !0,
            }
          );
        }
      }),
      (ioTypes.slowSpin = class extends IO {
        constructor(e) {
          super(e), (this.a = 0);
        }
        think(e) {
          this.a += 0.025;
          let t = 0;
          return (
            null != this.body.bond && (t = this.body.bound.angle),
            {
              target: {
                x: Math.cos(this.a + t),
                y: Math.sin(this.a + t),
              },
              main: !0,
            }
          );
        }
      }),
      (ioTypes.slowSpinReverse = class extends IO {
        constructor(e) {
          super(e), (this.a = 0);
        }
        think(e) {
          this.a -= 0.025;
          let t = 0;
          return (
            null != this.body.bond && (t = this.body.bound.angle),
            {
              target: {
                x: Math.cos(this.a + t),
                y: Math.sin(this.a + t),
              },
              main: !0,
            }
          );
        }
      }),
      (ioTypes.slowSpin2 = class extends IO {
        constructor(e) {
          super(e);
        }
        think(e) {
          return (
            (this.body.facing += 0.00375),
            {
              target: {
                x: Math.cos(this.body.facing),
                y: Math.sin(this.body.facing),
              },
              main: !0,
            }
          );
        }
      }),
      (ioTypes.fastSpin = class extends IO {
        constructor(e) {
          super(e), (this.a = 0);
        }
        think(e) {
          this.a += 0.072;
          let t = 0;
          return (
            null != this.body.bond && (t = this.body.bound.angle),
            {
              target: {
                x: Math.cos(this.a + t),
                y: Math.sin(this.a + t),
              },
              main: !0,
            }
          );
        }
      }),
      (ioTypes.heliSpin = class extends IO {
        constructor(e) {
          super(e), (this.a = 0);
        }
        think(e) {
          this.a += Math.PI / 5.5;
          let t = 0;
          return (
            null != this.body.bond && (t = this.body.bound.angle),
            {
              target: {
                x: Math.cos(this.a + t),
                y: Math.sin(this.a + t),
              },
              main: !0,
            }
          );
        }
      }),
      (ioTypes.reverseSpin = class extends IO {
        constructor(e) {
          super(e), (this.a = 0);
        }
        think(e) {
          this.a -= 0.05;
          let t = 0;
          return (
            null != this.body.bond && (t = this.body.bound.angle),
            {
              target: {
                x: Math.cos(this.a + t),
                y: Math.sin(this.a + t),
              },
              main: !0,
            }
          );
        }
      }),
      (ioTypes.reverseFastSpin = class extends IO {
        constructor(e) {
          super(e), (this.a = 0);
        }
        think(e) {
          this.a -= 0.072;
          let t = 0;
          return (
            null != this.body.bond && (t = this.body.bound.angle),
            {
              target: {
                x: Math.cos(this.a + t),
                y: Math.sin(this.a + t),
              },
              main: !0,
            }
          );
        }
      }),
      (ioTypes.reverseHeliSpin = class extends IO {
        constructor(e) {
          super(e), (this.a = 0);
        }
        think(e) {
          this.a -= Math.PI / 5.5;
          let t = 0;
          return (
            null != this.body.bond && (t = this.body.bound.angle),
            {
              target: {
                x: Math.cos(this.a + t),
                y: Math.sin(this.a + t),
              },
              main: !0,
            }
          );
        }
      }),
      (ioTypes.dontTurn = class extends IO {
        constructor(e) {
          super(e);
        }
        think(e) {
          return {
            target: {
              x: 1,
              y: 0,
            },
            main: !0,
          };
        }
      }),
      (ioTypes.dontTurn2 = class extends IO {
        constructor(e) {
          super(e);
        }
        think(e) {
          return {
            target: {
              x: 0,
              y: 1,
            },
            main: !0,
          };
        }
      }),
      (ioTypes.spinWhileIdle = class extends IO {
        constructor(e) {
          super(e), (this.a = 0);
        }
        think(e) {
          return e.target
            ? ((this.a = Math.atan2(e.target.y, e.target.x)), e)
            : ((this.a += 0.015),
              {
                target: {
                  x: Math.cos(this.a),
                  y: Math.sin(this.a),
                },
                main: !0,
              });
        }
      }),
      (ioTypes.fleeAtLowHealth = class extends IO {
        constructor(e) {
          super(e),
            (this.fear = 0.75 * util.clamp(ran.gauss(0.7, 0.15), 0.1, 0.9));
        }
        think(e) {
          if (
            e.fire &&
            null != e.target &&
            this.body.health.amount < this.body.health.max * this.fear
          )
            return {
              goal: {
                x: this.body.x - e.target.x,
                y: this.body.y - e.target.y,
              },
            };
        }
      }),
      (ioTypes.fleeAtLowHealth2 = class extends IO {
        constructor(e) {
          super(e),
            (this.fear = 0.45 * util.clamp(ran.gauss(0.7, 0.15), 0.1, 0.9));
        }
        think(e) {
          if (
            e.fire &&
            null != e.target &&
            this.body.health.amount < this.body.health.max * this.fear
          )
            return {
              goal: {
                x: this.body.x - e.target.x,
                y: this.body.y - e.target.y,
              },
              target: {
                x: this.body.velocity.x,
                y: this.body.velocity.y,
              },
            };
        }
      }),
      (ioTypes.orion = class extends IO {
        constructor(e) {
          super(e), (this.turnwise = 1), (this.r = 0), (this.turnover = !1);
        }
        think(e) {
          let t = 45 * Math.sqrt(this.body.master.size / this.body.master.SIZE);
          (this.body.x += this.body.source.velocity.x),
            (this.body.y += this.body.source.velocity.y);
          let s =
            this.turnwise * util.getDirection(this.body, this.body.source) +
            0.01;
          return {
            goal: {
              x: this.body.source.x - t * Math.cos(s),
              y: this.body.source.y - t * Math.sin(s),
            },
            power: 1,
          };
        }
      }),
      (ioTypes.sizething = class extends IO {
        constructor(e) {
          super(e), (this.div = 20), (this.origS = 230), (this.time = this.div);
        }
        think(e) {
          (this.body.SIZE = this.time * this.origS * (1 / this.div)),
            this.body.SIZE <= 0 && this.body.kill(),
            this.time--;
        }
      }),
      (ioTypes.rlyfastspin2 = class extends IO {
        constructor(e) {
          super(e),
            (this.a = 360 * Math.random()),
            (this.b =
              31 *
              Math.sin(Math.PI * Math.round(-1 + Math.random()) + Math.PI / 2));
        }
        think(e) {
          this.a += (this.b * Math.PI) / 180;
          let t = 0;
          return (
            null != this.body.bond && (t = 0),
            {
              target: {
                x: Math.cos(this.a + t),
                y: Math.sin(this.a + t),
              },
              main: !0,
            }
          );
        }
      }),
      (ioTypes.mRot = class extends IO {
        constructor(e) {
          super(e);
        }
        think(e) {
          return {
            target: {
              x: this.body.master.control.target.x,
              y: this.body.master.control.target.y,
            },
            main: !0,
          };
        }
      }),
      (ioTypes.sineA = class extends IO {
        constructor(e) {
          super(e), (this.phase = 5), (this.wo = this.body.master.facing);
        }
        think(e) {
          return (
            (this.phase += 0.5),
            (this.body.x +=
              this.phase * Math.cos(this.wo) -
              10 * Math.cos(this.phase) * Math.sin(this.wo)),
            (this.body.y +=
              this.phase * Math.sin(this.wo) +
              10 * Math.cos(this.phase) * Math.cos(this.wo)),
            {
              power: 1,
            }
          );
        }
      }),
      (ioTypes.sineB = class extends IO {
        constructor(e) {
          super(e), (this.phase = 5), (this.wo = this.body.master.facing);
        }
        think(e) {
          (this.phase += 0.5),
            (this.body.x +=
              this.phase * Math.cos(this.wo) +
              10 * Math.cos(this.phase) * Math.sin(this.wo)),
            (this.body.y +=
              this.phase * Math.sin(this.wo) -
              10 * Math.cos(this.phase) * Math.cos(this.wo));
        }
      }),
      (ioTypes.sineC = class extends IO {
        constructor(e) {
          super(e), (this.phase = -5), (this.wo = this.body.master.facing);
        }
        think(e) {
          return (
            (this.phase -= 0.5),
            (this.body.x +=
              this.phase * Math.cos(this.wo) +
              10 * Math.cos(this.phase) * Math.sin(this.wo)),
            (this.body.y +=
              this.phase * Math.sin(this.wo) -
              10 * Math.cos(this.phase) * Math.cos(this.wo)),
            {
              power: 1,
            }
          );
        }
      }),
      (ioTypes.sineD = class extends IO {
        constructor(e) {
          super(e), (this.phase = -5), (this.wo = this.body.master.facing);
        }
        think(e) {
          (this.phase -= 0.5),
            (this.body.x +=
              this.phase * Math.cos(this.wo) -
              10 * Math.cos(this.phase) * Math.sin(this.wo)),
            (this.body.y +=
              this.phase * Math.sin(this.wo) +
              10 * Math.cos(this.phase) * Math.cos(this.wo));
        }
      }),
      (ioTypes.portal = class extends IO {
        constructor(e) {
          super(e),
            (this.myGoal = {
              x: e.master.control.target.x + e.master.x,
              y: e.master.control.target.y + e.master.y,
            });
        }
        think() {
          return (
            (this.body.x = this.myGoal.x),
            (this.body.y = this.myGoal.y),
            {
              goal: {
                x: this.myGoal.x,
                y: this.myGoal.y,
              },
            }
          );
        }
      });
    const skcnv = {
        rld: 0,
        pen: 1,
        str: 2,
        dam: 3,
        spd: 4,
        shi: 5,
        atk: 6,
        hlt: 7,
        rgn: 8,
        mob: 9,
      },
      levelers = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 34, 36, 38, 40, 42, 44, 46,
        48, 50, 55, 60,
      ],
      curve = (() => {
        let e = [];
        for (let s = 0; s < 2 * c.MAX_SKILL; s++)
          e.push(((t = s / c.MAX_SKILL), Math.log(4 * t + 1) / Math.log(5)));
        var t;
        return (t) => e[t * c.MAX_SKILL];
      })(),
      apply = (e, t) => (t < 0 ? 1 / (1 - t * e) : e * t + 1);
    class Skill {
      constructor(e = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) {
        (this.raw = e),
          (this.caps = []),
          this.setCaps([
            c.MAX_SKILL,
            c.MAX_SKILL,
            c.MAX_SKILL,
            c.MAX_SKILL,
            c.MAX_SKILL,
            c.MAX_SKILL,
            c.MAX_SKILL,
            c.MAX_SKILL,
            c.MAX_SKILL,
            c.MAX_SKILL,
          ]),
          (this.name = [
            "Reload",
            "Bullet Penetration",
            "Bullet Health",
            "Bullet Damage",
            "Bullet Speed",
            "Shield Capacity",
            "Body Damage",
            "Max Health",
            "Shield Regeneration",
            "Movement Speed",
          ]),
          (this.atk = 0),
          (this.hlt = 0),
          (this.spd = 0),
          (this.str = 0),
          (this.pen = 0),
          (this.dam = 0),
          (this.rld = 0),
          (this.mob = 0),
          (this.rgn = 0),
          (this.shi = 0),
          (this.rst = 0),
          (this.brst = 0),
          (this.ghost = 0),
          (this.acl = 0),
          this.reset();
      }
      reset() {
        (this.points = 0),
          (this.score = 0),
          (this.deduction = 0),
          (this.level = 0),
          (this.canUpgrade = !1),
          this.update(),
          this.maintain();
      }
      update() {
        for (let e = 0; e < 10; e++)
          this.raw[e] > this.caps[e] &&
            ((this.points += this.raw[e] - this.caps[e]),
            (this.raw[e] = this.caps[e]));
        let e = [];
        for (let t = 0; t < 5; t++)
          for (let s = 0; s < 2; s++)
            e[t + 5 * s] = curve(
              (this.raw[t + 5 * s] + this.bleed(t, s)) / c.MAX_SKILL
            );
        (this.rld = Math.pow(0.5, e[skcnv.rld])),
          (this.pen = apply(2.7, e[skcnv.pen])),
          (this.str = apply(2.2, e[skcnv.str])),
          (this.dam = apply(3.19, e[skcnv.dam])),
          (this.spd = 0.5 + apply(1.485, e[skcnv.spd])),
          (this.acl = apply(0.5, e[skcnv.rld])),
          (this.rst = 0.5 * e[skcnv.str] + 2.5 * e[skcnv.pen]),
          (this.ghost = e[skcnv.pen]),
          (this.shi = apply(0.3, e[skcnv.shi])),
          (this.atk = apply(0.021, e[skcnv.atk])),
          (this.hlt = apply(0.105, e[skcnv.hlt])),
          (this.mob = apply(0.79, e[skcnv.mob])),
          (this.rgn = apply(10, e[skcnv.rgn])),
          (this.brst =
            0.3 * (0.5 * e[skcnv.atk] + 0.5 * e[skcnv.hlt] + e[skcnv.rgn]));
      }
      set(e) {
        (this.raw[0] = e[0]),
          (this.raw[1] = e[1]),
          (this.raw[2] = e[2]),
          (this.raw[3] = e[3]),
          (this.raw[4] = e[4]),
          (this.raw[5] = e[5]),
          (this.raw[6] = e[6]),
          (this.raw[7] = e[7]),
          (this.raw[8] = e[8]),
          (this.raw[9] = e[9]),
          this.update();
      }
      setCaps(e) {
        (this.caps[0] = e[0]),
          (this.caps[1] = e[1]),
          (this.caps[2] = e[2]),
          (this.caps[3] = e[3]),
          (this.caps[4] = e[4]),
          (this.caps[5] = e[5]),
          (this.caps[6] = e[6]),
          (this.caps[7] = e[7]),
          (this.caps[8] = e[8]),
          (this.caps[9] = e[9]),
          this.update();
      }
      maintain() {
        return (
          this.level < c.SKILL_CAP &&
          this.score - this.deduction >= this.levelScore &&
          ((this.deduction += this.levelScore),
          (this.level += 1),
          (this.points += this.levelPoints),
          (15 !== this.level &&
            30 !== this.level &&
            45 !== this.level &&
            60 !== this.level) ||
            (this.canUpgrade = !0),
          this.update(),
          !0)
        );
      }
      get levelScore() {
        return Math.ceil(
          1.8 * Math.pow(this.level + 1, 1.8) - 2 * this.level + 1
        );
      }
      get progress() {
        return this.levelScore
          ? (this.score - this.deduction) / this.levelScore
          : 0;
      }
      get levelPoints() {
        return -1 !== levelers.indexOf(this.level) ? 1 : 0;
      }
      cap(e, t = !1) {
        return !t && this.level < c.SKILL_SOFT_CAP
          ? Math.round(this.caps[skcnv[e]] * c.SOFT_MAX_SKILL)
          : this.caps[skcnv[e]];
      }
      bleed(e, t) {
        let s = ((e + 2) % 5) + 5 * t,
          i = ((e + (1 === t ? 1 : 4)) % 5) + 5 * t,
          a = 0,
          o = Math.max(c.MAX_SKILL, this.caps[e + 5 * t]);
        return (
          (a +=
            (1 - Math.pow(this.raw[s] / o - 1, 2)) *
            this.raw[s] *
            c.SKILL_LEAK),
          (a -= Math.pow(this.raw[i] / o, 2) * this.raw[i] * c.SKILL_LEAK),
          a
        );
      }
      upgrade(e) {
        return (
          !!(this.points && this.amount(e) < this.cap(e)) &&
          (this.change(e, 1), (this.points -= 1), !0)
        );
      }
      title(e) {
        return this.name[skcnv[e]];
      }
      amount(e) {
        return this.raw[skcnv[e]];
      }
      change(e, t) {
        (this.raw[skcnv[e]] += t), this.update();
      }
    }
    const realSizes = (() => {
      let e = [1, 1, 1];
      for (let t = 3; t < 17; t++)
        e.push(
          Math.sqrt(((2 * Math.PI) / t) * (1 / Math.sin((2 * Math.PI) / t)))
        );
      return e;
    })();
    class Gun {
      constructor(e, t) {
        (this.lastShot = {
          time: 0,
          power: 0,
        }),
          (this.body = e),
          (this.master = e.source),
          (this.label = ""),
          (this.controllers = []),
          (this.children = []),
          (this.control = {
            target: new Vector(0, 0),
            goal: new Vector(0, 0),
            main: !1,
            alt: !1,
            fire: !1,
          }),
          (this.canShoot = !1),
          (this.skin = 0),
          (this.color_unmix = 0),
          (this.color = 16),
          (this.colorOverride = null),
          (this.shootOnDeath = !1);
        let s = t.PROPERTIES;
        if (
          ((this.launchSquadron = t.LAUNCH_SQUADRON),
          (this.coolDown = {
            time: 0,
            max: +t.COOLDOWN,
          }),
          null != s && null != s.TYPE)
        ) {
          (this.canShoot = !0),
            (this.label = s.LABEL || ""),
            Array.isArray(s.TYPE)
              ? ((this.bulletTypes = s.TYPE), (this.natural = s.TYPE.BODY))
              : (this.bulletTypes = [s.TYPE]);
          let e = {};
          const i = (t) => {
            if (null != t.PARENT)
              for (let e = 0; e < t.PARENT.length; e++) i(t.PARENT[e]);
            if (null != t.BODY) for (let s in t.BODY) e[s] = t.BODY[s];
          };
          for (let e of this.bulletTypes) i(e);
          (this.natural = e),
            (this.setSubmerged =
              null == s.SET_SUBMERGED ? null : s.SET_SUBMERGED),
            (this.autofire = null != s.AUTOFIRE && s.AUTOFIRE),
            (this.altFire = null != s.ALT_FIRE && s.ALT_FIRE),
            (this.duoFire = null != s.DUO_FIRE && s.DUO_FIRE),
            (this.settings = s.SHOOT_SETTINGS || []),
            (this.settings2 =
              null == t.PROPERTIES.SHOOT_SETTINGS2
                ? []
                : t.PROPERTIES.SHOOT_SETTINGS2),
            (this.settings3 =
              null == t.PROPERTIES.SHOOT_SETTINGS3
                ? []
                : t.PROPERTIES.SHOOT_SETTINGS3),
            (this.onShoot = s.ON_SHOOT),
            (this.onFire = s.ON_FIRE),
            (this.timesToFire = s.TIMES_TO_FIRE || 1),
            (this.inject = s.INJECT),
            (this.calculator = s.STAT_CALCULATOR || "default"),
            (this.waitToCycle = null != s.WAIT_TO_CYCLE && s.WAIT_TO_CYCLE),
            (this.countsOwnKids = null != s.MAX_CHILDREN && s.MAX_CHILDREN),
            (this.syncsSkills = null != s.SYNCS_SKILLS && s.SYNCS_SKILLS),
            (this.useHealthStats =
              null != s.USE_HEALTH_STATS && s.USE_HEALTH_STATS),
            (this.negRecoil = null != s.NEGATIVE_RECOIL && s.NEGATIVE_RECOIL),
            (this.ammoPerShot =
              null == t.PROPERTIES.AMMO_PER_SHOT
                ? 0
                : t.PROPERTIES.AMMO_PER_SHOT),
            (this.destroyOldestChild =
              null != s.DESTROY_OLDEST_CHILD && s.DESTROY_OLDEST_CHILD),
            (this.shootOnDeath = null != s.SHOOT_ON_DEATH && s.SHOOT_ON_DEATH),
            (this.onDealtDamage =
              null == s.ON_DEALT_DAMAGE ? null : s.ON_DEALT_DAMAGE),
            this.shootOnDeath &&
              (this.body.onDead = () => {
                let e = this;
                for (let t = 0; t < e.body.guns.length; t++) {
                  let s = e.body.guns[t];
                  if (s.shootOnDeath) {
                    let t =
                        s.offset *
                          Math.cos(s.direction + s.angle + s.body.facing) +
                        (1.35 * s.length - (s.width * s.settings.size) / 2) *
                          Math.cos(s.angle + e.body.facing),
                      i =
                        s.offset *
                          Math.sin(s.direction + s.angle + s.body.facing) +
                        (1.35 * s.length - (s.width * s.settings.size) / 2) *
                          Math.sin(s.angle + e.body.facing);
                    s.fire(t, i, e.body.skill);
                  }
                }
              }),
            null != s.COLOR_OVERRIDE && (this.colorOverride = s.COLOR_OVERRIDE),
            null != s.CAN_SHOOT && (this.canShoot = s.CAN_SHOOT);
        }
        null != s && null != s.COLOR && (this.color = s.COLOR),
          null != s &&
            null != s.COLOR_UNMIX &&
            (this.color_unmix = s.COLOR_UNMIX),
          null != s && null != s.SKIN && (this.skin = s.SKIN);
        let i = t.POSITION;
        (this.length = i[0] / 10),
          (this.width = i[1] / 10),
          (this.aspect = i[2]);
        let a = new Vector(i[3], i[4]);
        (this.angle = (i[5] * Math.PI) / 180),
          (this.direction = a.direction),
          (this.offset = a.length / 10),
          (this.delay = i[6]),
          (this.position = 0),
          (this.motion = 0),
          this.canShoot &&
            ((this.cycle = !this.waitToCycle - this.delay),
            (this.trueRecoil = this.settings.recoil));
      }
      recoil() {
        if (
          ((this.motion || this.position) &&
            ((this.motion -= (0.25 * this.position) / room.speed),
            (this.position += this.motion),
            this.position < 0 &&
              ((this.position = 0), (this.motion = -this.motion)),
            this.motion > 0 && (this.motion *= 0.75)),
          this.canShoot && !this.body.settings.hasNoRecoil && this.motion > 0)
        ) {
          let e = (-this.position * this.trueRecoil * 0.045) / room.speed;
          (this.body.accel.x += e * Math.cos(this.recoilDir || 0)),
            (this.body.accel.y += e * Math.sin(this.recoilDir || 0));
        }
      }
      getSkillRaw() {
        return [
          this.body.skill.raw[0],
          this.body.skill.raw[1],
          this.body.skill.raw[2],
          this.body.skill.raw[3],
          this.body.skill.raw[4],
          0,
          0,
          0,
          0,
          0,
        ];
      }
      getLastShot() {
        return this.lastShot;
      }
      liveButBetter() {
        if ((this.recoil(), this.canShoot)) {
          let e = this.body.skill,
            t = this.countsOwnKids
              ? this.countsOwnKids >
                this.children.length * (7 === this.calculator ? e.rld : 1)
              : !this.body.maxChildren ||
                this.body.maxChildren >
                  this.body.children.length *
                    (7 === this.calculator ? e.rld : 1);
          if (
            (this.destroyOldestChild && (t || (t = !0), this.destroyOldest()),
            this.body.master.invuln && (t = !1),
            (t || !this.waitToCycle) &&
              this.cycle < 1 &&
              (this.cycle +=
                1 /
                this.settings.reload /
                room.speed /
                (7 === this.calculator || 4 === this.calculator ? 1 : e.rld)),
            t &&
              (this.autofire ||
                (this.duoFire
                  ? this.body.control.alt || this.body.control.fire
                  : this.altFire
                  ? this.body.control.alt
                  : this.body.control.fire)))
          ) {
            if (this.cycle >= 1) {
              this.ammoPerShot &&
                (this.body.master.ammo - this.ammoPerShot >= 0
                  ? ((this.body.master.ammo -= this.ammoPerShot),
                    (this.body.master.displayText =
                      this.body.master.ammo + " Ammo left"))
                  : (t = !1));
              let s =
                  this.offset *
                    Math.cos(this.direction + this.angle + this.body.facing) +
                  (1.35 * this.length - (this.width * this.settings.size) / 2) *
                    Math.cos(this.angle + this.body.facing),
                i =
                  this.offset *
                    Math.sin(this.direction + this.angle + this.body.facing) +
                  (1.35 * this.length - (this.width * this.settings.size) / 2) *
                    Math.sin(this.angle + this.body.facing);
              if (t && this.cycle >= 1) {
                if (!this.body.master.emp.active)
                  if (this.onFire) this.onFire(this, [s, i, e]);
                  else
                    for (let t = 0; t < this.timesToFire; t++)
                      this.fire(s, i, e);
                (t = this.countsOwnKids
                  ? this.countsOwnKids > this.children.length
                  : !this.body.maxChildren ||
                    this.body.maxChildren > this.body.children.length),
                  (this.cycle -= 1),
                  null != this.onShoot &&
                    this.body.master.isAlive() &&
                    ("plane" === this.onShoot
                      ? setTimeout(() => this.body.kill(), 2500)
                      : this.body.master.runAnimations(this));
              }
            }
          } else
            this.cycle > !this.waitToCycle - this.delay &&
              (this.cycle = !this.waitToCycle - this.delay);
        }
      }
      destroyOldest() {
        let e = this.children.length - this.countsOwnKids;
        for (let t = 0; t < e; t++) {
          let e = this.children[t];
          e && e.kill();
        }
      }
      syncChildren() {
        if (this.syncsSkills) {
          let e = this;
          for (let t of this.children)
            t.define({
              BODY: e.interpret(),
              SKILL: e.getSkillRaw(),
            }),
              t.refreshBodyAttributes();
        }
      }
      fire(e, t, s, i) {
        if (this.launchSquadron && "yes" !== this.launchSquadron && !i) return;
        (this.lastShot.time = util.time()),
          (this.lastShot.power =
            3 * Math.log(Math.sqrt(s.spd) + this.trueRecoil + 1) + 1),
          (this.motion += this.lastShot.power),
          (this.recoilDir = this.body.facing + this.angle);
        let l =
            this.offset *
              Math.cos(this.direction + this.angle + this.body.facing) +
            (1.35 * this.length - (this.width * this.settings.size) / 2) *
              Math.cos(this.angle + this.body.facing),
          h =
            this.offset *
              Math.sin(this.direction + this.angle + this.body.facing) +
            (1.35 * this.length - (this.width * this.settings.size) / 2) *
              Math.sin(this.angle + this.body.facing);
        let a = util.clamp(
            ran.gauss(0, Math.sqrt(this.settings.shudder, 1)),
            -1.5 * this.settings.shudder,
            1.5 * this.settings.shudder
          ),
          o = util.clamp(
            ran.gauss(0, this.settings.spray * this.settings.shudder, 1),
            -0.5 * this.settings.spray,
            0.5 * this.settings.spray
          );
        o *= Math.PI / 180;
        let r =
            (this.negRecoil ? -1 : 1) *
            this.settings.speed *
            c.runSpeed *
            s.spd *
            (1 + a),
          n = new Vector(
            r * Math.cos(this.angle + this.body.facing + o),
            r * Math.sin(this.angle + this.body.facing + o)
          );
        if (this.body.velocity.length) {
          let e =
            Math.max(
              0,
              n.x * this.body.velocity.x + n.y * this.body.velocity.y
            ) /
            this.body.velocity.length /
            n.length;
          if (e) {
            let t = n.length;
            (n.x += (this.body.velocity.length * e * n.x) / t),
              (n.y += (this.body.velocity.length * e * n.y) / t);
          }
        }
        let u = new Entity(
          {
            x: this.body.x + this.body.size * l,
            y: this.body.y + this.body.size * h,
          },
          this.master.master
        );
        return (
          (u.roomId = this.body.roomId),
          (u.alwaysActive = this.body.alwaysActive),
          (u.velocity = n),
          (u.initialBulletSpeed = r),
          this.setSubmerged &&
            (u.submarine.submerged = this.body.submarine.submerged),
          u.submarine.submerged && (u.alpha = 0.15),
          this.bulletInit(u),
          (u.coreSize = u.SIZE),
          u
        );
      }
      bulletInit(e) {
        (e.diesToTeamBase = !this.body.master.godmode),
          (e.passive = this.body.master.passive),
          "rainbow" === this.colorOverride && e.toggleRainbow();
        for (let t of this.bulletTypes) e.define(t);
        e.define({
          BODY: this.interpret(),
          SKILL: this.getSkillRaw(),
          SIZE: (this.body.size * this.width * this.settings.size) / 2,
          LABEL:
            this.master.label +
            (this.label ? " " + this.label : "") +
            " " +
            e.label,
        }),
          null != this.onDealtDamage && (e.onDealtDamage = this.onDealtDamage),
          null == this.colorOverride || isNaN(this.colorOverride)
            ? "random" === this.colorOverride
              ? (e.color = Math.floor(42 * Math.random()))
              : (e.color = this.body.master.color)
            : (e.color = this.colorOverride),
          this.countsOwnKids
            ? ((e.parent = this), this.children.push(e))
            : this.body.maxChildren &&
              ((e.parent = this.body),
              this.body.children.push(e),
              this.children.push(e)),
          (e.source = this.body),
          (e.facing = e.velocity.direction);
        let t = e;
        7 === this.calculator &&
          (e.necro = (e) => {
            if (
              (this.countsOwnKids
                ? this.countsOwnKids >
                  this.children.length * this.body.skill.rld
                : !this.body.maxChildren ||
                  this.body.maxChildren >
                    this.body.children.length * this.body.skill.rld) &&
              "None" === e.sanctuaryType &&
              !e.label.includes("Sanctuary")
            ) {
              let s = {
                facing: e.facing,
                size:
                  5 === t.shape
                    ? t.SIZE + 0.4 * Math.random()
                    : e.SIZE > 14
                    ? 14
                    : e.SIZE,
              };
              return (
                e.define(Class.genericEntity),
                this.bulletInit(e),
                (e.team = t.master.master.team),
                (e.master = t.master),
                (e.color = t.color),
                (e.facing = s.facing),
                (e.SIZE = s.size),
                (e.health.amount = e.health.max),
                !0
              );
            }
            return !1;
          }),
          e.refreshBodyAttributes(),
          e.life();
      }
      getTracking() {
        return {
          speed:
            c.runSpeed *
            this.body.skill.spd *
            this.settings.maxSpeed *
            this.natural.SPEED,
          range:
            Math.sqrt(this.body.skill.spd) *
            this.settings.range *
            this.natural.RANGE,
        };
      }
      interpret(e = !1) {
        let t = this.master.size / this.master.SIZE,
          s = e || this.settings,
          i = this.body.skill,
          a = {
            SPEED: s.maxSpeed * i.spd,
            HEALTH: s.health * i.str,
            RESIST: s.resist + i.rst,
            DAMAGE:
              s.damage *
              i.dam *
              (this.body.growthData && this.body.growthData.damageMult
                ? this.body.growthData.damageMult
                : 1),
            PENETRATION: Math.max(1, s.pen * i.pen),
            RANGE:
              (s.range / Math.sqrt(i.spd)) *
              (this.body.growthData && this.body.growthData.rangeMult
                ? this.body.growthData.rangeMult
                : 1),
            DENSITY: (s.density * i.pen * i.pen) / t,
            PUSHABILITY: 1 / i.pen,
            HETERO: 3 - 2.8 * i.ghost,
          };
        switch (this.calculator) {
          case 6:
          case "sustained":
            a.RANGE = s.range;
            break;
          case 8:
          case "trap":
            (a.PUSHABILITY = 1 / Math.pow(i.pen, 0.5)),
              (a.RANGE = 0.5 * s.range);
        }
        for (let e in a)
          null != this.natural[e] &&
            a.hasOwnProperty(e) &&
            (a[e] *= this.natural[e]);
        return a;
      }
    }
    let minimap = [],
      views = [],
      bots = [],
      entitiesToAvoid = [],
      entities = [],
      targetableEntities = [],
      bot = null,
      players = [],
      clients = [],
      multitabIDs = [],
      bannedIPs = [
        [
          "::ffff:112.120.147.183",
          "2601:600:9d80:3796:5b0:8e4f:b86a:eca5",
          "::ffff:180.191.168.114",
          "::ffff:180.191.176.176",
          "::ffff:174.46.244.136",
          "::ffff:32.211.197.91",
          "::ffff:172.88.46.153",
          "::ffff:174.46.244.136",
          "::ffff:185.230.126.3",
          "::ffff:185.236.200.26",
          "::ffff:104.129.56.177",
          "::ffff:68.235.33.116",
          "::ffff:185.230.126.23",
        ],
        [
          "Repeated witch-hunting (community voted for this ban)",
          "Repeated witch-hunting (community voted for this ban, ban evasion)",
          "Repeated witch-hunting (community voted for this ban, ban evasion)",
          "Repeated witch-hunting (community voted for this ban)",
          "Repeated witch-hunting (community voted for this ban)",
          "Hunting clan member",
          "Hunting clan member",
          "Hunting clan member",
          "Hunting clan member",
          "Hunting clan member",
          "Hunting clan member",
          "Hunting clan member",
          "Hunting clan leader",
        ],
      ],
      connectedIPs = [],
      entitiesIdLog = 1,
      startingTank = "basic",
      blockedNames = [
        "fuck",
        "bitch",
        "cunt",
        "shit",
        "pussy",
        "penis",
        "nigg",
        "penis",
        "dick",
        "whore",
        "dumbass",
        "fag",
      ],
      sanctuaries = [];
    const growthMode = {
        isEnabled: () =>
          !!growthModeSelected ||
          !!(
            room &&
            ((room.config && room.config.GROWTH_MODE) ||
              c.GROWTH_MODE ||
              "Growth" === c.serverName)
          ),
        targetScoreForQuarterSize: 200000,
        targetSizeGrowthAtScore: 1 / 3,
        sizeGrowthExponent: 0.6,
        skillPointPerScore: 200000,
        fovPerGrowth: 0.2,
        maxFovMultiplier: 1.35,
        healthPerGrowth: 0.5,
        damagePerGrowth: 0.2,
        barrelPerGrowth: 1,
        barrelKnockbackDamage: 0.35,
        barrelKnockbackForce: 0.02,
      },
      applyGrowthToEntity = (e) => {
        if (!growthMode.isEnabled() || !e || !e.skill) return;
        if (e.isArenaCloser || e.isDominator || e.isMothership) return;

        const isTank = "tank" === e.type;
        const isGrowthEntity =
          isTank ||
          (("food" === e.type || "miniboss" === e.type || "crasher" === e.type) &&
            e.settings &&
            e.settings.acceptsScore);
        if (!isGrowthEntity) return;

        // Players/bots grow off absolute score; non-tanks grow off score gained since spawn.
        const isNonTank = !isTank;
        const nonTankSizeFactor = 0.75; // keep polygons/bosses from scaling too aggressively
        const nonTankHealthFactor = 0.25; // "little" health buff

        e.growthData ||
          (e.growthData = {
            baseSIZE: e.SIZE,
            baseFOV: e.FOV,
            baseHEALTH: e.HEALTH,
            baseScore: Math.max(0, e.skill.score || 0),
            lastSkillStep: 0,
            sizeGain: 0,
            healthMult: 1,
            damageMult: 1,
            barrelScale: 1,
            rangeMult: 1,
            isGrowthApplied: !0,
          });
        e.growthData.isGrowthApplied = !0;

        let t = Math.max(0, e.skill.score || 0);
        let scoreForGrowth = isNonTank ? Math.max(0, t - (e.growthData.baseScore || 0)) : t;
        let s =
            (isNonTank ? nonTankSizeFactor : 1) *
            growthMode.targetSizeGrowthAtScore *
            Math.pow(
              scoreForGrowth / growthMode.targetScoreForQuarterSize,
              growthMode.sizeGrowthExponent
            ),
          i = e.growthData.baseSIZE * s;
        (e.growthData.sizeGain = i),
          (e.growthData.healthMult =
            1 +
            s *
              growthMode.healthPerGrowth *
              (isNonTank ? nonTankHealthFactor : 1)),
          (e.growthData.barrelScale = 1 + s * growthMode.barrelPerGrowth),
          // Mild, noticeable mobility penalty for large Growth tanks.
          (e.growthData.speedMult = isTank
            ? Math.max(0.6, Math.min(1, 1 / (1 + 0.5 * s)))
            : 1),
          (e.growthData.rangeMult = 1 + 0.35 * s),
          (e.growthData.damageMult = e.isPlayer
            ? 1 + s * growthMode.damagePerGrowth
            : 1),
          (e.SIZE = e.growthData.baseSIZE + i),
          isTank &&
            (e.FOV =
              e.growthData.baseFOV *
              Math.min(
                growthMode.maxFovMultiplier,
                1 + s * growthMode.fovPerGrowth
              )),
          (e.HEALTH = e.growthData.baseHEALTH);
        if (e.isPlayer) {
          null == e.skill.growthStep && (e.skill.growthStep = 0);
          let s = Math.floor(t / growthMode.skillPointPerScore);
          s > e.skill.growthStep &&
            ((e.skill.points += s - e.skill.growthStep),
            (e.skill.growthStep = s)),
            (e.growthData.lastSkillStep = e.skill.growthStep);
        }
      },
      getBarrelTipPosition = (e) => {
        if (!e || !e.guns || !e.guns.length) return null;
        let t = e.guns.find((e) => e && e.canShoot) || e.guns[0];
        if (!t) return null;
        let i =
            t.offset * Math.cos(t.direction + t.angle + e.facing) +
            (1.35 * t.length - (t.width * t.settings.size) / 2) *
              Math.cos(t.angle + e.facing),
          a =
            t.offset * Math.sin(t.direction + t.angle + e.facing) +
            (1.35 * t.length - (t.width * t.settings.size) / 2) *
              Math.sin(t.angle + e.facing);
        return {
          x: e.x + e.size * i,
          y: e.y + e.size * a,
        };
      },
      applyBarrelKnockbackDamage = (e, t) => {
        if (
          !e ||
          !t ||
          "tank" !== e.type ||
          ("tank" !== t.type && "miniboss" !== t.type)
        )
          return;
        let s = (e.label || "").toLowerCase(),
          i = s.includes("builder") || s.includes("destroyer"),
          a =
            s.includes("trapper") &&
            (s.includes("giga") || s.includes("tera") || s.includes("mega"));
        if (!i && !a) return;
        let o = getBarrelTipPosition(e);
        if (!o) return;
        let r = t.x - o.x,
          n = t.y - o.y,
          l = Math.sqrt(r * r + n * n) || 0.001,
          h = t.size + 0.35 * e.size;
        if (l > h) return;
        let u = Math.max(0, 1 - l / h),
          d = growthMode.barrelKnockbackDamage + 0.005 * e.size,
          c =
            (i ? 1 : 1.35) *
            (e.damage * (1.2 + 3.2 * u) +
              Math.pow(e.size, 1.08) * (0.06 + 0.12 * u)),
          m = Math.max(d, c),
          p = Math.max(
            0.25,
            growthMode.barrelKnockbackForce * e.size * (1 + 0.9 * u)
          );
        u > 0.88 && (m = Math.max(m, 0.92 * t.health.max));
        (t.damageReceived += m),
          (t.accel.x += (p * r) / l),
          (t.accel.y += (p * n) / l);
      },
      grid = new HSHG(),
      dirtyCheck = (e, t) =>
        entitiesToAvoid.some(
          (s) =>
            Math.abs(e.x - s.x) < t + s.size && Math.abs(e.y - s.y) < t + s.size
        ),
      purgeEntities = () => {
        entities = entities.filter((e) => !e.isGhost);
      },
      bringToLife = (() => {
        const e = (e, t, s) => {
          if (null != e.target && (e.main || e.alt))
            return {
              x: e.target.x + t.x - s.x,
              y: e.target.y + t.y - s.y,
            };
        };
        return (t) => {
          applyGrowthToEntity(t),
            t.SIZE !== t.coreSize && ((t.coreSize = t.SIZE), t.refreshFOV());
          let s =
              t.settings.independent || null == t.source || t.source === t
                ? {}
                : t.source.control,
            i = {
              target: e(s, t.source, t),
              goal: void 0,
              fire: s.fire,
              main: s.main,
              alt: s.alt,
              power: void 0,
            };
          t.settings.attentionCraver && !s.main && t.range && (t.range -= 1),
            newLogs.controllers.start();
          for (let e = 0, s = t.controllers.length; e < s; e++) {
            let s = t.controllers[e].think(i);
            s &&
              (t.controllers[e].acceptsFromTop
                ? (s.target && (i.target = s.target),
                  s.goal && (i.goal = s.goal),
                  s.fire && (i.fire = s.fire),
                  s.main && (i.main = s.main),
                  s.alt && (i.alt = s.alt),
                  s.power && (i.power = s.power))
                : (s.target && !i.target && (i.target = s.target),
                  s.goal && !i.goal && (i.goal = s.goal),
                  s.fire && !i.fire && (i.fire = s.fire),
                  s.main && !i.main && (i.main = s.main),
                  s.alt && !i.alt && (i.alt = s.alt),
                  s.power && !i.power && (i.power = s.power)));
          }
          (t.control.target = null == i.target ? t.control.target : i.target),
            (t.control.goal = i.goal),
            (t.control.fire = i.fire),
            (t.control.main = i.main),
            (t.control.alt = i.alt),
            (t.control.power = null == i.power ? 1 : i.power),
            t.move(),
            t.face(),
            newLogs.controllers.stop(),
            newLogs.aspects.start();
          for (let e = 0, s = t.guns.length; e < s; e++)
            t.guns[e] instanceof Gun && t.guns[e].liveButBetter();
          for (let e = 0, s = t.turrets.length; e < s; e++) t.turrets[e].life();
          let a = t.skill.maintain();
          newLogs.aspects.stop(),
            ((growthMode.isEnabled() &&
              t.growthData &&
              t.growthData.isGrowthApplied) ||
              a) &&
              t.refreshBodyAttributes(),
            t.invisible[1] &&
              ((t.alpha = Math.max(
                t.invisible[2] || 0,
                t.alpha - t.invisible[1]
              )),
              (t.velocity.isShorterThan(0.15) && !t.damageReceived) ||
                (t.alpha = Math.min(1, t.alpha + t.invisible[0])));
        };
      })();
    class HealthType {
      constructor(e, t, s = 0) {
        (this.max = e || 0.01),
          (this.amount = e || 0.01),
          (this.type = t),
          (this.resist = s),
          (this.regen = 0),
          (this.lastDamage = 0),
          (this.rMax = e || 0.01),
          (this.rAmount = e || 0.01);
      }
      get max() {
        return this.rMax;
      }
      get amount() {
        return this.rAmount;
      }
      set max(e) {
        Number.isFinite(e) && (this.rMax = e);
      }
      set amount(e) {
        Number.isFinite(e) && (this.rAmount = e);
      }
      set(e, t = 0) {
        e <= 0 && (e = 0.01),
          (this.amount = this.max ? (this.amount / this.max) * e : e),
          (this.max = e),
          (this.regen = t);
      }
      display() {
        return this.amount / this.max;
      }
      getDamage(e, t = !0) {
        switch (this.type) {
          case "dynamic":
            return t
              ? Math.min(e * this.permeability, this.amount)
              : e * this.permeability;
          case "static":
            return t ? Math.min(e, this.amount) : e;
        }
      }
      regenerate(e = !1) {
        e /= 2;
        let t = c.REGEN_MULTIPLIER;
        switch (this.type) {
          case "static":
            if (this.amount >= this.max || !this.amount) break;
            this.amount += t * (this.max / 10 / 60 / 2.5 + e);
            break;
          case "dynamic":
            let s = util.clamp(this.amount / this.max, 0, 1);
            s || (this.amount = 1e-4),
              1 === s
                ? (this.amount = this.max)
                : (this.amount +=
                    t *
                    ((this.regen *
                      Math.exp(-50 * Math.pow(Math.sqrt(0.5 * s) - 0.4, 2))) /
                      3 +
                      (s * this.max) / 10 / 15 +
                      e));
        }
        this.amount = util.clamp(this.amount, 0, this.max);
      }
      get permeability() {
        switch (this.type) {
          case "static":
            return 1;
          case "dynamic":
            return this.max ? util.clamp(this.amount / this.max, 0, 1) : 0;
        }
      }
      get ratio() {
        return this.max
          ? util.clamp(1 - Math.pow(this.amount / this.max - 1, 4), 0, 1)
          : 0;
      }
    }
    class Entity {
      constructor(e, t = this) {
        (this.isGhost = !1),
          (this.killCount = {
            solo: 0,
            assists: 0,
            bosses: 0,
            killers: [],
          }),
          (this.creationTime = new Date().getTime()),
          (this.master = t),
          (this.source = this),
          (this.parent = this),
          (this.roomId = t.roomId),
          (this.control = {
            target: new Vector(0, 0),
            goal: new Vector(0, 0),
            main: !1,
            alt: !1,
            fire: !1,
            power: 0,
          }),
          (this.isInGrid = !1),
          (this.activation = (() => {
            let e = !0,
              t = ran.irandom(15);
            return {
              update: () => {
                if (this.isDead()) return 0;
                e
                  ? (this.addToGrid(),
                    (t = 15),
                    (e =
                      this.alwaysActive ||
                      (this.source && this.source.player) ||
                      this.isPlayer ||
                      views.some((e) => e.check(this, 0.6))))
                  : (this.removeFromGrid(),
                    this.settings.diesAtRange && this.kill(),
                    t-- || (e = !0));
              },
              check: () => this.alwaysActive || e,
            };
          })()),
          (this.invulnTime = [-1, -1]),
          (this.autoOverride = !1),
          (this.controllers = []),
          (this.blend = {
            color: "#FFFFFF",
            amount: 0,
          }),
          (this.skill = new Skill()),
          (this.health = new HealthType(1, "static", 0)),
          (this.shield = new HealthType(0, "dynamic")),
          (this.lastSavedHealth = {
            health: this.health.amount,
            shield: this.shield.amount,
          }),
          (this.guns = []),
          (this.turrets = []),
          (this.upgrades = []),
          (this.settings = {
            leaderboardable: !0,
          }),
          (this.aiSettings = {}),
          (this.children = []),
          (this.SIZE = 1),
          this.define(Class.genericEntity),
          (this.maxSpeed = 0),
          (this.facing = 0),
          (this.vfacing = 0),
          (this.range = 0),
          (this.damageReceived = 0),
          (this.stepRemaining = 1),
          (this.x = e.x),
          (this.y = e.y),
          (this.cx = e.x),
          (this.cy = e.y),
          (this.velocity = new Vector(0, 0)),
          (this.accel = new Vector(0, 0)),
          (this.damp = 0.05),
          (this.collisionArray = []),
          (this.invuln = !1),
          (this.godmode = !1),
          (this.passive = !1),
          (this.alpha = 1),
          (this.spinSpeed = 0.038),
          (this.tierCounter = 0),
          (this.killedByK = !1),
          (this.id = entitiesIdLog++),
          (this.team = this === t ? this.id : t.team),
          (this.submarine = {
            submerged: !1,
            air: 0,
            maxAir: 0,
            lastTick: 0,
            hydro: {
              enabled: !1,
              time: 0,
              duration: 0,
              lastTick: 0,
            },
          }),
          (this.rainbow = !1),
          (this.intervalID = null),
          (this.rainbowLoop = this.rainbowLoop.bind(this)),
          (this.keyFEntity = "square"),
          (this.updateAABB = () => {}),
          (this.tank = "basic"),
          (this.nameColor = "#FFFFFF"),
          (this.rainbowSpeed = 30),
          (this.onDead = null),
          (this.canUseQ = !0),
          (this.multibox = {
            enabled: !1,
            intervalID: null,
            controlledTanks: [],
          }),
          (this.multiboxLoop = this.multiboxLoop.bind(this)),
          (this.getAABB = (() => {
            let e = {},
              t = 0;
            return (
              (this.updateAABB = (s) => {
                if ("shield" !== this.settings.hitsOwnType && null != this.bond)
                  return 0;
                if (
                  (this.master.master.master.master.master.strikeCarrier &&
                    ((s = !0), (this.alwaysActive = !0)),
                  !s)
                )
                  return (e.active = !1), 0;
                this.invuln &&
                  this.invulnTime[1] > -1 &&
                  Date.now() - this.invulnTime[0] > this.invulnTime[1] &&
                  ((this.invuln = !1),
                  this.sendMessage("Your invulnerability has expired.")),
                  this.squadronManager instanceof ioTypes.squadronManager &&
                    this.squadronManager.think(),
                  this.submarine &&
                    this.submarine.maxAir > 0 &&
                    ((this.alpha = util.lerp(
                      this.alpha,
                      util.clamp(+!this.submarine.submerged, 0.1, 0.9),
                      0.075
                    )),
                    this.submarine.submerged
                      ? this.submarine.air > 0
                        ? Date.now() - this.submarine.lastTick >= 1e3 &&
                          (this.submarine.air--,
                          0 === this.submarine.air &&
                            this.sendMessage(
                              "Warning! Ship out of air! Please surface!"
                            ),
                          (this.submarine.lastTick = Date.now()))
                        : ((this.health.amount -= 0.01 * this.health.max),
                          (this.shield.amount -= 0.05 * this.shield.max),
                          (this.health.lastDamage = this.shield.lastDamage =
                            Date.now()))
                      : Date.now() - this.submarine.lastTick >= 1e3 &&
                        (this.submarine.air++,
                        this.submarine.air >= this.submarine.maxAir &&
                          (this.submarine.air = this.submarine.maxAir),
                        (this.submarine.lastTick = Date.now())),
                    this.submarine.hydro.duration > 0 &&
                      (this.submarine.hydro.enabled
                        ? Date.now() - this.submarine.hydro.lastTick >= 1e3 &&
                          (this.submarine.hydro.time--,
                          this.submarine.hydro.time <= 0 &&
                            ((this.submarine.hydro.enabled = !1),
                            (this.submarine.hydro.time =
                              2 * -this.submarine.hydro.duration)),
                          (this.submarine.hydro.lastTick = Date.now()))
                        : Date.now() - this.submarine.hydro.lastTick >= 1e3 &&
                          ((this.submarine.hydro.time = Math.min(
                            this.submarine.hydro.time + 1,
                            this.submarine.hydro.duration
                          )),
                          (this.submarine.hydro.lastTick = Date.now()))));
                let i = this.width ? this.realSize * this.width : this.realSize,
                  a = this.height ? this.realSize * this.height : this.realSize,
                  o =
                    Math.min(this.x, this.x + this.velocity.x + this.accel.x) -
                    i -
                    5,
                  r =
                    Math.min(this.y, this.y + this.velocity.y + this.accel.y) -
                    a -
                    5,
                  n =
                    Math.max(this.x, this.x + this.velocity.x + this.accel.x) +
                    i +
                    5,
                  l =
                    Math.max(this.y, this.y + this.velocity.y + this.accel.y) +
                    a +
                    5,
                  h = ((e, t, s, i) =>
                    Math.max(Math.abs(s - e), Math.abs(i - t)))(o, r, n, r),
                  d = t / h;
                (e = {
                  min: [o, r],
                  max: [n, l],
                  active: !0,
                  size: h,
                }),
                  (d > Math.SQRT2 || d < Math.SQRT1_2) &&
                    (this.removeFromGrid(), this.addToGrid(), (t = e.size));
              }),
              () => e
            );
          })()),
          this.updateAABB(!0),
          (this.iceStatic = {
            enabled: !1,
            mult: 1,
            duration: 0,
          }),
          (this.ice = {
            time: 0,
            active: !1,
            mult: 1,
            remaining: -1,
          }),
          (this.poisonStatic = {
            enabled: !1,
            mult: 1,
            duration: 0,
          }),
          (this.poison = {
            active: !1,
            mult: 1,
            time: 0,
            remaining: -1,
          }),
          (this.vaccineStatic = {
            enabled: !1,
            mult: 1,
            duration: 0,
          }),
          (this.vaccine = {
            active: !1,
            mult: 1,
            time: 0,
            remaining: -1,
          }),
          (this.empStatic = {
            enabled: !1,
            duration: 0,
          }),
          (this.emp = {
            active: !1,
            time: 0,
            remaining: -1,
            master: null,
          }),
          (this.immuneToAbilities = !1),
          (this.sanctuaryType = "None"),
          (this.isMothership = !1),
          (this.isDominator = !1),
          (this.isBot = !1),
          (this.underControl = !1),
          (this.stealthMode = !1),
          (this.miscIdentifier = "None"),
          (this.switcherooID = -1),
          entities.push(this);
        for (let e of views) e.add(this);
        this.activation.update();
      }
      removeFromGrid() {
        this.isInGrid && (grid.removeObject(this), (this.isInGrid = !1));
      }
      addToGrid() {
        this.isInGrid ||
          ("shield" !== this.settings.hitsOwnType && null != this.bond) ||
          (grid.addObject(this), (this.isInGrid = !0));
      }
      life() {
        bringToLife(this);
      }
      addController(e) {
        Array.isArray(e)
          ? (this.controllers = e.concat(this.controllers))
          : this.controllers.unshift(e);
      }
      isInMyBase() {
        return (
          (room["bas" + -this.team] &&
            room.isIn("bas" + -this.team, {
              x: this.x,
              y: this.y,
            })) ||
          (room["n_b" + -this.team] &&
            room.isIn("n_b" + -this.team, {
              x: this.x,
              y: this.y,
            })) ||
          (room["bad" + -this.team] &&
            room.isIn("bad" + -this.team, {
              x: this.x,
              y: this.y,
            }))
        );
      }
      minimalReset() {
        (this.shape = 0),
          (this.shapeData = 0),
          (this.color = 16),
          (this.guns = []);
        for (let e of this.turrets) e.destroy();
        this.turrets = [];
      }
      minimalDefine(e) {
        if (null != e.PARENT)
          for (let t = 0; t < e.PARENT.length; t++)
            this.minimalDefine(e.PARENT[t]);
        if (
          (null != e.index && (this.index = e.index),
          null != e.NAME && (this.name = e.NAME),
          null != e.LABEL && (this.label = e.LABEL),
          null != e.COLOR && (this.color = e.COLOR),
          null != e.SHAPE &&
            ((this.shape = "number" == typeof e.SHAPE ? e.SHAPE : 0),
            (this.shapeData = e.SHAPE)),
          null != e.SIZE &&
            ((this.SIZE = e.SIZE * this.squiggle),
            null == this.coreSize && (this.coreSize = this.SIZE)),
          null != e.LAYER && (this.LAYER = e.LAYER),
          null != e.STAT_NAMES && (this.settings.skillNames = e.STAT_NAMES),
          null != e.INDEPENDENT && (this.settings.independent = e.INDEPENDENT),
          null != e.SUBMARINE
            ? ((this.submarine.maxAir = e.SUBMARINE),
              (this.submarine.air = e.SUBMARINE))
            : null != this.submarine &&
              this.submarine.maxAir > 0 &&
              (this.submarine.maxAir = 0),
          null != e.UPGRADES_TIER_1)
        )
          for (let t of e.UPGRADES_TIER_1)
            this.upgrades.push({
              class: tankList[t.index + room.manualOffset],
              level: 15,
              index: t.index,
              tier: 1,
            });
        if (null != e.UPGRADES_TIER_2)
          for (let t of e.UPGRADES_TIER_2)
            this.upgrades.push({
              class: tankList[t.index + room.manualOffset],
              level: 30,
              index: t.index,
              tier: 2,
            });
        if (null != e.UPGRADES_TIER_3)
          for (let t of e.UPGRADES_TIER_3)
            this.upgrades.push({
              class: tankList[t.index + room.manualOffset],
              level: 45,
              index: t.index,
              tier: 3,
            });
        if (null != e.UPGRADES_TIER_4)
          for (let t of e.UPGRADES_TIER_4)
            this.upgrades.push({
              class: tankList[t.index + room.manualOffset],
              level: 60,
              index: t.index,
              tier: 4,
            });
        if (null != e.GUNS) {
          let t = [];
          for (let s of e.GUNS) t.push(new Gun(this, s));
          this.guns = t;
        }
        if (null != e.TURRETS) {
          for (let e of this.turrets) e.destroy();
          this.turrets = [];
          for (let t of e.TURRETS) {
            let e = new Entity(this, this.master);
            if (Array.isArray(t.TYPE)) for (let s of t.TYPE) e.minimalDefine(s);
            else e.minimalDefine(t.TYPE);
            e.bindToMaster(t.POSITION, this),
              (e.alwaysActive = this.alwaysActive);
          }
        }
        null != e.mockup && (this.mockup = e.mockup);
      }
      define(e) {
        try {
          if (null != e.PARENT)
            for (let t = 0; t < e.PARENT.length; t++) this.define(e.PARENT[t]);
          if (
            (null != e.index && (this.index = e.index),
            null != e.NAME && (this.name = e.NAME),
            null != e.HITS_OWN_TEAM && (this.hitsOwnTeam = e.HITS_OWN_TEAM),
            null != e.LABEL && (this.label = e.LABEL),
            null != e.TOOLTIP && this.sendMessage(`${e.TOOLTIP}`),
            null != e.TYPE && (this.type = e.TYPE),
            null != e.SHAPE &&
              ((this.shape = "number" == typeof e.SHAPE ? e.SHAPE : 0),
              (this.shapeData = e.SHAPE)),
            null != e.CARRIER_TALK_DATA && this.socket
              ? this.socket.talk("cv", 0, 0, ...e.CARRIER_TALK_DATA.flat())
              : this.socket && this.socket.talk("cv", 0, 0),
            null != e.STRIKE_CARRIER && (this.strikeCarrier = e.STRIKE_CARRIER),
            null != e.SUBMARINE
              ? ((this.submarine.maxAir = e.SUBMARINE),
                (this.submarine.air = e.SUBMARINE))
              : null != this.submarine &&
                this.submarine.maxAir > 0 &&
                (this.submarine.maxAir = 0),
            null != e.HYDRO &&
              ((this.submarine.hydro.time = e.HYDRO),
              (this.submarine.hydro.duration = e.HYDRO)),
            null != e.COLOR && (this.color = e.COLOR),
            null != e.CONTROLLERS)
          ) {
            let t = [];
            for (let s of e.CONTROLLERS) t.push(new ioTypes[s](this));
            this.addController(t);
          }
          if (
            (e.IS_TESTBED_REMOVED &&
              this.socket &&
              (c.IS_DEV_SERVER ||
                3 === this.socket.betaData.permissions ||
                (this.sendMessage(
                  "You cannot used removed tanks outside of a testing server."
                ),
                this.kill())),
            null != e.MOTION_TYPE && (this.motionType = e.MOTION_TYPE),
            null != e.FACING_TYPE && (this.facingType = e.FACING_TYPE),
            null != e.DRAW_HEALTH && (this.settings.drawHealth = e.DRAW_HEALTH),
            null != e.DRAW_SELF && (this.settings.drawShape = e.DRAW_SELF),
            null != e.DAMAGE_EFFECTS &&
              (this.settings.damageEffects = e.DAMAGE_EFFECTS),
            null != e.RATIO_EFFECTS &&
              (this.settings.ratioEffects = e.RATIO_EFFECTS),
            null != e.MOTION_EFFECTS &&
              (this.settings.motionEffects = e.MOTION_EFFECTS),
            null != e.GIVE_KILL_MESSAGE &&
              (this.settings.givesKillMessage = e.GIVE_KILL_MESSAGE),
            null != e.CAN_GO_OUTSIDE_ROOM &&
              (this.settings.canGoOutsideRoom = e.CAN_GO_OUTSIDE_ROOM),
            null != e.HITS_OWN_TYPE &&
              (this.settings.hitsOwnType = e.HITS_OWN_TYPE),
            null != e.DIE_AT_LOW_SPEED &&
              (this.settings.diesAtLowSpeed = e.DIE_AT_LOW_SPEED),
            null != e.DIE_AT_RANGE &&
              (this.settings.diesAtRange = e.DIE_AT_RANGE),
            null != e.INDEPENDENT &&
              (this.settings.independent = e.INDEPENDENT),
            null != e.PERSISTS_AFTER_DEATH &&
              (this.settings.persistsAfterDeath = e.PERSISTS_AFTER_DEATH),
            null != e.CLEAR_ON_MASTER_UPGRADE &&
              (this.settings.clearOnMasterUpgrade = e.CLEAR_ON_MASTER_UPGRADE),
            null != e.HEALTH_WITH_LEVEL &&
              (this.settings.healthWithLevel = e.HEALTH_WITH_LEVEL),
            null != e.ACCEPTS_SCORE &&
              (this.settings.acceptsScore = e.ACCEPTS_SCORE),
            null != e.NECRO && (this.settings.isNecromancer = e.NECRO),
            null != e.HAS_NO_RECOIL &&
              (this.settings.hasNoRecoil = e.HAS_NO_RECOIL),
            null != e.CRAVES_ATTENTION &&
              (this.settings.attentionCraver = e.CRAVES_ATTENTION),
            null != e.BROADCAST_MESSAGE &&
              (this.settings.broadcastMessage = e.BROADCAST_MESSAGE || void 0),
            null != e.DAMAGE_CLASS &&
              (this.settings.damageClass = e.DAMAGE_CLASS),
            null != e.BUFF_VS_FOOD &&
              (this.settings.buffVsFood = e.BUFF_VS_FOOD),
            null != e.CAN_BE_ON_LEADERBOARD &&
              (this.settings.leaderboardable = e.CAN_BE_ON_LEADERBOARD),
            null != e.IS_SMASHER &&
              (this.settings.reloadToAcceleration = e.IS_SMASHER),
            null != e.DIES_BY_OBSTACLES &&
              (this.settings.diesByObstacles = e.DIES_BY_OBSTACLES),
            null != e.IS_HELICOPTER &&
              (this.settings.isHelicopter = e.IS_HELICOPTER),
            null != e.GO_THRU_OBSTACLES &&
              (this.settings.goThruObstacle = e.GO_THRU_OBSTACLES),
            null != e.BOUNCE_ON_OBSTACLES &&
              (this.settings.bounceOnObstacles = e.BOUNCE_ON_OBSTACLES),
            null != e.STAT_NAMES && (this.settings.skillNames = e.STAT_NAMES),
            null != e.HAS_ANIMATION &&
              (this.settings.hasAnimation = e.HAS_ANIMATION),
            null != e.INTANGIBLE && (this.intangibility = e.INTANGIBLE),
            null != e.AI && (this.aiSettings = e.AI),
            null != e.DANGER && (this.dangerValue = e.DANGER),
            null != e.TARGET_PLANES &&
              (this.settings.targetPlanes = e.TARGET_PLANES),
            null != e.VARIES_IN_SIZE &&
              ((this.settings.variesInSize = e.VARIES_IN_SIZE),
              (this.squiggle = this.settings.variesInSize
                ? ran.randomRange(0.8, 1.2)
                : 1)),
            e.RESET_UPGRADES && (this.upgrades = []),
            null != e.DIES_TO_TEAM_BASE &&
              (this.diesToTeamBase = e.DIES_TO_TEAM_BASE),
            null != e.GOD_MODE && (this.godmode = e.GOD_MODE),
            null != e.HAS_NO_SKILL_POINTS &&
              e.HAS_NO_SKILL_POINTS &&
              (this.skill.points = 0),
            null != e.HAS_ALL_SKILL_POINTS &&
              e.HAS_ALL_SKILL_POINTS &&
              (this.skill.points = 42),
            null != e.LAYER && (this.LAYER = e.LAYER),
            null != e.ALPHA && (this.alpha = e.ALPHA),
            null != e.TEAM && -1 !== e.TEAM && (this.team = e.TEAM),
            null != e.BOSS_TIER_TYPE && (this.bossTierType = e.BOSS_TIER_TYPE),
            null != e.SYNC_TURRET_SKILLS &&
              (this.syncTurretSkills = e.SYNC_TURRET_SKILLS),
            null != e.INVISIBLE && e.INVISIBLE !== [])
          ) {
            if (3 !== e.INVISIBLE.length) throw "Invalid invisibility values!";
            this.invisible = e.INVISIBLE;
          }
          if (
            (null != e.IS_PLANE && (this.isPlane = e.IS_PLANE),
            null != e.TARGET_PLANES &&
              (this.settings.targetPlanes = e.TARGET_PLANES),
            null != e.SEE_INVISIBLE && (this.seeInvisible = e.SEE_INVISIBLE),
            null != e.DISPLAY_TEXT && (this.displayText = e.DISPLAY_TEXT),
            null != e.AMMO &&
              ((this.displayText = `${e.AMMO} Ammo left`),
              (this.ammo = e.AMMO)),
            null != e.ON_DAMAGED && (this.onDamaged = e.ON_DAMAGED),
            null != e.ON_DEALT_DAMAGE &&
              (this.onDealtDamage = e.ON_DEALT_DAMAGE),
            null != e.ON_DEALT_DAMAGE_UNIVERSAL &&
              (this.onDealtDamageUniv = e.ON_DEALT_DAMAGE_UNIVERSAL),
            null != e.ON_KILL && (this.onKill = e.ON_KILL),
            null != e.BOSS_TYPE && "None" !== e.BOSS_TYPE)
          )
            switch (e.BOSS_TYPE) {
              case "Constellation":
                this.onDead = () => {
                  sockets.broadcast(
                    "A Constellation boss may have been defeated, but the battle is not won yet..."
                  );
                  let e = this.x,
                    t = this.y;
                  setTimeout(() => {
                    sockets.broadcast(
                      "Constellation Shards have spawned to avenge the Constellation!"
                    );
                    let s = [
                        [e + 110, t, -110, 0],
                        [e - 110, t, 110, 0],
                        [e, t + 110, 0, -110],
                        [e, t - 110, 0, 110],
                      ],
                      i = ran.chooseBossName("a", 5);
                    for (let e = 0; e < 4; e++) {
                      let t = new Entity({
                        x: s[e][0],
                        y: s[e][1],
                      });
                      (t.team = -100),
                        (t.control.target.x = s[e][2]),
                        (t.control.target.y = s[e][3]),
                        t.define(Class.constShard),
                        (t.name = i[e]),
                        (t.settings.broadcastMessage =
                          "A Constellation Shard has been defeated!");
                    }
                    let a = new Entity({
                      x: e,
                      y: t,
                    });
                    (a.team = -100),
                      (a.control.target.x = a.control.target.y = 100),
                      a.define(Class.constCore),
                      (a.name = i[4]),
                      (a.settings.broadcastMessage =
                        "A Constellation Core has been defeated!");
                  }, 7500);
                };
                break;
              case "Bow":
                this.onDead = () => {
                  sockets.broadcast(
                    "A Bow may have been defeated, but the battle is not over yet..."
                  );
                  let e = this.x,
                    t = this.y;
                  setTimeout(() => {
                    sockets.broadcast(
                      "Bow Shards have spawned to avenge the Bow!"
                    );
                    let s = [
                        [e + 100, t, 100, 0],
                        [e - 100, t, -100, 0],
                      ],
                      i = ran.chooseBossName("a", 3);
                    for (let e = 0; e < 2; e++) {
                      let t = new Entity({
                        x: s[e][0],
                        y: s[e][1],
                      });
                      (t.team = -100),
                        (t.control.target.x = s[e][2]),
                        (t.control.target.y = s[e][3]),
                        t.define(Class.bowShard),
                        (t.name = i[e]),
                        (t.settings.broadcastMessage =
                          "A Bow Shard has been defeated!");
                    }
                    let a = new Entity({
                      x: e,
                      y: t,
                    });
                    (a.team = -100),
                      (a.control.target.x = a.control.target.y = 100),
                      a.define(Class.bowCore),
                      (a.name = i[2]),
                      (a.settings.broadcastMessage =
                        "A Bow Core has been defeated!");
                  }, 5e3);
                };
                break;
              case "Snowflake":
                this.onDead = () => {
                  sockets.broadcast(
                    "A Snowflake may have been defeated, but the battle is not over yet..."
                  );
                  let e = this.x,
                    t = this.y;
                  setTimeout(() => {
                    sockets.broadcast(
                      "Snowflake Shards have spawned to avenge the Snowflake!"
                    );
                    let s = [
                        [e, t + 100, 0, 100],
                        [e + 86.602, t + 50, 86.602, 50],
                        [e + 86.602, t - 50, 86.602, -50],
                        [e, t - 100, 0, -100],
                        [e - 86.602, t - 50, -86.602, -50],
                        [e - 86.602, t + 50, -86.602, 50],
                      ],
                      i = ran.chooseBossName("a", 7);
                    for (let e = 0; e < 6; e++) {
                      let t = new Entity({
                        x: s[e][0],
                        y: s[e][1],
                      });
                      (t.team = -100),
                        (t.control.target.x = s[e][2]),
                        (t.control.target.y = s[e][3]),
                        t.define(Class.snowflakeShard),
                        (t.name = i[e]),
                        (t.settings.broadcastMessage =
                          "A Snowflake Shard has been defeated!");
                    }
                    let a = new Entity({
                      x: e,
                      y: t,
                    });
                    (a.team = -100),
                      (a.control.target.x = a.control.target.y = 100),
                      a.define(Class.snowflakeCore),
                      (a.settings.broadcastMessage =
                        "A Snowflake Core has been defeated!"),
                      (a.name = i[2]);
                  }, 7500);
                };
                break;
              case "XYV":
                this.onDead = () => {
                  sockets.broadcast(
                    "Xyv Wdtcfgzsezgk might have been defeated, but the battle is not over yet..."
                  );
                  let e = this.x,
                    t = this.y;
                  setTimeout(() => {
                    sockets.broadcast(
                      "A Summoner, Guardian, and Defender have spawned to avenge the Xyv Wdtcfgzsezgk!"
                    );
                    let s = [
                        [e, t + 100, 0, 100],
                        [e + 86.602, t - 50, 86.602, -50],
                        [e - 86.602, t - 50, -86.602, -50],
                      ],
                      i = ran.chooseBossName("a", 3);
                    for (let e = 0; e < 3; e++) {
                      let t = new Entity({
                        x: s[e][0],
                        y: s[e][1],
                      });
                      (t.team = -100),
                        t.define(
                          [
                            Class.guardianAI,
                            Class.summonerAI,
                            Class.defenderAI,
                          ][e]
                        ),
                        (t.name = i[e]);
                    }
                  }, 7500);
                };
                break;
              case "crush":
                this.onDead = () => {
                  let e = this.x,
                    t = this.y;
                  for (let s = 0; s < 3; s++) {
                    let s = new Entity({
                      x: e,
                      y: t,
                    });
                    (s.team = -100), s.define(Class.crusherShards);
                  }
                };
                break;
              case "iceCrush":
                this.onDead = () => {
                  let e = this.x,
                    t = this.y;
                  for (let s = 0; s < 3; s++) {
                    let s = new Entity({
                      x: e,
                      y: t,
                    });
                    (s.team = -100), s.define(Class.iceCrusherShards);
                  }
                };
                break;
              case "boomCrusher":
                this.onDead = () => {
                  let e = this.x,
                    t = this.y;
                  for (let s = 0; s < 10; s++) {
                    let s = new Entity({
                      x: e,
                      y: t,
                    });
                    (s.team = -100), s.define(Class.boomCrusherShards);
                  }
                };
                break;
              case "redRunner1":
                setTimeout(() => {
                  this.isAlive() &&
                    ((this.SIZE *= 2), this.define(Class.redRunner2));
                }, 15e3);
                break;
              case "redRunner2":
                setTimeout(() => {
                  this.isAlive() &&
                    ((this.SIZE *= 3), this.define(Class.redRunner3));
                }, 3e4);
                break;
              case "redRunner3":
                setTimeout(() => {
                  this.isAlive() &&
                    ((this.SIZE *= 4), this.define(Class.redRunner4));
                }, 6e4);
                break;
              case "splitHexagon":
                (this.onDead = () => {
                  let e = this.x,
                    t = this.y;
                  for (let s = 0; s < 2; s++) {
                    let s = new Entity({
                      x: e,
                      y: t,
                    });
                    (s.team = -100), s.define(Class.trapezoidCrasher);
                  }
                }),
                  setTimeout(() => {
                    this.isAlive() &&
                      (this.define(Class.splitterDecagon), (this.SIZE *= 1.2));
                  }, 72e4);
                break;
              case "splitPentagon":
                (this.onDead = () => {
                  let e = this.x,
                    t = this.y;
                  for (let s = 0; s < 5; s++) {
                    let s = new Entity({
                      x: e,
                      y: t,
                    });
                    (s.team = -100), s.define(Class.crasher);
                  }
                }),
                  setTimeout(() => {
                    this.isAlive() &&
                      (this.define(Class.splitterHexagon), (this.SIZE *= 1.2));
                  }, 48e4);
                break;
              case "splitSquare":
              case "splitSquare2":
                (this.onDead = () => {
                  let e = this.x,
                    t = this.y;
                  for (let s = 0; s < 4; s++) {
                    let s = new Entity({
                      x: e,
                      y: t,
                    });
                    (s.team = -100), s.define(Class.summonerSquare);
                  }
                }),
                  "splitSquare2" !== e.BOSS_TYPE &&
                    setTimeout(() => {
                      if (this.isAlive()) {
                        let e = Math.floor(2 * Math.random())
                          ? "splitterSplitterSquare"
                          : "splitterPentagon";
                        this.define(Class[e]), (this.SIZE *= 1.75);
                      }
                    }, 24e4);
                break;
              case "splitSplitSquare":
                this.onDead = () => {
                  let e = this.x,
                    t = this.y,
                    s = [
                      {
                        x: e - 10,
                        y: t - 10,
                      },
                      {
                        x: e - 10,
                        y: t + 10,
                      },
                      {
                        x: e + 10,
                        y: t + 10,
                      },
                      {
                        x: e + 10,
                        y: t - 10,
                      },
                    ];
                  for (let e = 0; e < 4; e++) {
                    let t = new Entity(s[e]);
                    (t.team = -100),
                      t.define(Class.splitterSquare2),
                      (t.ACCELERATION = 0.015 / t.foodLevel);
                  }
                };
                break;
              case "summonerSquare":
                (this.onDead = () => {
                  let e = this.x,
                    t = this.y,
                    s = new Entity({
                      x: e,
                      y: t,
                    });
                  (s.team = -100), s.define(Class.summonerSquare);
                }),
                  this.kill();
                break;
              case "triRunner":
                (this.onDead = () => {
                  let e = this.x,
                    t = this.y,
                    s = new Entity({
                      x: e,
                      y: t,
                    });
                  (s.team = -100), s.define(Class.redRunner2);
                }),
                  this.kill();
                break;
              case "triBlade":
                (this.onDead = () => {
                  let e = this.x,
                    t = this.y,
                    s = new Entity({
                      x: e,
                      y: t,
                    });
                  (s.team = -100), s.define(Class.bladeCrasher);
                }),
                  this.kill();
                break;
              case "groupers":
                (this.onDead = () => {
                  let e = this.x,
                    t = this.y;
                  for (let s = 0; s < 4; s++) {
                    let s = new Entity({
                      x: e,
                      y: t,
                    });
                    (s.team = -100), s.define(Class.grouperCrasher);
                  }
                }),
                  this.kill();
                break;
              case "defender":
                this.onDead = () => {
                  let e = this.x,
                    t = this.y,
                    s = Math.floor(6 * Math.random() + 1) + 2;
                  for (let i = 0; i < s; i++) {
                    let s = new Entity({
                      x: e,
                      y: t,
                    });
                    (s.team = -100), s.define(Class.bladeCrasher);
                  }
                };
                break;
              case "squareNest":
                (this.onDead = () => {
                  let e = this.x,
                    t = this.y;
                  for (let s = 0; s < 12; s++) {
                    let i = new Entity({
                      x: e + 200 * Math.cos((s * Math.PI) / 6),
                      y: t + 200 * Math.sin((s * Math.PI) / 6),
                    });
                    (i.team = -100),
                      (i.control.target.x = 200 * Math.cos((s * Math.PI) / 6)),
                      (i.control.target.y = 200 * Math.sin((s * Math.PI) / 6)),
                      i.define(Class.summonerSquare);
                  }
                  for (let s = 0; s < 4; s++) {
                    let i = new Entity({
                      x: e + 250 * Math.cos((s * Math.PI) / 2 + Math.PI / 4),
                      y: t + 250 * Math.sin((s * Math.PI) / 2 + Math.PI / 4),
                    });
                    (i.team = -100),
                      (i.control.target.x =
                        250 * Math.cos((s * Math.PI) / 2 + Math.PI / 4)),
                      (i.control.target.y =
                        250 * Math.sin((s * Math.PI) / 2 + Math.PI / 4)),
                      i.define(Class.greenSquare),
                      (i.ACCELERATION = 0.015 / i.foodLevel);
                  }
                  for (let s = 0; s < 4; s++) {
                    let i = new Entity({
                      x: e + 350 * Math.cos((s * Math.PI) / 2),
                      y: t + 350 * Math.sin((s * Math.PI) / 2),
                    });
                    (i.team = -100),
                      (i.control.target.x = 350 * Math.cos((s * Math.PI) / 2)),
                      (i.control.target.y = 350 * Math.sin((s * Math.PI) / 2)),
                      i.define(Class.splitterSquare),
                      (i.ACCELERATION = 0.015 / i.foodLevel);
                  }
                  for (let s = 0; s < 20; s++) {
                    let i = new Entity({
                      x: e + 400 * Math.cos((s * Math.PI) / 10),
                      y: t + 400 * Math.sin((s * Math.PI) / 10),
                    });
                    (i.team = -100),
                      (i.control.target.x = 400 * Math.cos((s * Math.PI) / 10)),
                      (i.control.target.y = 400 * Math.sin((s * Math.PI) / 10)),
                      i.define(Class.singularSquare),
                      (i.ACCELERATION = 0.015 / i.foodLevel);
                  }
                  for (let s = 0; s < 2; s++) {
                    let i = new Entity({
                      x: e + 275 * Math.cos(s * Math.PI),
                      y: t + 275 * Math.sin(s * Math.PI),
                    });
                    (i.team = -100),
                      (i.control.target.x = 275 * Math.cos(s * Math.PI)),
                      (i.control.target.y = 275 * Math.sin(s * Math.PI)),
                      i.define(Class.squareGunSentry);
                  }
                }),
                  this.kill();
                break;
              case "triangleNest":
                (this.onDead = () => {
                  let e = this.x,
                    t = this.y;
                  for (let s = 0; s < 10; s++) {
                    let i = new Entity({
                      x: e + 200 * Math.cos((s * Math.PI) / 5),
                      y: t + 200 * Math.sin((s * Math.PI) / 5),
                    });
                    (i.team = -100),
                      (i.control.target.x = 200 * Math.cos((s * Math.PI) / 5)),
                      (i.control.target.y = 200 * Math.sin((s * Math.PI) / 5)),
                      i.define(Class.crasher);
                  }
                  for (let s = 0; s < 4; s++) {
                    let i = new Entity({
                      x: e + 200 * Math.cos((s * Math.PI) / 2),
                      y: t + 200 * Math.sin((s * Math.PI) / 2),
                    });
                    (i.team = -100),
                      (i.control.target.x = 200 * Math.cos((s * Math.PI) / 2)),
                      (i.control.target.y = 200 * Math.sin((s * Math.PI) / 2)),
                      i.define(Class.redRunner1);
                  }
                  for (let s = 0; s < 4; s++) {
                    let i = new Entity({
                      x: e + 250 * Math.cos((s * Math.PI) / 2),
                      y: t + 250 * Math.sin((s * Math.PI) / 2),
                    });
                    (i.team = -100),
                      (i.control.target.x = 250 * Math.cos((s * Math.PI) / 2)),
                      (i.control.target.y = 250 * Math.sin((s * Math.PI) / 2)),
                      i.define(Class.greenTriangle),
                      (i.ACCELERATION = 0.015 / i.foodLevel);
                  }
                  for (let s = 0; s < 8; s++) {
                    let i = new Entity({
                      x: e + 350 * Math.cos((s * Math.PI) / 4),
                      y: t + 350 * Math.sin((s * Math.PI) / 4),
                    });
                    (i.team = -100),
                      (i.control.target.x = 350 * Math.cos((s * Math.PI) / 4)),
                      (i.control.target.y = 350 * Math.sin((s * Math.PI) / 4)),
                      i.define(Class.bladeCrasher);
                  }
                  for (let s = 0; s < 20; s++) {
                    let i = new Entity({
                      x: e + 400 * Math.cos((s * Math.PI) / 10),
                      y: t + 400 * Math.sin((s * Math.PI) / 10),
                    });
                    (i.team = -100),
                      (i.control.target.x = 400 * Math.cos((s * Math.PI) / 10)),
                      (i.control.target.y = 400 * Math.sin((s * Math.PI) / 10)),
                      i.define(Class.singularTriangle),
                      (i.ACCELERATION = 0.015 / i.foodLevel);
                  }
                  for (let s = 0; s < 2; s++) {
                    let i = new Entity({
                      x: e + 275 * Math.cos(s * Math.PI),
                      y: t + 275 * Math.sin(s * Math.PI),
                    });
                    (i.team = -100),
                      (i.control.target.x = 275 * Math.cos(s * Math.PI)),
                      (i.control.target.y = 275 * Math.sin(s * Math.PI)),
                      i.define(Class.sentryGunAI);
                  }
                }),
                  this.kill();
                break;
              case "pentagonNest":
                (this.onDead = () => {
                  let e = this.x,
                    t = this.y;
                  for (let s = 0; s < 10; s++) {
                    let i = new Entity({
                      x: e + 200 * Math.cos((s * Math.PI) / 5),
                      y: t + 200 * Math.sin((s * Math.PI) / 5),
                    });
                    (i.team = -100),
                      (i.control.target.x = 200 * Math.cos((s * Math.PI) / 5)),
                      (i.control.target.y = 200 * Math.sin((s * Math.PI) / 5)),
                      i.define(Class.semiCrushCrasher);
                  }
                  for (let s = 0; s < 5; s++) {
                    let i = new Entity({
                      x: e + 200 * Math.cos((s * Math.PI) / 2.5),
                      y: t + 200 * Math.sin((s * Math.PI) / 2.5),
                    });
                    (i.team = -100),
                      (i.control.target.x =
                        200 * Math.cos((s * Math.PI) / 2.5)),
                      (i.control.target.y =
                        200 * Math.sin((s * Math.PI) / 2.5)),
                      i.define(Class.splitterPentagon),
                      (i.ACCELERATION = 0.015 / i.foodLevel);
                  }
                  for (let s = 0; s < 4; s++) {
                    let i = new Entity({
                      x: e + 250 * Math.cos((s * Math.PI) / 2),
                      y: t + 250 * Math.sin((s * Math.PI) / 2),
                    });
                    (i.team = -100),
                      (i.control.target.x = 250 * Math.cos((s * Math.PI) / 2)),
                      (i.control.target.y = 250 * Math.sin((s * Math.PI) / 2)),
                      i.define(Class.greenPentagon),
                      (i.ACCELERATION = 0.015 / i.foodLevel);
                  }
                  for (let s = 0; s < 8; s++) {
                    let i = new Entity({
                      x: e + 350 * Math.cos((s * Math.PI) / 4),
                      y: t + 350 * Math.sin((s * Math.PI) / 4),
                    });
                    (i.team = -100),
                      (i.control.target.x = 350 * Math.cos((s * Math.PI) / 4)),
                      (i.control.target.y = 350 * Math.sin((s * Math.PI) / 4)),
                      i.define(Class.crushCrasher);
                  }
                  for (let s = 0; s < 18; s++) {
                    let i = new Entity({
                      x: e + 400 * Math.cos((s * Math.PI) / 9),
                      y: t + 400 * Math.sin((s * Math.PI) / 9),
                    });
                    (i.team = -100),
                      (i.control.target.x = 400 * Math.cos((s * Math.PI) / 9)),
                      (i.control.target.y = 400 * Math.sin((s * Math.PI) / 9)),
                      i.define(Class.singularPentagon),
                      (i.ACCELERATION = 0.015 / i.foodLevel);
                  }
                  for (let s = 0; s < 4; s++) {
                    let i = new Entity({
                      x: e + 275 * Math.cos((s * Math.PI) / 2),
                      y: t + 275 * Math.sin((s * Math.PI) / 2),
                    });
                    (i.team = -100),
                      (i.control.target.x = 275 * Math.cos((s * Math.PI) / 2)),
                      (i.control.target.y = 275 * Math.sin((s * Math.PI) / 2)),
                      i.define(Class.sentryGunAI);
                  }
                }),
                  this.kill();
                break;
              case "longlong":
                this.onDead = () => {
                  let e = this.x,
                    t = this.y,
                    s = this.size / 1.25;
                  for (let i = 0; i < 10; i++) {
                    let a = new Entity({
                      x: s * Math.cos((i * Math.PI) / 5) + e,
                      y: s * Math.sin((i * Math.PI) / 5) + t,
                    });
                    (a.team = -100),
                      a.define(Class.longCrasher),
                      (a.facingType = "looseWithMotion"),
                      (a.facing += (i * Math.PI) / 5 + Math.PI);
                  }
                };
                break;
              case "destroyer":
                this.onDead = () => {
                  let e = this.x,
                    t = this.y,
                    s = new Entity({
                      x: e,
                      y: t,
                    });
                  (s.team = -100), s.define(Class.summonerSquare);
                };
                break;
              case "crescent":
                setTimeout(() => {
                  this.isAlive() && this.define(Class.crescent);
                }, 2e3);
                break;
              case "revo":
                this.onDead = () => {
                  setTimeout(() => {
                    this.master.isAlive() &&
                      this.master.define(Class.baseThrower);
                  }, 1e3);
                };
                break;
              case "mei":
                setTimeout(() => {
                  this.isAlive() && this.define(Class.mei);
                }, 2e3);
                break;
              case "kashmir":
                setTimeout(() => {
                  this.isAlive() && this.define(Class.kashmir0);
                }, 2e3);
                break;
              case "oxy":
                setTimeout(() => {
                  this.isAlive() && this.define(Class.guardianLauncher);
                }, 2e3);
                break;
              case "oxy2":
                setTimeout(() => {
                  this.isAlive() && this.define(Class.miniGuardianLauncher);
                }, 2e3);
                break;
              case "gold":
                setTimeout(() => {
                  this.isAlive() &&
                    (this.define(Class.burntIcosagon),
                    sockets.broadcast(
                      "The Golden Nonagon has evolved into a Golden Icosagon!"
                    ));
                }, 12e4);
                break;
              case "mladic":
                setTimeout(() => {
                  if (this.isAlive()) {
                    sockets.broadcast(
                      "The Golden Icosagon is sending out messages, move away from it!"
                    );
                    let e = this.x,
                      t = this.y;
                    setTimeout(() => {
                      sockets.broadcast("Mladic has been summoned!");
                      let s = new Entity({
                        x: e + 450,
                        y: t,
                      });
                      (s.team = -100),
                        s.define(Class.mladicAI),
                        (s.name = "Mladic");
                    }, 7500);
                  }
                }, 1e3);
                break;
              default:
                util.warn("Invalid boss type: " + e.BOSS_TYPE + "!");
            }
          if (null != e.SANCTUARY_TYPE && "None" !== e.SANCTUARY_TYPE)
            switch (
              ((this.sanctuaryType = e.SANCTUARY_TYPE),
              sockets.broadcast(
                util.addArticle(e.SANCTUARY_TYPE, !0) +
                  " Sanctuary has spawned!"
              ),
              (this.miscIdentifier = "appearOnMinimap"),
              e.SANCTUARY_TYPE)
            ) {
              case "Egg":
                this.onDead = () => {
                  sockets.broadcast(
                    "The Egg Sanctuary seems to have left something in its demise..."
                  );
                  this.x, this.y;
                  setTimeout(() => {
                    let e = new Entity({
                      x: this.x,
                      y: this.y,
                    });
                    sockets.broadcast(
                      "An EK-1 has spawned to avenge the Egg Sanctuary!"
                    ),
                      (e.team = -100),
                      (e.control.target.x = e.control.target.y = 100),
                      e.define(Class.eggBossTier1AI),
                      (e.name = ran.chooseBossName("a", 1)[0]),
                      (e.miscIdentifier = "Sanctuary Boss"),
                      setTimeout(() => {
                        e.isAlive() &&
                          (sockets.broadcast(
                            "The EK-1's wrath has remained unhindered for too long; it appears to be evolving..."
                          ),
                          setTimeout(() => {
                            if (e.isAlive()) {
                              for (let t = 1; t < 22; t++)
                                setTimeout(() => {
                                  e.isAlive() &&
                                    (e.define(Class[`ekAnim${t}`]),
                                    21 === t && e.define(Class.eggBossTier2AI));
                                }, 36 * t);
                              (e.miscIdentifier = "Sanctuary Boss"),
                                sockets.broadcast(
                                  "The EK-1 has evolved into an EK-2!"
                                );
                            } else
                              sockets.broadcast(
                                "The EK-1 has been consoled just in time..."
                              );
                          }, 6e3));
                      }, 6e5);
                  }, 6e3);
                };
                break;
              case "Snowball":
                this.onDead = () => {
                  sockets.broadcast(
                    "The Snowball Sanctuary seems to have left something in its demise..."
                  );
                  this.x, this.y;
                  setTimeout(() => {
                    let e = new Entity({
                      x: this.x,
                      y: this.y,
                    });
                    sockets.broadcast(
                      "A Snowflake has spawned to avenge the Egg Sanctuary!"
                    ),
                      (e.team = -100),
                      (e.control.target.x = e.control.target.y = 100),
                      e.define(Class.snowflakeAI),
                      (e.name = ran.chooseBossName("a", 1)[0]),
                      (e.miscIdentifier = "Sanctuary Boss");
                  }, 6e3);
                };
                break;
              case "Square":
                this.onDead = () => {
                  sockets.broadcast(
                    "The Square Sanctuary seems to have left something in its demise..."
                  );
                  let e = this.x,
                    t = this.y;
                  setTimeout(() => {
                    sockets.broadcast(
                      "A Summoner has spawned to avenge the Square Sanctuary!"
                    );
                    let s = new Entity({
                      x: e,
                      y: t,
                    });
                    (s.team = -100),
                      (s.control.target.x = s.control.target.y = 100),
                      s.define(Class.summonerAI),
                      (s.name = ran.chooseBossName("a", 1)[0]),
                      (s.miscIdentifier = "Sanctuary Boss");
                  }, 6e3);
                };
                break;
              case "Triangle":
                this.onDead = () => {
                  sockets.broadcast(
                    "The Triangle Sanctuary seems to have left something in its demise..."
                  );
                  let e = this.x,
                    t = this.y;
                  setTimeout(() => {
                    sockets.broadcast(
                      "A Defender has spawned to avenge the Triangle Sanctuary!"
                    );
                    let s = new Entity({
                      x: e,
                      y: t,
                    });
                    (s.team = -100),
                      (s.control.target.x = s.control.target.y = 100),
                      s.define(Class.defenderAI),
                      (s.name = ran.chooseBossName("a", 1)[0]),
                      (s.miscIdentifier = "Sanctuary Boss");
                  }, 6e3);
                };
                break;
              case "Pentagon":
                this.onDead = () => {
                  sockets.broadcast(
                    "The Pentagon Sanctuary seems to have left something in its demise..."
                  );
                  let e = this.x,
                    t = this.y;
                  setTimeout(() => {
                    sockets.broadcast(
                      "A Leviathan has spawned to avenge the Pentagon Sanctuary!"
                    );
                    let s = new Entity({
                      x: e,
                      y: t,
                    });
                    (s.team = -100),
                      (s.control.target.x = s.control.target.y = 100),
                      s.define(Class.leviathanAI),
                      (s.name = ran.chooseBossName("a", 1)[0]),
                      (s.miscIdentifier = "Sanctuary Boss");
                  }, 6e3);
                };
                break;
              case "Burnt":
                this.onDead = () => {
                  sockets.broadcast(
                    "The Golden Sanctuary seems to have left something in its demise..."
                  );
                  this.x, this.y;
                  setTimeout(() => {
                    sockets.broadcast("A Golden Nonagon has spawned!");
                    let e = new Entity({
                      x: this.x,
                      y: this.y,
                    });
                    (e.team = -100),
                      e.define(Class.burntNonagon),
                      (e.ACCELERATION = 0.015 / e.foodLevel),
                      (e.miscIdentifier = "Sanctuary Boss");
                  }, 6e3);
                };
                break;
              case "Bow":
                this.onDead = () => {
                  sockets.broadcast(
                    "The Bowed Sanctuary seems to have left something in its demise..."
                  );
                  let e = this.x,
                    t = this.y;
                  setTimeout(() => {
                    sockets.broadcast(
                      "A Bow has spawned to avenge the Bowed Sanctuary!"
                    );
                    let s = new Entity({
                      x: e,
                      y: t,
                    });
                    (s.team = -100),
                      (s.control.target.x = s.control.target.y = 100),
                      s.define(Class.bowAI),
                      (s.name = ran.chooseBossName("a", 1)[0]),
                      (s.miscIdentifier = "Sanctuary Boss");
                  }, 6e3);
                };
                break;
              default:
                util.warn(
                  "Invalid sanctuary type: " + this.sanctuaryType + "!"
                ),
                  (this.miscIdentifier = this.sanctuaryType = "None");
            }
          if (null != e.UPGRADES_TIER_1)
            for (let t of e.UPGRADES_TIER_1)
              this.upgrades.push({
                class: tankList[t.index + room.manualOffset],
                level: 15,
                index: t.index,
                tier: 1,
              });
          if (null != e.UPGRADES_TIER_2)
            for (let t of e.UPGRADES_TIER_2)
              this.upgrades.push({
                class: tankList[t.index + room.manualOffset],
                level: 30,
                index: t.index,
                tier: 2,
              });
          if (null != e.UPGRADES_TIER_3)
            for (let t of e.UPGRADES_TIER_3)
              this.upgrades.push({
                class: tankList[t.index + room.manualOffset],
                level: 45,
                index: t.index,
                tier: 3,
              });
          if (null != e.UPGRADES_TIER_4)
            for (let t of e.UPGRADES_TIER_4)
              this.upgrades.push({
                class: tankList[t.index + room.manualOffset],
                level: 60,
                index: t.index,
                tier: 4,
              });
          if (
            (null != e.SIZE &&
              ((this.SIZE = e.SIZE * this.squiggle),
              null == this.coreSize && (this.coreSize = this.SIZE)),
            null != e.SKILL && e.SKILL !== [])
          ) {
            if (10 !== e.SKILL.length) throw "Invalid skill raws!";
            this.skill.set(e.SKILL);
          }
          if (null != e.LEVEL) {
            for (
              -1 === e.LEVEL && this.skill.reset();
              this.skill.level < c.SKILL_CHEAT_CAP &&
              this.skill.level < e.LEVEL;

            )
              (this.skill.score += this.skill.levelScore),
                this.skill.maintain();
            this.refreshBodyAttributes();
          }
          if (null != e.SKILL_CAP && e.SKILL_CAP !== []) {
            if (10 !== e.SKILL_CAP.length) throw "Invalid skill caps!";
            this.skill.setCaps(e.SKILL_CAP);
          }
          if (
            (null != e.VALUE &&
              (this.skill.score = Math.max(
                this.skill.score,
                e.VALUE * this.squiggle
              )),
            null != e.CAMERA_TO_MOUSE && e.CAMERA_TO_MOUSE !== [])
          ) {
            if (2 !== e.CAMERA_TO_MOUSE.length)
              throw "Invalid camera-to-mouse values!";
            this.cameraToMouse = e.CAMERA_TO_MOUSE;
          }
          if (null != e.GUNS) {
            let t = [];
            for (let s of e.GUNS) t.push(new Gun(this, s));
            this.guns = t;
          }
          if (
            (null != e.MAX_CHILDREN && (this.maxChildren = e.MAX_CHILDREN),
            null != e.FOOD &&
              null != e.FOOD.LEVEL &&
              ((this.foodLevel = e.FOOD.LEVEL), (this.foodCountup = 0)),
            null != e.BODY &&
              (null != e.BODY.ACCELERATION &&
                (this.ACCELERATION = e.BODY.ACCELERATION),
              null != e.BODY.SPEED && (this.SPEED = e.BODY.SPEED),
              null != e.BODY.HEALTH && (this.HEALTH = e.BODY.HEALTH),
              null != e.BODY.RESIST && (this.RESIST = e.BODY.RESIST),
              null != e.BODY.SHIELD && (this.SHIELD = e.BODY.SHIELD),
              null != e.BODY.REGEN && (this.REGEN = e.BODY.REGEN),
              null != e.BODY.DAMAGE && (this.DAMAGE = e.BODY.DAMAGE),
              null != e.BODY.PENETRATION &&
                (this.PENETRATION = e.BODY.PENETRATION),
              null != e.BODY.FOV && (this.FOV = e.BODY.FOV),
              null != e.BODY.RANGE && (this.RANGE = e.BODY.RANGE),
              null != e.BODY.SHOCK_ABSORB &&
                (this.SHOCK_ABSORB = e.BODY.SHOCK_ABSORB),
              null != e.BODY.DENSITY && (this.DENSITY = e.BODY.DENSITY),
              null != e.BODY.STEALTH && (this.STEALTH = e.BODY.STEALTH),
              null != e.BODY.PUSHABILITY &&
                (this.PUSHABILITY = e.BODY.PUSHABILITY),
              null != e.BODY.HETERO && (this.heteroMultiplier = e.BODY.HETERO),
              this.refreshBodyAttributes()),
            null != e.TURRETS)
          ) {
            for (let e of this.turrets) e.destroy();
            this.turrets = [];
            for (let t of e.TURRETS) {
              let e = new Entity(this, this.master);
              if ((e.roomId, this.roomId, Array.isArray(t.TYPE)))
                for (let s of t.TYPE) e.define(s);
              else e.define(t.TYPE);
              e.bindToMaster(t.POSITION, this);
            }
          }
          if (null != e.POISON && e.POISON !== []) {
            if (3 !== e.POISON.length) throw "Invalid poison values!";
            this.poisonStatic = {
              enabled: e.POISON[0],
              mult: e.POISON[1],
              duration: e.POISON[2],
            };
          }
          if (null != e.VACCINE && e.VACCINE !== []) {
            if (3 !== e.VACCINE.length) throw "Invalid vaccine values!";
            this.vaccineStatic = {
              enabled: e.VACCINE[0],
              mult: e.VACCINE[1],
              duration: e.VACCINE[2],
            };
          }
          if (null != e.EMP && e.EMP !== []) {
            if (2 !== e.EMP.length) throw "Invalid EMP values!";
            this.empStatic = {
              enabled: e.EMP[0],
              duration: e.EMP[1],
            };
          }
          if (
            (null != e.DIES_INSTANTLY && this.kill(),
            null != e.RANDOM_TYPE && "None" !== e.RANDOM_TYPE)
          ) {
            let t = [];
            if ("Cultist" === e.RANDOM_TYPE)
              t = [
                Class.trapmind.hivemindID,
                Class.poundHivemind.hivemindID,
                Class.psychosisProbe,
                Class.machHivemind.hivemindID,
                Class.auto2Probe,
                Class.propellerHivemind.hivemindID,
                Class.pelletHivemind.hivemindID,
                Class.lancemind.hivemindID,
                Class.flankmind.hivemindID,
                Class.minishotmind.hivemindID,
                Class.basebridMind.hivemindID,
                Class.twinmind.hivemindID,
                Class.submind.hivemindID,
              ].filter((e) => !!e);
            else util.warn("Invalid RANDOM_TYPE value: " + e.RANDOM_TYPE + "!");
            (t = t.filter((e) => !!e)),
              this.define(t[Math.floor(Math.random() * t.length)]);
          }
          null != e.ABILITY_IMMUNE &&
            (this.immuneToAbilities = e.ABILITY_IMMUNE),
            null != e.SPAWNS_DECA && this.define(Class.decagon),
            null != e.ALWAYS_ACTIVE && (this.alwaysActive = e.ALWAYS_ACTIVE),
            null != e.MISC_IDENTIFIER &&
              (this.miscIdentifier = e.MISC_IDENTIFIER),
            null != e.SWITCHEROO_ID && (this.switcherooID = e.SWITCHEROO_ID),
            null != e.IS_ARENA_CLOSER &&
              ((this.isArenaCloser = e.IS_ARENA_CLOSER),
              this.isArenaCloser && (this.immuneToAbilities = !0)),
            null != e.mockup && (this.mockup = e.mockup);
        } catch (e) {
          this.isBot && util.error(this.tank),
            util.error(
              "An error occured while trying to set " +
                trimName(this.name) +
                "'s parent entity, aborting! Index: " +
                this.index +
                "."
            ),
            this.sendMessage(
              "An error occured while trying to set your parent entity!"
            ),
            console.log(e.stack);
        }
      }
      refreshBodyAttributes() {
        let e = Math.pow(this.size / (this.coreSize || this.SIZE), 1);
        (this.acceleration = (c.runSpeed * this.ACCELERATION) / e),
          this.settings.reloadToAcceleration &&
            (this.acceleration *= this.skill.acl),
          (this.topSpeed =
            (c.runSpeed *
              (this.settings.reloadToAcceleration
                ? 1.2 * this.SPEED
                : this.SPEED) *
              this.skill.mob) /
            e),
          this.settings.reloadToAcceleration &&
            (this.topSpeed /= Math.sqrt(this.skill.acl));
        if (
          "tank" === this.type &&
          this.growthData &&
          Number.isFinite(this.growthData.speedMult) &&
          this.growthData.speedMult > 0 &&
          this.growthData.speedMult !== 1
        ) {
          this.acceleration *= this.growthData.speedMult;
          this.topSpeed *= this.growthData.speedMult;
        }
        let t =
            ((this.settings.healthWithLevel ? 1.5 * this.skill.level : 0) +
              this.HEALTH) *
            (this.settings.reloadToAcceleration
              ? 1.1 * this.skill.hlt
              : this.skill.hlt),
          s =
            this.growthData && this.growthData.healthMult
              ? this.growthData.healthMult
              : 1;
        this.health.set(t * s),
          (this.health.resist =
            1 - 1 / Math.max(1, this.RESIST + this.skill.brst)),
          this.shield.set(
            ((this.settings.healthWithLevel ? 0.6 * this.skill.level : 0) +
              this.SHIELD) *
              this.skill.shi,
            Math.max(
              0,
              (1 +
                (this.settings.healthWithLevel
                  ? 0.006 * this.skill.level
                  : 0)) *
                this.REGEN *
                this.skill.rgn *
                (this.settings.reloadToAcceleration ? 1.2 : 1)
            )
          ),
          (this.damage =
            this.DAMAGE *
            (this.settings.reloadToAcceleration
              ? 1.1 * this.skill.atk
              : this.skill.atk)),
          (this.penetration =
            this.PENETRATION +
            1.5 *
              (this.skill.brst + 0.8 * (this.skill.atk - 1)) *
              (this.settings.reloadToAcceleration ? 1.5 : 1)),
          (this.range = this.RANGE),
          (this.fov =
            250 *
            this.FOV *
            Math.sqrt(this.size) *
            (1 + 0.003 * this.skill.level)),
          (this.density =
            (1 + 0.08 * this.skill.level) *
            this.DENSITY *
            (this.settings.reloadToAcceleration ? 0.4 : 1)),
          (this.stealth = this.STEALTH),
          (this.pushability = this.PUSHABILITY);
      }
      refreshFOV() {
        this.fov =
          250 *
          this.FOV *
          Math.sqrt(this.size) *
          (1 + 0.003 * this.skill.level);
      }
      bindToMaster(e, t) {
        (this.bond = t),
          (this.source = t),
          this.bond.turrets.push(this),
          (this.skill = this.bond.skill),
          (this.label = this.bond.label + " " + this.label),
          "shield" !== this.settings.hitsOwnType && this.removeFromGrid(),
          (this.settings.drawShape = !1),
          (this.bound = {}),
          (this.bound.size = 0.05 * e[0]);
        let s = new Vector(e[1], e[2]);
        (this.bound.angle = (e[3] * Math.PI) / 180),
          (this.bound.direction = s.direction),
          (this.bound.offset = s.length / 10),
          (this.bound.arc = (e[4] * Math.PI) / 180),
          (this.bound.layer = e[5]),
          "toTarget" === this.facingType &&
            ((this.facing = this.bond.facing + this.bound.angle),
            (this.facingType = "bound")),
          (this.motionType = "bound"),
          this.move(),
          (this.isTurret = !0);
      }
      get size() {
        return null == this.bond
          ? (this.coreSize || this.SIZE) *
              (1 + (this.skill.level > 45 ? 45 : this.skill.level) / 45)
          : this.bond.size * this.bound.size;
      }
      get mass() {
        return this.density * (this.size * this.size + 1);
      }
      get realSize() {
        return (
          this.size *
          (Math.abs(this.shape) >= realSizes.length
            ? 1
            : realSizes[Math.abs(this.shape)])
        );
      }
      get m_x() {
        return (this.velocity.x + this.accel.x) / room.speed;
      }
      get m_y() {
        return (this.velocity.y + this.accel.y) / room.speed;
      }
      camera(e = !1) {
        let t = {
          type:
            1 * e +
            2 * this.settings.drawHealth +
            4 * ("tank" === this.type) +
            8 * this.invuln,
          id: this.id,
          index: this.index,
          x: this.x,
          y: this.y,
          cx: this.x,
          cy: this.y,
          vx: this.velocity.x,
          vy: this.velocity.y,
          size: this.size,
          rsize: this.realSize,
          status: 1,
          health: this.health.display(),
          shield: this.shield.display(),
          facing: this.facing,
          vfacing: this.vfacing,
          twiggle:
            "toTarget" !== this.facingType ||
            ("lmg" === this.facingType && this.control.fire),
          layer:
            "mazeWall" === this.type || (this.passive && -1 !== this.LAYER)
              ? 1
              : -1 === this.LAYER
              ? null == this.bond
                ? "wall" === this.type
                  ? 11
                  : "food" === this.type
                  ? 10
                  : "tank" === this.type
                  ? 5
                  : "crasher" === this.type
                  ? 2
                  : 0
                : this.bound.layer
              : this.LAYER,
          color: this.color,
          name: this.name,
          score: this.skill.score,
          sizeRatio: [this.width || 1, this.height || 1],
          guns: this.guns.map((e) => e.getLastShot()),
          turrets: this.turrets.map((e) => e.camera(!0)),
          alpha: this.alpha,
          seeInvisible: this.seeInvisible,
          nameColor: this.nameColor,
        };
        if (
          (this.cameraToMouse[0] &&
            ((this.cx = t.cx),
            (this.cy = t.cy),
            this.control.alt
              ? this.cameraShiftFacing
                ? ([t.cx, t.cy] = this.cameraShiftFacing)
                : ((t.cx +=
                    (this.fov * Math.cos(this.facing)) / this.cameraToMouse[1]),
                  (t.cy +=
                    (this.fov * Math.sin(this.facing)) / this.cameraToMouse[1]),
                  (this.cameraShiftFacing = [t.cx, t.cy]))
              : (this.cameraShiftFacing = null)),
          this.controllingSquadron)
        ) {
          const e = this.guns.find(
            (e) => "string" == typeof e.launchSquadron && e.children.length
          );
          if (e) {
            let s = 0,
              i = 0;
            for (const t of e.children) (s += t.x), (i += t.y);
            (s /= e.children.length),
              (i /= e.children.length),
              (t.cx = s),
              (t.cy = i),
              (this.lastCameraPos = [s, i]),
              (this.cameraLingerTime = 35),
              (room.squadronPoints[this.id] = {
                showsOnMap: !0,
                isSquadron: !0,
                x: s,
                y: i,
                SIZE: 1,
                color: this.color,
                id: e.children[0].id,
              });
          } else {
            delete room.squadronPoints[this.id], this.cameraLingerTime--;
            const [e, s] = this.lastCameraPos || [0, 0];
            (t.cx = e),
              (t.cy = s),
              this.cameraLingerTime <= 0 && (this.controllingSquadron = !1);
          }
        } else
          room.squadronPoints[this.id] && delete room.squadronPoints[this.id];
        return t;
      }
      skillUp(e) {
        let t = this.skill.upgrade(e);
        if (t) {
          this.refreshBodyAttributes();
          for (let e of this.guns) e.syncChildren();
        }
        return t;
      }
      upgrade(e) {
        if (
          e < this.upgrades.length &&
          this.skill.level >= this.upgrades[e].level
        ) {
          let t = this.upgrades[e].class;
          (this.upgrades = []),
            this.define(t),
            console.log(t),
            ":game_die: Random Tank :game_die:" === t.LABEL &&
              this.define(
                Class[
                  `CORRUPTED_TANK-${Math.floor(
                    Math.random() * (corruptedTankLength - 1)
                  )}`
                ]
              ),
            (this.tank = t),
            (0 === this.switcherooID ||
              (-1 !== this.bossTierType && 16 !== this.bossTierType)) &&
              this.sendMessage(
                "Press Q to switch tiers. There is a 1 second cooldown."
              ),
            this.cameraToMouse[0] &&
              this.sendMessage(
                "Right click or press shift to move the camera to your mouse."
              ),
            "hatchet" === this.facingType &&
              this.sendMessage("Left click to make the tank spin quickly."),
            "rmb" === this.settings.hasAnimation &&
              this.sendMessage(
                "Right click or press shift to use a special ability."
              ),
            "lmb" === this.settings.hasAnimation &&
              this.sendMessage(
                "Left click or press space to use a special ability."
              ),
            this.sendMessage("You have upgraded to " + this.label + ".");
          for (let e of entities)
            e.settings.clearOnMasterUpgrade &&
              e.master.id === this.id &&
              e.id !== this.id &&
              e !== this &&
              e.kill();
          this.skill.update(),
            this.refreshBodyAttributes(),
            this.stealthMode &&
              ((this.settings.leaderboardable = this.settings.givesKillMessage =
                !1),
              (this.alpha = this.ALPHA = 0));
        }
      }
      upgradeTank(e) {
        (this.upgrades = []),
          this.define(e),
          (this.tank = e),
          (0 === this.switcherooID ||
            (-1 !== this.bossTierType && 16 !== this.bossTierType)) &&
            this.sendMessage(
              "Press Q to switch tiers. There is a 1 second cooldown."
            ),
          this.cameraToMouse[0] &&
            this.sendMessage(
              "Right click or press shift to move the camera to your mouse."
            ),
          "hatchet" === this.facingType &&
            this.sendMessage("Left click to make the tank spin quickly."),
          "rmb" === this.settings.hasAnimation &&
            this.sendMessage(
              "Right click or press shift to use an animation ability."
            ),
          "lmb" === this.settings.hasAnimation &&
            this.sendMessage(
              "Left click or press space to use an animation ability."
            ),
          null != this.AMMO &&
            ((this.displayText = `${this.AMMO} Ammo left`),
            (this.ammo = this.AMMO)),
          (this.onDamaged = this.ON_DAMAGED),
          (this.onDamageDealt = this.ON_DAMAGE_DEALT),
          (this.onDealtDamageUniv = this.ON_DEALT_DAMAGE_UNIVERSAL),
          (this.onKill = this.ON_KILL),
          this.sendMessage("You have changed your tank to " + this.label + "."),
          this.skill.update(),
          this.refreshBodyAttributes(),
          setTimeout(() => {
            for (let e of entities)
              e.settings.clearOnMasterUpgrade &&
                e.master.id === this.id &&
                e.id !== this.id &&
                e !== this &&
                e.kill();
          }, 25),
          this.stealthMode &&
            ((this.settings.leaderboardable = this.settings.givesKillMessage =
              !1),
            (this.alpha = this.ALPHA = 0));
      }
      damageMultiplier() {
        return "swarm" === this.type
          ? 0.25 + 1.5 * util.clamp(this.range / (this.RANGE + 1), 0, 1)
          : 1;
      }
      move() {
        let e = this.control.goal
            ? {
                x: this.control.goal.x - this.x,
                y: this.control.goal.y - this.y,
              }
            : {
                x: 0,
                y: 0,
              },
          t = 0 !== e.x || 0 !== e.y,
          s = {
            x: 0,
            y: 0,
          },
          i = this.acceleration / room.speed;
        switch (this.motionType) {
          case "glide":
            (this.maxSpeed = this.topSpeed), (this.damp = 0.05);
            break;
          case "carrierBomb":
            this.SIZE += 8;
            break;
          case "motor":
            if (
              ((this.maxSpeed = 0),
              this.topSpeed && (this.damp = i / this.topSpeed),
              t)
            ) {
              let t = Math.sqrt(e.x * e.x + e.y * e.y);
              s = {
                x: (i * e.x) / t,
                y: (i * e.y) / t,
              };
            }
            break;
          case "swarm":
            this.maxSpeed = this.topSpeed;
            let a =
              util.getDistance(
                {
                  x: 0,
                  y: 0,
                },
                e
              ) + 1;
            if (t && a > this.size) {
              let t = (this.topSpeed * e.x) / a,
                o = (this.topSpeed * e.y) / a,
                r = Math.sqrt(
                  (this.topSpeed * Math.max(1, this.range) + 1) / i
                );
              s = {
                x: (t - this.velocity.x) / Math.max(5, r),
                y: (o - this.velocity.y) / Math.max(5, r),
              };
            } else
              this.velocity.length < this.topSpeed &&
                (s = {
                  x: (this.velocity.x * i) / 20,
                  y: (this.velocity.y * i) / 20,
                });
            break;
          case "chase":
            if (t) {
              let t = util.getDistance(
                {
                  x: 0,
                  y: 0,
                },
                e
              );
              if (t > 2 * this.size) {
                this.maxSpeed = this.topSpeed;
                let a = (this.topSpeed * e.x) / t,
                  o = (this.topSpeed * e.y) / t;
                s = {
                  x: (a - this.velocity.x) * i,
                  y: (o - this.velocity.y) * i,
                };
              } else this.maxSpeed = 0;
            } else this.maxSpeed = 0;
            break;
          case "drift":
            (this.maxSpeed = 0),
              (s = {
                x: e.x * i,
                y: e.y * i,
              });
            break;
          case "bound":
            let o = this.bound,
              r = this.bond;
            (this.x =
              r.x +
              r.size * o.offset * Math.cos(o.direction + o.angle + r.facing)),
              (this.y =
                r.y +
                r.size * o.offset * Math.sin(o.direction + o.angle + r.facing)),
              (this.bond.velocity.x += o.size * this.accel.x),
              (this.bond.velocity.y += o.size * this.accel.y),
              (this.firingArc = [r.facing + o.angle, o.arc / 2]),
              this.accel.null(),
              (this.blend = r.blend);
            break;
          case "accelerate":
            (this.maxSpeed = this.topSpeed),
              (this.damp = -0.0125),
              (this.DAMAGE -= 10);
            break;
          case "glideBall":
            if (
              ((this.maxSpeed = this.topSpeed),
              this.topSpeed && (this.damp = i / this.topSpeed),
              t)
            ) {
              let t = Math.sqrt(e.x * e.x + e.y * e.y);
              s = {
                x: (i * e.x) / t,
                y: (i * e.y) / t,
              };
            } else this.damp = 0.005;
            break;
          case "grow":
            this.SIZE += 0.175;
            break;
          case "flamethrower":
            (this.maxSpeed = this.topSpeed),
              (this.damp = -0.02),
              (this.SIZE += 0.175),
              (this.DAMAGE -= 2.25);
            break;
          case "flare":
            (this.maxSpeed = this.topSpeed),
              (this.damp = -0.025),
              (this.SIZE += 0.25),
              (this.DAMAGE -= 0.175);
            break;
          case "explode":
            (this.SIZE += 10), (this.DAMAGE += 3);
            break;
          case "kamikaze":
            (this.SIZE += 7), (this.DAMAGE += 1);
            break;
          case "crockett":
            (this.SIZE += 2), (this.DAMAGE += 2);
          case "snowball":
            (this.SIZE += 0.15), (this.DAMAGE += 2);
            break;
          case "fatNuke":
            (this.SIZE += 7), (this.DAMAGE += 20);
            break;
          case "miniGrower":
            (this.SIZE += 0.1),
              (this.DAMAGE += 0.15),
              (this.penetration += 0.01),
              this.velocity.x > 0 && (this.velocity.x -= 0.0035),
              this.velocity.y > 0 && (this.velocity.y -= 0.0035);
            break;
          case "grower":
            (this.SIZE += 0.14),
              (this.DAMAGE += 0.175),
              (this.penetration += 0.02),
              this.velocity.x > 0 && (this.velocity.x -= 0.004),
              this.velocity.y > 0 && (this.velocity.y -= 0.004);
            break;
          case "megaGrower":
            (this.SIZE += 0.17),
              (this.DAMAGE += 0.2),
              (this.penetration += 0.03),
              this.velocity.x > 0 && (this.velocity.x -= 0.0045),
              this.velocity.y > 0 && (this.velocity.y -= 0.0045);
            break;
          case "gigaGrower":
            (this.SIZE += 0.21),
              (this.DAMAGE += 0.225),
              (this.penetration += 0.04),
              this.velocity.x > 0 && (this.velocity.x -= 0.005),
              this.velocity.y > 0 && (this.velocity.y -= 0.005);
            break;
          case "gravityA":
            (this.velocity.y += i / 1.45),
              (this.damp = -0.00125),
              (this.topSpeed = 70);
            break;
          case "gravityB":
            (this.velocity.y -= i / 1.45),
              (this.damp = -0.00125),
              (this.topSpeed = 70);
            break;
          case "gravityC":
            (this.velocity.y += i / 1.45),
              (this.damp = -0.00125),
              (this.topSpeed = 70);
            break;
          case "gravityD":
            (this.velocity.x -= (i / 1.45) * Math.sin((2 * Math.PI) / 3)),
              (this.velocity.y += (i / 1.45) * Math.cos((2 * Math.PI) / 3)),
              (this.damp = -0.00125),
              (this.topSpeed = 70);
            break;
          case "gravityE":
            (this.velocity.x -= (i / 1.45) * Math.sin((4 * Math.PI) / 3)),
              (this.velocity.y += (i / 1.45) * Math.cos((4 * Math.PI) / 3)),
              (this.damp = -0.00125),
              (this.topSpeed = 70);
            break;
          case "limitShrink":
            (this.SIZE -= 0.175), this.SIZE < 2 && (this.SIZE = 2);
            break;
          case "decentralize":
            this.master.control.alt
              ? (this.SIZE += 1)
              : this.SIZE > 25.2
              ? (this.SIZE -= 1)
              : (this.SIZE = 25.2);
            break;
          case "plasma":
            (this.x = this.source.x),
              (this.y = this.source.y),
              (this.SIZE += 4);
            break;
          case "colorthingy":
            (this.color = 0),
              (this.SIZE -= 1),
              this.SIZE <= 1 && this.kill(),
              (this.maxSpeed = this.topSpeed);
            break;
          case "colorthingynocolor":
            (this.SIZE -= 1),
              this.SIZE <= 1 && this.kill(),
              (this.maxSpeed = this.topSpeed);
            break;
          case "decelfast":
            (this.maxSpeed = this.topSpeed), (this.damp = 0.2);
            break;
          case "colorthingy4":
            (this.color = 23),
              (this.SIZE += 5),
              this.SIZE >= 40 && (this.SIZE = 40),
              (this.guns.color = 4),
              (this.maxSpeed = this.topSpeed);
            break;
          case "ebin":
            (this.color = 22), (this.diesAtRange = !0);
            let n = ((120 * Math.PI) / 180) * Math.sin(900 * Math.random()),
              l = this.facing + n;
            this.range <= 40 &&
              this.range >= 39 &&
              ((this.velocity.x = 10 * Math.cos(l)),
              (this.velocity.y = 10 * Math.sin(l)),
              (n *= -1)),
              (this.maxSpeed = this.topSpeed);
            break;
          case "bong":
            (this.SIZE += 4),
              (this.maxSpeed = this.topSpeed),
              (this.damp = 0.05);
            break;
          case "oxy":
            this.maxSpeed = this.topSpeed;
            let h =
              util.getDistance(
                {
                  x: 0,
                  y: 0,
                },
                e
              ) + 1;
            if (t && h > this.size) {
              let t = (this.topSpeed * e.x) / h,
                a = (this.topSpeed * e.y) / h,
                o = Math.sqrt(
                  (this.topSpeed * Math.max(1, this.range) + 1) / i
                );
              s = {
                x: (t - this.velocity.x) / Math.max(5, o),
                y: (a - this.velocity.y) / Math.max(5, o),
              };
            } else
              this.velocity.length < this.topSpeed &&
                (s = {
                  x: (this.velocity.x * i) / 20,
                  y: (this.velocity.y * i) / 20,
                });
            this.color = 31;
        }
        (this.accel.x += s.x * this.control.power),
          (this.accel.y += s.y * this.control.power);
      }
      face() {
        let e = this.control.target,
          t = this.facing;
        switch (this.facingType) {
          case "autospin":
            this.facing += 0.02 / room.speed;
            break;
          case "autospin2":
            this.facing += 0.0125 / room.speed;
            break;
          case "spinSlowly":
            this.facing += 0.0075 / room.speed;
            break;
          case "spinSlowly2":
            this.facing += 0.004 / room.speed;
            break;
          case "spinSlowly3":
            this.facing += 0.0025 / room.speed;
            break;
          case "spinSlowly4":
            this.facing += 0.00125 / room.speed;
            break;
          case "bitFastSpin":
            this.facing += 0.035 / room.speed;
            break;
          case "fastSpin":
            this.facing += 0.075 / room.speed;
            break;
          case "altSpin":
            this.facing +=
              (this.master.control.alt ? -0.15 : 0.075) / room.speed;
            break;
          case "hadron":
            this.facing +=
              (this.master.control.alt ? -0.035 : 0.035) / room.speed;
            break;
          case "lmg":
            this.master.control.fire && (this.facing += 0.0375 / room.speed);
            break;
          case "turnWithSpeed":
            this.facing += ((this.velocity.length / 90) * Math.PI) / room.speed;
            break;
          case "withMotion":
            this.velocity.length > 0 && (this.facing = this.velocity.direction);
            break;
          case "looseWithMotion":
            if (!this.velocity.length) break;
          case "smoothWithMotion":
            this.facing += util.loopSmooth(
              this.facing,
              this.velocity.direction,
              4 / room.speed
            );
            break;
          case "toTarget":
            this.facing = Math.atan2(e.y, e.x);
            break;
          case "locksFacing":
            this.control.alt || (this.facing = Math.atan2(e.y, e.x));
            break;
          case "altLocksFacing":
            this.control.fire || (this.facing = Math.atan2(e.y, e.x));
            break;
          case "smoothToTarget":
            this.facing += util.loopSmooth(
              this.facing,
              Math.atan2(e.y, e.x),
              4 / room.speed
            );
            break;
          case "bound":
            let t;
            if (this.control.main) {
              t = Math.atan2(e.y, e.x);
              let s = util.angleDifference(t, this.firingArc[0]);
              Math.abs(s) >= this.firingArc[1] && (t = this.firingArc[0]);
            } else t = this.firingArc[0];
            (this.facing += util.loopSmooth(this.facing, t, 4 / room.speed)),
              this.bond.syncTurretSkills && this.skill.set(this.bond.skill.raw);
            break;
          case "hatchet":
            this.facing += 0.525 + this.skill.spd / 6;
            break;
          case "reverseAutospin":
            this.facing -= 0.02 / room.speed;
        }
        let s = 2 * Math.PI;
        (this.facing = ((this.facing % s) + s) % s),
          (this.vfacing = util.angleDifference(t, this.facing) * room.speed);
      }
      takeSelfie() {
        (this.flattenedPhoto = null),
          (this.photo = this.settings.drawShape ? this.camera() : void 0);
      }
      physics() {
        (this.velocity.x += this.accel.x),
          (this.velocity.y += this.accel.y),
          this.accel.null(),
          (this.stepRemaining = 1),
          (this.x += (this.stepRemaining * this.velocity.x) / room.speed),
          (this.y += (this.stepRemaining * this.velocity.y) / room.speed);
      }
      friction() {
        let e = this.velocity.length,
          t = e - this.maxSpeed;
        if (t > 0 && this.damp) {
          let s = t / (this.damp / room.speed + 1),
            i = this.maxSpeed + s;
          (this.velocity.x = (i * this.velocity.x) / e),
            (this.velocity.y = (i * this.velocity.y) / e);
        }
      }
      location() {
        if (isNaN(this.x) || isNaN(this.y))
          return (
            util.error("Detected an NaN position!"),
            util.error("Label: " + this.label),
            util.error("Index: " + this.index),
            util.error(`Position: (${this.x}, ${this.y})`),
            util.error(`Velocity: (${this.velocity.x}, ${this.velocity.y})`),
            util.error(`Acceleration: (${this.accel.x}, ${this.accel.y})`),
            this.kill()
          );
        let e = {
          x: this.x,
          y: this.y,
        };
        if (
          room.outb &&
          room.outb.length &&
          room.isIn("outb", e) &&
          this.diesToTeamBase &&
          !this.godmode &&
          !this.passive
        )
          if ("miniboss" === this.type || "crasher" === this.type) {
            let e = room.randomType("nest");
            (this.x = e.x), (this.y = e.y);
          } else ("tank" !== this.type && "food" !== this.type) || this.kill();
        if (
          "tdm" === room.gameMode &&
          "food" !== this.type &&
          this.diesToTeamBase &&
          !this.godmode &&
          !this.passive &&
          c.DO_BASE_DAMAGE
        ) {
          let t = !1;
          for (let s = 1; s < room.teamAmount + 1; s++)
            if (
              this.master.team !== -s &&
              (room.isIn(`bas${s}`, e) ||
                room.isIn(`n_b${s}`, e) ||
                room.isIn(`bad${s}`, e))
            ) {
              t = !0;
              break;
            }
          if (t)
            return (
              this.velocity.null(),
              this.accel.null(),
              setTimeout(() => {
                this.isAlive && this.kill();
              }, 75)
            );
        }
        if (
          !c.PORTALS.ENABLED ||
          !room.isIn("port", e) ||
          this.passive ||
          this.settings.goThruObstacle ||
          this.isTurret
        ) {
          if (
            c.PORTALS.ENABLED &&
            room.isIn("port", e) &&
            !this.passive &&
            "crockett" === this.motionType
          )
            return this.kill();
          if (
            room["por" + -this.team] &&
            c.PORTALS.ENABLED &&
            room.isIn("por" + -this.team, e) &&
            !this.passive &&
            !this.settings.goThruObstacle &&
            !this.isTurret
          ) {
            if ("crockett" === this.motionType) return this.kill();
            if (this.settings.isHelicopter)
              return void (
                this.godmode ||
                this.invuln ||
                (this.health.amount -= 0.9)
              );
            let t = room.isAt(e),
              s = e.x - t.x,
              i = e.y - t.y,
              a = s * s + i * i,
              o = c.BORDER_FORCE;
            if ("miniboss" === this.type || this.isMothership)
              (this.accel.x += (((1e4 * s) / a) * o) / room.speed),
                (this.accel.y += (((1e4 * i) / a) * o) / room.speed);
            else if ("tank" === this.type)
              if (a <= c.PORTALS.THRESHOLD) {
                let e,
                  s = Math.random() * Math.PI * 2,
                  i = Math.cos(s),
                  a = Math.sin(s);
                do {
                  e =
                    room["por" + -this.team][
                      Math.floor(
                        Math.random() * room["por" + -this.team].length
                      )
                    ];
                } while (e.id === t.id && room["por" + -this.team].length > 1);
                let o = i < 0 ? -room.xgridWidth / 1.8 : room.xgridWidth / 1.8,
                  r = a < 0 ? -room.ygridHeight / 1.8 : room.ygridHeight / 1.8;
                (this.x = e.x + o),
                  (this.y = e.y + r),
                  this.isPlayer &&
                    ((this.invuln = !0),
                    (this.invulnTime = [Date.now(), 15e3]),
                    this.sendMessage(
                      "You will be invulnerable until you move, shoot or wait 15 seconds."
                    ));
                for (let t of entities)
                  t.id === this.id ||
                    t.master.id !== this.id ||
                    ("drone" !== t.type && "minion" !== t.type) ||
                    ((t.x = e.x + 320 * i + 30 * (Math.random() - 0.5)),
                    (t.y = e.y + 320 * a + 30 * (Math.random() - 0.5)));
              } else
                (this.velocity.x -=
                  (((c.PORTALS.GRAVITY * s) / a) * o) / room.speed),
                  (this.velocity.y -=
                    (((c.PORTALS.GRAVITY * i) / a) * o) / room.speed);
            else this.kill();
          } else if (
            room["por" + -this.team] &&
            c.PORTALS.ENABLED &&
            room.isIn("por" + -this.team, e) &&
            !this.passive &&
            "crockett" === this.motionType
          )
            return this.kill();
        } else {
          if ("crockett" === this.motionType) return this.kill();
          if (this.settings.isHelicopter)
            return void (
              this.godmode ||
              this.invuln ||
              (this.health.amount -= 0.9)
            );
          let t = room.isAt(e),
            s = e.x - t.x,
            i = e.y - t.y,
            a = s * s + i * i,
            o = c.BORDER_FORCE;
          if ("miniboss" === this.type || this.isMothership)
            (this.accel.x += (((1e4 * s) / a) * o) / room.speed),
              (this.accel.y += (((1e4 * i) / a) * o) / room.speed);
          else if ("tank" === this.type)
            if (a <= c.PORTALS.THRESHOLD) {
              let e,
                s = Math.random() * Math.PI * 2,
                i = Math.cos(s),
                a = Math.sin(s);
              do {
                e = room.port[Math.floor(Math.random() * room.port.length)];
              } while (e.id === t.id && room.port.length > 1);
              let o = i < 0 ? -room.xgridWidth / 1.8 : room.xgridWidth / 1.8,
                r = a < 0 ? -room.ygridHeight / 1.8 : room.ygridHeight / 1.8;
              (this.x = e.x + o),
                (this.y = e.y + r),
                this.isPlayer &&
                  ((this.invuln = !0),
                  (this.invulnTime = [Date.now(), 15e3]),
                  this.sendMessage(
                    "You will be invulnerable until you move, shoot or wait 15 seconds."
                  ));
              for (let t of entities)
                t.id === this.id ||
                  t.master.id !== this.id ||
                  ("drone" !== t.type && "minion" !== t.type) ||
                  ((t.x = e.x + 320 * i + 30 * (Math.random() - 0.5)),
                  (t.y = e.y + 320 * a + 30 * (Math.random() - 0.5)));
            } else
              (this.velocity.x -=
                (((c.PORTALS.GRAVITY * s) / a) * o) / room.speed),
                (this.velocity.y -=
                  (((c.PORTALS.GRAVITY * i) / a) * o) / room.speed);
          else this.kill();
        }
        if (
          !this.settings.canGoOutsideRoom &&
          !this.passive &&
          "bound" !== this.motionType
        ) {
          let e = c.BORDER_FORCE;
          if (
            ((this.accel.x -=
              (Math.min(this.x - this.realSize + 50, 0) * e) / room.speed),
            (this.accel.x -=
              (Math.max(this.x + this.realSize - room.width - 50, 0) * e) /
              room.speed),
            (this.accel.y -=
              (Math.min(this.y - this.realSize + 50, 0) * e) / room.speed),
            (this.accel.y -=
              (Math.max(this.y + this.realSize - room.height - 50, 0) * e) /
              room.speed),
            c.PORTALS.ENABLED && !this.settings.isHelicopter)
          ) {
            if (c.PORTALS.DIVIDER_1.ENABLED) {
              let t = c.PORTALS.DIVIDER_1.LEFT,
                s = c.PORTALS.DIVIDER_1.RIGHT,
                i = 0.5 * (t + s);
              this.x > i &&
                this.x < s &&
                (this.accel.x -=
                  (Math.min(this.x - this.realSize + 50 - s, 0) * e) /
                  room.speed),
                this.x > t &&
                  this.x < i &&
                  (this.accel.x -=
                    (Math.max(this.x + this.realSize - 50 - t, 0) * e) /
                    room.speed);
            }
            if (c.PORTALS.DIVIDER_2.ENABLED) {
              let t = c.PORTALS.DIVIDER_2.TOP,
                s = c.PORTALS.DIVIDER_2.BOTTOM,
                i = 0.5 * (t + s);
              this.y > i &&
                this.y < s &&
                (this.accel.y -=
                  (Math.min(this.y - this.realSize + 50 - s, 0) * e) /
                  room.speed),
                this.y > t &&
                  this.y < i &&
                  (this.accel.y -=
                    (Math.max(this.y + this.realSize - 50 - t, 0) * e) /
                    room.speed);
            }
          }
        }
      }
      regenerate() {
        this.shield.max && this.shield.regenerate(),
          this.health.amount &&
            this.health.regenerate(
              this.shield.max && this.shield.max === this.shield.amount
            );
      }
      death() {
        newLogs.death.start();
        e: if (null == this.source || this.source.isDead()) {
          if (this.settings.persistsAfterDeath) {
            if (
              ((this.source = this),
              "always" === this.settings.persistsAfterDeath)
            )
              break e;
          } else this.kill();
          this.parent instanceof Entity &&
            this.parent.isDead() &&
            (this.parent = null),
            this.master instanceof Entity &&
              this.master.id === this.source.id &&
              (this.kill(), (this.master = this));
        }
        if (null != this.bond && this.bond.isGhost)
          return newLogs.death.stop(), !0;
        if (this.invuln || this.godmode)
          return (
            (this.damageReceived = 0),
            this.regenerate(),
            newLogs.death.stop(),
            0
          );
        if (
          (this.settings.diesAtRange &&
            ((this.range -= 1 / room.speed), this.range <= 0 && this.kill()),
          this.settings.diesAtLowSpeed &&
            !this.collisionArray.length &&
            this.velocity.length < this.topSpeed / 2 &&
            (this.health.amount -= this.health.getDamage(1 / room.speed)),
          this.damageReceived > 0)
        ) {
          if (this.shield.max) {
            let e = this.shield.getDamage(this.damageReceived);
            (this.damageReceived -= e), (this.shield.amount -= e);
          }
          if (this.damageReceived > 0) {
            let e = this.health.getDamage(this.damageReceived);
            (this.blend.amount = 1), (this.health.amount -= e);
          }
        }
        if (
          (this.damageReceived <= 0 && this.regenerate(),
          (this.damageReceived = 0),
          this.isDead())
        ) {
          null != this.onDead && this.onDead(),
            null != this.modeDead && this.modeDead(),
            c.serverName.includes("Tag") &&
              (this.isPlayer || this.isBot) &&
              tagDeathEvent(this);
          let e = [],
            t = [],
            s = !1,
            i =
              "" === this.master.name
                ? "tank" === this.master.type
                  ? "An unnamed player's " + this.label
                  : "miniboss" === this.master.type
                  ? "a visiting " + this.label
                  : util.addArticle(this.label)
                : this.master.name + "'s " + this.label,
            a = Math.round(
              util.getJackpot(this.skill.score) / this.collisionArray.length
            );
          for (let i = 0, o = this.collisionArray.length; i < o; i++) {
            let o = this.collisionArray[i];
            "wall" !== o.type &&
              "mazeWall" !== o.type &&
              ((o.master.isDominator ||
                o.master.isArenaCloser ||
                "Base Protector" === o.master.label) &&
                (e.includes(o.master) || e.push(o.master)),
              o.master.settings.acceptsScore
                ? (("tank" !== o.master.type && "miniboss" !== o.master.type) ||
                    (s = !0),
                  (o.master.skill.score += a),
                  e.includes(o.master) || e.push(o.master))
                : o.settings.acceptsScore && (o.skill.score += a),
              t.push(o));
          }
          let o = s ? "" : "You have been killed by ",
            r = this.settings.givesKillMessage;
          for (let t = 0, s = e.length; t < s; t++) {
            let s = e[t];
            s.onKill && s.onKill(s, this),
              this.killCount.killers.push(s.index),
              "tank" === this.type
                ? e.length > 1
                  ? s.killCount.assists++
                  : s.killCount.solo++
                : "miniboss" === this.type && s.killCount.bosses++;
          }
          if (s) {
            for (let t = 0, s = e.length; t < s; t++) {
              let s = e[t];
              "food" !== s.master.type &&
                "crasher" !== s.master.type &&
                ((o += "" === s.name ? "An unnamed player" : s.name),
                (o += " and ")),
                r &&
                  s.sendMessage(
                    "You" +
                      (e.length > 1 ? " assist " : " ") +
                      "killed " +
                      i +
                      "."
                  );
            }
            (o = o.slice(0, -4)), (o += "killed you with ");
          }
          this.settings.broadcastMessage &&
            sockets.broadcast(this.settings.broadcastMessage);
          let n = "";
          for (let t = 0, s = e.length; t < s; t++) {
            let s = e[t];
            s.label.includes("Collision")
              ? (n = "a Collision and ")
              : (n += util.addArticle(s.label) + " and ");
          }
          if (
            ((o += n),
            (o = o.slice(0, -5)),
            this.killedByK
              ? (o = "You self-destructed")
              : this.killedByWalls
              ? (o = "You got stuck in the walls")
              : "You have been kille" === o &&
                (o = "You have died a stupid death"),
            this.underControl || this.sendMessage(o + "."),
            this.id === room.topPlayerID && !c.RANKED_BATTLE)
          ) {
            let t = this.name || "The leader";
            if (s) {
              t += " has been usurped by";
              for (let s = 0, i = e.length; s < i; s++) {
                let i = e[s];
                "food" !== i.type &&
                  ((t += " "),
                  (t += i.name || "An unnamed player"),
                  (t += " and"));
              }
              (t = t.slice(0, -4)), (t += "!");
            } else
              this.killedByWalls
                ? (t += " went to the backrooms.")
                : null != e[0]
                ? e[0].isArenaCloser
                  ? (t += ` suffered by the hands of ${util.addArticle(
                      e[0].label
                    )}.`)
                  : e[0].label.includes("Base Protector")
                  ? (t += " strayed too close to a Base Protector.")
                  : (t += ` fought ${util.addArticle(e[0].label)}, and the ${
                      e[0].label
                    } won.`)
                : this.killedByK
                ? (t += " took the easy way out.")
                : this.isBot
                ? (t += " was slaughtered by server code.")
                : (t += " suffered an unknown fate.");
            sockets.broadcast(t);
          }
          return newLogs.death.stop(), !0;
        }
        return newLogs.death.stop(), !1;
      }
      protect() {
        entitiesToAvoid.push(this), (this.isProtected = !0);
      }
      sendMessage(e) {}
      kill() {
        (this.godmode = !1),
          (this.invuln = !1),
          (this.damageReceived = 1e7),
          (this.health.amount = 0);
      }
      destroy() {
        newLogs.destroy.start(),
          this.isProtected &&
            util.remove(entitiesToAvoid, entitiesToAvoid.indexOf(this));
        for (let e of views) e.remove(this);
        null != this.parent &&
          util.remove(this.parent.children, this.parent.children.indexOf(this));
        for (let e of this.turrets) e.destroy();
        this.removeFromGrid(), (this.isGhost = !0), newLogs.destroy.stop();
      }
      isDead() {
        return this.health.amount <= 0;
      }
      isAlive() {
        return this.health.amount > 0 && !this.isGhost;
      }
      toggleRainbow() {
        (this.rainbow = !this.rainbow),
          this.rainbow
            ? (this.intervalID = setInterval(
                this.rainbowLoop,
                this.rainbowSpeed
              ))
            : clearInterval(this.intervalID);
      }
      rainbowLoop() {
        if (
          ((this.color < 100 || isNaN(this.color)) && (this.color = 100),
          (this.color = ((this.color - 100 + 1) % 86) + 100),
          this.multibox.enabled)
        )
          for (let e of this.multibox.controlledTanks)
            e.isAlive() && (e.color = this.color);
      }
      toggleMultibox() {
        this.multibox.intervalID = setInterval(this.multiboxLoop, 500);
      }
      multiboxLoop() {
        this.settings.hitsOwnType = "never";
        for (let e of this.multibox.controlledTanks)
          if (e.isAlive()) {
            (e.autoOverride = this.autoOverride),
              (e.passive = this.passive),
              (e.godmode = this.godmode);
            for (let t of entities)
              t.master.id === e.id &&
                t.id !== e.id &&
                ((t.passive = e.passive), (t.diesToTeamBase = !e.godmode));
            e.skill.set(this.skill.raw),
              e.refreshBodyAttributes(),
              e.skill.score < 59214 &&
                ((e.skill.score = this.skill.score),
                (e.skill.level = this.skill.level)),
              e.tank !== this.tank && e.upgradeTank(this.tank),
              (e.tank = this.tank),
              (e.FOV = 0.1),
              e.refreshFOV(),
              "tdm" === room.gameMode
                ? (e.team = this.team)
                : (e.team = this.team = -9),
              (e.color = this.color),
              (e.settings.leaderboardable = !1),
              (e.layer = this.layer - 0.5),
              (e.SIZE = this.SIZE),
              (e.nameColor = this.nameColor),
              (e.alpha = this.alpha),
              (e.ALPHA = this.ALPHA);
          }
      }
      relinquish(e) {
        e.body.isMothership
          ? ((e.body.nameColor = [
              "#00B0E1",
              "#F04F54",
              "#00E06C",
              "#BE7FF5",
              "#FFEB8E",
              "#F37C20",
              "#E85DDF",
              "#8EFFFB",
            ][e.team - 1]),
            (e.body.controllers = [
              new ioTypes.nearestDifferentMaster(e.body),
              new ioTypes.mapTargetToGoal(e.body),
              new ioTypes.roamWhenIdle(e.body),
            ]),
            (e.body.name = "Mothership"))
          : ((e.body.controllers = [
              new ioTypes.nearestDifferentMaster(e.body),
              new ioTypes.spinWhileIdle(e.body),
            ]),
            (e.body.nameColor = "#FFFFFF"),
            "Trapper Dominator" === e.body.label &&
              (e.body.addController(new ioTypes.alwaysFire(e.body)),
              (e.body.facingType = "autospin")),
            (e.body.name = "")),
          (e.body.underControl = !1),
          (e.body.autoOverride = !1),
          (e.body.sendMessage = (e) => {});
        let t = new Entity({
          x: e.body.x,
          y: e.body.y,
        });
        (t.passive = !0), (t.underControl = !0), (e.body = t), e.body.kill();
      }
      runAnimations(e) {
        let t = e.onShoot;
        if (e.onShoot && e.onShoot.animation) {
          const t = e.onShoot.frames;
          for (let s = 1; s <= t; s++)
            setTimeout(() => {
              if (e.body.health.amount <= 0) return;
              e.onShoot.end && s === t && (e.body.master.upgrades = []);
              const i = `${e.onShoot.exportName}${e.onShoot.end ? t - s : s}`;
              try {
                e.body.master.define(Class[i]);
              } catch (e) {
                console.log(i);
              }
            }, 20 * s);
        } else
          switch (t) {
            case "hitScan":
            case "hitScan1":
            case "hitScan2":
            case "hitScan3":
              {
                if (this.master.health.amount < 0) break;
                let s = {
                    x: this.master.x,
                    y: this.master.y,
                    angle: this.master.facing + e.angle,
                  },
                  i = this.size * e.width * e.settings2.size,
                  a = {
                    x: s.x + this.control.target.x,
                    y: s.y + this.control.target.y,
                  },
                  o = (util.getDistance(a, s) / i) | 0,
                  r = (t) => {
                    t.onDead = () => {
                      let i = new Entity(t, this);
                      (i.accel.x = 3 * Math.cos(s.angle)),
                        (i.accel.y = 3 * Math.sin(s.angle)),
                        (i.color = this.master.color),
                        i.define(Class.hitScanExplosion),
                        i.define({
                          BODY: e.interpret(e.settings3),
                          SKILL: e.getSkillRaw(),
                          SIZE: (this.size * e.width * e.settings3.size) / 2,
                          LABEL:
                            this.label +
                            (e.label ? " " + e.label : "") +
                            " " +
                            i.label,
                        }),
                        i.refreshBodyAttributes(),
                        i.life(),
                        (i.source = this);
                    };
                  },
                  n = 0,
                  l = 0,
                  h = (t, r, d = !1, c = 0, m = o) => {
                    d || n++;
                    let u = (m / 5) | 0 || 2,
                      y = (r ? Math.PI / 2 : -Math.PI / 2) + c;
                    for (let n = 0; n < u; n++)
                      setTimeout(() => {
                        let o = 1.5 * i,
                          d = t.x + o * Math.cos(s.angle + y) * n,
                          m = t.y + o * Math.sin(s.angle + y) * n,
                          p = new Entity(
                            {
                              x: d,
                              y: m,
                            },
                            this
                          );
                        (p.facing = Math.atan2(a.y - m, a.x - d) + y),
                          (p.color = this.master.color),
                          p.define(Class.hitScanBullet),
                          p.define({
                            BODY: e.interpret(e.settings3),
                            SKILL: e.getSkillRaw(),
                            SIZE: (this.size * e.width * e.settings2.size) / 2,
                            LABEL:
                              this.label +
                              (e.label ? " " + e.label : "") +
                              " " +
                              p.label,
                          }),
                          p.refreshBodyAttributes(),
                          p.life(),
                          (p.source = this),
                          n === u - 1 &&
                            (l < 3 ? (l++, h(p, r, !0, y + c, u)) : (l = 0));
                      }, (500 / o) * n);
                  };
                const d = +t.split("hitScan").pop();
                for (let t = 0; t < o; t++)
                  setTimeout(() => {
                    if (this.master.health.amount < 0) return;
                    let l = s.x + i * Math.cos(s.angle) * t,
                      c = s.y + i * Math.sin(s.angle) * t,
                      m = new Entity(
                        {
                          x: l,
                          y: c,
                        },
                        this
                      );
                    switch (
                      ((m.facing = Math.atan2(a.y - c, a.x - l)),
                      (m.color = this.master.color),
                      m.define(Class.hitScanBullet),
                      m.define({
                        BODY: e.interpret(e.settings2),
                        SKILL: e.getSkillRaw(),
                        SIZE: (this.size * e.width * e.settings2.size) / 2,
                        LABEL:
                          this.label +
                          (e.label ? " " + e.label : "") +
                          " " +
                          m.label,
                      }),
                      m.refreshBodyAttributes(),
                      m.life(),
                      (m.source = this),
                      d)
                    ) {
                      case 1:
                        t % 5 == 0 && h(m, n % 2 == 0);
                        break;
                      case 2:
                        t === o - 1 && r(m);
                        break;
                      case 3:
                        t % 3 == 0 && r(m);
                    }
                  }, 10 * t);
              }
              break;
            case "crescent":
              this.isAlive() && this.define(Class.crescentFire);
              break;
            case "revo":
              this.isAlive() && this.define(Class.baseThrowerFire);
              break;
            case "mei":
              this.isAlive() && this.define(Class.meiFire);
              break;
            case "kashmir":
              this.isAlive() && this.define(Class.kashmir1);
              break;
            case "aka":
            case "aka2":
              for (let e = 1; e < 31; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    (31 !== e && (this.upgrades = []),
                    this.define(Class[`aka${"aka" === t ? e : 30 - e}`]));
                }, 14 * e);
              break;
            case "shovel":
            case "shovel2":
              for (let e = 1; e < 31; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    (31 !== e && (this.upgrades = []),
                    this.define(Class[`shovel${"shovel" === t ? e : 30 - e}`]));
                }, 14 * e);
              break;
            case "trap":
            case "trap2":
              for (let e = 1; e < 82; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    ("trap2" === t && 81 === e && (this.upgrades = []),
                    this.define(Class[`trapeze${"trap" === t ? e : 81 - e}`]));
                }, 7 * e);
              break;
            case "aero":
            case "aero2":
              for (let e = 1; e < 82; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    ("aero2" === t && 81 === e && (this.upgrades = []),
                    this.define(Class[`aerobat${"aero" === t ? e : 81 - e}`]));
                }, 7 * e);
              break;
            case "exteng":
            case "exteng2":
              for (let e = 1; e < 41; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(Class[`exteng${"exteng" === t ? e : 40 - e}`]);
                }, 28 * e);
              break;
            case "hepta":
            case "hepta2":
              for (let e = 1; e < 32; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(
                      Class[`heptazoid${"hepta" === t ? e : 31 - e}`]
                    );
                }, 7 * e);
              break;
            case "sab":
            case "sab2":
              for (let e = 1; e < 31; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(Class[`sab${"sab" === t ? e : 30 - e}`]);
                }, 14 * e);
              break;
            case "ek":
            case "ek2":
              for (let e = 1; e < 102; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(Class[`ekAnim${"ek" === t ? e : 101 - e}`]);
                }, 36 * e);
              break;
            case "nok":
            case "nok2":
              for (let e = 1; e < 31; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(Class[`nok${"nok" === t ? e : 30 - e}`]);
                }, 14 * e);
              break;
            case "tam":
            case "tam2":
              for (let e = 1; e < 31; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(Class[`tam${"tam" === t ? e : 30 - e}`]);
                }, 14 * e);
              break;
            case "hand":
            case "hand2":
            case "hand3":
            case "hand4":
              {
                let e =
                    "hand2" === t
                      ? 20
                      : "hand3" === t
                      ? 40
                      : "hand4" === t
                      ? 60
                      : 0,
                  s =
                    "Auto-Glove" === this.label ? "autoHandBasic" : "handBasic";
                for (let t = 1; t < 21; t++)
                  setTimeout(() => {
                    this.isAlive() && this.define(Class[`${s}${t + e}`]);
                  }, 20 * this.skill.rld * t);
              }
              break;
            case "hand5":
              (this.upgrades = []),
                this.isAlive() &&
                  this.define(
                    "Auto-Glove" === this.label
                      ? Class.autoHandBasic0
                      : Class.handBasic0
                  );
              break;
            case "oxy":
              this.isAlive() && this.define(Class.greenGuardianLauncher);
              break;
            case "oxy2":
              this.isAlive() && this.define(Class.greenMiniGuardianLauncher);
              break;
            case "bite":
            case "bite2":
              for (let e = 1; e < 31; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(Class[`bite${"bite" === t ? e : 30 - e}`]);
                }, 14 * e);
              break;
            case "mar":
            case "mar2":
              for (let e = 1; e < 31; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(Class[`mar${"mar" === t ? e : 30 - e}`]);
                }, 14 * e);
              break;
            case "zke":
            case "zke2":
              for (let e = 1; e < 32; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(Class[`zke${"zke" === t ? e : 31 - e}`]);
                }, 14 * e);
              break;
            case "val":
            case "val2":
              for (let e = 1; e < 32; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(Class[`val${"val" === t ? e : 31 - e}`]);
                }, 14 * e);
              break;
            case "inject":
              setTimeout(() => {
                if (this.isAlive()) {
                  let t = "Atrophy" === this.label ? "atrophy" : "inject";
                  this.define(Class[`${t}${e.inject + 1}`]);
                }
              }, 46 * (Math.exp(this.skill.rld) - 1));
              break;
            case "inject2":
              for (let e = 32; e < 62; e++)
                setTimeout(() => {
                  if (this.isAlive()) {
                    let t = "Atrophy" === this.label ? "atrophy" : "inject";
                    61 === e && (this.upgrades = []),
                      this.define(Class[`${t}${61 === e ? 0 : e}`]);
                  }
                }, (5 / this.skill.rld) * e);
              break;
            case "steyr":
            case "steyr2":
              for (let e = 1; e < 32; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(Class[`steyr${"steyr" === t ? e : 31 - e}`]);
                }, 14 * e);
              break;
            case "cas":
            case "cas2":
              for (let e = 1; e < 49; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(Class[`castano${"cas" === t ? e : 48 - e}`]);
                }, 28 * e);
              break;
            case "redis":
            case "redis2":
              for (let e = 1; e < 32; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(Class[`trired${"redis" === t ? e : 31 - e}`]);
                }, 14 * e);
              break;
            case "engi":
            case "engi2":
              for (let e of entities)
                e.master.id === this.id && "drone" === e.type && e.kill();
              for (let e = 1; e < 32; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(Class[`engilord${"engi" === t ? e : 31 - e}`]);
                }, 28 * e);
              break;
            case "hybranger":
            case "hybranger2":
              for (let e of entities)
                e.master.id === this.id && "drone" === e.type && e.kill();
              for (let e = 1; e < 32; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(
                      Class[
                        `hybranger${
                          "hybranger" === t ? e : 31 === e ? 0 : e + 31
                        }`
                      ]
                    );
                }, 14 * e);
              break;
            case "stick":
            case "stick2":
              for (let e = 1; e < 32; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(Class[`stick${"stick" === t ? e : 31 - e}`]);
                }, 14 * e);
              break;
            case "what":
              for (let e = 1; e < 16; e++)
                setTimeout(() => {
                  this.isAlive() && this.define(Class[`whatever${e}`]);
                }, 14 * e);
              break;
            case "what2":
              for (let e = 16; e < 32; e++)
                setTimeout(() => {
                  this.isAlive() && this.define(Class[`whatever${e}`]);
                }, 14 * (e - 15));
              break;
            case "what3":
              for (let e = 32; e < 63; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(Class[`whatever${62 === e ? 0 : e}`]);
                }, 14 * (e - 31));
              break;
            case "shape":
            case "shape2":
              for (let e of entities)
                e.master.id === this.id && "drone" === e.type && e.kill();
              for (let e = 1; e < 32; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(
                      Class[`shapeChange${"shape" === t ? e : 31 - e}`]
                    );
                }, 14 * e);
              break;
            case "misi":
            case "misi2":
              for (let e = 1; e < 32; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(Class[`misitor${"misi" === t ? e : 31 - e}`]);
                }, 14 * e);
              break;
            case "surge":
            case "surge2":
              for (let e = 1; e < 21; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(
                      Class[`sniperEMP${"surge" === t ? e : 20 + e}`]
                    );
                }, this.skill.rld * ("surge" === t ? 180 : 60) * e);
              break;
            case "surge3":
              this.isAlive() && this.define(Class.sniperEMP0);
              break;
            case "vymp":
            case "vymp2":
            case "vymp3":
              for (let e = 1; e < 31; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    ("vymp3" === t && 30 === e
                      ? this.define(Class.skimketster0)
                      : this.define(
                          Class[
                            `skimketster${
                              "vymp" === t ? e : "vymp2" === t ? 30 + e : 60 + e
                            }`
                          ]
                        ));
                }, 24 * e);
              break;
            case "led":
            case "led2":
              for (let e = 1; e < 32; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(
                      Class[`ledZeppelin${"led" === t ? e : 31 - e}`]
                    );
                }, 14 * e);
              break;
            case "extend":
            case "extend2":
              for (let e = 1; e < 31; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(
                      Class[`basicRanger${"extend" === t ? e : 30 - e}`]
                    );
                }, 18 * e);
              break;
            case "par":
            case "par2":
              for (let e = 1; e < 31; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(Class[`par${"par" === t ? e : 30 - e}`]);
                }, 14 * e);
              break;
            case "penta":
            case "penta2":
              for (let e = 1; e < 32; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(
                      Class[`pentaBoost${"penta" === t ? e : 31 - e}`]
                    );
                }, 14 * e);
              break;
            case "sennex":
            case "sennex2":
              for (let e = 1; e < 32; e++)
                setTimeout(() => {
                  this.isAlive() &&
                    this.define(
                      Class[`boomerHurricane${"sennex" === t ? e : 31 - e}`]
                    );
                }, 26 * e);
              break;
            default:
              util.warn("Unknown ON_SHOOT value: " + t + "!"), (t = null);
          }
      }
    }
    const logs = (() => {
        const e = () => {
          let e = {
            data: [],
            time: util.time(),
            count: 0,
          };
          return {
            set: () => {
              e.time = util.time();
            },
            mark: () => {
              var t;
              (t = e).data.push(util.time() - t.time);
            },
            record: () =>
              ((e) => {
                let t = util.averageArray(e.data);
                return (e.data = []), t;
              })(e),
            sum: () =>
              ((e) => {
                let t = util.sumArray(e.data);
                return (e.data = []), t;
              })(e),
            count: () =>
              ((e) => {
                let t = e.count;
                return (e.count = 0), t;
              })(e),
            tally: () => {
              e.count++;
            },
          };
        };
        return {
          entities: e(),
          collide: e(),
          network: e(),
          minimap: e(),
          physics: e(),
          life: e(),
          selfie: e(),
          master: e(),
          activation: e(),
          loops: e(),
        };
      })(),
      newLogs = (function () {
        class e {
          constructor(e) {
            (this.name = e),
              (this.startAt = 0),
              (this.time = 0),
              (this.totalTime = 0),
              (this.count = 0);
          }
          start() {
            this.startAt = Date.now();
          }
          stop() {
            (this.time += Date.now() - this.startAt),
              (this.totalTime += this.time),
              this.tally();
          }
          get average() {
            return 0 == this.totalTime || 0 == this.count
              ? 0
              : this.totalTime / this.count;
          }
          tally() {
            this.count++;
          }
          reset() {
            this.startAt = this.time = 0;
          }
        }
        return {
          broadcast: new e("Minimaps & Leaderboards"),
          collision: new e("Collision"),
          location: new e("Entity.prototype.location()"),
          death: new e("Entity.prototype.death()"),
          destroy: new e("Entity.prototype.destroy()"),
          activation: new e("Activation"),
          controllers: new e("AI and Controllers"),
          physics: new e("Physics"),
          camera: new e("Selfie snap :D"),
          network: new e("Socket bs"),
          buildList: new e("BuildList"),
          targeting: new e("Targeting"),
          aspects: new e("Guns and Turrets"),
        };
      })(),
      lazyRealSizes = (() => {
        let e = [1, 1, 1];
        for (let t = 3; t < 17; t++)
          e.push(
            Math.sqrt(((2 * Math.PI) / t) * (1 / Math.sin((2 * Math.PI) / t)))
          );
        return e;
      })(),
      exportDefintionsToClient = (e, t = !1) => {
        util.log("Non dev build, we will not attempt to generate mockups.");
      };
    exportDefintionsToClient("./combined/client/json/mockups.json", !0);
    const sockets = (() => {
        const e = require("./lib/fasttalk"),
          t = [],
          s = [];
        let i = Date.now();
        class a {
          constructor(e, t) {
            (this.id = e), (this.ip = t), s.push(this);
          }
        }
        let o = 0;

        function r(e) {
          let t = [e.type];
          if (1 & e.type) t.push(+e.facing.toFixed(2), e.layer);
          else {
            const s = [
              e.id,
              0,
              e.index,
              (e.x + 0.5) | 0,
              (e.y + 0.5) | 0,
              (e.vx + 0.5) | 0,
              (e.vy + 0.5) | 0,
              e.size,
              +e.facing.toFixed(2),
            ];
            e.twiggle && (s[1] += 1),
              0 !== e.layer && ((s[1] += 2), s.push(e.layer)),
              s.push(e.color),
              e.health < 0.975 &&
                ((s[1] += 4), s.push(Math.ceil(255 * e.health))),
              e.shield < 0.975 &&
                ((s[1] += 8), s.push(Math.ceil(255 * e.shield))),
              e.alpha < 0.975 &&
                ((s[1] += 16), s.push(Math.ceil(255 * e.alpha))),
              e.seeInvisible && (s[1] += 32),
              "#FFFFFF" !== e.nameColor && ((s[1] += 64), s.push(e.nameColor)),
              1 !== e.sizeRatio[0] && ((s[1] += 128), s.push(e.sizeRatio[0])),
              1 !== e.sizeRatio[1] && ((s[1] += 256), s.push(e.sizeRatio[1])),
              t.push(...s),
              4 & e.type && t.push(e.name || "", e.score || 0);
          }
          let s = [e.guns.length];
          for (let t = 0, i = e.guns.length; t < i; t++)
            s.push((e.guns[t].time + 0.5) | 0, (e.guns[t].power + 0.5) | 0);
          t.push(...s);
          let i = [e.turrets.length];
          for (let t = 0, s = e.turrets.length; t < s; t++)
            i.push(...r(e.turrets[t]));
          return t.push(...i), t;
        }

        function n(e, t, s) {
          return (
            null != t.body &&
              t.body.id === e.master.id &&
              ((s = s.slice()),
              t.command.autospin && s[2] % 2 == 0 && (s[2] += 1),
              "ffa" === room.gameMode &&
                "FFA_RED" === t.body.color &&
                (s[2 & s[2] ? 11 : 10] = t.teamColor)),
            s
          );
        }
        const l = (e, t) =>
          Math.abs(t.x - e.x) <
            0.6 * e.fov + t.size * (t.width || 1) * 1.5 + 100 &&
          Math.abs(t.y - e.y) <
            0.6 * e.fov * 0.5625 + t.size * (t.height || 1) * 1.5 + 100;
        class h {
          constructor(e, t) {
            if (
              (console.log("New socket initiated!"),
              (this.id = o++),
              (this._socket = e),
              (this._request = t),
              (this._socket.binaryType = "arraybuffer"),
              !(function (e) {
                let t = [
                    "woomy.surge.sh",
                    "woomy-arras.netlify.app",
                    "localhost:3000",
                    "127.0.0.1:3000",
                    "localhost:3001",
                  ],
                  s = [0, 0];
                if (e.headers.origin)
                  for (let i of t) e.headers.origin.includes(i) && s[0]++;
                if (e.headers["user-agent"])
                  for (let t of ["Mozilla", "AppleWebKit", "Chrome", "Safari"])
                    e.headers["user-agent"].includes(t) && s[1]++;
                return !0; //!(has[0] !== 1 || has[1] === 0);
              })(t))
            )
              return (
                this.talk("P", "Connection too unstable to be verified."),
                util.warn(
                  "User tried to connect to the game from an invalid client!"
                ),
                void e.terminate()
              );
            try {
              this.ip = (t.headers,
              {
                ip: "127.0.0.1",
              }).ip;
            } catch (t) {
              return (
                this.talk("P", "Invalid IP, connection terminated."),
                util.warn("Invalid IP, connection terminated.\n" + t),
                void e.terminate()
              );
            }
            (i = Date.now()),
              (this._socket.msgToServer = (e) => this.incoming(e)),
              this._socket.on("close", () => {
                this.loops.terminate(), this.close();
              }),
              this._socket.on("error", (e) => {
                util.error("" + e),
                  "logDisconnect" in global && global.logDisconnect(e);
              }),
              (this.camera = {
                x: void 0,
                y: void 0,
                vx: 0,
                vy: 0,
                lastUpdate: util.time(),
                lastDowndate: void 0,
                fov: 2e3,
              }),
              (this.betaData = {
                permissions: 0,
                nameColor: "#FFFFFF",
                discordID: -1,
              }),
              (this.player = {
                camera: {},
                id: this.id,
              }),
              (this.status = {
                verified: !1,
                receiving: 0,
                deceased: !0,
                requests: 0,
                hasSpawned: !1,
                needsFullMap: !0,
                needsFullLeaderboard: !0,
                needsNewBroadcast: !0,
                lastHeartbeat: util.time(),
              }),
              (this.loops = (() => {
                let e = null,
                  t = setInterval(
                    () =>
                      ((e) => {
                        let t = 0;
                        return () =>
                          util.time() - e.status.lastHeartbeat >
                          c.maxHeartbeatInterval
                            ? (e.error(
                                "traffic evaluation",
                                "Heartbeat lost",
                                !0
                              ),
                              0)
                            : (e.status.requests > 50 ? t++ : (t = 0),
                              t > 3
                                ? (e.error(
                                    "traffic evaluation",
                                    "Socket traffic volume violation",
                                    !0
                                  ),
                                  0)
                                : void (e.status.requests = 0));
                      })(this),
                    1500
                  );
                return {
                  setUpdate: (t) => {
                    e = t;
                  },
                  cancelUpdate: () => {
                    clearTimeout(e);
                  },
                  terminate: () => {
                    clearTimeout(e), clearTimeout(t);
                  },
                };
              })()),
              this.makeView(),
              (this.spawnCount = 0),
              (this.name = "undefined"),
              (this.update = (e) => {
                this.loops.cancelUpdate(),
                  this.loops.setUpdate(
                    setTimeout(() => {
                      this.view.gazeUpon();
                    }, e)
                  );
              }),
              (this.inactivityTimeout = null),
              (this.beginTimeout = () => {
                this.inactivityTimeout = setTimeout(() => {
                  this.talk("P", "You were disconnected for inactivity."),
                    this.kick("Kicked for inactivity!");
                }, 1e3 * (c.INACTIVITY_TIMEOUT || 360));
              }),
              (this.endTimeout = () => clearTimeout(this.inactivityTimeout)),
              (this.backlogData = new a(this.id, this.ip)),
              clients.push(this);
          }
          get readableID() {
            return `Socket (${this.id}) [${this.name || "Unnamed Player"}]: `;
          }
          get open() {
            return !0;
          }
          talk(...t) {
            this.open && this._socket.send(e.encode(t), "server");
          }
          lastWords(...t) {
            this.open && this._socket.send(e.encode(t), "server");
          }
          error(e = "unknown", t = "unspecified", s = !1) {
            this.talk(
              "P",
              `Something went wrong during the ${e} process: ${t}. ${
                s ? "Please report this bug if it continues to occur." : ""
              }`
            ),
              this.kick(t + "!");
          }
          kick(e = "Unspecified.") {
            util.warn(this.readableID + "has been kicked. Reason: " + e),
              this.lastWords("K");
          }
          ban(e) {
            util.warn(this.readableID + "has been banned. Reason: " + e),
              t.push({
                ip: this.ip,
                reason: e,
              }),
              this.lastWords("K");
          }
          close() {
            let e = this.player,
              t = players.indexOf(e),
              s = e.body;
            if (-1 !== t) {
              let t = !1;
              null != s && s.skill.score < 5e3 && (t = !0),
                setTimeout(
                  () => {
                    null != s && (s.underControl ? s.relinquish(e) : s.kill());
                  },
                  t ? 1 : c.disconnectDeathTimeout
                ),
                null != this.inactivityTimeout && this.endTimeout();
            }
            util.info(
              this.readableID +
                "has disconnected! Players: " +
                (clients.length - 1).toString()
            ),
              (players = players.filter((e) => e.id !== this.id)),
              (clients = clients.filter((e) => e.id !== this.id)),
              (views = views.filter((e) => e.id !== this.id));
          }
          closeWithReason(e) {
            this.talk("P", e), this.kick(e);
          }
          makeGUI() {
            const e = [
                "atk",
                "hlt",
                "spd",
                "str",
                "pen",
                "dam",
                "rld",
                "mob",
                "rgn",
                "shi",
              ],
              t = {
                _: {},
                get: (e) => {
                  const s = null != t._[e] && t._[e].update && t._[e].value;
                  return (t._[e].update = !1), s;
                },
                set: (e, s) => {
                  if (t._[e]) {
                    let i = !1;
                    if (
                      (s instanceof Array
                        ? (i =
                            s.length !== t._[e].value.length ||
                            s.some((s, i) => t._[e].value[i] !== s))
                        : s !== t._[e].value && (i = !0),
                      !i)
                    )
                      return;
                  }
                  t._[e] = {
                    update: !0,
                    value: s,
                  };
                },
              };
            return () => {
              let s,
                i = [0],
                a = this.player && this.player.body;
              return (
                t.set("mspt", room.mspt),
                a &&
                  (t.set("label", [
                    a.index,
                    null != this.player.teamColor
                      ? this.player.teamColor
                      : a.color,
                    a.id,
                  ]),
                  t.set("score", a.skill.score),
                  t.set("points", a.skill.points),
                  t.set(
                    "upgrades",
                    a.upgrades
                      .filter((e) => e.level <= a.skill.level)
                      .map((e) => e.index + room.manualOffset)
                  ),
                  t.set(
                    "skillNames",
                    e
                      .map((e) => [
                        a.skill.title(e),
                        a.skill.cap(e),
                        a.skill.cap(e, !0),
                      ])
                      .flat()
                  ),
                  t.set(
                    "skills",
                    (function (e) {
                      let t = 0;
                      return (
                        (t += 1 * e.skill.amount("atk")),
                        (t += 16 * e.skill.amount("hlt")),
                        (t += 256 * e.skill.amount("spd")),
                        (t += 4096 * e.skill.amount("str")),
                        (t += 65536 * e.skill.amount("pen")),
                        (t += 1048576 * e.skill.amount("dam")),
                        (t += 16777216 * e.skill.amount("rld")),
                        (t += 268435456 * e.skill.amount("mob")),
                        (t += 4294967296 * e.skill.amount("rgn")),
                        (t += 68719476736 * e.skill.amount("shi")),
                        t.toString(36)
                      );
                    })(a)
                  )),
                (s = t.get("mspt")),
                null != s && !1 !== s && ((i[0] += 1), i.push(s)),
                (s = t.get("label")),
                null != s && !1 !== s && ((i[0] += 2), i.push(...s)),
                (s = t.get("score")),
                null != s && !1 !== s && ((i[0] += 4), i.push(s)),
                (s = t.get("points")),
                null != s && !1 !== s && ((i[0] += 8), i.push(s)),
                (s = t.get("upgrades")),
                null != s && !1 !== s && ((i[0] += 16), i.push(s.length, ...s)),
                (s = t.get("skillNames")),
                null != s && !1 !== s && ((i[0] += 32), i.push(...s)),
                (s = t.get("skills")),
                null != s && !1 !== s && ((i[0] += 64), i.push(s)),
                i
              );
            };
          }
          makeView() {
            let e = [];
            (this.view = {
              id: this.id,
              setView: (t) => (e = t),
              add: (t) => l(this.camera, t) && e.push(t),
              remove: (t) => {
                let s = e.indexOf(t);
                s > -1 && util.remove(e, s);
              },
              check: (e) => l(this.camera, e),
              gazeUpon: () => {
                newLogs.network.start();
                let t = this.player,
                  s = this.camera,
                  i = room.lastCycle;
                (s.lastUpdate = i), this.status.receiving++;
                let a = s.fov;
                if (null != t.body) {
                  if (t.body.isDead() && !this.status.deceased) {
                    this.status.deceased = !0;
                    const e = t.records();
                    if ((this.talk("F", ...e), e[0] > 3e5)) {
                      const s = Math.round(e[2] + e[3] / 2 + 2 * e[4]);
                      s >= Math.floor(e[0] / 1e5) &&
                        sendRecordValid({
                          name: this.name || "Unnamed",
                          tank: t.body.label,
                          score: e[0],
                          totalKills: s,
                          timeAlive: util.formatTime(1e3 * e[1]),
                        }),
                        "No Death Log" !== t.body.miscIdentifier &&
                          util.info(
                            trimName(t.body.name) +
                              " has died. Final Score: " +
                              t.body.skill.score +
                              ". Tank Used: " +
                              t.body.label +
                              ". Players: " +
                              clients.length +
                              "."
                          ),
                        this.beginTimeout(),
                        (t.body = null);
                    }
                  } else if (
                    t.body.photo &&
                    ((s.x = t.body.photo.cx),
                    (s.y = t.body.photo.cy),
                    (s.vx = t.body.photo.vx),
                    (s.vy = t.body.photo.vy),
                    (a = t.body.fov),
                    null !== t.body.submarine &&
                      (t.body.submarine.submerged && (a /= 1.25),
                      t.body.submarine.hydro.enabled &&
                        (a *= t.body.submarine.submerged ? 2 : 1.5)),
                    (t.viewId = t.body.id),
                    t.body.guns.find(
                      (e) => "string" == typeof e.launchSquadron
                    ))
                  )
                    if (t.body.strikeCarrier) {
                      let e = {};
                      for (let s of t.body.guns)
                        if ("string" == typeof s.launchSquadron) {
                          e[s.launchSquadron] = e[s.launchSquadron] || [];
                          let t = 10 + s.countsOwnKids * s.coolDown.max,
                            i = Math.round(
                              (Date.now() - s.coolDown.time) / 1e3
                            );
                          e[s.launchSquadron].push(t - i);
                        }
                      let s = [];
                      for (let t in e) s.push(t, e[t].length, ...e[t]);
                      this.talk("cv", 1, ...s);
                    } else
                      this.talk(
                        "cv",
                        0,
                        1,
                        ...t.body.guns
                          .map(function (e) {
                            if ("string" == typeof e.launchSquadron) {
                              let t = 10 + e.countsOwnKids * e.coolDown.max,
                                s = Math.round(
                                  (Date.now() - e.coolDown.time) / 1e3
                                );
                              if (t - s >= -1) return [e.launchSquadron, t - s];
                            }
                          })
                          .filter((e) => !!e)
                          .flat()
                      );
                } else a = 1e3;
                s.fov += Math.max(0.03 * (a - s.fov), a - s.fov);
                let o = [];
                for (let s = 0, i = e.length; s < i; s++)
                  if (
                    !(
                      (t.body && !t.body.seeInvisible && e[s].alpha < 0.1) ||
                      (c.RANKED_BATTLE && e[s].roomId !== socket.roomId)
                    ) &&
                    e[s].photo
                  ) {
                    e[s].flattenedPhoto ||
                      (e[s].flattenedPhoto = r(e[s].photo));
                    let i = n(e[s], t, e[s].flattenedPhoto);
                    i && o.push(i);
                  }
                let l = o.length;
                if (
                  (null != t.body &&
                  "string" == typeof t.body.displayText &&
                  "" != t.body.displayText
                    ? this.talk("displayTextUI", !0, t.body.displayText)
                    : this.talk("displayTextUI", !1),
                  null != this.body &&
                    t.body.submarine &&
                    t.body.submarine.maxAir > 0)
                ) {
                  const e = t.body.submarine;
                  this.talk(
                    "sub",
                    !0,
                    e.air,
                    e.submerged,
                    e.hydro.duration > 0,
                    e.hydro.enabled,
                    e.hydro.time,
                    e.hydro.duration
                  );
                } else this.talk("sub", !1);
                this.talk(
                  "u",
                  !(null == t.body || !t.body.controllingSquadron),
                  null != t.body && null != t.body.cameraShiftFacing,
                  i,
                  s.x,
                  s.y,
                  a,
                  s.vx,
                  s.vy,
                  ...t.gui(),
                  l,
                  ...o.flat()
                ),
                  newLogs.network.stop();
              },
            }),
              views.push(this.view);
          }
          incoming(t) {
            if (typeof t === Uint8Array)
              return socket.error("initialization", "Non-binary packet", !0), 1;
            let s = e.decode(t);
            if (null == s || -1 === s)
              return socket.error("initialization", "Malformed packet", !0), 1;
            let i = this.player,
              a = i.body,
              o = null != a && a.health.amount > 0 && !a.isGhost,
              r = s.shift();
            switch (r) {
              case "k":
                {
                  if (room.arenaClosed) return;
                  if (2 !== s.length)
                    return (
                      this.error(
                        "token verification",
                        "Ill-sized token request",
                        !0
                      ),
                      1
                    );
                  let e = s[0];
                  if ("string" != typeof e)
                    return (
                      this.error(
                        "token verification",
                        "Non-string token was offered"
                      ),
                      1
                    );
                  if (e.length > 64)
                    return (
                      this.error(
                        "token verification",
                        "Overly-long token offered"
                      ),
                      1
                    );
                  if (this.status.verified)
                    return (
                      this.error("spawn", "Duplicate spawn attempt", !0), 1
                    );
                  this.key = e.substr(0, 64);
                  let t =
                    tokens.BETA.find((e) => e[0] === this.key) ||
                    (this.key === tokens.oblivion_2 && [
                      tokens.oblivion_2,
                      3,
                      "#FFFFFF",
                      -1,
                    ]);
                  if (t)
                    this.betaData = {
                      permissions: room.testingMode || 3 === t[1] ? t[1] : 0,
                      nameColor: t[2],
                      discordID: t[3],
                      name: t[4],
                    };
                  else {
                    let e = accountEncryption.decode(this.key);
                    e.startsWith("PASSWORD_") &&
                      e.endsWith("_PASSWORD") &&
                      ((e = e
                        .replace("PASSWORD_", "")
                        .replace("_PASSWORD", "")
                        .split("-")),
                      (this.betaData = {
                        permissions: 0,
                        nameColor: "#FFFFFF",
                        discordID: e[0],
                      }));
                  }
                  if (
                    clients.length > c.connectionLimit ||
                    players.length > c.connectionLimit
                  ) {
                    if (!t)
                      return (
                        this.closeWithReason(
                          `The connection limit (${c.connectionLimit} Players) has been reached. Please try again later.`
                        ),
                        1
                      );
                    util.warn(
                      "A player with the token " +
                        socket.key +
                        " has bypassed the connection limit!"
                    );
                  }
                  if (!t && room.testingMode)
                    return (
                      this.closeWithReason(
                        "This server is currently closed to the public; no players may join."
                      ),
                      1
                    );
                  if (
                    -1 !== multitabIDs.indexOf(s[1]) &&
                    this.betaData.permissions < 1
                  )
                    return (
                      this.closeWithReason("Please only use one tab at once!"),
                      1
                    );
                  (this.identification = s[1]),
                    (this.verified = !0),
                    this.talk("w", !c.RANKED_BATTLE || "queue"),
                    e &&
                      util.info(
                        "A socket was verified with the token: " +
                          this.betaData.name || "Unknown Token."
                      );
                }
                break;
              case "j":
                "ready" === this.roomId && (this.roomId = null);
                break;
              case "s":
                {
                  let e = "";
                  s[0] = s[0].split(",");
                  for (let t = 0; t < s[0].length; t++)
                    e += String.fromCharCode(s[0][t]);
                  if (!this.status.deceased)
                    return (
                      this.error(
                        "spawn",
                        "Trying to spawn while already alive",
                        !0
                      ),
                      1
                    );
                  if (2 !== s.length)
                    return (
                      this.error("spawn", "Ill-sized spawn request", !0), 1
                    );
                  let t = s[1];
                  if (
                    ((e =
                      3 === this.betaData.permissions
                        ? e
                        : util.cleanString(e)),
                    room.arenaClosed)
                  )
                    return (
                      this.closeWithReason(
                        `The arena is closed. You may ${
                          t ? "join" : "rejoin"
                        } once the server restarts.`
                      ),
                      1
                    );
                  if ("string" != typeof e)
                    return (
                      this.error("spawn", "Non-string name provided", !0), 1
                    );
                  if (encodeURI(e).split(/%..|./).length > 25)
                    return this.error("spawn", "Overly-long name"), 1;
                  if (0 !== t && 1 !== t)
                    return this.error("spawn", "Invalid isNew value", !0), 1;
                  for (let t of blockedNames)
                    if (e.toLowerCase().includes(t))
                      return (
                        this.error(
                          "spawn",
                          "Inappropriate name (" + trimName(e) + ")"
                        ),
                        1
                      );
                  (this.status.deceased = !1),
                    -1 !== players.indexOf(this.player) &&
                      util.remove(players, players.indexOf(this.player)),
                    -1 !== views.indexOf(this.view) &&
                      (util.remove(views, views.indexOf(this.view)),
                      this.makeView()),
                    (this.player = this.spawn(e)),
                    t &&
                      this.talk(
                        "R",
                        room.width,
                        room.height,
                        JSON.stringify(c.ROOM_SETUP),
                        JSON.stringify(util.serverStartTime),
                        this.player.body.label,
                        room.speed
                      ),
                    util.info(
                      trimName(e) +
                        (t ? " joined" : " rejoined") +
                        " the game! Player ID: " +
                        (entitiesIdLog - 1) +
                        ". Players: " +
                        clients.length +
                        "."
                    ),
                    (this.spawnCount += 1),
                    (this.name = trimName(e)),
                    null != this.inactivityTimeout && this.endTimeout();
                  let i = this.player.body;
                  switch (
                    ((i.nameColor = this.betaData.nameColor), this.name)
                  ) {
                    case "4NAX":
                      i.nameColor = "#FF9999";
                      break;
                    case "Silvy":
                      i.nameColor = "#99F6FF";
                      break;
                    case "SkuTsu":
                      i.nameColor = "#b2f990";
                  }
                }
                break;
              case "p":
                if (1 !== s.length)
                  return (
                    this.error("ping calculation", "Ill-sized ping", !0), 1
                  );
                if ("number" != typeof s[0])
                  return (
                    this.error(
                      "ping calculation",
                      "Non-numeric ping value",
                      !0
                    ),
                    1
                  );
                this.talk("p", s[0]), (this.status.lastHeartbeat = util.time());
                break;
              case "C":
                {
                  if (3 !== s.length)
                    return (
                      this.error(
                        "command handling",
                        "Ill-sized command packet",
                        !0
                      ),
                      1
                    );
                  let e = {
                      x: s[0],
                      y: s[1],
                    },
                    t = s[2];
                  if (
                    "number" != typeof e.x ||
                    "number" != typeof e.y ||
                    isNaN(e.x) ||
                    isNaN(e.y) ||
                    "number" != typeof t
                  )
                    return this.kick("Weird downlink."), 1;
                  if (t >= 255)
                    return this.kick("Malformed command packet."), 1;
                  (i.target = e),
                    null != i.command &&
                      null != i.body &&
                      ((i.command.up = 1 & t),
                      (i.command.down = (2 & t) >> 1),
                      (i.command.left = (4 & t) >> 2),
                      (i.command.right = (8 & t) >> 3),
                      (i.command.lmb = (16 & t) >> 4),
                      (i.command.mmb = (32 & t) >> 5),
                      (i.command.rmb = (64 & t) >> 6));
                }
                break;
              case "t":
                {
                  if (1 !== s.length)
                    return (
                      this.error("control toggle", "Ill-sized toggle", !0), 1
                    );
                  let e = "",
                    t = s[0];
                  if ("number" != typeof t)
                    return (
                      this.error(
                        "control toggle",
                        "Non-numeric toggle value",
                        !0
                      ),
                      1
                    );
                  if (!o) return;
                  switch (t) {
                    case 0:
                      e = "autospin";
                      break;
                    case 1:
                      e = "autofire";
                      break;
                    case 2:
                      e = "override";
                      break;
                    default:
                      return (
                        this.error(
                          "control toggle",
                          `Unknown toggle value (${t})`,
                          !0
                        ),
                        1
                      );
                  }
                  null != i.command &&
                    ((i.command[e] = !i.command[e]),
                    a.sendMessage(
                      e.charAt(0).toUpperCase() +
                        e.slice(1) +
                        (i.command[e] ? ": ON" : ": OFF")
                    ));
                }
                break;
              case "sub":
                null != i.body &&
                  i.body.submarine &&
                  i.body.submarine.maxAir > 0 &&
                  (0 === s[0]
                    ? (i.body.submarine.submerged = !i.body.submarine.submerged)
                    : i.body.submarine.hydro.duration > 0 &&
                      i.body.submarine.hydro.time ===
                        i.body.submarine.hydro.duration &&
                      (i.body.submarine.hydro.enabled = !0));
                break;
              case "cv":
                if ("number" != typeof s[0])
                  return this.kick("Invalid CV request."), 1;
                if (i.body)
                  if (0 === s[0])
                    switch (s[1]) {
                      case "relinquish":
                        {
                          i.body.controllingSquadron = !1;
                          const e = i.body.guns.find(
                            (e) => e.launchSquadron && e.children.length
                          );
                          if (e) {
                            for (const t of e.children) t.kill();
                            i.body.sendMessage("Squadron relinquished.");
                          }
                        }
                        break;
                      case "diveBomb":
                      case "carpetBomb":
                      case "skipBomb":
                        {
                          const e = i.body.guns.find(
                            (e) => e.launchSquadron === s[1]
                          );
                          if (
                            e &&
                            Date.now() - e.coolDown.time >=
                              1e4 + e.countsOwnKids * (1e3 * e.coolDown.max) &&
                            !i.body.controllingSquadron &&
                            !i.body.isInMyBase()
                          ) {
                            e.coolDown.time = Date.now();
                            let t =
                                e.offset *
                                  Math.cos(
                                    e.direction + e.angle + e.body.facing
                                  ) +
                                (1.5 * e.length -
                                  (e.width * e.settings.size) / 2) *
                                  Math.cos(e.angle + e.body.facing),
                              s =
                                e.offset *
                                  Math.sin(
                                    e.direction + e.angle + e.body.facing
                                  ) +
                                (1.5 * e.length -
                                  (e.width * e.settings.size) / 2) *
                                  Math.sin(e.angle + e.body.facing),
                              a = [];
                            for (let i = 0; i < e.countsOwnKids; i++)
                              a.push(e.fire(t, s, e.body.skill, !0));
                            a.forEach((e, t) => {
                              const s = ((2 * Math.PI) / a.length) * t;
                              (e.x = i.body.x + Math.cos(s) * (4 * e.SIZE)),
                                (e.y = i.body.y + Math.sin(s) * (4 * e.SIZE));
                            }),
                              (i.body.controllingSquadron = !0),
                              i.body.sendMessage("Right click to fire."),
                              i.body.sendMessage("Squadron airborne.");
                          }
                        }
                        break;
                      case "torpedo":
                      case "missile":
                        {
                          const e = i.body.guns.find(
                            (e) => e.launchSquadron === s[1]
                          );
                          if (
                            e &&
                            Date.now() - e.coolDown.time >=
                              1e4 + e.countsOwnKids * (1e3 * e.coolDown.max) &&
                            !i.body.controllingSquadron &&
                            !i.body.isInMyBase()
                          ) {
                            e.coolDown.time = Date.now();
                            let t =
                                e.offset *
                                  Math.cos(
                                    e.direction + e.angle + e.body.facing
                                  ) +
                                (1.5 * e.length -
                                  (e.width * e.settings.size) / 2) *
                                  Math.cos(e.angle + e.body.facing),
                              s =
                                e.offset *
                                  Math.sin(
                                    e.direction + e.angle + e.body.facing
                                  ) +
                                (1.5 * e.length -
                                  (e.width * e.settings.size) / 2) *
                                  Math.sin(e.angle + e.body.facing),
                              a = [];
                            for (let i = 0; i < e.countsOwnKids; i++)
                              a.push(e.fire(t, s, e.body.skill, !0));
                            a.forEach((e, t) => {
                              const s = ((2 * Math.PI) / a.length) * t;
                              (e.x = i.body.x + Math.cos(s) * (4 * e.SIZE)),
                                (e.y = i.body.y + Math.sin(s) * (4 * e.SIZE));
                            }),
                              (i.body.controllingSquadron = !0),
                              i.body.sendMessage("Right click to fire."),
                              i.body.sendMessage("Squadron airborne.");
                          }
                        }
                        break;
                      case "rocket":
                      case "mine": {
                        const e = i.body.guns.find(
                          (e) => e.launchSquadron === s[1]
                        );
                        if (
                          e &&
                          Date.now() - e.coolDown.time >=
                            1e4 + e.countsOwnKids * (1e3 * e.coolDown.max) &&
                          !i.body.controllingSquadron &&
                          !i.body.isInMyBase()
                        ) {
                          e.coolDown.time = Date.now();
                          let t =
                              e.offset *
                                Math.cos(
                                  e.direction + e.angle + e.body.facing
                                ) +
                              (1.5 * e.length -
                                (e.width * e.settings.size) / 2) *
                                Math.cos(e.angle + e.body.facing),
                            s =
                              e.offset *
                                Math.sin(
                                  e.direction + e.angle + e.body.facing
                                ) +
                              (1.5 * e.length -
                                (e.width * e.settings.size) / 2) *
                                Math.sin(e.angle + e.body.facing),
                            a = [];
                          for (let i = 0; i < e.countsOwnKids; i++)
                            a.push(e.fire(t, s, e.body.skill, !0));
                          a.forEach((e, t) => {
                            const s = ((2 * Math.PI) / a.length) * t;
                            (e.x = i.body.x + Math.cos(s) * (4 * e.SIZE)),
                              (e.y = i.body.y + Math.sin(s) * (4 * e.SIZE));
                          }),
                            (i.body.controllingSquadron = !0),
                            i.body.sendMessage("Right click to fire."),
                            i.body.sendMessage("Squadron airborne.");
                        }
                      }
                    }
                  else
                    null == i.body.squadronManager &&
                      (i.body.squadronManager = new ioTypes.squadronManager(
                        i.body
                      )),
                      i.body.squadronManager.setSquadron(
                        s[1],
                        s[2],
                        s[3] * room.width,
                        s[4] * room.height
                      );
                break;
              case "U":
                {
                  if (1 !== s.length)
                    return (
                      this.error(
                        "tank upgrade",
                        "Ill-sized tank upgrade request",
                        !0
                      ),
                      1
                    );
                  let e = s[0];
                  if ("number" != typeof e || e < 0)
                    return (
                      this.error(
                        "tank upgrade",
                        `Invalid tank upgrade value (${e})`,
                        !0
                      ),
                      1
                    );
                  null != a && a.upgrade(e);
                }
                break;
              case "x":
                {
                  if (1 !== s.length)
                    return (
                      this.error(
                        "skill upgrade",
                        "Ill-sized skill upgrade request",
                        !0
                      ),
                      1
                    );
                  let e = s[0],
                    t = "";
                  if ("number" != typeof e)
                    return (
                      this.error(
                        "skill upgrade",
                        "Non-numeric stat upgrade value",
                        !0
                      ),
                      1
                    );
                  if (!o) break;
                  switch (e) {
                    case 0:
                      t = "atk";
                      break;
                    case 1:
                      t = "hlt";
                      break;
                    case 2:
                      t = "spd";
                      break;
                    case 3:
                      t = "str";
                      break;
                    case 4:
                      t = "pen";
                      break;
                    case 5:
                      t = "dam";
                      break;
                    case 6:
                      t = "rld";
                      break;
                    case 7:
                      t = "mob";
                      break;
                    case 8:
                      t = "rgn";
                      break;
                    case 9:
                      t = "shi";
                      break;
                    default:
                      return (
                        this.error(
                          "skill upgrade",
                          `Unknown skill upgrade value (${e})`,
                          !0
                        ),
                        1
                      );
                  }
                  a.skillUp(t);
                }
                break;
              case "z":
                if (0 !== s.length)
                  return (
                    this.error(
                      "leaderboard",
                      "Ill-sized leaderboard desync request",
                      !0
                    ),
                    1
                  );
                this.status.needsFullLeaderboard = !0;
                break;
              case "l":
                if (0 !== s.length)
                  return (
                    this.error(
                      "Dominator/Mothership control",
                      "Ill-sized control request",
                      !0
                    ),
                    1
                  );
                if ("tdm" !== room.gameMode || !o) return;
                if (c.serverName.includes("Domination"))
                  if (a.underControl) {
                    let e =
                      room.cardinals[Math.floor((3 * i.body.y) / room.height)][
                        Math.floor((3 * i.body.x) / room.height)
                      ];
                    i.body.sendMessage(
                      "You have relinquished control of the " +
                        e +
                        " Dominator."
                    ),
                      (i.body.FOV = 0.5),
                      util.info(
                        trimName(this.name) +
                          " has relinquished control of a Dominator. Location: " +
                          e +
                          " Dominator. Players: " +
                          clients.length +
                          "."
                      ),
                      this.talk("F", ...i.records()),
                      i.body.relinquish(i);
                  } else {
                    let e = [];
                    for (let t of entities)
                      t.isDominator &&
                        t.team === i.body.team &&
                        !t.underControl &&
                        e.push(t);
                    if (!e.length)
                      return i.body.sendMessage(
                        "No Dominators are available on your team to control."
                      );
                    let t = e[Math.floor(Math.random() * e.length)],
                      s = a.name,
                      o = a.nameColor;
                    (t.underControl = !0),
                      (i.body = t),
                      (a.controllers = []),
                      (a.passive = !1),
                      setTimeout(() => {
                        null != a &&
                          ((a.miscIdentifier = "No Death Log"), a.kill());
                      }, 5e3),
                      (i.body.name = s),
                      (i.body.nameColor = o),
                      (i.body.sendMessage = (e) => this.talk("m", e)),
                      (i.body.controllers = [
                        new ioTypes.listenToPlayerStatic(i.body, i),
                      ]),
                      (i.body.FOV = 1),
                      i.body.refreshFOV(),
                      (i.body.invuln = i.body.godmode = i.body.passive = !1),
                      (i.body.facingType =
                        "Auto-Dominator" === i.body.label
                          ? "autospin"
                          : "toTarget"),
                      i.body.sendMessage(
                        "Press H or reload your game to relinquish control of the Dominator."
                      ),
                      i.body.sendMessage(
                        "You are now controlling the " +
                          room.cardinals[
                            Math.floor((3 * i.body.y) / room.height)
                          ][Math.floor((3 * i.body.x) / room.height)] +
                          " Dominator!"
                      );
                  }
                else if (c.serverName.includes("Mothership"))
                  if (a.underControl)
                    i.body.sendMessage(
                      "You have relinquished control of your team's Mothership."
                    ),
                      util.info(
                        trimName(this.name) +
                          " has relinquished control of their team's Mothership. Players: " +
                          clients.length +
                          "."
                      ),
                      this.talk("F", ...i.records()),
                      i.body.relinquish(i);
                  else {
                    let e = [];
                    for (let t of entities)
                      t.isMothership &&
                        t.team === i.body.team &&
                        !t.underControl &&
                        e.push(t);
                    if (!e.length)
                      return i.body.sendMessage(
                        "Your team's Mothership is unavailable for control."
                      );
                    let t = e[Math.floor(Math.random() * e.length)],
                      s = a.name;
                    (t.underControl = !0),
                      (i.body = t),
                      (a.controllers = []),
                      (a.passive = !1),
                      setTimeout(() => {
                        null != a &&
                          ((a.miscIdentifier = "No Death Log"), a.kill());
                      }, 1e3),
                      (i.body.settings.leaderboardable = !1),
                      (i.body.name = s),
                      (i.body.nameColor = [
                        "#00B0E1",
                        "#F04F54",
                        "#00E06C",
                        "#BE7FF5",
                        "#FFEB8E",
                        "#F37C20",
                        "#E85DDF",
                        "#8EFFFB",
                      ][i.team - 1]),
                      (i.body.sendMessage = (e) => this.talk("m", e)),
                      (i.body.controllers = [
                        new ioTypes.listenToPlayer(i.body, i),
                      ]),
                      i.body.refreshFOV(),
                      (i.body.invuln = i.body.godmode = i.body.passive = !1),
                      (i.body.facingType = "toTarget"),
                      (i.body.skill.points = 0),
                      (i.body.settings.leaderboardable = !0),
                      i.body.sendMessage(
                        "Press H or reload your game to relinquish control of the Mothership."
                      ),
                      i.body.sendMessage(
                        "You are now controlling your team's Mothership!"
                      );
                  }
                break;
              case "L":
                if (0 !== s.length)
                  return (
                    this.error("level up", "Ill-sized level-up request", !0), 1
                  );
                null != a &&
                  !a.underControl &&
                  a.skill.level < c.SKILL_CHEAT_CAP &&
                  ((a.skill.score += a.skill.levelScore),
                  a.skill.maintain(),
                  a.refreshBodyAttributes());
                break;
              case "P":
                if (1 !== s.length)
                  return (
                    this.error(
                      "class tree prompting",
                      "Ill-sized class tree prompt request",
                      !0
                    ),
                    1
                  );
                if (!o) return;
                s[0] &&
                  (a.sendMessage("Press U to close the class tree."),
                  a.sendMessage(
                    "Use the arrow keys to cycle through the class tree."
                  ));
                break;
              case "T":
                if (1 !== s.length)
                  return (
                    this.error(
                      "beta-tester level 1-2 key",
                      "Ill-sized key request",
                      !0
                    ),
                    1
                  );
                if ("number" != typeof s[0])
                  return (
                    this.error(
                      "beta-tester level 1-2 key",
                      "Non-numeric key value",
                      !0
                    ),
                    1
                  );
                if (!o || 0 === this.betaData.permissions) return;
                if (a.underControl)
                  return a.sendMessage(
                    "You cannot use beta-tester keys while controlling a Dominator or Mothership."
                  );
                switch (s[0]) {
                  case 0:
                    switch (
                      (a.define(Class.genericTank),
                      a.define(Class.basic),
                      this.betaData.permissions)
                    ) {
                      case 1:
                        a.upgradeTank(Class.testbed_level_1);
                        break;
                      case 2:
                        a.upgradeTank(
                          "_test" === defsPrefix
                            ? Class.testbed
                            : Class.testbed_level_2
                        );
                        break;
                      case 3:
                        a.upgradeTank(Class.testbed),
                          (a.health.amount = a.health.max),
                          (a.shield.amount = a.shield.max);
                    }
                    a.sendMessage(
                      "DO NOT use OP tanks to repeatedly kill players. It will result in a permanent demotion. Press P to change to Basic and K to suicide."
                    ),
                      "ffa" === room.gameMode
                        ? (a.color = "FFA_RED")
                        : (a.color = [10, 12, 11, 15, 3, 35, 36, 0][
                            i.team - 1
                          ]),
                      util.info(
                        trimName(a.name) +
                          " upgraded to TESTBED. Token: " +
                          this.betaData.name || "Unknown Token"
                      );
                    break;
                  case 1:
                    (a.killedByK = !0),
                      a.kill(),
                      util.info(
                        trimName(a.name) +
                          " used k to suicide. Token: " +
                          this.betaData.name || "Unknown Token"
                      );
                    break;
                  case 2:
                    a.define(Class.genericTank),
                      a.upgradeTank(Class.basic),
                      3 === this.betaData.permissions &&
                        ((a.health.amount = a.health.max),
                        (a.shield.amount = a.shield.max),
                        (a.invuln = !0)),
                      "ffa" === room.gameMode
                        ? (a.color = "FFA_RED")
                        : (a.color = [10, 12, 11, 15, 3, 35, 36, 0][
                            i.team - 1
                          ]);
                    break;
                  case 4:
                    if (room.arenaClosed)
                      return a.sendMessage(
                        "Passive Mode is disabled when the arena is closed."
                      );
                    a.passive = !a.passive;
                    for (let e of entities)
                      e.master.id === a.id &&
                        e.id !== a.id &&
                        (e.passive = a.passive);
                    if (a.multibox.enabled)
                      for (let e of a.multibox.controlledTanks) {
                        null != e && (e.passive = a.passive);
                        for (let t of entities)
                          t.master.id === e.id &&
                            t.id !== e.id &&
                            (t.passive = e.passive);
                      }
                    a.sendMessage(
                      "Passive Mode: " + (a.passive ? "ON" : "OFF")
                    );
                    break;
                  case 5:
                    a.toggleRainbow(),
                      a.sendMessage(
                        "Rainbow Mode: " + (a.rainbow ? "ON" : "OFF")
                      );
                    break;
                  case 7:
                    "ffa" === room.gameMode
                      ? (a.color = "FFA_RED")
                      : (a.color = [10, 12, 11, 15, 3, 35, 36, 0][i.team - 1]);
                    break;
                  default:
                    return (
                      this.error(
                        "beta-tester level 1 key",
                        `Unknown key value (${s[0]})`,
                        !0
                      ),
                      1
                    );
                }
                break;
              case "B":
                if (1 !== s.length)
                  return (
                    this.error(
                      "beta-tester level 3 key",
                      "Ill-sized key request!",
                      !0
                    ),
                    1
                  );
                if ("number" != typeof s[0])
                  return (
                    this.error(
                      "beta-tester level 3 key",
                      "Non-numeric key value",
                      !0
                    ),
                    1
                  );
                if (!o || 3 !== this.betaData.permissions) return;
                if (a.underControl)
                  return a.sendMessage(
                    "You cannot use beta-tester keys while controlling a Dominator or Mothership."
                  );
                switch (s[0]) {
                  case 0:
                    a.color = Math.floor(42 * Math.random());
                    break;
                  case 1:
                    if (room.arenaClosed)
                      return a.sendMessage(
                        "Godmode is disabled when the arena is closed."
                      );
                    a.godmode = !a.godmode;
                    for (let e of entities)
                      e.master.id === a.id &&
                        e.id !== a.id &&
                        (e.diesToTeamBase = !a.godmode);
                    a.sendMessage("Godmode: " + (a.godmode ? "ON" : "OFF"));
                    break;
                  case 2:
                    {
                      let e = {
                        x: i.target.x + a.x,
                        y: i.target.y + a.y,
                      };
                      if ("bot" === a.keyFEntity) spawnBot(e);
                      else {
                        let t = new Entity(e);
                        t.define(Class[a.keyFEntity]),
                          (t.team = -100),
                          "food" === t.type &&
                            (t.ACCELERATION = 0.015 / (t.foodLevel + 1));
                      }
                    }
                    break;
                  case 3:
                    (a.x = i.target.x + a.x), (a.y = i.target.y + a.y);
                    break;
                  case 8:
                    a.upgradeTank(tankList[a.index + 1]);
                    break;
                  case 9:
                    for (let e of entities)
                      e !== a &&
                        util.getDistance(e, {
                          x: i.target.x + a.x,
                          y: i.target.y + a.y,
                        }) <
                          1.15 * e.size &&
                        (e.settings.givesKillMessage &&
                          ("tank" === e.type
                            ? a.sendMessage(
                                `You killed ${
                                  e.name || "An unnamed player"
                                }'s ${e.label}.`
                              )
                            : a.sendMessage(
                                `You killed ${util.addArticle(e.label)}.`
                              )),
                        e.kill());
                    break;
                  case 10:
                    (a.stealthMode = !a.stealthMode),
                      (a.settings.leaderboardable = !a.stealthMode),
                      (a.settings.givesKillMessage = !a.stealthMode),
                      (a.alpha = a.ALPHA =
                        a.stealthMode
                          ? 0
                          : null == tankList[a.index].ALPHA
                          ? 1
                          : tankList[a.index].ALPHA),
                      a.sendMessage(
                        "Stealth Mode: " + (a.stealthMode ? "ON" : "OFF")
                      );
                    break;
                  case 11:
                    if (i.pickedUpInterval)
                      clearInterval(i.pickedUpInterval),
                        (i.pickedUpInterval = null);
                    else {
                      let e = i.body.x + i.target.x,
                        t = i.body.y + i.target.y,
                        s = [];
                      for (let i of entities)
                        (i.x - e) * (i.x - e) + (i.y - t) * (i.y - t) <
                          i.size * i.size * 1.5 &&
                          s.push({
                            e: i,
                            dx: i.x - e,
                            dy: i.y - t,
                          });
                      0 === s.length
                        ? i.body.sendMessage("No entities found to pick up!")
                        : (i.pickedUpInterval = setInterval(() => {
                            if (!i.body)
                              return (
                                clearInterval(i.pickedUpInterval),
                                void (i.pickedUpInterval = null)
                              );
                            let e = i.body.x + i.target.x,
                              t = i.body.y + i.target.y;
                            for (let { e: i, dx: a, dy: o } of s)
                              i.isGhost || ((i.x = a + e), (i.y = o + t));
                          }, 25));
                    }
                    break;
                  case 12:
                    {
                      // Give score to the entity under the mouse cursor (dev token only).
                      let t = {
                        x: i.target.x + a.x,
                        y: i.target.y + a.y,
                      };
                      let s = null,
                        r = 1 / 0;
                      for (let e of entities) {
                        if (!e || e.isGhost) continue;
                        // Avoid odd edge-cases like buffing bullets/traps/drones.
                        if (
                          "tank" !== e.type &&
                          "miniboss" !== e.type &&
                          !("food" === e.type && e.settings && e.settings.acceptsScore)
                        )
                          continue;
                        // "Under cursor" heuristic: within the entity's radius.
                        let n = util.getDistance(e, t);
                        if (n < 1.15 * e.size && n < r) (s = e), (r = n);
                      }
                      if (!s || !s.skill) break;
                      s.skill.score = Math.min(
                        1e8,
                        Math.max(0, (s.skill.score || 0) + 1e5)
                      );

                      // Apply growth and level-up changes immediately.
                      applyGrowthToEntity(s);
                      if (s.skill && s.skill.maintain) {
                        let e = 0;
                        for (; e++ < 1e3 && s.skill.maintain(); );
                      }
                      s.refreshBodyAttributes && s.refreshBodyAttributes();
                    }
                    break;
                  case 13:
                    {
                      // Remove score from the entity under the mouse cursor (dev token only).
                      let t = {
                        x: i.target.x + a.x,
                        y: i.target.y + a.y,
                      };
                      let s = null,
                        r = 1 / 0;
                      for (let e of entities) {
                        if (!e || e.isGhost) continue;
                        if (
                          "tank" !== e.type &&
                          "miniboss" !== e.type &&
                          !("food" === e.type && e.settings && e.settings.acceptsScore)
                        )
                          continue;
                        let n = util.getDistance(e, t);
                        if (n < 1.15 * e.size && n < r) (s = e), (r = n);
                      }
                      if (!s || !s.skill) break;
                      s.skill.score = Math.min(
                        1e8,
                        Math.max(0, (s.skill.score || 0) - 1e5)
                      );

                      applyGrowthToEntity(s);
                      if (s.skill && s.skill.maintain) {
                        let e = 0;
                        for (; e++ < 1e3 && s.skill.maintain(); );
                      }
                      s.refreshBodyAttributes && s.refreshBodyAttributes();
                    }
                    break;
                  case 14:
                    {
                      // Heal the entity under the mouse cursor (dev token only).
                      let t = {
                        x: i.target.x + a.x,
                        y: i.target.y + a.y,
                      };
                      let s = null,
                        r = 1 / 0;
                      for (let e of entities) {
                        if (!e || e.isGhost || !e.health) continue;
                        let n = util.getDistance(e, t);
                        if (n < 1.15 * e.size && n < r) (s = e), (r = n);
                      }
                      if (!s) break;
                      if (s.health && Number.isFinite(s.health.max))
                        s.health.amount = s.health.max;
                      if (s.shield && Number.isFinite(s.shield.max))
                        s.shield.amount = s.shield.max;
                      s.refreshBodyAttributes && s.refreshBodyAttributes();
                    }
                    break;
                  default:
                    return (
                      this.error(
                        "beta-tester level 2 key",
                        `Unknown key value (${s[0]})`,
                        !0
                      ),
                      1
                    );
                }
                break;
              case "D":
                if (s.length < 0 || s.length > 11)
                  return (
                    this.error(
                      "beta-tester console",
                      "Ill-sized beta-command request",
                      !0
                    ),
                    1
                  );
                if ("number" != typeof s[0])
                  return (
                    this.error(
                      "beta-tester console",
                      "Non-numeric beta-command value",
                      !0
                    ),
                    1
                  );
                if (3 !== this.betaData.permissions)
                  return this.talk(
                    "Z",
                    "[ERROR] You need a beta-tester level 3 token to use these commands."
                  );
                if (!o)
                  return this.talk(
                    "Z",
                    "[ERROR] You cannot use a beta-tester command while dead."
                  );
                switch (s[0]) {
                  case 0:
                    sockets.broadcast(s[1], s[2]);
                    break;
                  case 1:
                    a.color = s[1];
                    break;
                  case 2:
                    a.skill.points = s[1];
                    break;
                  case 3:
                    // Keep beta-tester score editing within sane bounds.
                    a.skill.score = Math.max(
                      0,
                      Math.min(1e8, Math.round(Number(s[1]) || 0))
                    );
                    break;
                  case 4:
                    a.SIZE = s[1];
                    break;
                  case 5:
                    a.upgradeTank(isNaN(s[1]) ? Class[s[1]] : tankList[s[1]]);
                    break;
                  case 6:
                    "weapon_speed" === s[1] && (a.skill.spd = s[2]),
                      "weapon_reload" === s[1] && (a.skill.rld = s[2]),
                      "move_speed" === s[1] &&
                        ((a.SPEED = s[2]),
                        (a.ACCELERATION = s[2] / 3),
                        a.refreshBodyAttributes()),
                      "max_health" === s[1] &&
                        ((a.HEALTH = s[2]), a.refreshBodyAttributes()),
                      "body_damage" === s[1] &&
                        ((a.DAMAGE = s[2]), a.refreshBodyAttributes()),
                      "weapon_damage" === s[1] && (a.skill.dam = s[2]);
                    break;
                  case 7:
                    {
                      let e = new Entity({
                        x: "me" === s[2] ? a.x : s[2],
                        y: "me" === s[3] ? a.y : s[3],
                      });
                      e.define(Class[s[1]]),
                        (e.team = "me" === s[4] ? a.team : s[4]),
                        (e.color = "default" === s[5] ? e.color : s[5]),
                        (e.SIZE = "default" === s[6] ? e.SIZE : s[6]),
                        (e.skill.score =
                          "default" === s[7] ? e.skill.score : s[7]),
                        "food" === e.type &&
                          (e.ACCELERATION = 0.015 / (e.foodLevel + 1));
                    }
                    break;
                  case 8:
                    a.maxChildren = s[1];
                    break;
                  case 9:
                    (a.x = s[1]), (a.y = s[2]);
                    break;
                  case 10:
                    a.invisible = [s[1], s[2], s[3]];
                    break;
                  case 11:
                    (a.FOV = s[1]), a.refreshFOV();
                    break;
                  case 12:
                    a.spinSpeed = s[1];
                    break;
                  case 13:
                    a.keyFEntity = s[1];
                    break;
                  case 14:
                    for (let e of entities)
                      e.master.id === a.id && e.id !== a.id && e.kill();
                    break;
                  case 15:
                    if (-s[1] > room.teamAmount)
                      return this.talk(
                        "Z",
                        "[ERROR] The maximum team amount for this server is " +
                          room.teamAmount +
                          "."
                      );
                    (a.team = s[1]),
                      (i.team = -s[1]),
                      (this.rememberedTeam = s[1]);
                    break;
                  case 17:
                    a.skill.set([
                      s[7],
                      s[5],
                      s[4],
                      s[6],
                      s[3],
                      s[10],
                      s[1],
                      s[2],
                      s[9],
                      s[8],
                    ]),
                      (a.skill.points -=
                        s[1] +
                        s[2] +
                        s[3] +
                        s[4] +
                        s[5] +
                        s[6] +
                        s[7] +
                        s[8] +
                        s[9] +
                        s[10]),
                      a.skill.points < 0 && (a.skill.points = 0),
                      a.refreshBodyAttributes();
                    break;
                  case 18:
                    (a.rainbowSpeed = s[1]),
                      a.toggleRainbow(),
                      a.toggleRainbow();
                    break;
                  case 19:
                    if (0 === s[1])
                      return a.multibox.enabled
                        ? (socket.talk(
                            "Z",
                            "[INFO] You have disabled multiboxing for yourself."
                          ),
                          (a.multibox.enabled = !1),
                          a.onDead(),
                          (a.onDead = null))
                        : this.talk(
                            "Z",
                            "[ERROR] Multiboxing is already disabled for you."
                          );
                    for (
                      this.talk(
                        "Z",
                        "[INFO] You are now controlling " +
                          s[1] +
                          " new " +
                          (s[1] > 1 ? "entities" : "entity") +
                          "."
                      );
                      s[1]-- > 0;

                    ) {
                      let e = new Entity({
                        x: a.x + 5 * Math.random(),
                        y: a.y - 5 * Math.random(),
                      });
                      "tdm" === room.gameMode
                        ? (e.team = a.team)
                        : (a.team = e.team = -9),
                        e.define(Class.basic),
                        (e.controllers = [new ioTypes.listenToPlayer(a, i)]),
                        (e.invuln = !1),
                        (e.color = a.color),
                        (e.settings.leaderboardable = !1),
                        (e.passive = a.passive),
                        (e.godmode = a.godmode),
                        a.stealthMode && (e.alpha = e.ALPHA = 0),
                        a.multibox.controlledTanks.push(e);
                    }
                    (a.onDead = () => {
                      null != a.multibox.intervalID &&
                        clearInterval(a.multibox.intervalID);
                      for (let e of a.multibox.controlledTanks)
                        e.isAlive() && e.kill();
                      a.multibox.controlledTanks = [];
                    }),
                      a.multibox.enabled || a.toggleMultibox(),
                      (a.multibox.enabled = !0);
                    break;
                  case 20:
                    if (null == ioTypes[s[1]])
                      return void this.talk(
                        "Z",
                        "[ERROR] That controller doesn't exist!"
                      );
                    a.controllers.push(new ioTypes[s[1]](a, i)),
                      this.talk("Z", "[INFO] Added that controller to you!");
                    break;
                  case 21:
                    if (null == ioTypes[s[1]])
                      return void this.talk(
                        "Z",
                        "[ERROR] That controller doesn't exist!"
                      );
                    (a.controllers = a.controllers.filter(
                      (e) => !(e instanceof ioTypes[s[1]])
                    )),
                      this.talk(
                        "Z",
                        "[INFO] Removed that controller from you!"
                      );
                    break;
                  case 22:
                    (a.controllers = []),
                      this.talk(
                        "Z",
                        "[INFO] Removed all controllers from you!"
                      );
                    break;
                  default:
                    return (
                      this.error(
                        "beta-tester console",
                        `Unknown beta-command value (${s[1]})`,
                        !0
                      ),
                      1
                    );
                }
                break;
              case "A":
                {
                  if (2 !== s.length)
                    return (
                      this.error(
                        "admin panel",
                        "Ill-sized admin panel request",
                        !0
                      ),
                      1
                    );
                  if (!o) return;
                  let e = s[0],
                    t = s[1];
                  if ("string" != typeof e)
                    return (
                      this.error(
                        "admin panel",
                        "Non-string admin operation",
                        !0
                      ),
                      1
                    );
                  if ("number" != typeof t || !Number.isFinite(t))
                    return (
                      this.error("admin panel", "Non-numeric admin value", !0),
                      1
                    );
                  let v = t,
                    vInt = Math.round(t),
                    r = (e, t, s) => Math.max(t, Math.min(s, e)),
                    n = !1;
                  switch (e) {
                    case "score_delta":
                      (a.skill.score = r(a.skill.score + vInt, 0, 1e8)),
                        (n = !0);
                      break;
                    case "score_set":
                      (a.skill.score = r(vInt, 0, 1e8)), (n = !0);
                      break;
                    case "points_delta":
                      a.skill.points = r(a.skill.points + vInt, 0, 5e3);
                      break;
                    case "points_set":
                      a.skill.points = r(vInt, 0, 5e3);
                      break;
                    case "bots_delta":
                    case "bots_set":
                      {
                        const cap = 50;
                        const next =
                          "bots_set" === e
                            ? r(vInt, 0, cap)
                            : r((room.maxBots || 0) + vInt, 0, cap);
                        room.maxBots = next;
                        // If reduced below current, cull extra bots immediately.
                        for (; bots.length > room.maxBots; ) {
                          let b = bots.pop();
                          b && b.isAlive && b.isAlive() && b.kill();
                        }
                      }
                      break;
                    case "polygons_delta":
                    case "polygons_set":
                      {
                        // Cap scales with the room's initial food budget to avoid accidental lag spikes.
                        room._worldEditBaseMaxFood ||
                          (room._worldEditBaseMaxFood = room.maxFood);
                        const base = Number(room._worldEditBaseMaxFood) || 0;
                        const cap = Math.min(2000, Math.max(100, Math.round(3 * base)));
                        const next =
                          "polygons_set" === e
                            ? r(vInt, 0, cap)
                            : r((room.maxFood || 0) + vInt, 0, cap);
                        room.maxFood = next;

                        // Cull excess food so decreases take effect immediately.
                        const allowedFood = 1 + room.maxFood + 1 * views.length;
                        const allowedNest = 1 + room.maxFood * room.nestFoodAmount;
                        let food = [],
                          nestFood = [];
                        for (let ent of entities)
                          "food" === ent.type &&
                            (ent.isNestFood ? nestFood.push(ent) : food.push(ent));
                        for (; food.length > allowedFood; ) {
                          let idx = (Math.random() * food.length) | 0;
                          let ent = food.splice(idx, 1)[0];
                          ent && ent.isAlive && ent.isAlive() && ent.kill();
                        }
                        for (; nestFood.length > allowedNest; ) {
                          let idx = (Math.random() * nestFood.length) | 0;
                          let ent = nestFood.splice(idx, 1)[0];
                          ent && ent.isAlive && ent.isAlive() && ent.kill();
                        }
                      }
                      break;
                    case "fov_delta":
                    case "fov_set":
                      {
                        if (!this.betaData || 3 !== this.betaData.permissions)
                          return void this.talk(
                            "Z",
                            "[ERROR] FoV adjustment (+/-) requires a developer token."
                          );
                        // Keep within a safe range to avoid accidental performance issues.
                        const minFov = 0.1;
                        const maxFov = 5;
                        let next = a.FOV;
                        if ("fov_set" === e) {
                          next = r(Number(v) || 0, minFov, maxFov);
                        } else {
                          // Clamp per-keypress delta to avoid extreme jumps.
                          const delta = r(Number(v) || 0, -0.5, 0.5);
                          next = r((Number(a.FOV) || 1) + delta, minFov, maxFov);
                        }
                        a.FOV = next;
                        a.refreshFOV && a.refreshFOV();
                        this.talk("Z", "[INFO] Set FoV to " + next.toFixed(2) + ".");
                      }
                      break;
                    case "spawn_boss":
                      {
                        let e = (bossRushBosses || []).filter((e) => null != e),
                          t = e.length
                            ? ran.choose(e)
                            : ran.choose(
                                [
                                  Class.summonerAI,
                                  Class.defenderAI,
                                  Class.guardianAI,
                                ].filter((e) => null != e)
                              );
                        if (!t) break;
                        let s = new Entity(room.randomType("nest"));
                        (s.team = -100),
                          s.define(t),
                          (s.color = 5),
                          (s.name = ran.chooseBossName("a", 1)[0]),
                          (s.controllers = [
                            new ioTypes.nearestDifferentMaster(s),
                            new ioTypes.wanderAroundMap(s),
                          ]);
                      }
                      break;
                    case "teleport_mouse":
                      {
                        if (!this.betaData || 3 !== this.betaData.permissions)
                          return void this.talk(
                            "Z",
                            "[ERROR] Teleport (Q) requires a developer token."
                          );
                        let e = {
                          x: i.target.x + a.x,
                          y: i.target.y + a.y,
                        };
                        (a.invuln = !0),
                          (a.x = e.x),
                          (a.y = e.y),
                          a.velocity &&
                            ((a.velocity.x = 0), (a.velocity.y = 0)),
                          a.accel && ((a.accel.x = 0), (a.accel.y = 0)),
                          setTimeout(() => {
                            a && a.isAlive && a.isAlive() && (a.invuln = !1);
                          }, 250);
                      }
                      break;
                    default:
                      return (
                        this.error(
                          "admin panel",
                          `Unknown admin operation (${e})`,
                          !0
                        ),
                        1
                      );
                  }
                  if (n) {
                    let e = 0;
                    for (; e++ < 1e3 && a.skill.maintain(); );
                    a.refreshBodyAttributes();
                  }
                }
                break;
              case "X":
                {
                  if (0 !== s.length)
                    return (
                      this.error(
                        "tier cycle",
                        "Ill-sized tier cycle request",
                        !0
                      ),
                      1
                    );
                  if (!o || -1 === a.bossTierType || !a.canUseQ) return;
                  (a.canUseQ = !1), setTimeout(() => (a.canUseQ = !0), 1e3);
                  let e = new Map()
                    .set("MK-1", 1)
                    .set("MK-2", 2)
                    .set("MK-3", 3)
                    .set("MK-4", 4)
                    .set("MK-5", 0)
                    .set("TK-1", 1)
                    .set("TK-2", 2)
                    .set("TK-3", 3)
                    .set("TK-4", 4)
                    .set("TK-5", 0)
                    .set("PK-1", 1)
                    .set("PK-2", 2)
                    .set("PK-3", 3)
                    .set("PK-4", 0)
                    .set("EK-1", 1)
                    .set("EK-2", 2)
                    .set("EK-3", 3)
                    .set("EK-4", 4)
                    .set("EK-5", 5)
                    .set("EK-6", 0)
                    .set("HK-1", 1)
                    .set("HK-2", 2)
                    .set("HK-3", 3)
                    .set("HK-4", 0)
                    .set("HPK-1", 1)
                    .set("HPK-2", 2)
                    .set("HPK-3", 0)
                    .set("RK-1", 1)
                    .set("RK-2", 2)
                    .set("RK-3", 3)
                    .set("RK-4", 4)
                    .set("RK-5", 0)
                    .set("OBP-1", 1)
                    .set("OBP-2", 2)
                    .set("OBP-3", 0)
                    .set("AWP-1", 1)
                    .set("AWP-2", 2)
                    .set("AWP-3", 3)
                    .set("AWP-4", 4)
                    .set("AWP-5", 5)
                    .set("AWP-6", 6)
                    .set("AWP-7", 7)
                    .set("AWP-8", 8)
                    .set("AWP-9", 9)
                    .set("AWP-10", 0)
                    .set("Defender", 1)
                    .set("Custodian", 0)
                    .set("Switcheroo (Ba)", 1)
                    .set("Switcheroo (Tw)", 2)
                    .set("Switcheroo (Sn)", 3)
                    .set("Switcheroo (Ma)", 4)
                    .set("Switcheroo (Fl)", 5)
                    .set("Switcheroo (Di)", 6)
                    .set("Switcheroo (Po)", 7)
                    .set("Switcheroo (Pe)", 8)
                    .set("Switcheroo (Tr)", 9)
                    .set("Switcheroo (Pr)", 10)
                    .set("Switcheroo (Au)", 11)
                    .set("Switcheroo (Mi)", 12)
                    .set("Switcheroo (La)", 13)
                    .set("Switcheroo (A-B)", 14)
                    .set("Switcheroo (Si)", 15)
                    .set("Switcheroo (Hy)", 16)
                    .set("Switcheroo (Su)", 17)
                    .set("Switcheroo (Mg)", 0)
                    .set("CHK-1", 1)
                    .set("CHK-2", 2)
                    .set("CHK-3", 0)
                    .set("GK-1", 1)
                    .set("GK-2", 2)
                    .set("GK-3", 0)
                    .set("NK-1", 1)
                    .set("NK-2", 2)
                    .set("NK-3", 3)
                    .set("NK-4", 4)
                    .set("NK-5", 5)
                    .set("NK-5", 0)
                    .set("Dispositioner", 1)
                    .set("Reflector", 2)
                    .set("Triad", 0)
                    .set("SOULLESS-1", 1)
                    .set("Railtwin", 1)
                    .set("Synced Railtwin", 0)
                    .set("EQ-1", 1)
                    .set("EQ-2", 2)
                    .set("EQ-3", 0);
                  switch (
                    (e.has(a.label) &&
                      16 !== a.bossTierType &&
                      (a.tierCounter = e.get(a.label)),
                    a.bossTierType)
                  ) {
                    case 0:
                      a.upgradeTank(Class["eggBossTier" + ++a.tierCounter]);
                      break;
                    case 1:
                      a.upgradeTank(Class["squareBossTier" + ++a.tierCounter]);
                      break;
                    case 2:
                      a.upgradeTank(
                        Class["triangleBossTier" + ++a.tierCounter]
                      );
                      break;
                    case 3:
                      a.upgradeTank(
                        Class["pentagonBossTier" + ++a.tierCounter]
                      );
                      break;
                    case 4:
                      a.upgradeTank(Class["hexagonBossTier" + ++a.tierCounter]);
                      break;
                    case 5:
                      a.upgradeTank(
                        Class["heptagonBossTier" + ++a.tierCounter]
                      );
                      break;
                    case 6:
                      a.upgradeTank(Class["rocketBossTier" + ++a.tierCounter]);
                      break;
                    case 7:
                      a.upgradeTank(Class["obp" + ++a.tierCounter]);
                      break;
                    case 8:
                      a.upgradeTank(Class["AWP_" + ++a.tierCounter]);
                      break;
                    case 9:
                      a.upgradeTank(Class["defender" + ++a.tierCounter]);
                      break;
                    case 10:
                      a.upgradeTank(Class["switcheroo" + ++a.tierCounter]);
                      break;
                    case 11:
                      a.upgradeTank(Class["chk" + ++a.tierCounter]);
                      break;
                    case 12:
                      a.upgradeTank(Class["greenBossTier" + ++a.tierCounter]);
                      break;
                    case 13:
                      a.upgradeTank(Class["nk" + ++a.tierCounter]);
                      break;
                    case 14:
                      a.upgradeTank(Class["hewnPuntUpg" + ++a.tierCounter]);
                      break;
                    case 15:
                      a.upgradeTank(Class["soulless" + ++a.tierCounter]);
                      break;
                    case 16:
                      for (let e of entities)
                        e.master.id === a.id && "drone" === e.type && e.kill();
                      let e = 20 * a.switcherooID;
                      for (let t = 1; t < 21; t++)
                        setTimeout(() => {
                          a.isAlive() &&
                            a.master.define(
                              Class[
                                `switcherooAnim${t + e === 380 ? 0 : t + e}`
                              ]
                            );
                        }, 24 * t);
                      if (a.multibox.enabled)
                        for (let t of a.multibox.controlledTanks)
                          if (t.isAlive()) {
                            for (let e of entities)
                              e.master.id === t.id &&
                                "drone" === e.type &&
                                e.kill();
                            for (let s = 1; s < 21; s++)
                              setTimeout(() => {
                                if (t.isAlive()) {
                                  let i = s + e === 380 ? 0 : s + e;
                                  t.master.define(Class[`switcherooAnim${i}`]),
                                    (a.tank = `switcherooAnim${i}`);
                                }
                              }, 24 * s);
                          }
                      break;
                    case 17:
                      a.upgradeTank(Class["twinRailgun" + ++a.tierCounter]);
                      break;
                    case 18:
                      a.upgradeTank(Class["eggQueenTier" + ++a.tierCounter]);
                      break;
                    default:
                      return (
                        this.error(
                          "tier cycle",
                          `Unknown Q tier value (${a.bossTierType})`,
                          !0
                        ),
                        1
                      );
                  }
                }
                break;
              case "M":
                break;
              case "N":
                {
                  if ("string" != typeof s[0])
                    return this.kick("Packet shuffling failed!"), 0;
                  let e = !1;
                  for (let t of clients)
                    if (t.identification === s[0]) {
                      t.betaData.permissions < 1 &&
                        t.kick("Please only use one tab at a time!"),
                        (e = !0);
                      break;
                    }
                  e || multitabIDs.push(s[0]);
                }
                break;
              default:
                return (
                  this.error(
                    "initialization",
                    `Unknown packet index (${r})`,
                    !0
                  ),
                  1
                );
            }
          }
          spawn(e) {
            let t = {
                id: this.id,
              },
              s = {};
            t.team = this.rememberedTeam;
            let i = 10;
            if ("tdm" === room.gameMode) {
              (null == t.team || room.defeatedTeams.includes(-t.team)) &&
                (t.team = getTeam(1));
              let e = ["spn", "bas", "n_b", "bad"]
                .map((e) => e + t.team)
                .filter((e) => room[e] && room[e].length);
              const a = ran.choose(e);
              if (a && room[a].length)
                do {
                  s = room.randomType(a);
                } while (dirtyCheck(s, 50) && i--);
              else
                do {
                  s = room.gaussInverse(5);
                } while (dirtyCheck(s, 50) && i--);
            } else
              do {
                s = room.gaussInverse(5);
              } while (dirtyCheck(s, 50) && i--);
            this.rememberedTeam = t.team;
            let a = new Entity(s);
            return (
              c.RANKED_BATTLE && (a.roomId = this.roomId),
              a.protect(),
              "Carrier Battle" === c.serverName
                ? a.define((startingTank = Class.testbed_carriers))
                : "Corrupted Tanks" === c.serverName
                ? a.define(Class.corrupted_tanks)
                : a.define(Class[startingTank]),
              (a.name = e),
              a.addController(new ioTypes.listenToPlayer(a, t)),
              (a.sendMessage = (e) => this.talk("m", e)),
              (a.isPlayer = !0),
              (a.this = this),
              this.key === tokens.oblivion_2 &&
                ((a.stealthMode = !0),
                (a.alpha = a.ALPHA = 0),
                (a.settings.givesKillMessage = a.settings.leaderboardable = !1),
                a.sendMessage(
                  "DO NOT use this token to get world record scores; stealth mode denies AI from attacking you!"
                )),
              (a.invuln = !0),
              (a.invulnTime = [
                Date.now(),
                "tdm" === room.gameMode && room.bas1.length ? 6e4 : 18e4,
              ]),
              (t.body = a),
              "tdm" === room.gameMode
                ? ((a.team = -t.team),
                  (a.color = [10, 12, 11, 15, 3, 35, 36, 0][t.team - 1]))
                : (a.color = "FFA_RED"),
              (t.teamColor = "ffa" === room.gameMode ? 10 : a.color),
              (t.target = {
                x: 0,
                y: 0,
              }),
              (t.command = {
                up: !1,
                down: !1,
                left: !1,
                right: !1,
                lmb: !1,
                mmb: !1,
                rmb: !1,
                autofire: !1,
                autospin: !1,
                override: !1,
              }),
              (t.records = (() => {
                let e = util.time();
                return () => [
                  t.body.skill.score,
                  Math.floor((util.time() - e) / 1e3),
                  t.body.killCount.solo,
                  t.body.killCount.assists,
                  t.body.killCount.bosses,
                  t.body.killCount.killers.length,
                  ...t.body.killCount.killers,
                ];
              })()),
              (t.gui = this.makeGUI(t)),
              (t.socket = this),
              (a.socket = this),
              players.push(t),
              (this.camera.x = a.x),
              (this.camera.y = a.y),
              (this.camera.fov = 1e3),
              (this.status.hasSpawned = !0),
              a.sendMessage(
                "You will remain invulnerable until you move, shoot, or your timer runs out."
              ),
              a.sendMessage(
                "You have spawned! Welcome to the game. Hold N to level up."
              ),
              this.talk("c", this.camera.x, this.camera.y, this.camera.fov),
              t
            );
          }
        }
        (() => {
          let e = (e) => {
            switch (e.team) {
              case -100:
                return e.color;
              case -1:
                return 10;
              case -2:
                return 12;
              case -3:
                return 11;
              case -4:
                return 15;
              default:
                return "1" === room.gameMode[0] ||
                  "2" === room.gameMode[0] ||
                  "3" === room.gameMode[0] ||
                  "4" === room.gameMode[0]
                  ? e.color
                  : 11;
            }
          };
          global.broadcastFunction = function () {
            let t = {
              minimapAll: [],
              minimapCarriers: [],
              minimapTeams: {},
              leaderboard: [],
            };
            for (let e = 0; e < c.TEAM_AMOUNT; e++) t.minimapTeams[e + 1] = [];
            for (let e of players)
              e.socket &&
                e.socket.rememberedTeam &&
                (t.minimapTeams[-e.socket.rememberedTeam] = []);
            if (c.serverName.includes("Tag"))
              for (let e = 0; e < c.TEAM_AMOUNT; e++)
                t.leaderboard.push({
                  id: e,
                  skill: {
                    score: 0,
                  },
                  index: Class.tagMode.index,
                  name: ["BLUE", "RED", "GREEN", "PURPLE"][e],
                  color: [10, 12, 11, 15][e],
                  nameColor: "#FFFFFF",
                  team: -e - 1,
                });
            for (let e = 0, s = entities.length; e < s; e++) {
              let s = entities[e];
              if (
                (((("wall" === s.type || "mazeWall" === s.type) &&
                  s.alpha > 0.2) ||
                  s.showsOnMap ||
                  "miniboss" === s.type ||
                  ("tank" === s.type && s.lifetime) ||
                  s.isMothership ||
                  "appearOnMinimap" === s.miscIdentifier) &&
                  t.minimapAll.push({
                    id: s.id,
                    data: [
                      "wall" === s.type || "mazeWall" === s.type || s.isSquadron
                        ? s.isSquadron
                          ? 3
                          : 4 === s.shape
                          ? 2
                          : 1
                        : 0,
                      util.clamp(Math.floor((256 * s.x) / room.width), 0, 255),
                      util.clamp(Math.floor((256 * s.y) / room.height), 0, 255),
                      s.color,
                      Math.round(s.SIZE),
                      s.width || 1,
                      s.height || 1,
                    ],
                  }),
                "tank" !== s.type ||
                  s.master !== s ||
                  s.lifetime ||
                  (null != t.minimapTeams[s.team] &&
                    t.minimapTeams[s.team].push({
                      id: s.id,
                      data: [
                        util.clamp(
                          Math.floor((256 * s.x) / room.width),
                          0,
                          255
                        ),
                        util.clamp(
                          Math.floor((256 * s.y) / room.height),
                          0,
                          255
                        ),
                        s.color,
                      ],
                    }),
                  t.minimapCarriers.push({
                    id: s.id,
                    data: [
                      util.clamp(Math.floor((256 * s.x) / room.width), 0, 255),
                      util.clamp(Math.floor((256 * s.y) / room.height), 0, 255),
                      s.color,
                    ],
                  })),
                c.serverName.includes("Mothership"))
              )
                s.isMothership && t.leaderboard.push(s);
              else if (c.serverName.includes("Tag")) {
                if (s.isPlayer || s.isBot) {
                  let e = t.leaderboard.find((e) => e.team === s.team);
                  e && e.skill.score++;
                }
              } else
                null != s.settings &&
                  s.settings.leaderboardable &&
                  s.settings.drawShape &&
                  ("tank" === s.type ||
                    s.killCount.solo ||
                    s.killCount.assists) &&
                  t.leaderboard.push(s);
            }
            let s = [];
            for (let i = 0; i < 10 && t.leaderboard.length; i++) {
              let i,
                a = 0;
              for (let e = 0; e < t.leaderboard.length; e++) {
                let s = t.leaderboard[e].skill.score;
                s > a && ((a = s), (i = e));
              }
              if (0 === a) break;
              let o = t.leaderboard[i];
              s.push({
                id: o.id,
                data: [
                  Math.round(
                    c.serverName.includes("Mothership")
                      ? o.health.amount
                      : o.skill.score
                  ),
                  o.index,
                  o.name,
                  o.color,
                  e(o),
                  o.nameColor,
                ],
              }),
                t.leaderboard.splice(i, 1);
            }
            (room.topPlayerID = s.length ? s[0].id : -1),
              (t.leaderboard = s.sort((e, t) => e.id - t.id)),
              (t.minimapAll = [
                t.minimapAll.length,
                ...t.minimapAll.map((e) => [e.id, ...e.data]).flat(),
              ]),
              (t.minimapCarriers = [
                t.minimapCarriers.length,
                ...t.minimapCarriers.map((e) => [e.id, ...e.data]).flat(),
              ]);
            for (let e in t.minimapTeams)
              t.minimapTeams[e] = [
                t.minimapTeams[e].length,
                ...t.minimapTeams[e].map((e) => [e.id, ...e.data]).flat(),
              ];
            return (
              (t.leaderboard = [
                t.leaderboard.length,
                ...t.leaderboard.map((e) => [e.id, ...e.data]).flat(),
              ]),
              t
            );
          };
          setInterval(() => {
            let e = util.time();
            for (let t of clients)
              e - t.statuslastHeartbeat > c.maxHeartbeatInterval &&
                t.kick("Lost heartbeat!");
          }, 1e3),
            setInterval(function () {
              newLogs.broadcast.reset(), newLogs.broadcast.start();
              const e = global.broadcastFunction();
              newLogs.broadcast.stop();
              for (const t of clients)
                if (t.status.hasSpawned)
                  if (t.battleRoom instanceof RankedRoom)
                    t.talk(
                      "b",
                      ...t.battleRoom.minimap,
                      0,
                      ...t.battleRoom.leaderboard
                    );
                  else {
                    let s =
                      t.player.body && t.player.body.strikeCarrier
                        ? e.minimapCarriers
                        : e.minimapTeams[-t.player.team];
                    t.talk(
                      "b",
                      ...e.minimapAll,
                      ...(s || [0]),
                      ...(t.anon ? [0] : e.leaderboard)
                    );
                  }
            }, 250);
        })();
        return {
          broadcast: (e, t = "") => {
            for (let s of clients) s.talk("m", e, t);
          },
          broadcastRoom: () => {
            for (let e of clients)
              e.talk(
                "r",
                room.width,
                room.height,
                JSON.stringify(c.ROOM_SETUP)
              );
          },
          refreshMockups: (e) => {
            for (let t of clients) t.talk("H", e);
          },
          connect: (e, t) => new h(e, t),
          ban: (e, i, o = "") => {
            let r;
            return (
              (r = clients.find((t) => t.id === e)),
              r instanceof h
                ? (o.length && r.talk("P", o), r.ban(i), !0)
                : ((r = s.find((t) => t.id === e)),
                  r instanceof a &&
                    (t.push({
                      ip: r.ip,
                      reason: i,
                    }),
                    !0))
            );
          },
          unban: (e) => {
            let i = s.find((t) => t.id === e);
            if (i instanceof a) {
              let e = t.findIndex((e) => e.ip === i.ip);
              if (e > -1) return t.splice(e, 1), !0;
            }
            return !1;
          },
        };
      })(),
      gameLoop = (() => {
        const e = (() => {
            const e = (e, t, s = 0) => {
              let i,
                a,
                o = {
                  x: e.x + e.m_x,
                  y: e.y + e.m_y,
                },
                r = {
                  x: t.x + t.m_x,
                  y: t.y + t.m_y,
                },
                n = util.getDistance(o, r),
                l = Math.max(e.velocity.length, e.topSpeed),
                h = Math.max(t.velocity.length, t.topSpeed);
              if (0 === n) {
                let s = new Vector(
                  2 * Math.random() - 1,
                  2 * Math.random() - 1
                );
                return (
                  (e.accel.x += s.x),
                  (e.accel.y += s.y),
                  (t.accel.x -= s.x),
                  void (t.accel.y -= s.y)
                );
              }
              if (s > 0 && n <= e.realSize + t.realSize + s) {
                let i =
                  ((e.acceleration + t.acceleration) *
                    (e.realSize + t.realSize + s - n)) /
                  s /
                  room.speed;
                (e.accel.x += (i * (o.x - r.x)) / n),
                  (e.accel.y += (i * (o.y - r.y)) / n),
                  (t.accel.x -= (i * (o.x - r.x)) / n),
                  (t.accel.y -= (i * (o.y - r.y)) / n);
              }
              for (; n <= e.realSize + t.realSize && (!i || !a); )
                (a = i = !1),
                  e.velocity.length <= l
                    ? ((e.velocity.x -= (0.05 * (r.x - o.x)) / n / room.speed),
                      (e.velocity.y -= (0.05 * (r.y - o.y)) / n / room.speed))
                    : (i = !0),
                  t.velocity.length <= h
                    ? ((t.velocity.x += (0.05 * (r.x - o.x)) / n / room.speed),
                      (t.velocity.y += (0.05 * (r.y - o.y)) / n / room.speed))
                    : (a = !0),
                  (o = {
                    x: e.x + e.m_x,
                    y: e.y + e.m_y,
                  }),
                  (r = {
                    x: t.x + t.m_x,
                    y: t.y + t.m_y,
                  }),
                  (n = util.getDistance(o, r));
            };
            const t = (e, t, s, i, a = !1) => {
                let o = Math.min(e.stepRemaining, t.stepRemaining),
                  r = t.size + e.size,
                  n = new Vector(e.m_x, e.m_y),
                  l = new Vector(t.m_x, t.m_y),
                  h = new Vector(o * (n.x - l.x), o * (n.y - l.y)),
                  d = new Vector(e.x - t.x, e.y - t.y),
                  m = new Vector(t.x - e.x, t.y - e.y).unit(),
                  u = Math.max(0, m.x * h.x + m.y * h.y);
                if (u >= d.length - r) {
                  let y,
                    p = !1,
                    g = 1 - o,
                    f = Math.pow(h.x, 2) + Math.pow(h.y, 2),
                    b = 2 * h.x * d.x + 2 * h.y * d.y,
                    k = Math.pow(d.x, 2) + Math.pow(d.y, 2) - Math.pow(r, 2),
                    v = b * b - 4 * f * k;
                  if (!f || v < 0 || k < 0) (y = 0), k < 0 && (p = !0);
                  else {
                    let e = (-b - Math.sqrt(v)) / (2 * f),
                      t = (-b + Math.sqrt(v)) / (2 * f);
                    e < g || e > 1
                      ? t < g || t > 1
                        ? (y = !1)
                        : ((y = t), (p = !0))
                      : ((y = t >= g && t <= 1 ? Math.min(e, t) : e), (p = !0));
                  }
                  if (p) {
                    e.collisionArray.push(t),
                      t.collisionArray.push(e),
                      y &&
                        ((e.x += n.x * y),
                        (e.y += n.y * y),
                        (t.x += l.x * y),
                        (t.y += l.y * y),
                        (e.stepRemaining -= y),
                        (t.stepRemaining -= y),
                        (d = new Vector(e.x - t.x, e.y - t.y)),
                        (m = new Vector(t.x - e.x, t.y - e.y).unit()),
                        (u = Math.max(0, m.x * h.x + m.y * h.y)));
                    let o = u / h.length,
                      p = {
                        _me: 1,
                        _n: 1,
                      },
                      g = h.length
                        ? r / 4 / (Math.floor(r / h.length) + 1)
                        : 0.001,
                      f = {
                        _me: util.clamp((r - d.length) / (2 * e.size), 0, 1),
                        _n: util.clamp((r - d.length) / (2 * t.size), 0, 1),
                      },
                      b = {
                        up: f._me * f._n,
                        down: (1 - f._me) * (1 - f._n),
                      },
                      k = {
                        _me: {
                          sqr: Math.pow(e.penetration, 2),
                          sqrt: Math.sqrt(e.penetration),
                        },
                        _n: {
                          sqr: Math.pow(t.penetration, 2),
                          sqrt: Math.sqrt(t.penetration),
                        },
                      },
                      v = {
                        _me: e.health.ratio,
                        _n: t.health.ratio,
                      };
                    if (s) {
                      let s = {
                          _me: e.maxSpeed
                            ? Math.pow(n.length / e.maxSpeed, 0.25)
                            : 1,
                          _n: t.maxSpeed
                            ? Math.pow(l.length / t.maxSpeed, 0.25)
                            : 1,
                        },
                        i = !1;
                      if (
                        (e.shape === t.shape &&
                        e.settings.isNecromancer &&
                        "food" === t.type
                          ? (i = e.necro(t))
                          : e.shape === t.shape &&
                            t.settings.isNecromancer &&
                            "food" === e.type &&
                            (i = t.necro(e)),
                        !i)
                      ) {
                        let i = e.health.resist - t.health.resist,
                          a = {
                            _me:
                              c.DAMAGE_CONSTANT *
                              e.damage *
                              (1 + i) *
                              (1 +
                                t.heteroMultiplier *
                                  (e.settings.damageClass ===
                                    t.settings.damageClass)) *
                              (e.settings.buffVsFood &&
                              1 === t.settings.damageType
                                ? 3
                                : 1) *
                              e.damageMultiplier() *
                              Math.min(2, Math.max(s._me, 1) * s._me),
                            _n:
                              c.DAMAGE_CONSTANT *
                              t.damage *
                              (1 - i) *
                              (1 +
                                e.heteroMultiplier *
                                  (e.settings.damageClass ===
                                    t.settings.damageClass)) *
                              (t.settings.buffVsFood &&
                              1 === e.settings.damageType
                                ? 3
                                : 1) *
                              t.damageMultiplier() *
                              Math.min(2, Math.max(s._n, 1) * s._n),
                          };
                        e.settings.ratioEffects &&
                          (a._me *= Math.min(
                            1,
                            Math.pow(
                              Math.max(e.health.ratio, e.shield.ratio),
                              1 / e.penetration
                            )
                          )),
                          t.settings.ratioEffects &&
                            (a._n *= Math.min(
                              1,
                              Math.pow(
                                Math.max(t.health.ratio, t.shield.ratio),
                                1 / t.penetration
                              )
                            )),
                          e.settings.damageEffects &&
                            (a._me *=
                              (g *
                                (1 + ((o - 1) * (1 - f._n)) / e.penetration) *
                                (1 + k._n.sqrt * f._n - f._n)) /
                              k._n.sqrt),
                          t.settings.damageEffects &&
                            (a._n *=
                              (g *
                                (1 + ((o - 1) * (1 - f._me)) / t.penetration) *
                                (1 + k._me.sqrt * f._me - f._me)) /
                              k._me.sqrt);
                        let r = {
                          _me: a._me,
                          _n: a._n,
                        };
                        t.shield.max && (r._me -= t.shield.getDamage(r._me)),
                          e.shield.max && (r._n -= e.shield.getDamage(r._n));
                        let n = e.health.getDamage(r._n, !1);
                        (p._me = n > e.health.amount ? e.health.amount / n : 1),
                          (n = t.health.getDamage(r._me, !1)),
                          (p._n =
                            n > t.health.amount ? t.health.amount / n : 1),
                          (e.damageReceived += a._n * p._n),
                          (t.damageReceived += a._me * p._me);
                      }
                      e.onDamaged && e.onDamaged(e, t),
                        e.onDealtDamage && e.onDealtDamage(e, t),
                        e.onDealtDamageUniv && e.onDealtDamageUniv(e, t),
                        e.master &&
                          e.master.onDealtDamageUniv &&
                          e.master.onDealtDamageUniv(e.master, t),
                        t.onDamaged && t.onDamaged(t, e),
                        t.onDealtDamage && t.onDealtDamage(t, e),
                        t.onDealtDamageUniv && t.onDealtDamageUniv(t, e),
                        t.master &&
                          t.master.onDealtDamageUniv &&
                          t.master.onDealtDamageUniv(t.master, e),
                        t.poisonStatic.enabled &&
                          ((e.poison.active = !0),
                          (e.poison.mult = t.poisonStatic.mult),
                          (e.poison.time = t.poisonStatic.duration),
                          (e.poison.remaining = t.master.health.amount)),
                        e.poisonStatic.enabled &&
                          ((t.poison.active = !0),
                          (t.poison.mult = e.poisonStatic.mult),
                          (t.poison.time = e.poisonStatic.duration),
                          (t.poison.remaining = e.master.health.amount)),
                        applyBarrelKnockbackDamage(e, t),
                        applyBarrelKnockbackDamage(t, e);
                    }
                    if (a < 0)
                      (a *= -0.5),
                        (e.accel.x -= a * u * m.x),
                        (e.accel.y -= a * u * m.y),
                        (t.accel.x += a * u * m.x),
                        (t.accel.y += a * u * m.y);
                    else if (a > 0)
                      (t.accel.x += a * (u * m.x + b.up)),
                        (t.accel.y += a * (u * m.y + b.up));
                    else {
                      let s =
                        2 -
                        (4 * Math.atan(e.penetration * t.penetration)) /
                          Math.PI;
                      i && e.settings.motionEffects && t.settings.motionEffects
                        ? (s *= v._me / k._me.sqrt + v._n / k._n.sqrt)
                        : (s *= 2);
                      let a = (2 * Math.sqrt(v._me * v._n)) / room.speed,
                        o =
                          -(
                            (Math.pow(b.down, 2) * s * u * e.mass * t.mass) /
                              (e.mass + t.mass) +
                            c.KNOCKBACK_CONSTANT * a * b.up
                          ) *
                          (1 - e.intangibility) *
                          (1 - t.intangibility),
                        r = {
                          x: o * m.x,
                          y: o * m.y,
                        },
                        n = {
                          _me:
                            ((c.KNOCKBACK_CONSTANT * e.pushability) / e.mass) *
                            p._n,
                          _n:
                            ((c.KNOCKBACK_CONSTANT * t.pushability) / t.mass) *
                            p._me,
                        };
                      (e.accel.x += n._me * r.x),
                        (e.accel.y += n._me * r.y),
                        (t.accel.x -= n._n * r.x),
                        (t.accel.y -= n._n * r.y);
                    }
                  }
                }
              },
              s = (e, t) => {
                e.SIZE >= t.SIZE
                  ? ((e.SIZE += 7), t.kill())
                  : ((t.SIZE += 7), e.kill());
              };
            return (i) => {
              let a = i[0],
                o = i[1];
              if (a.isGhost || o.isGhost) {
                let e = a.isGhost ? a : o;
                return (
                  "shield" !== e.settings.hitsOwnType &&
                    (util.error("A ghost has been found!"),
                    util.error("Type: " + e.label),
                    util.error("Position: (" + e.x + ", " + e.y + ")"),
                    util.error("Collision Array: " + e.collisionArray),
                    util.error("Health: " + e.health.amount),
                    util.error("Ghost removed successfully.")),
                  grid.checkIfInHSHG(e) && grid.removeObject(e),
                  (e.isInGrid = !1),
                  0
                );
              }
              if (!a.activation.check() && !o.activation.check()) return 0;
              if (a.submarine.submerged !== o.submarine.submerged) return 0;
              if (c.RANKED_BATTLE && a.roomId !== o.roomId) return 0;
              if (
                "forcedNever" !== a.settings.hitsOwnType &&
                "forcedNever" !== o.settings.hitsOwnType
              ) {
                if (
                  (a.isPlane &&
                    "bullet" !== o.type &&
                    "drone" !== o.type &&
                    "minion" !== o.type) ||
                  (o.isPlane &&
                    "bullet" !== a.type &&
                    "drone" !== a.type &&
                    "minion" !== a.type)
                )
                  return 0;
                switch (!0) {
                  case a.passive || o.passive:
                    if (
                      a.passive &&
                      o.passive &&
                      a.settings.hitsOwnType === o.settings.hitsOwnType
                    )
                      switch (a.settings.hitsOwnType) {
                        case "mountain":
                          a.master.id === o.master.id && s(a, o);
                        case "push":
                          a.master.id === o.master.id && t(a, o, !1, !1);
                          break;
                        case "hard":
                          e(a, o);
                          break;
                        case "hardWithBuffer":
                          a.master.id === o.master.id && e(a, o, 30);
                          break;
                        case "hardOnlyDrones":
                          a.master.id === o.master.id && e(a, o);
                      }
                    break;
                  case a.team === o.team &&
                    ("pushOnlyTeam" === a.settings.hitsOwnType ||
                      "pushOnlyTeam" === o.settings.hitsOwnType):
                    {
                      if (a.settings.hitsOwnType === o.settings.hitsOwnType)
                        return;
                      let e = "pushOnlyTeam" === a.settings.hitsOwnType ? a : o,
                        s = "pushOnlyTeam" === a.settings.hitsOwnType ? o : a;
                      if (
                        s.settings.goThruObstacle ||
                        "tank" !== s.type ||
                        "never" === s.settings.hitsOwnType
                      )
                        return;
                      if (s.settings.isHelicopter)
                        return void (
                          s.godmode ||
                          s.invuln ||
                          (s.health.amount -= 0.9)
                        );
                      let i =
                        1 +
                        10 /
                          (Math.max(s.velocity.length, e.velocity.length) + 10);
                      t(e, s, !1, !1, i);
                    }
                    break;
                  case "wall" === a.type || "wall" === o.type:
                    {
                      let e = "wall" === a.type ? a : o,
                        s = "wall" === a.type ? o : a;
                      if (s.settings.diesByObstacles) return s.kill();
                      if (
                        s.settings.goThruObstacle ||
                        "mazeWall" === s.type ||
                        s.isDominator
                      )
                        return;
                      if (s.settings.isHelicopter) {
                        if (!s.godmode && !s.invuln) {
                          const t = e.width ? e.size * e.width : e.size,
                            i = e.height ? e.size * e.height : e.size;
                          if (
                            s.x + s.size < e.x - t ||
                            s.x - s.size > e.x + t ||
                            s.y + s.size < e.y - i ||
                            s.y - s.size > e.y + i
                          )
                            return 0;
                          s.health.amount -= 0.9;
                        }
                        return;
                      }
                      let i =
                        "bullet" === s.type || "trap" === s.type
                          ? 1 +
                            10 /
                              (Math.max(s.velocity.length, e.velocity.length) +
                                10)
                          : 1;
                      t(e, s, !1, !1, i);
                    }
                    break;
                  case "shield" === a.settings.hitsOwnType ||
                    "shield" === o.settings.hitsOwnType:
                    {
                      if (a.team === o.team || a.master.id === o.master.id)
                        return;
                      let t = "shield" === a.settings.hitsOwnType ? a : o,
                        s = "shield" === a.settings.hitsOwnType ? o : a;
                      if (
                        s.settings.goThruObstacle ||
                        "wall" === s.type ||
                        "food" === s.type ||
                        "mazeWall" === s.type ||
                        s.isDominator ||
                        s.master.isDominator ||
                        t.master.id === s.id
                      )
                        return;
                      e(t, s);
                    }
                    break;
                  case "vaccine" === a.settings.hitsOwnType ||
                    "vaccine" === o.settings.hitsOwnType:
                    {
                      let t = "vaccine" === a.settings.hitsOwnType ? a : o,
                        s = "vaccine" === a.settings.hitsOwnType ? o : a;
                      if (t.team !== s.team)
                        return (
                          "vaccine" === t.settings.hitsOwnType &&
                            !0 === t.poisonStatic.enabled &&
                            ((s.poison.active = !0),
                            (s.poison.mult = t.poisonStatic.mult),
                            (s.poison.time = t.poisonStatic.duration),
                            (s.poison.remaining = t.master.health.amount)),
                          void (
                            "vaccine" !== t.settings.hitsOwnType ||
                            !0 !== t.empStatic.enabled ||
                            (s.isDominator && s.master.isDominator) ||
                            ((s.emp.active = !0),
                            (s.emp.time = t.empStatic.duration),
                            (s.emp.master = t.label))
                          )
                        );
                      if (
                        ("vaccine" === t.settings.hitsOwnType &&
                          !0 === t.vaccineStatic.enabled &&
                          t.master.id !== s.id &&
                          ((s.vaccine.active = !0),
                          (s.vaccine.mult = t.vaccineStatic.mult),
                          (s.vaccine.time = t.vaccineStatic.duration),
                          (s.vaccine.remaining = t.master.health.amount)),
                        s.settings.goThruObstacle ||
                          "wall" === s.type ||
                          "mazeWall" === s.type ||
                          s.isDominator ||
                          s.master.isDominator ||
                          t.master.id === s.id)
                      )
                        return;
                      e(t, s);
                    }
                    break;
                  case "mazeWall" === a.type || "mazeWall" === o.type:
                    {
                      if (a.type === o.type) return;
                      let e = "mazeWall" === a.type ? a : o,
                        t = "mazeWall" === a.type ? o : a;
                      if (
                        t.settings.goThruObstacle ||
                        "wall" === t.type ||
                        t.isDominator
                      )
                        return;
                      if (t.settings.isHelicopter)
                        return void (
                          !t.godmode &&
                          !t.invuln &&
                          util.getDistance(e, t) < 1.35 * e.size &&
                          (t.health.amount -= 0.9)
                        );
                      ((e, t) => {
                        const s = e.width ? e.size * e.width : e.size,
                          i = e.height ? e.size * e.height : e.size;
                        if (
                          t.x + t.size < e.x - s ||
                          t.x - t.size > e.x + s ||
                          t.y + t.size < e.y - i ||
                          t.y - t.size > e.y + i
                        )
                          return 0;
                        if (e.intangibility || "crasher" === t.type) return 0;
                        "tank" === t.type ||
                          "food" === t.type ||
                          "crasher" === t.type ||
                          t.type;
                        let a = t.x < e.x - s,
                          o = t.x > e.x + s,
                          r = t.y < e.y - i,
                          n = t.y > e.y + i,
                          l = t.x - t.size < e.x - s,
                          h = t.x + t.size > e.x + s,
                          d = t.y - t.size < e.y - i,
                          c = t.y + t.size > e.y + i,
                          m = l ? -s : h ? s : 0,
                          u = d ? -e.size : c ? i : 0,
                          y = new Vector(e.x + m - t.x, e.y + u - t.y),
                          p = !0;
                        a && o && (a = o = !1),
                          r && n && (r = n = !1),
                          l && h && (l = h = !1),
                          d && c && (d = c = !1),
                          (a && !r && !n) || (l && !d && !c)
                            ? (t.accel.x > 0 &&
                                ((t.accel.x = 0), (t.velocity.x = 0)),
                              (t.x = e.x - s - t.size))
                            : (o && !r && !n) || (h && !d && !c)
                            ? (t.accel.x < 0 &&
                                ((t.accel.x = 0), (t.velocity.x = 0)),
                              (t.x = e.x + s + t.size))
                            : (r && !a && !o) || (d && !l && !h)
                            ? (t.accel.y > 0 &&
                                ((t.accel.y = 0), (t.velocity.y = 0)),
                              (t.y = e.y - i - t.size))
                            : (n && !a && !o) || (c && !l && !h)
                            ? (t.accel.y < 0 &&
                                ((t.accel.y = 0), (t.velocity.y = 0)),
                              (t.y = e.y + i + t.size))
                            : m && u
                            ? y.isShorterThan(t.size) ||
                              !(a || o || r || n) ||
                              (p = !1)
                            : t.x + t.y < e.x + e.y
                            ? t.x - t.y < e.x - e.y
                              ? (t.accel.x > 0 &&
                                  ((t.accel.x = 0), (t.velocity.x = 0)),
                                (t.x = e.x - s - t.size))
                              : (t.accel.y > 0 &&
                                  ((t.accel.y = 0), (t.velocity.y = 0)),
                                (t.y = e.y - i - t.size))
                            : t.x - t.y < e.x - e.y
                            ? (t.accel.y < 0 &&
                                ((t.accel.y = 0), (t.velocity.y = 0)),
                              (t.y = e.y + i + t.size))
                            : (t.accel.x < 0 &&
                                ((t.accel.x = 0), (t.velocity.x = 0)),
                              (t.x = e.x + s + t.size)),
                          p &&
                            (t.godmode ||
                              (t.settings.bounceOnObstacles ||
                              ("bullet" !== t.type &&
                                "swarm" !== t.type &&
                                "trap" !== t.type &&
                                ("food" !== t.type || t.isNestFood) &&
                                "minion" !== t.type &&
                                "drone" !== t.type)
                                ? room.wallCollisions.push({
                                    id: t.id,
                                    justForceIt:
                                      !(a || o || r || n) ||
                                      y.isShorterThan(t.size),
                                    left: (a && !r && !n) || (l && !d && !c),
                                    right: (o && !r && !n) || (h && !d && !c),
                                    top: (r && !a && !o) || (d && !l && !h),
                                    bottom: (n && !a && !o) || (c && !l && !h),
                                  })
                                : t.kill()),
                            t.collisionArray.push(e));
                      })(e, t);
                    }
                    break;
                  case ("crasher" === a.type && "food" === o.type) ||
                    ("crasher" === o.type && "food" === a.type):
                    e(a, o);
                    break;
                  case a.team !== o.team && !a.hitsOwnTeam && !o.hitsOwnTeam:
                  case a.team === o.team &&
                    (a.hitsOwnTeam || o.hitsOwnTeam) &&
                    a.master.master.id !== o.master.master.id &&
                    o.master.master.id !== a.master.master.id:
                    t(a, o, !0, !0);
                    break;
                  case "never" === a.settings.hitsOwnType ||
                    "never" === o.settings.hitsOwnType:
                    break;
                  case a.settings.hitsOwnType === o.settings.hitsOwnType &&
                    !a.multibox.enabled &&
                    !o.multibox.enabled:
                    switch (a.settings.hitsOwnType) {
                      case "mountain":
                        a.master.id === o.master.id && s(a, o);
                      case "push":
                        t(a, o, !1, !1);
                        break;
                      case "hard":
                        e(a, o);
                        break;
                      case "hardWithBuffer":
                        a.master.id === o.master.id && e(a, o, 30);
                        break;
                      case "spike":
                        !(function (e, t) {
                          let s = (1 + util.getDistance(e, t) / 2) * room.speed,
                            i = e.intangibility ? 1 : e.pushability,
                            a = t.intangibility ? 1 : t.pushability,
                            o = (15 * (e.x - t.x)) / s,
                            r = (15 * (e.y - t.y)) / s,
                            n = Math.min(e.velocity.length, 3),
                            l = Math.min(t.velocity.length, 3);
                          (e.accel.x += (i / (a + 0.3)) * o * n),
                            (e.accel.y += (i / (a + 0.3)) * r * n),
                            (t.accel.x -= (a / (i + 0.3)) * o * l),
                            (t.accel.y -= (a / (i + 0.3)) * r * l);
                        })(a, o);
                        break;
                      case "hardOnlyDrones":
                        a.master.id === o.master.id && e(a, o);
                        break;
                      case "hardOnlyTanks":
                        "tank" !== a.type ||
                          "tank" !== o.type ||
                          a.isDominator ||
                          o.isDominator ||
                          a.isInMyBase() ||
                          o.isInMyBase() ||
                          e(a, o);
                        break;
                      case "repel":
                        ((e, t) => {
                          let s = (1 + util.getDistance(e, t) / 2) * room.speed,
                            i = e.intangibility ? 1 : e.pushability,
                            a = t.intangibility ? 1 : t.pushability,
                            o = (0.05 * (e.x - t.x)) / s,
                            r = (0.05 * (e.y - t.y)) / s;
                          (e.accel.x += (i / (a + 0.3)) * o),
                            (e.accel.y += (i / (a + 0.3)) * r),
                            (t.accel.x -= (a / (i + 0.3)) * o),
                            (t.accel.y -= (a / (i + 0.3)) * r);
                        })(a, o);
                    }
                }
              }
            };
          })(),
          t = (e) => {
            let t = room.wallCollisions.filter((t) => t.id === e.id);
            if (t.length > 1) {
              let s = t.some((e) => e.justForceIt);
              if (!s)
                for (let e = 1; e < t.length; e++)
                  if (
                    (t[0].left && t[e].right) ||
                    (t[0].right && t[e].left) ||
                    (t[0].top && t[e].bottom) ||
                    (t[0].bottom && t[e].top)
                  ) {
                    s = !0;
                    break;
                  }
              s &&
                ("tank" !== e.type &&
                  "miniboss" !== e.type &&
                  ((e.killedByWalls = !0), e.kill()),
                (e.health.amount -= 1.5),
                e.health.amount <= 0 &&
                  ((e.invuln = e.passive = e.godmode = !1),
                  (e.killedByWalls = !0)));
            }
            e.death()
              ? e.destroy()
              : (null == e.bond &&
                  (logs.physics.set(),
                  newLogs.physics.start(),
                  e.physics(),
                  newLogs.physics.stop(),
                  logs.physics.mark()),
                e.activation.check() &&
                  (logs.entities.tally(),
                  logs.life.set(),
                  e.life(),
                  logs.life.mark(),
                  e.friction(),
                  newLogs.location.start(),
                  e.location(),
                  newLogs.location.stop(),
                  logs.selfie.set(),
                  newLogs.camera.start(),
                  e.takeSelfie(),
                  newLogs.camera.stop(),
                  logs.selfie.mark()),
                (e.lastSavedHealth = {
                  health: e.health.amount,
                  shield: e.shield.amount,
                })),
              (e.collisionArray = []);
          };
        return () => {
          let s = performance.now();
          if (
            (newLogs.location.reset(),
            newLogs.death.reset(),
            newLogs.destroy.reset(),
            newLogs.activation.reset(),
            newLogs.controllers.reset(),
            newLogs.aspects.reset(),
            newLogs.physics.reset(),
            newLogs.camera.reset(),
            newLogs.buildList.reset(),
            newLogs.targeting.reset(),
            logs.loops.tally(),
            logs.master.set(),
            logs.activation.set(),
            logs.activation.mark(),
            logs.collide.set(),
            newLogs.collision.reset(),
            newLogs.collision.start(),
            entities.length > 1)
          ) {
            (room.wallCollisions = []), grid.update();
            let t = grid.queryForCollisionPairs();
            for (let s of chunkar(t, 400)) for (let t of s) e(t);
          }
          newLogs.collision.stop(), logs.collide.mark(), logs.entities.set();
          for (let e = 0, s = entities.length; e < s; e++) t(entities[e]);
          (targetableEntities = []), purgeEntities();
          for (let e = 0, t = entities.length; e < t; e++)
            (i = entities[e]),
              newLogs.activation.start(),
              (i.collisionArray = []),
              i.activation.update(),
              i.updateAABB(i.activation.check()),
              i.activation.check() && (i.passive || targetableEntities.push(i)),
              newLogs.activation.stop();
          var i;
          logs.entities.mark(),
            logs.master.mark(),
            purgeEntities(),
            (room.lastCycle = util.time()),
            (room.mspt = performance.now() - s),
            room.mspt > 10 && c.logMode && speedCheckLoop.printAnways();
        };
      })(),
      abilityLoop = () => {
        for (let e = 0, t = entities.length; e < t; e++) {
          let t = entities[e];
          t.godmode || t.invuln || t.health.amount <= 10 || t.immuneToAbilities
            ? ((t.poison.time = 0), (t.poison.active = !1))
            : t.poison.active && !t.immuneToAbilities
            ? (t.poison.time--,
              (t.health.amount -= 0.89 * t.poison.mult),
              t.poison.time < -1 && (t.poison.active = !1))
            : (t.poison.remaining <= 0.025 || t.poison.time < -1) &&
              (t.poison.active = !1),
            t.godmode ||
            t.invuln ||
            t.health.amount >= t.health.max ||
            t.immuneToAbilities
              ? ((t.vaccine.time = 0), (t.vaccine.active = !1))
              : t.vaccine.active && !t.immuneToAbilities
              ? (t.vaccine.time--,
                (t.health.amount += 0.925 * t.vaccine.mult),
                t.vaccine.time < -1 && (t.vaccine.active = !1))
              : t.vaccine.time < -1 && (t.vaccine.active = !1),
            t.godmode || t.invuln || t.immuneToAbilities
              ? ((t.emp.time = 0), (t.emp.active = !1))
              : t.emp.active && !t.immuneToAbilities
              ? (t.emp.time--,
                "Surge Line" === t.emp.master &&
                  (t.velocity.x = t.velocity.y = 0),
                t.emp.time < -1 && (t.emp.active = !1))
              : t.emp.time < -1 && (t.emp.active = !1);
        }
      },
      maintainLoop = (() => {
        (placeObstacles = () => {
          if (room.modelMode) return;
          if ("Carrier Battle" === c.serverName) {
            const e = [Class.babyObstacle, Class.obstacle, Class.megaObstacle],
              t = room.width / 100;
            util.log("Spawning", t, "obstacles!");
            for (let s = 0; s < t; s++) {
              let t,
                s = ran.choose(e),
                i = 0;
              do {
                if (((t = room.randomType("norm")), i++, i > 200))
                  return util.warn("Failed to place obstacles!"), 0;
              } while (dirtyCheck(t, 10 + s.SIZE));
              let a = new Entity(t);
              a.define(s),
                (a.team = -101),
                (a.facing = ran.randomAngle()),
                a.protect(),
                a.life();
            }
            return;
          }
          const e = (e, t) => {
            let s,
              i = 0;
            do {
              if (((s = room.randomType(e)), i++, i > 200))
                return util.warn("Failed to place obstacles!"), 0;
            } while (dirtyCheck(s, 10 + t.SIZE));
            let a = new Entity(s);
            a.define(t),
              (a.team = -101),
              (a.facing = ran.randomAngle()),
              a.protect(),
              a.life();
          };
          let t =
              (room.roid.length * room.width * room.height) /
              room.xgrid /
              room.ygrid /
              5e4 /
              1.5,
            s =
              (room.rock.length * room.width * room.height) /
              room.xgrid /
              room.ygrid /
              25e4 /
              1.5,
            i = 0;
          for (let s = Math.ceil(0.2 * t); s; s--)
            i++, e("roid", Class.megaObstacle);
          for (let s = Math.ceil(t); s; s--) i++, e("roid", Class.obstacle);
          for (let s = Math.ceil(0.4 * t); s; s--)
            i++, e("roid", Class.babyObstacle);
          for (let t = Math.ceil(0.1 * s); t; t--)
            i++, e("rock", Class.megaObstacle);
          for (let t = Math.ceil(0.2 * s); t; t--)
            i++, e("rock", Class.obstacle);
          for (let t = Math.ceil(0.4 * s); t; t--)
            i++, e("rock", Class.babyObstacle);
          util.log("Placed " + i + " obstacles.");
        }),
          (global.generateMaze = (e) => {
            let t = ["nest", "port", "domi", "edge"];
            for (let e = 1; e < 5; e++)
              t.push("bas" + e),
                t.push("n_b" + e),
                t.push("bad" + e),
                t.push("dom" + e);
            const s = c.MAZE.CAVES
                ? new (class {
                    constructor(e = {}) {
                      if (
                        (null == e.width && (e.width = 32),
                        !Number.isFinite(e.width) ||
                          e.width < 16 ||
                          (e.width != e.width) | 0)
                      )
                        throw new RangeError(
                          "If specified, options.width must be a finite integer greater than 15! (Defaults to 32)"
                        );
                      if (
                        (null == e.height && (e.height = 32),
                        !Number.isFinite(e.height) ||
                          e.height < 16 ||
                          (e.height != e.height) | 0)
                      )
                        throw new RangeError(
                          "If specified, options.height must be a finite integer greater than 15! (Defaults to 32)"
                        );
                      if (null == e.clumpSize) e.clumpSize = [1, 2];
                      else if (
                        !Array.isArray(e.clumpSize) ||
                        2 !== e.clumpSize.length ||
                        e.clumpSize.some((e) => e < 1 || (e != e) | 0)
                      )
                        throw new RangeError(
                          "If specified, options.clumpSize must be an array of two positive integers! (Defaults to [1, 2])"
                        );
                      if (null == e.lineThreshold) e.lineThreshold = 1;
                      else if (Array.isArray(e.lineThreshold)) {
                        if (e.lineThreshold.some((e) => e < 0 || (e != e) | 0))
                          throw new RangeError(
                            "If specified as an array, options.lineThreshold must be an array of two zero or positive integers! (Defaults to 1)"
                          );
                      } else if (
                        !Number.isFinite(e.lineThreshold) ||
                        e.lineThreshold < 0 ||
                        (e.lineThreshold != e.lineThreshold) | 0
                      )
                        throw new RangeError(
                          "If specified, options.lineThreshold must be a finite positive or zero integer! (Defaults to 1)"
                        );
                      if (null == e.soloThreshold) e.soloThreshold = 0.95;
                      else if (
                        e.soloThreshold !==
                        Math.min(1, Math.max(0.5, e.soloThreshold))
                      )
                        throw new RangeError(
                          "If specified, options.soloThreshold must be a decimal from .5 to 1! (Defaults to .95)"
                        );
                      if (
                        (null == e.loopCap && (e.loopCap = 1e7),
                        !Number.isFinite(e.loopCap) ||
                          e.loopCap < 1e6 ||
                          (e.loopCap != e.loopCap) | 0)
                      )
                        throw new RangeError(
                          "If specified, options.loopCap must be a finite integer greater than 999999! (Defaults to 10000000)"
                        );
                      if (
                        ((e.cardinals = !!e.cardinals),
                        (e.openMiddle = !!e.openMiddle),
                        (this.options = e),
                        (this.maze =
                          null != e.mapString
                            ? this.parseMapString(e.mapString)
                            : JSON.parse(
                                JSON.stringify(
                                  Array(e.width || 32).fill(
                                    Array(e.height || 32).fill(!1)
                                  )
                                )
                              )),
                        null == e.mapString)
                      ) {
                        this.clearRing(0), this.clearRing(5);
                        let e = (this.width / 2) | 0,
                          t = (this.height / 2) | 0,
                          s = (this.width / 5) | 0;
                        s % 2 && s++;
                        for (let i = e - s / 2; i < e + s / 2; i++)
                          for (let e = t - s / 2; e < t + s / 2; e++)
                            this.maze[0 | i][0 | e] = !1;
                      }
                      this.run(0.325 * this.maze.flat().length);
                    }
                    get width() {
                      return this.maze.length;
                    }
                    get height() {
                      return this.maze[0].length;
                    }
                    parseMapString(e) {
                      const t = e
                        .trim()
                        .split("\n")
                        .map((e) =>
                          e
                            .trim()
                            .split("")
                            .map((e) => ("#" === e ? 1 : "@" === e))
                        );
                      return Array(t[0].length)
                        .fill()
                        .map((e, s) =>
                          Array(t.length)
                            .fill()
                            .map((e, i) => t[i][s])
                        );
                    }
                    randomPosition(e) {
                      let t = Math.floor(Math.random() * this.width),
                        s = Math.floor(Math.random() * this.height);
                      for (; this.maze[t][s] != e; )
                        (t = Math.floor(Math.random() * this.width)),
                          (s = Math.floor(Math.random() * this.height));
                      return [t, s];
                    }
                    clearRing(e) {
                      for (let t = e; t < this.width - e; t++)
                        (this.maze[t][e] = !1),
                          (this.maze[t][this.height - 1 - e] = !1);
                      for (let t = e; t < this.height - e; t++)
                        (this.maze[e][t] = !1),
                          (this.maze[this.width - 1 - e][t] = !1);
                    }
                    getDistance(e, t) {
                      return Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
                    }
                    run(e) {
                      let t = [];
                      for (let s = 0; s < 0.04 * e; s++) {
                        let e,
                          s,
                          i =
                            this.options.clumpSize[0] +
                            Math.round(
                              Math.random() *
                                (this.options.clumpSize[1] -
                                  this.options.clumpSize[0])
                            ),
                          a = 100;
                        do {
                          [e, s] = this.randomPosition(0);
                        } while (
                          t.some(
                            (t) =>
                              t.id !== a &&
                              this.getDistance(t, {
                                x: e,
                                y: s,
                              }) <
                                t.size + i + a / 7.5
                          ) &&
                          a--
                        );
                        t.push({
                          x: e,
                          y: s,
                          size: i,
                          id: a,
                        });
                      }
                      for (let e = 0; e < this.width; e++)
                        for (let s = 0; s < this.height; s++)
                          t.some(
                            (t) =>
                              this.getDistance(t, {
                                x: e,
                                y: s,
                              }) < t.size
                          ) && (this.maze[e][s] = !0);
                      let s = 0;
                      e: for (
                        ;
                        this.maze.flat().filter((e) => !!e).length < e &&
                        s++ < this.options.loopCap &&
                        (this.disposeOfBadAreas(),
                        !(this.maze.flat().filter((e) => !!e).length > e));

                      )
                        t: for (let t = 1; t < this.width - 1; t++) {
                          for (let s = 1; s < this.height - 1; s++) {
                            const i = [
                              this.maze[t + 1][s],
                              this.maze[t - 1][s],
                              this.maze[t][s + 1],
                              this.maze[t][s - 1],
                            ]
                              .concat(
                                this.options.cardinals
                                  ? []
                                  : [
                                      this.maze[t + 1][s + 1],
                                      this.maze[t - 1][s + 1],
                                      this.maze[t + 1][s - 1],
                                      this.maze[t - 1][s - 1],
                                    ]
                              )
                              .filter((e) => !!e).length;
                            if (
                              (Math.random() > 0.45
                                ? ((this.options.lineThreshold instanceof
                                    Array &&
                                    i >= this.options.lineThreshold[0] &&
                                    i <= this.options.lineThreshold[1]) ||
                                    i === this.options.lineThreshold) &&
                                  (this.maze[t][s] = !0)
                                : 0 === i &&
                                  Math.random() > this.options.soloThreshold &&
                                  (this.maze[t][s] = !0),
                              this.maze.flat().filter((e) => !!e).length > e)
                            )
                              break e;
                          }
                          if (this.maze.flat().filter((e) => !!e).length > e)
                            break t;
                        }
                      this.disposeOfBadAreas();
                    }
                    disposeOfBadAreas() {
                      if ((this.clearRing(0), this.options.openMiddle)) {
                        let e = (this.width / 2) | 0,
                          t = (this.height / 2) | 0,
                          s = (this.width / 5) | 0;
                        s % 2 && s++;
                        for (let i = e - s / 2; i < e + s / 2; i++)
                          for (let e = t - s / 2; e < t + s / 2; e++)
                            this.maze[0 | i][0 | e] = !1;
                      }
                      for (let e = 1; e < this.width - 1; e++)
                        for (let t = 1; t < this.height - 1; t++)
                          if (
                            !1 === this.maze[e][t] &&
                            [
                              this.maze[e + 1][t],
                              this.maze[e - 1][t],
                              this.maze[e][t + 1],
                              this.maze[e][t - 1],
                            ].filter((e) => !!e).length > 0
                          ) {
                            let s = this.floodFill(e, t, !1);
                            s.fill &&
                              s.positions.forEach((e) => {
                                this.maze[e.x][e.y] = !0;
                              });
                          }
                    }
                    floodFill(e, t, s = 1) {
                      let i = [],
                        a = !0,
                        o = (e, t) => {
                          i.some((s) => s.x === e && s.y === t) ||
                            (i.push({
                              x: e,
                              y: t,
                            }),
                            e + 1 >= this.width ||
                            t + 1 >= this.height ||
                            e - 1 < 0 ||
                            t - 1 < 0
                              ? (a = !1)
                              : (!!this.maze[e + 1][t] === s && o(e + 1, t),
                                !!this.maze[e - 1][t] === s && o(e - 1, t),
                                !!this.maze[e][t + 1] === s && o(e, t + 1),
                                !!this.maze[e][t - 1] === s && o(e, t - 1)));
                        };
                      return (
                        o(e, t),
                        {
                          fill: a,
                          positions: i,
                        }
                      );
                    }
                  })(c.MAZE)
                : new (class {
                    constructor(e = {}) {
                      null == e.erosionPattern
                        ? (e.erosionPattern = {
                            amount: 0.4,
                            getter: (e, t) =>
                              e > 0.3 * t
                                ? [
                                    Math.random() > 0.4
                                      ? 2
                                      : Math.random() > 0.4
                                      ? 1
                                      : 0,
                                    Math.random() > 0.3
                                      ? 2
                                      : (2 * Math.random()) | 0,
                                  ]
                                : [
                                    +(Math.random() > 0.6),
                                    (3 * Math.random()) | 0,
                                  ],
                          })
                        : (null == e.erosionPattern.amount &&
                            (e.erosionPattern.amount = 0.4),
                          null == e.erosionPattern.getter &&
                            (e.erosionPattern.getter = (e, t) =>
                              e > 0.4 * t
                                ? [
                                    Math.random() > 0.4
                                      ? 2
                                      : Math.random() > 0.5
                                      ? 1
                                      : 0,
                                    Math.random() > 0.1
                                      ? 2
                                      : (2 * Math.random()) | 0,
                                  ]
                                : [
                                    +(Math.random() > 0.5),
                                    (3 * Math.random()) | 0,
                                  ])),
                        (this.options = e),
                        (this.maze =
                          null != e.mapString
                            ? this.parseMapString(e.mapString)
                            : JSON.parse(
                                JSON.stringify(
                                  Array(e.width || 32).fill(
                                    Array(e.height || 32).fill(!0)
                                  )
                                )
                              ));
                      const s = room.width / this.width;
                      for (let e = 0; e < this.width; e++)
                        for (let i = 0; i < this.height; i++)
                          for (let a of t)
                            room.isIn(a, {
                              x: e * s + 0.5 * s,
                              y: i * s + 0.5 * s,
                            }) && (this.maze[e][i] = !1);
                      null == e.mapString &&
                        (this.clearRing(0), this.clearRing(5));
                      const i =
                        this.maze.flat().length * e.erosionPattern.amount;
                      for (let t = 0; t < i; t++)
                        this.randomErosion(...e.erosionPattern.getter(t, i));
                    }
                    get width() {
                      return this.maze.length;
                    }
                    get height() {
                      return this.maze[0].length;
                    }
                    parseMapString(e) {
                      const t = e
                        .trim()
                        .split("\n")
                        .map((e) =>
                          e
                            .trim()
                            .split("")
                            .map((e) => ("#" === e ? 1 : "@" === e))
                        );
                      return Array(t[0].length)
                        .fill()
                        .map((e, s) =>
                          Array(t.length)
                            .fill()
                            .map((e, i) => t[i][s])
                        );
                    }
                    randomPosition(e) {
                      let t = Math.floor(Math.random() * this.width),
                        s = Math.floor(Math.random() * this.height);
                      for (; this.maze[t][s] != e; )
                        (t = Math.floor(Math.random() * this.width)),
                          (s = Math.floor(Math.random() * this.height));
                      return [t, s];
                    }
                    clearRing(e) {
                      for (let t = e; t < this.width - e; t++)
                        (this.maze[t][e] = !1),
                          (this.maze[t][this.height - 1 - e] = !1);
                      for (let t = e; t < this.height - e; t++)
                        (this.maze[e][t] = !1),
                          (this.maze[this.width - 1 - e][t] = !1);
                    }
                    randomErosion(e, t) {
                      for (let s = 0; s < 750; s++) {
                        const [s, i] = this.randomPosition(!1);
                        if (
                          !(
                            (0 !== s && s !== this.width - 1) ||
                            (0 !== i && i !== this.height - 1)
                          )
                        )
                          continue;
                        let a = (4 * Math.random()) | 0;
                        0 === s
                          ? (a = 0)
                          : 0 === i
                          ? (a = 1)
                          : s === this.width - 1
                          ? (a = 2)
                          : i === this.height - 1 && (a = 3);
                        let o = 0 === a ? s + 1 : 2 === a ? s - 1 : s,
                          r = 1 === a ? i + 1 : 3 === a ? i - 1 : i;
                        if (!0 === this.test(o, r)) {
                          if (null !== t) {
                            let e =
                                this.maze[2 === a || 3 === a ? s - 1 : s + 1][
                                  0 === a || 3 === a ? i - 1 : i + 1
                                ],
                              o =
                                this.maze[1 === a || 2 === a ? s - 1 : s + 1][
                                  2 === a || 3 === a ? i - 1 : i + 1
                                ];
                            if ((!0 !== t || (!e && !o)) && t !== +e + +o)
                              continue;
                          }
                          if (null !== e) {
                            let t =
                                this.maze[
                                  3 === a ? s + 1 : 1 === a ? s - 1 : s
                                ][0 === a ? i + 1 : 2 === a ? i - 1 : i],
                              o =
                                this.maze[
                                  1 === a ? s + 1 : 3 === a ? s - 1 : s
                                ][2 === a ? i + 1 : 0 === a ? i - 1 : i];
                            if ((!0 !== e || (!t && !o)) && e !== +t + +o)
                              continue;
                          }
                          return void (this.maze[o][r] = !1);
                        }
                      }
                    }
                    test(e, t) {
                      return this.maze[e][t];
                    }
                    toMapString() {
                      let e = "";
                      for (let t = 0; t < this.height; t++) {
                        for (let s = 0; s < this.width; s++)
                          e +=
                            1 === this.maze[s][t]
                              ? "#"
                              : this.maze[s][t]
                              ? "@"
                              : "-";
                        e += "\n";
                      }
                      return e;
                    }
                  })(c.MAZE),
              i = new (class {
                constructor(e) {
                  (this._ref = JSON.parse(JSON.stringify(e))),
                    (this.maze = e),
                    (this.blocks = []);
                }
                get width() {
                  return this.maze.length;
                }
                get height() {
                  return 0 === this.maze.length ? 0 : this.maze[0].length;
                }
                findBiggest() {
                  let e = {
                    x: 0,
                    y: 0,
                    size: 0,
                  };
                  for (let t = 0; t < this.width; t++)
                    for (let s = 0; s < this.height; s++) {
                      if (!this.maze[t][s]) continue;
                      let i = 1;
                      e: for (; t + i < this.width && s + i < this.height; ) {
                        for (let e = 0; e <= i; e++)
                          if (
                            !this.maze[t + i][s + e] ||
                            !this.maze[t + e][s + i]
                          )
                            break e;
                        i++;
                      }
                      i > e.size &&
                        (e = {
                          x: t,
                          y: s,
                          size: i,
                        });
                    }
                  for (let t = 0; t < e.size; t++)
                    for (let s = 0; s < e.size; s++)
                      this.maze[e.x + t][e.y + s] = !1;
                  return {
                    x: e.x,
                    y: e.y,
                    size: e.size,
                    width: 1,
                    height: 1,
                  };
                }
                lookup(e, t, s, i, a) {
                  return this.blocks.find(
                    (o) =>
                      o.x === e &&
                      o.y === t &&
                      o.size === s &&
                      o.width === i &&
                      o.height === a
                  );
                }
                remove(e) {
                  return (
                    (this.blocks = this.blocks.filter((t) => t.id != e)),
                    this.blocks
                  );
                }
                remap() {
                  let e;
                  for (
                    this.blocks = [];
                    (e = this.findBiggest()) &&
                    !this.blocks.includes(e) &&
                    e.size > 0;

                  )
                    this.blocks.push(e);
                  this.blocks.forEach((e, t) => {
                    e.id = t;
                  });
                  let t = 0;
                  for (; t < this.blocks.length; ) {
                    const e = this.blocks[t];
                    if (Math.random() > 0.5) {
                      let t = 1;
                      for (
                        let s = e.x + e.size;
                        s <= this.width - e.size;
                        s += e.size
                      ) {
                        const i = this.lookup(
                          s,
                          e.y,
                          e.size,
                          e.width,
                          e.height
                        );
                        if (!i) break;
                        this.remove(i.id), t++;
                      }
                      e.width = t;
                      let s = 1;
                      for (
                        let t = e.y + e.size;
                        t <= this.height - e.size;
                        t += e.size
                      ) {
                        const i = this.lookup(
                          e.x,
                          t,
                          e.size,
                          e.width,
                          e.height
                        );
                        if (!i) break;
                        this.remove(i.id), s++;
                      }
                      e.height = s;
                    } else {
                      let t = 1;
                      for (
                        let s = e.y + e.size;
                        s <= this.height - e.size;
                        s += e.size
                      ) {
                        const i = this.lookup(
                          e.x,
                          s,
                          e.size,
                          e.width,
                          e.height
                        );
                        if (!i) break;
                        this.remove(i.id), t++;
                      }
                      e.height = t;
                      let s = 1;
                      for (
                        let t = e.x + e.size;
                        t <= this.width - e.size;
                        t += e.size
                      ) {
                        const i = this.lookup(
                          t,
                          e.y,
                          e.size,
                          e.width,
                          e.height
                        );
                        if (!i) break;
                        this.remove(i.id), s++;
                      }
                      e.width = s;
                    }
                    t++;
                  }
                  return this.blocks;
                }
              })(s.maze),
              a = i.remap();
            global.mazeGridData = i._ref.map((e) => e.map((e) => !!e));
            const o = room.width / s.width;
            for (const t of a) {
              const s = t.width || 1,
                i = t.height || 1;
              let a = new Entity({
                x: t.x * o + (o / 2) * t.size * s,
                y: t.y * o + (o / 2) * t.size * i,
              });
              a.define(Class.mazeObstacle),
                (a.SIZE = (t.size * o) / 2 + 2 * t.size),
                (a.width = s - (s > 1 ? 0.1 * (s - s / 1.1) : 0)),
                (a.height = i - (i > 1 ? 0.1 * (i - i / 1.1) : 0)),
                (a.team = -101),
                (a.alwaysActive = !0),
                (a.settings.canGoOutsideRoom = !0),
                c.RANKED_BATTLE && (a.roomId = e),
                a.protect(),
                a.life();
            }
          }),
          room.modelMode || placeObstacles(),
          c.MAZE.ENABLED && global.generateMaze();
        const e = (() => {
            if (room.modelMode) return;
            let e = 0;
            const t = (() => {
              let e = 0,
                t = [],
                s = [Class.egg],
                i = 0,
                a = "Placeholder message for spawnBosses.begin()",
                o = "Placeholder message for spawnBosses.arrival()",
                r = "norm";
              const n = () => {
                let i,
                  a = 150;
                do {
                  i = room.randomType(r);
                } while (dirtyCheck(i, 500) && a-- > 0);
                let o = new Entity(i);
                o.define(ran.choose(s)), (o.team = -100), (o.name = t[e++]);
              };
              return {
                prepareToSpawn: (n, l, h, d = "norm") => {
                  if (
                    ((i = l),
                    (s = n),
                    (r = d),
                    (t = ran.chooseBossName(h, l)),
                    (e = 0),
                    1 === i)
                  )
                    (a = "A boss is coming..."), (o = t[0] + " has arrived!");
                  else {
                    (a = "Bosses are coming..."), (o = "");
                    for (let e = 0; e < i - 2; e++) o += t[e] + ", ";
                    o += t[i - 2] + " and " + t[i - 1] + " have arrived!";
                  }
                },
                spawn: () => {
                  sockets.broadcast(a);
                  for (let e = 0; e < i; e++)
                    setTimeout(n, ran.randomRange(3500, 5e3));
                  setTimeout(() => sockets.broadcast(o), 5e3), util.spawn(o);
                },
              };
            })();
            return (s) => {
              if (
                e > c.BOSS_SPAWN_TIMER &&
                ran.dice(3 * c.BOSS_SPAWN_TIMER - e)
              ) {
                util.spawn("Preparing to spawn bosses..."), (e = 0);
                let s = [];
                switch (Math.floor(27 * Math.random())) {
                  case 0:
                  case 1:
                  case 2:
                    (s = [
                      [
                        Class.eliteDestroyerAI,
                        Class.eliteGunnerAI,
                        Class.eliteSprayerAI,
                        Class.eliteTwinAI,
                        Class.eliteMachineAI,
                        Class.eliteTrapAI,
                        Class.eliteBorerAI,
                        Class.eliteSniperAI,
                        Class.eliteBasicAI,
                        Class.eliteInfernoAI,
                      ],
                      Math.floor(2 * Math.random()) + 1,
                      "a",
                      "nest",
                    ]),
                      sockets.broadcast("A stirring in the distance...");
                    break;
                  case 3:
                  case 4:
                    (s = [
                      [
                        Class.fallenBoosterAI,
                        Class.fallenOverlordAI,
                        Class.fallenPistonAI,
                        Class.fallenAutoTankAI,
                        Class.fallenCavalcadeAI,
                        Class.fallenFighterAI,
                        Class.fallenDrifterAI,
                      ],
                      Math.floor(3 * Math.random()) + 1,
                      "a",
                      "norm",
                    ]),
                      sockets.broadcast("The dead are rising...");
                    break;
                  case 5:
                  case 6:
                    (s = [
                      [
                        Class.reanimFarmerAI,
                        Class.reanimHeptaTrapAI,
                        Class.reanimUziAI,
                      ],
                      1,
                      "a",
                      "norm",
                    ]),
                      sockets.broadcast(
                        "Many had sought for the day when they'd return... Just not in this way..."
                      );
                    break;
                  case 7:
                  case 8:
                  case 9:
                  case 26:
                    (s = [
                      [
                        Class.palisadeAI,
                        Class.skimBossAI,
                        Class.leviathanAI,
                        Class.ultMultitoolAI,
                        Class.nailerAI,
                        Class.gravibusAI,
                        Class.cometAI,
                        Class.brownCometAI,
                        Class.orangicusAI,
                        Class.atriumAI,
                        Class.constructionistAI,
                        Class.dropshipAI,
                        Class.eggQueenTier1AI,
                      ],
                      ran.chooseChance(60, 20, 20) + 1,
                      "castle",
                      "norm",
                    ]),
                      sockets.broadcast("A strange trembling...");
                    break;
                  case 10:
                  case 11:
                    (s = [
                      [
                        Class.armySentrySwarmAI,
                        Class.armySentryGunAI,
                        Class.armySentryTrapAI,
                        Class.armySentryRangerAI,
                        Class.armySentrySwarmAI,
                        Class.armySentryGunAI,
                        Class.armySentryTrapAI,
                        Class.armySentryRangerAI,
                      ],
                      8,
                      "castle",
                      "nest",
                    ]),
                      sockets.broadcast("Sentries unite...");
                    break;
                  case 12:
                  case 13:
                  case 14:
                    (s = [
                      [
                        Class.derogatorAI,
                        Class.hexadecagorAI,
                        Class.blitzkriegAI,
                        Class.demolisherAI,
                        Class.octogeddonAI,
                        Class.octagronAI,
                        Class.ultimateAI,
                        Class.cutterAI,
                        Class.alphaSentryAI,
                        Class.asteroidAI,
                        Class.eggQueenTier2AI,
                      ],
                      Math.floor(2 * Math.random()) + 1,
                      "castle",
                      "norm",
                    ]),
                      sockets.broadcast("Influx detected...");
                    break;
                  case 15:
                  case 16:
                    (s = [
                      [
                        Class.trapeFighterAI,
                        Class.visUltimaAI,
                        Class.gunshipAI,
                        Class.messengerAI,
                        Class.pulsarAI,
                        Class.colliderAI,
                        Class.deltrabladeAI,
                        Class.aquamarineAI,
                        Class.kioskAI,
                        Class.vanguardAI,
                        Class.magnetarAI,
                      ],
                      Math.floor(2 * Math.random()) + 1,
                      "a",
                      "nest",
                    ]),
                      sockets.broadcast("Don't get distracted...");
                    break;
                  case 17:
                  case 18:
                    (s = [
                      [Class.guardianAI, Class.summonerAI, Class.defenderAI],
                      3,
                      "a",
                      "nest",
                    ]),
                      sockets.broadcast("And then they found refuge here."),
                      sockets.broadcast(
                        "Copycats of them came to replace them; They had to flee."
                      ),
                      sockets.broadcast(
                        "First heard of in only myths, the trio has arrived in an alternate dimension."
                      );
                  case 19:
                    (s = [[Class.xyvAI], 1, "castle", "norm"]),
                      sockets.broadcast("Souls unite...");
                    break;
                  case 20:
                    (s = [[Class.conquistadorAI], 1, "castle", "norm"]),
                      sockets.broadcast(
                        "To put it bluntly, he's found it now."
                      ),
                      sockets.broadcast(
                        "Searching all across the land, he only wanted one thing."
                      );
                    break;
                  case 21:
                    (s = [
                      [Class.sassafrasAI],
                      1,
                      "sassafras",
                      ["roid", "rock"][Math.floor(2 * Math.random())],
                    ]),
                      sockets.broadcast("i like crackers");
                    break;
                  case 22:
                  case 23:
                  case 24:
                    (s = [
                      [Class.constAI, Class.bowAI, Class.snowflakeAI],
                      1,
                      "a",
                      ["norm", "nest"][Math.floor(2 * Math.random())],
                    ]),
                      sockets.broadcast("A disturbance...");
                    break;
                  case 25:
                    (s = [
                      [Class.greenGuardianAI],
                      1,
                      "a",
                      ["norm", "nest"][Math.floor(2 * Math.random())],
                    ]),
                      sockets.broadcast("I smell green paint...");
                }
                t.prepareToSpawn(...s), setTimeout(t.spawn, 3e3);
              } else s.miniboss || e++;
            };
          })(),
          t = (() => {
            if (!room.modelMode) {
              if ("tdm" === room.gameMode && c.DO_BASE_DAMAGE) {
                for (let e = 1; e < room.teamAmount + 1; e++) {
                  for (let t of room["bas" + e]) {
                    let s = new Entity(t);
                    s.define(Class.baseProtector),
                      (s.team = -e),
                      (s.color = [10, 12, 11, 15, 3, 35, 36, 0][e - 1]);
                  }
                  for (let t of room["bad" + e]) {
                    let s = new Entity(t);
                    s.define(Class.baseDroneSpawner),
                      (s.team = -e),
                      (s.color = [10, 12, 11, 15, 3, 35, 36, 0][e - 1]);
                  }
                }
                if (
                  ("Carrier Battle" === c.serverName && c.SPAWN_DOMINATORS
                    ? carrierBattle()
                    : (c.serverName.includes("Domination") ||
                        c.SPAWN_DOMINATORS) &&
                      room.domi.length > 0 &&
                      dominatorLoop(),
                  c.serverName.includes("Boss") &&
                    bossRushLoop({
                      x: Math.random() * room.width,
                      y: Math.random() * room.height,
                    }),
                  c.serverName.includes("Mothership"))
                )
                  for (let e = 1; e < room.teamAmount + 1; e++)
                    for (let t of room["mot" + e]) mothershipLoop(t, e);
              }
              return (
                c.serverName.includes("Trench Warfare") &&
                  (util.log("Initializing Trench Warfare"), trenchWarefare()),
                () => {
                  let t = {
                    crasher: 0,
                    miniboss: 0,
                    tank: 0,
                  };
                  for (let e of entities) null != t[e.type] && t[e.type]++;
                  if (
                    (room.modelMode ||
                      c.RANKED_BATTLE ||
                      ((e) => {
                        if (
                          !room.modelMode &&
                          ran.chance(
                            1 -
                              (2 * e.crasher) /
                                room.maxFood /
                                room.nestFoodAmount
                          )
                        ) {
                          let e,
                            t = 10;
                          do {
                            e = room.randomType("nest");
                          } while (dirtyCheck(e, 100) && t-- > 0);
                          let s = [
                              Class.sentryGunAI,
                              Class.sentrySwarmAI,
                              Class.sentryTrapAI,
                              Class.sentryRangerAI,
                              Class.flashSentryAI,
                              Class.semiCrushSentryAI,
                              Class.crushSentryAI,
                              Class.bladeSentryAI,
                              Class.greenSentrySwarmAI,
                              Class.skimSentryAI,
                              Class.kamikazeCrasherLite,
                            ],
                            i = [
                              Class.crasher,
                              Class.fastCrasher,
                              Class.semiCrushCrasher,
                              Class.crushCrasher,
                              Class.bladeCrasher,
                              Class.destroyCrasher,
                              Class.wallerCrasher,
                              Class.grouperSpawn,
                              Class.visDestructia,
                              Class.megaCrushCrasher,
                              Class.iceCrusher,
                              Class.poisonBlades,
                              Class.longCrasher,
                              Class.asteroidCrasher,
                              Class.walletCrasher,
                              Class.boomCrasher,
                              Class.zoomCrasher,
                              Class.invisoCrasher,
                              Class.redRunner1,
                              Class.greenRunner,
                              Class.destroyCrasherSquare,
                              Class.kamikazeCrasher,
                            ],
                            a = ran.dice(80)
                              ? s[
                                  ran.chooseChance(
                                    15,
                                    15,
                                    15,
                                    15,
                                    12,
                                    10,
                                    8,
                                    8,
                                    8,
                                    8,
                                    10
                                  )
                                ]
                              : i[
                                  ran.chooseChance(
                                    50,
                                    25,
                                    10,
                                    10,
                                    15,
                                    10,
                                    10,
                                    25,
                                    2,
                                    2,
                                    2,
                                    2,
                                    25,
                                    2,
                                    10,
                                    5,
                                    10,
                                    10,
                                    15,
                                    25,
                                    15,
                                    20
                                  )
                                ],
                            o = new Entity(e);
                          o.define(a), (o.team = -100);
                        }
                      })(t),
                    !room.arenaClosed && !room.modelMode && !c.RANKED_BATTLE)
                  ) {
                    if ((e(t), room.maxBots > 0)) {
                      (bots = bots.filter((e) => e.isAlive())),
                        bots.length < room.maxBots && spawnBot();
                      for (let e of bots)
                        e.skill.level < 60 &&
                          ((e.skill.score += 35), e.skill.maintain());
                    }
                    sanctuaries = entities.filter(
                      (e) =>
                        "None" !== e.sanctuaryType ||
                        "Sanctuary Boss" === e.miscIdentifier
                    );
                  }
                }
              );
            }
          })(),
          s = (() => {
            class e {
              constructor(e, t, s, i, a = !1, o = () => !0) {
                if ("scale" === s[0]) {
                  const e = s[1];
                  s = [];
                  for (let i = t.length; i > 0; i--) s.push(i ** e);
                }
                if (((this.name = e), t.length !== s.length))
                  throw new RangeError(
                    e +
                      ": error with group. Please make sure there is the same number of types as chances."
                  );
                (this.types = t
                  .filter((e) => !!e)
                  .map(
                    (e) => (
                      null == e.BODY && (e.BODY = {}),
                      (e.BODY.ACCELERATION = 0.015 / (e.FOOD.LEVEL + 1)),
                      e
                    )
                  )),
                  (this.chances = s),
                  (this.chance = i),
                  (this.isNestFood = a),
                  (this.condition = o);
              }
              choose() {
                return this.types[ran.chooseChance(...this.chances)];
              }
            }
            const t = [
              new e(
                "Normal",
                [
                  Class.egg,
                  Class.square,
                  Class.triangle,
                  Class.pentagon,
                  Class.betaPentagon,
                ],
                ["scale", 4],
                5e3
              ),
              new e(
                "Splitter and Crashers",
                [
                  Class.splitSquareSpawn,
                  Class.splitterSquare,
                  Class.redRunnerSpawn,
                  Class.triBladeSpawn,
                  Class.splitterPentagon,
                ],
                ["scale", 2],
                10
              ),
              new e(
                "Green",
                [
                  Class.greenSquare,
                  Class.greenTriangle,
                  Class.greenPentagon,
                  Class.greenBetaPentagon,
                ],
                ["scale", 5],
                3
              ),
              new e(
                "Orange",
                [
                  Class.orangeSquare,
                  Class.orangeTriangle,
                  Class.orangePentagon,
                ],
                ["scale", 6],
                1
              ),
              new e(
                "Nest",
                [
                  Class.pentagon,
                  Class.betaPentagon,
                  Class.alphaPentagon,
                  Class.hexagon,
                  Class.heptagon,
                  Class.octogon,
                  Class.nonagon,
                  Class.decagon,
                ],
                ["scale", 5],
                100,
                !0
              ),
              new e(
                "Sanctuaries",
                [
                  Class.eggSanctuary,
                  Class.squareSanctuary,
                  Class.triSanctuary,
                  Class.pentaSanctuary,
                  Class.alphaCrasher,
                  Class.bowedSanc,
                  Class.sunKing,
                  Class.snowballSanctuary,
                ],
                ["scale", 1.5],
                30,
                !1,
                () => sanctuaries.length < 1
              ),
            ];

            function s(e = !1) {
              const s = [[], []];
              if (global.foodTypeForces.length) {
                let e = global.foodTypeForces.shift(),
                  i = t[e];
                return (
                  s[0].push(e),
                  s[1].push(i.chance),
                  s[0][ran.chooseChance(...s[1])]
                );
              }
              for (let i = 0; i < t.length; i++)
                t[i].isNestFood == e &&
                  t[i].condition() &&
                  (s[0].push(i), s[1].push(t[i].chance));
              return s[0][ran.chooseChance(...s[1])];
            }

            function i(e, s = 0) {
              if (c.SANDBOX && global.sandboxRooms.length < 1) return {};
              let i = new Entity(e);
              return (
                (s = t[s].choose()),
                i.define(s),
                (i.facing = ran.randomAngle()),
                (i.team = -100),
                c.SANDBOX && (i.sandboxId = ran.choose(global.sandboxRooms).id),
                i
              );
            }

            function a() {
              let e,
                t = 5;
              do {
                if (((e = room.random()), t--, t <= 0)) return;
              } while (room.isIn("nest", e));
              for (let t = 0, a = (20 * Math.random()) | 0; t < a; t++) {
                const t = Math.random() * Math.PI * 2;
                i(
                  {
                    x: e.x + Math.cos(t) * (50 * Math.random()),
                    y: e.y + Math.sin(t) * (50 * Math.random()),
                  },
                  s()
                );
              }
            }

            function o() {
              let e,
                t = 5;
              do {
                if (((e = room.random()), t--, t <= 0)) return;
              } while (room.isIn("nest", e));
              i(e, s());
            }
            return (
              (global.foodTypeForces = []),
              (global.forceFoodSpawn = function (e) {
                let s = t.findIndex(
                  (t) => t.name.toLowerCase() === e.toLowerCase()
                );
                return s > -1 && (global.foodTypeForces.push(s), !0);
              }),
              () => {
                const e = 1 + room.maxFood + 1 * views.length,
                  t = 1 + room.maxFood * room.nestFoodAmount,
                  r = (() => {
                    let e = 0,
                      t = 0;
                    for (let s of entities)
                      "food" === s.type && (s.isNestFood ? t++ : e++);
                    return {
                      food: e,
                      nestFood: t,
                    };
                  })();
                r.food < e && [a, o][+(Math.random() > 0.8)](),
                  r.nestFood < t &&
                    (i(room.randomType("nest"), s(!0)).isNestFood = !0);
              }
            );
          })();
        return () => {
          room.modelMode || ("Carrier Battle" !== c.serverName && s(), t());
        };
      })(),
      speedCheckLoop = (() => {
        const e = () => {
          let e = logs.activation.sum(),
            t = logs.collide.sum(),
            s = logs.entities.sum(),
            i = logs.network.sum(),
            a = logs.minimap.sum(),
            o = logs.physics.sum(),
            r = logs.life.sum(),
            n = logs.selfie.sum(),
            l = logs.master.record(),
            h = logs.loops.count(),
            d = logs.entities.count();
          (room.fps = (1e3 / l).toFixed(2)),
            l > 1e3 / room.speed / 30 &&
              (util.warn(
                `CPU usage is greater than 100%! CPU Usage: ${(
                  l *
                  room.speed *
                  3
                ).toFixed(3)}%.`
              ),
              util.warn(
                `Loops: ${h}. Entities: ${entities.length}//${Math.round(
                  d / h
                )}. Views: ${views.length}.`
              ),
              util.warn(
                `Total activation time: ${e}. Total collision time: ${t}. Total cycle time: ${s}.`
              ),
              util.warn(
                `Total player update time: ${i}. Total lb+minimap processing time: ${a}. Total entity physics calculation time: ${o}.`
              ),
              util.warn(
                `Total entity life+thought cycle time: ${r}. Total entity selfie-taking time: ${n}. Total time: ${
                  e + t + s + i + a + o + r + n
                }.`
              ));
        };
        return (
          (e.printAnways = () => {
            let e = logs.activation.sum(),
              t = logs.collide.sum(),
              s = logs.entities.sum(),
              i = logs.network.sum(),
              a = logs.minimap.sum(),
              o = logs.physics.sum(),
              r = logs.life.sum(),
              n = logs.selfie.sum(),
              l = logs.master.record(),
              h = logs.loops.count(),
              d = logs.entities.count();
            console.log("FORCED TICK LOG:"),
              util.warn(`CPU Usage: ${(l * room.speed * 3).toFixed(3)}%.`),
              util.warn(
                `Loops: ${h}. Entities: ${entities.length}. Active: ${d}. Views: ${views.length}.`
              ),
              util.warn(
                `Total activation time: ${e}. Total collision time: ${t}. Total cycle time: ${s}.`
              ),
              util.warn(
                `Total player update time: ${i}. Total lb+minimap processing time: ${a}. Total entity physics calculation time: ${o}.`
              ),
              util.warn(
                `Total entity life+thought cycle time: ${r}. Total entity selfie-taking time: ${n}. Total time: ${
                  e + t + s + i + a + o + r + n
                }.`
              );
          }),
          e
        );
      })();
    if (
      ((window.connectToGame = () => {
        sockets.connect(
          __websocketPolyfill.client.sockets["ws://localhost:3001/"],
          {
            headers: {},
          }
        );
      }),
      setInterval(abilityLoop, 7.5 * room.cycleSpeed),
      setInterval(gameLoop, room.cycleSpeed),
      setInterval(maintainLoop, 200),
      setInterval(speedCheckLoop, 1e3),
      "win32" === process.platform)
    ) {
      const e = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      e.on("SIGINT", () => {
        process.emit("SIGINT");
      });
    }
    if (
      (process.on("SIGINT", () => {
        room.arenaClosed
          ? (util.warn("Force exit induced! Ending process..."), process.exit())
          : (c.enableBot &&
              sendClosed(
                c.serverName,
                "Reason: Force Exit",
                "Arena has been closed by the host."
              ),
            closeArena(),
            util.info("Server going down! Warning broadcasted."));
      }),
      room.maxBots > 0 &&
        setTimeout(
          () =>
            util.log(
              `Spawned ${room.maxBots} AI bot${room.maxBots > 1 ? "s." : "."}`
            ),
          350
        ),
      c.enableBot)
    ) {
      const Eris = require("eris");
      let prefix = c.botPrefix,
        prefix2 = "!!global!!";
      if (!tokens || !tokens.bot) {
        c.enableBot = !1;
        util.warn("Discord bot is enabled in config, but no bot token is set. Bot disabled.");
      } else bot = new Eris(tokens.bot);
      let devUsers = [
          "889989767557693580",
          "181829457852628993",
          "413486929544347688",
          "433325944141512705",
          "626735688595013645",
          "861694810536017961",
          "620040650703765545",
        ],
        blockedUsers = [],
        playingTag = `Type ${prefix}help for commands!`,
        status = "online",
        commandsDisabled = !1,
        disabledBy = "undefined",
        overrideInterval = !1,
        alreadyInitialized = !1;
      setInterval(() => {
        overrideInterval ||
          ((playingTag = `Type ${prefix}help for ${c.serverName} commands!`),
          bot.editStatus(status, {
            name: playingTag,
            type: 0,
          }));
      }, 6e4),
        bot.on("ready", () => {
          alreadyInitialized
            ? util.warn(
                "Discord shard has successfully restarted and reconnected to the server.",
                !0
              )
            : (util.log("Discord bot connected and ready to use!"),
              bot.createMessage("945138292662349824", {
                embed: {
                  author: {
                    name: "Server Startup",
                    icon_url:
                      "https://cdn.discordapp.com/avatars/462721019959050240/ee8807bc4fccc425cde794713c9daf54.png?size=256",
                  },
                  color: 9092159,
                  fields: [
                    {
                      name: "Server Name",
                      value: c.serverName,
                      inline: !0,
                    },
                    {
                      name: "Prefix",
                      value: prefix,
                      inline: !0,
                    },
                    {
                      name: "Current Time",
                      value: " " + new Date(),
                      inline: !1,
                    },
                  ],
                },
              }),
              bot.on("error", async (e) => {
                util.log(`Uncaught Discord Bot Error:\n${e.toString()}`, !0);
              }),
              process.on("unhandledRejection", async (e, t) => {
                util.log(
                  `Unhandled Promise rejection! \n**Reason:**\n${e.toString()}\n**Data:**\n${t.toString()}`,
                  !0
                );
              }),
              process.on("uncaughtException", async (e) => {
                util.log(
                  `Uncaught Error:\n**Message:** ${e.toString()}\n**Stack:**\n${(
                    e.stack || null
                  ).toString()}`,
                  !0
                );
              }),
              (global.logDisconnect = async (e) => {
                util.log(
                  `Socket Error:\n**Message:** ${e.toString()}\n**Stack:**\n${(
                    e.stack || null
                  ).toString()}`,
                  !0
                );
              }),
              (alreadyInitialized = !0));
        }),
        bot.on("messageCreate", (msg) => {
          let users = clients.filter((e) => null != e.player.body),
            command = msg.content.split(" ");
          const checkPermission = (e = !0, t = 0) => {
              let s = !1;
              if (devUsers.includes(msg.author.id)) s = !0;
              else
                try {
                  switch (t) {
                    case 0:
                      s = msg.member.roles.includes("945483634482229288");
                      break;
                    case 2:
                      s =
                        msg.member.roles.includes("945303243834150953") ||
                        msg.member.roles.includes("945483634482229288");
                      break;
                    case 3:
                      s =
                        msg.member.roles.includes("945147881881493574") ||
                        msg.member.roles.includes("945483634482229288");
                      break;
                    case 4:
                      s =
                        msg.member.roles.includes("945147881881493574") ||
                        msg.member.roles.includes("945483634482229288") ||
                        msg.member.roles.includes("945763995414036502");
                  }
                } catch (e) {
                  util.warn(
                    msg.author.username +
                      " attempted to use a bot command in a DM."
                  );
                }
              return (
                e &&
                  !s &&
                  bot.createMessage(msg.channel.id, {
                    embed: {
                      author: {
                        name: "Arras.io Controller (" + c.serverName + ")",
                        icon_url:
                          "https://cdn.discordapp.com/avatars/462721019959050240/ee8807bc4fccc425cde794713c9daf54.png?size=256",
                      },
                      color: 16711680,
                      fields: [
                        {
                          name: "Warning",
                          value:
                            "You are not permitted to perform this action.",
                          inline: !1,
                        },
                      ],
                    },
                  }),
                s
              );
            },
            sendDisabled = (e) =>
              bot.createMessage(msg.channel.id, {
                embed: {
                  author: {
                    name: e + " (" + c.serverName + ")",
                    icon_url:
                      "https://cdn.discordapp.com/avatars/462721019959050240/ee8807bc4fccc425cde794713c9daf54.png?size=256",
                  },
                  color: 16711680,
                  fields: [
                    {
                      name: "Warning",
                      value: `All commands have currently been disabled by ${disabledBy}.`,
                      inline: !1,
                    },
                  ],
                },
              }),
            sendInvalidID = (e, t) =>
              bot.createMessage(msg.channel.id, {
                embed: {
                  author: {
                    name: e + " (" + c.serverName + ")",
                    icon_url:
                      "https://cdn.discordapp.com/avatars/462721019959050240/ee8807bc4fccc425cde794713c9daf54.png?size=256",
                  },
                  color: 16776960,
                  fields: [
                    {
                      name: "Error",
                      value: `Player ID ${t} was not found.`,
                      inline: !1,
                    },
                  ],
                },
              }),
            sendNormal = (e, t, s, i) =>
              bot.createMessage(msg.channel.id, {
                embed: {
                  author: {
                    name: e + " (" + c.serverName + ")",
                    icon_url:
                      "https://cdn.discordapp.com/avatars/462721019959050240/ee8807bc4fccc425cde794713c9daf54.png?size=256",
                  },
                  color: i,
                  fields: [
                    {
                      name: s,
                      value: t,
                      inline: !1,
                    },
                  ],
                },
              });
          try {
            if (msg.content.startsWith(prefix2) && !checkPermission(!1, 1))
              return;
            if (
              msg.content.startsWith(prefix) &&
              msg.content.length > 1 &&
              !checkPermission(!1, 1) &&
              !checkPermission(!1, 4) &&
              "945136275701264435" !== msg.channel.id
            )
              return;
            if (blockedUsers.includes(msg.author.id))
              return util.warn(
                msg.author.username +
                  " tried to use a command, but is blocked from doing so."
              );
            switch (command[0].toLowerCase()) {
              case prefix + "help":
              case prefix2 + "help":
                if (commandsDisabled) return sendDisabled("Normal Commands");
                bot.createMessage(msg.channel.id, {
                  embed: {
                    author: {
                      name: "Normal Commands (" + c.serverName + ")",
                      icon_url:
                        "https://cdn.discordapp.com/avatars/462721019959050240/ee8807bc4fccc425cde794713c9daf54.png?size=256",
                    },
                    color: 9092159,
                    fields: [
                      {
                        name: "Prefixes for this server:",
                        value: `${prefix2} and ${prefix}`,
                        inline: !1,
                      },
                      {
                        name: "help",
                        value: "Displays this message.",
                        inline: !1,
                      },
                      {
                        name: "advhelp",
                        value:
                          "Lists commands only available to Developers and Administrators.",
                        inline: !1,
                      },
                      {
                        name: "prefixhelp",
                        value:
                          "Lists command prefixes that correspond with each server (Alias: ph).",
                        inline: !1,
                      },
                      {
                        name: "link",
                        value: "Displays the link to the server.",
                        inline: !1,
                      },
                      {
                        name: "playerlist",
                        value:
                          "Displays a list of all players and their IDs (Alias: pl).",
                        inline: !1,
                      },
                      {
                        name: "botlist",
                        value:
                          "Displays a list of all bots and their IDs (Alias: bl).",
                        inline: !1,
                      },
                      {
                        name: "broadcast [message]",
                        value:
                          "Broadcast a message to all players (Alias: br).",
                        inline: !1,
                      },
                      {
                        name: "directmessage [playerID] [message]",
                        value:
                          "Broadcast a message to a specified player (Alias: dm).",
                        inline: !1,
                      },
                      {
                        name: "uptime",
                        value:
                          "Displays how long the server has been online (Alias: ut).",
                        inline: !1,
                      },
                      {
                        name: "restarttime",
                        value:
                          "Displays how long until the server restarts (Alias: rt).",
                        inline: !1,
                      },
                      {
                        name: "search [searchType] [query]",
                        value:
                          "Makes the bot send a playerlist/botlist esque list of specified entities, with info on naming, score, and id. Put the query in square brackets if you are using raw numbers or booleans (Alias: s).",
                        inline: !1,
                      },
                      {
                        name: "guninfo [playerId] [gunNumber (optional)]",
                        value:
                          "Makes the bot send out a number of guns if the gunNumber is blank, and gives out info on the gun if it isn't blank (Alias: g).",
                        inline: !1,
                      },
                      {
                        name: "k",
                        value: "Makes the bot say k.",
                        inline: !1,
                      },
                    ],
                  },
                });
                break;
              case prefix + "advhelp":
              case prefix2 + "advhelp":
                if (commandsDisabled) return sendDisabled("Developer Commands");
                bot.createMessage(msg.channel.id, {
                  embed: {
                    author: {
                      name: "Developer Commands (" + c.serverName + ")",
                      icon_url:
                        "https://cdn.discordapp.com/avatars/462721019959050240/ee8807bc4fccc425cde794713c9daf54.png?size=256",
                    },
                    color: 9092159,
                    fields: [
                      {
                        name: "Prefixes for this server:",
                        value: `${prefix2} and ${prefix}`,
                        inline: !1,
                      },
                      {
                        name: "Notice",
                        value:
                          "None of these commands will be usable by normal players; only the Developers or Administrators may use them.",
                        inline: !1,
                      },
                      {
                        name: "kill [group or playerID]",
                        value:
                          "Kill all of a specified entity group, or a player.",
                        inline: !1,
                      },
                      {
                        name: "setstat [playerID] [statName] [value]",
                        value: "Set the value of a specified stat.",
                        inline: !1,
                      },
                      {
                        name: "settank [playerID] [exportName]",
                        value: "Define a player's tank.",
                        inline: !1,
                      },
                      {
                        name: "setsize [playerID] [size]",
                        value: "Set a player's size.",
                        inline: !1,
                      },
                      {
                        name: "setscore [playerID] [score]",
                        value: "Set a player's score.",
                        inline: !1,
                      },
                      {
                        name: "restore [playerID] [score]",
                        value: "Restores a player's score.",
                        inline: !1,
                      },
                      {
                        name: "teleport [playerID] [x] [y]",
                        value:
                          "Teleport a player to a specified X,Y position (Alias: tp).",
                        inline: !1,
                      },
                      {
                        name: "setfov [playerID] [fov]",
                        value: "Sets a player's FOV.",
                        inline: !1,
                      },
                      {
                        name: "setentity [playerID] [exportName]",
                        value: "Sets the entity spawned by the F key.\n",
                        inline: !1,
                      },
                      {
                        name: "setgodmode [playerID]",
                        value:
                          "Enable or disable godmode for a specified player.",
                        inline: !1,
                      },
                      {
                        name: "setpassive [playerID]",
                        value:
                          "Enable or disable passive mode for a specified player.",
                        inline: !1,
                      },
                      {
                        name: "rainbowspeed [playerID] [speed]",
                        value:
                          "Sets the speed of the rainbow effect for a player.",
                        inline: !1,
                      },
                      {
                        name: "multibox [playerID] [entityAmount]",
                        value:
                          "Allows a player to control a specified amount of entities; they will mirror the player's actions (Aliases: mb, setcontrol).",
                        inline: !1,
                      },
                      {
                        name: "kick [playerID] [reason (optional)]",
                        value: "Kicks a specified player from the server.",
                        inline: !1,
                      },
                      {
                        name: "ban [playerID] [reason (optional)]",
                        value: "Bans a specified player for the game session.",
                        inline: !1,
                      },
                      {
                        name: "unban [clientID]",
                        value: "Unbans a specified IP.",
                        inline: !1,
                      },
                      {
                        name: "botamount [amount]",
                        value:
                          "Changes the maximum number of bots that can be on the map.",
                        inline: !1,
                      },
                      {
                        name: "closearena",
                        value: "Closes the arena (Alias: exit).",
                        inline: !1,
                      },
                      {
                        name: "setstatus [status]",
                        value: "Sets the bot's status.",
                        inline: !1,
                      },
                      {
                        name: "playingtag [tag]",
                        value: "Sets the bot's playing tag.",
                        inline: !1,
                      },
                      {
                        name: "togglecommands",
                        value: "Enables or disables use of all commands.",
                        inline: !1,
                      },
                      {
                        name: "disco [numberID or Reset]",
                        value:
                          "Colors regions of the map randomized colors or a specific color of choice.",
                        inline: !1,
                      },
                      {
                        name: "message [channelID] [message]",
                        value:
                          "Sends a message to a channel of choice (alias: msg).",
                        inline: !1,
                      },
                      {
                        name: "push [tankExport] [Tier - 1] [tankUpgradeExport]",
                        value: "Makes one tank upgrade into another.",
                        inline: !1,
                      },
                      {
                        name: "tpt [playerID 1] [playerID 2]",
                        value: "Teleport a player to another player.",
                        inline: !1,
                      },
                      {
                        name: "manualOffset [seed (optional)]",
                        value:
                          "Mixes up tank upgrades based off of a randomized seed (alias: mo).",
                        inline: !1,
                      },
                      {
                        name: "eval [string]",
                        value: "Makes the bot run specified code.",
                        inline: !1,
                      },
                      {
                        name: "advancedeval [string]",
                        value:
                          "Makes the bot run specified code, but with more info (alias: ae).",
                        inline: !1,
                      },
                      {
                        name: "globaleval [string]",
                        value:
                          "Makes the bot run specified code across all servers (alias: ge).",
                        inline: !1,
                      },
                      {
                        name: "colorbroadcast [color] [message]",
                        value:
                          "Broadcast a colorized message to all players (Alias: cb).",
                        inline: !1,
                      },
                    ],
                  },
                });
                break;
              case prefix + "ph":
              case prefix + "prefixhelp":
              case prefix2 + "ph":
              case prefix2 + "prefixhelp":
                if (commandsDisabled) return sendDisabled("Prefix Help");
                bot.createMessage(msg.channel.id, {
                  embed: {
                    author: {
                      name: "Prefix Help (" + c.serverName + ")",
                      icon_url:
                        "https://cdn.discordapp.com/avatars/462721019959050240/ee8807bc4fccc425cde794713c9daf54.png?size=256",
                    },
                    color: 9092159,
                    fields: [
                      {
                        name: "USA (FFA modes)",
                        value: "+",
                        inline: !1,
                      },
                      {
                        name: "USA (Minigame modes)",
                        value: "%",
                        inline: !1,
                      },
                      {
                        name: "EU (TDM modes)",
                        value: "&",
                        inline: !1,
                      },
                      {
                        name: "EU (Minigame modes)",
                        value: ";",
                        inline: !1,
                      },
                      {
                        name: "Developer Server",
                        value: "$",
                        inline: !1,
                      },
                    ],
                  },
                });
                break;
              case prefix + "pl":
              case prefix + "playerlist":
              case prefix2 + "pl":
              case prefix2 + "playerlist":
                {
                  if (commandsDisabled) return sendDisabled("Playerlist");
                  if (!users.length)
                    return sendNormal(
                      "Playerlist",
                      "No players are in the server.",
                      "Info",
                      2588365
                    );
                  let e = [];
                  for (let t of clients)
                    if (t.player && t.player.body && !t.player.body.isDead()) {
                      let s = t.player.body;
                      s.stealthMode ||
                        e.push({
                          name: t.readableID + " - " + s.index,
                          value:
                            s.id +
                            " - " +
                            (c.RANKED_BATTLE ? "Tank Hidden" : s.label) +
                            " (" +
                            s.skill.score +
                            ") - " +
                            (-1 === t.betaData.discordID
                              ? "No Discord Linked"
                              : `<@!${t.betaData.discordID}>`),
                          inline: !1,
                        });
                    } else
                      e.push({
                        name: t.readableID,
                        value: "Not spawned in",
                        inline: !1,
                      });
                  bot.createMessage(msg.channel.id, {
                    embed: {
                      author: {
                        name:
                          "Playerlist (" +
                          c.serverName +
                          "): " +
                          players.length +
                          " Players",
                        icon_url:
                          "https://cdn.discordapp.com/avatars/462721019959050240/ee8807bc4fccc425cde794713c9daf54.png?size=256",
                      },
                      color: 9092159,
                      fields: JSON.parse(JSON.stringify(e)),
                    },
                  });
                }
                break;
              case prefix + "bl":
              case prefix + "botlist":
              case prefix2 + "bl":
              case prefix2 + "botlist":
                {
                  if (commandsDisabled) return sendDisabled("Botlist");
                  if (!bots.length)
                    return sendNormal(
                      "Botlist",
                      "No bots are in the server.",
                      "Info",
                      2588365
                    );
                  let e = [];
                  for (let t of bots)
                    e.push({
                      name: trimName(t.name),
                      value:
                        t.id + " - " + t.label + " (" + t.skill.score + ")",
                      inline: !1,
                    });
                  bot.createMessage(msg.channel.id, {
                    embed: {
                      author: {
                        name:
                          "Botlist (" +
                          c.serverName +
                          "): " +
                          bots.length +
                          " Bots",
                        icon_url:
                          "https://cdn.discordapp.com/avatars/462721019959050240/ee8807bc4fccc425cde794713c9daf54.png?size=256",
                      },
                      color: 9092159,
                      fields: JSON.parse(JSON.stringify(e)),
                    },
                  });
                }
                break;
              case prefix + "kick":
              case prefix2 + "kick":
                {
                  if (commandsDisabled) return sendDisabled("Kick");
                  if (!checkPermission(!0, 3)) return;
                  let e = +command[1],
                    t = command.slice(2, command.length).join(" "),
                    s = !0;
                  if ("number" != typeof e)
                    return sendNormal(
                      "Kick",
                      "Please specify a valid player ID.",
                      "Error",
                      16776960
                    );
                  let i = getEntity(e);
                  if (null == i) return sendInvalidID("Kick", e);
                  for (let e of users)
                    e.player.body.id === i.id &&
                      (e.talk(
                        "P",
                        msg.author.username +
                          " has kicked you from the server. Reason: " +
                          (t || "Unspecified.")
                      ),
                      sendNormal(
                        "Kick",
                        "Kicked " +
                          trimName(i.name) +
                          " from the server. Reason: " +
                          (t || "Unspecified."),
                        "Info",
                        2588365
                      ),
                      e.kick(
                        trimName(i.name) +
                          " was kicked by " +
                          msg.author.username +
                          ". Reason: " +
                          (t || "Unspecified.")
                      ),
                      (i.miscIdentifier = "No Death Log"),
                      i.kill(),
                      (s = !1));
                  s &&
                    sendNormal(
                      "Kick",
                      "This command only works on players.",
                      "Error",
                      16776960
                    );
                }
                break;
              case prefix + "br":
              case prefix + "broadcast":
              case prefix2 + "br":
              case prefix2 + "broadcast":
                {
                  if (commandsDisabled) return sendDisabled("Broadcast");
                  let e = command.slice(1, command.length).join(" ");
                  if (!e)
                    return sendNormal(
                      "Broadcast",
                      "Please specify a message to broadcast.",
                      "Error",
                      16711680
                    );
                  sockets.broadcast(msg.author.username + " says: " + e),
                    sendNormal(
                      "Broadcast",
                      "Broadcasting your message to all players.",
                      "Info",
                      9092159
                    );
                }
                break;
              case prefix + "cb":
              case prefix + "colorbroadcast":
              case prefix2 + "cb":
              case prefix2 + "colorbroadcast":
                {
                  if (commandsDisabled)
                    return sendDisabled("Colored Broadcast");
                  if (!checkPermission(!0, 2) && !checkPermission(!0, 3))
                    return;
                  let e = command[1],
                    t = command.slice(2, command.length).join(" ");
                  if (!e)
                    return sendNormal(
                      "Colored Broadcast",
                      "Please specify a color for this broadcast.",
                      "Error",
                      16711680
                    );
                  if ("rainbow" === e && !checkPermission(!1))
                    return sendNormal(
                      "Colored Broadcast",
                      "You are not permitted to use rainbow broadcasts.",
                      "Error",
                      16711680
                    );
                  if (!t)
                    return sendNormal(
                      "Colored Broadcast",
                      "Please specify a message to broadcast.",
                      "Error",
                      16711680
                    );
                  sockets.broadcast(
                    (checkPermission(!1, 1)
                      ? ""
                      : msg.author.username + " says: ") + t,
                    "rainbow" === e || e.includes("#") ? e : "#" + e
                  ),
                    sendNormal(
                      "Colored Broadcast",
                      "Broadcasting your colorized message to all players.",
                      "Info",
                      9092159
                    );
                }
                break;
              case prefix + "kill":
              case prefix2 + "kill":
                {
                  if (commandsDisabled) return sendDisabled("Kill");
                  if (!checkPermission(!0, 3)) return;
                  let e = command[1],
                    t =
                      "Invalid ID or entity group argument! The following are valid entity groups: `players`, `food`, `allbutplayers`, `obstacles`, `mazewalls`, `all`, `bots`, `bosses`, `bullets`, `drones`, and `tanks`.";
                  if (!e) return sendNormal("Kill", t, "Error", 16776960);
                  if (isNaN(e)) {
                    if (isNaN(e)) {
                      let e = 0,
                        s = null,
                        i = null;
                      switch (command[1].toLowerCase()) {
                        case "players":
                          (i = users), (s = "players");
                          break;
                        case "all":
                          (i = entities), (s = "entities");
                          break;
                        case "bots":
                          (i = bots), (s = "bots");
                          break;
                        case "food":
                          (i = entities.filter((e) => "food" === e.type)),
                            (s = "food entities");
                          break;
                        case "bullets":
                          (i = entities.filter((e) => "bullet" === e.type)),
                            (s = "bullet entities");
                          break;
                        case "drones":
                          (i = entities.filter((e) => "drone" === e.type)),
                            (s = "drone entities");
                          break;
                        case "crashers":
                          (i = entities.filter((e) => "crasher" === e.type)),
                            (s = "crashers");
                          break;
                        case "traps":
                          (i = entities.filter((e) => "trap" === e.type)),
                            (s = "trap entities");
                          break;
                        case "tanks":
                          (i = entities.filter((e) => "tank" === e.type)),
                            (s = "tank entities");
                          break;
                        case "allbutplayers":
                          (i = entities.filter((e) => "tank" !== e.type)),
                            (s = "non-player entities");
                          break;
                        case "obstacles":
                          (i = entities.filter((e) => "wall" === e.type)),
                            (s = "obstacles");
                          break;
                        case "mazewalls":
                          (i = entities.filter((e) => "mazeWall" === e.type)),
                            (s = "maze walls");
                          break;
                        case "bosses":
                          (i = entities.filter((e) => "miniboss" === e.type)),
                            (s = "bosses");
                      }
                      if (null == s)
                        return sendNormal("Kill", t, "Error", 16776960);
                      if ("players" === command[1].toLowerCase())
                        for (let t of i) t.body.kill(), e++;
                      else for (let t of i) t.kill(), e++;
                      sendNormal(
                        "Kill",
                        "Killed " + e + " " + s + ".",
                        "Info",
                        2588365
                      );
                    }
                  } else {
                    let t = getEntity(+e);
                    if (null == t) return sendInvalidID("Kill", e);
                    t.kill(),
                      sendNormal(
                        "Kill",
                        "Killed " + trimName(t.name) + ".",
                        "Info",
                        2588365
                      );
                  }
                }
                break;
              case prefix + "setstat":
              case prefix2 + "setstat":
                {
                  if (commandsDisabled) return sendDisabled("Set Stat");
                  if (!checkPermission(!0, 1)) return;
                  let e = +command[1],
                    t = command[2],
                    s = +command[3],
                    i =
                      "Invalid stat argument! The following are valid stats: `weapon_speed`, `weapon_reload`, `move_speed`, `max_health`, `body_damage`, and `weapon_damage`.";
                  if ("number" != typeof e)
                    return sendNormal(
                      "Set Stat",
                      "Please specify a valid player ID.",
                      "Error",
                      16776960
                    );
                  if ("string" != typeof t)
                    return sendNormal("Set Stat", i, "Error", 16776960);
                  if ("number" != typeof s)
                    return sendNormal(
                      "Set Stat",
                      "Invalid stat value argument.",
                      "Error",
                      16776960
                    );
                  let a = getEntity(e);
                  if (null == a) return sendInvalidID("Set Stat", e);
                  switch (t.toLowerCase()) {
                    case "weapon_speed":
                      a.skill.spd = s;
                      break;
                    case "weapon_reload":
                      a.skill.rld = s;
                      break;
                    case "move_speed":
                      (a.SPEED = s),
                        (a.ACCELERATION = s / 3),
                        a.refreshBodyAttributes();
                      break;
                    case "max_health":
                      (a.HEALTH = s), a.refreshBodyAttributes();
                      break;
                    case "body_damage":
                      (a.DAMAGE = s), a.refreshBodyAttributes();
                      break;
                    case "weapon_damage":
                      a.skill.dam = s;
                      break;
                    default:
                      return sendNormal("Set Stat", i, "Error", 16776960);
                  }
                  sendNormal(
                    "Set Stat",
                    "Set " +
                      trimName(a.name) +
                      "'s " +
                      t +
                      " stat to " +
                      s +
                      ".",
                    "Info",
                    2588365
                  );
                }
                break;
              case prefix + "settank":
              case prefix2 + "settank":
                {
                  if (commandsDisabled) return sendDisabled("Set Tank");
                  if (!checkPermission(!0, c.IS_DEV_SERVER ? 3 : 1)) return;
                  let e = +command[1],
                    t = command[2];
                  if ("number" != typeof e)
                    return sendNormal(
                      "Set Tank",
                      "Please specify a valid player ID.",
                      "Error",
                      16776960
                    );
                  if ("string" != typeof t)
                    return sendNormal(
                      "Set Tank",
                      "Please specify a valid tank export.",
                      "Error",
                      16776960
                    );
                  let s = getEntity(e);
                  if (null == s) return sendInvalidID("Set Tank", e);
                  s.upgradeTank(Class[t]),
                    sendNormal(
                      "Set Tank",
                      "Set " + trimName(s.name) + "'s tank to " + t + ".",
                      "Info",
                      2588365
                    );
                }
                break;
              case prefix + "setsize":
              case prefix2 + "setsize":
                {
                  if (commandsDisabled) return sendDisabled("Set Size");
                  if (!checkPermission(!0, 3)) return;
                  let e = +command[1],
                    t = +command[2];
                  if ("number" != typeof e)
                    return sendNormal(
                      "Set Size",
                      "Please specify a valid player ID.",
                      "Error",
                      16776960
                    );
                  if ("number" != typeof t || t <= 0)
                    return sendNormal(
                      "Set Size",
                      "Please specify a valid size value.",
                      "Error",
                      16776960
                    );
                  let s = getEntity(e);
                  if (null == s) return sendInvalidID("Set Size", e);
                  (s.SIZE = t),
                    sendNormal(
                      "Set Size",
                      "Set " + trimName(s.name) + "'s size to " + t + ".",
                      "Info",
                      2588365
                    );
                }
                break;
              case prefix + "setfov":
              case prefix2 + "setfov":
                {
                  if (commandsDisabled) return sendDisabled("Set FoV");
                  if (!checkPermission(!0, 3)) return;
                  let e = +command[1],
                    t = +command[2];
                  if ("number" != typeof e)
                    return sendNormal(
                      "Set FoV",
                      "Please specify a valid player ID.",
                      "Error",
                      16776960
                    );
                  if ("number" != typeof t)
                    return sendNormal(
                      "Set FoV",
                      "Please specify a valid FoV value.",
                      "Error",
                      16776960
                    );
                  let s = getEntity(e);
                  if (null == s) return sendInvalidID("Set FoV", e);
                  (s.FOV = t),
                    s.refreshFOV(),
                    sendNormal(
                      "Set FoV",
                      "Set " + trimName(s.name) + "'s FoV to " + t + ".",
                      "Info",
                      2588365
                    );
                }
                break;
              case prefix + "setscore":
              case prefix2 + "setscore":
                {
                  if (commandsDisabled) return sendDisabled("Set Score");
                  if (!checkPermission(!0, 3)) return;
                  let e = +command[1],
                    t = +command[2];
                  if ("number" != typeof e)
                    return sendNormal(
                      "Set Score",
                      "Please specify a valid player ID.",
                      "Error",
                      16776960
                    );
                  if ("number" != typeof t)
                    return sendNormal(
                      "Set Score",
                      "Please specify a valid score value.",
                      "Error",
                      16776960
                    );
                  let s = getEntity(e);
                  if (null == s) return sendInvalidID("Set Score", e);
                  (s.skill.score = t),
                    sendNormal(
                      "Set Score",
                      "Set " + trimName(s.name) + "'s score to " + t + ".",
                      "Info",
                      2588365
                    );
                }
                break;
              case prefix + "restore":
              case prefix2 + "restore":
                {
                  if (commandsDisabled) return sendDisabled("Restore Score");
                  if (!checkPermission(!0, 4)) return;
                  let e = +command[1],
                    t = +command[2];
                  if ("number" != typeof e)
                    return sendNormal(
                      "Restore Score",
                      "Please specify a valid player ID.",
                      "Error",
                      16776960
                    );
                  if ("number" != typeof t)
                    return sendNormal(
                      "Restore Score",
                      "Please specify a valid score value.",
                      "Error",
                      16776960
                    );
                  let s = getEntity(e);
                  if (null == s) return sendInvalidID("Restore Score", e);
                  (s.skill.score += t),
                    sendNormal(
                      "Restore Score",
                      "Restored " +
                        trimName(s.name) +
                        "'s score to " +
                        s.skill.score +
                        ".",
                      "Info",
                      2588365
                    );
                }
                break;
              case prefix + "tp":
              case prefix + "teleport":
              case prefix2 + "tp":
              case prefix2 + "teleport":
                {
                  if (commandsDisabled) return sendDisabled("Teleport");
                  if (!checkPermission(!0, 3)) return;
                  let e = +command[1],
                    t = +command[2],
                    s = +command[3];
                  if ("number" != typeof e)
                    return sendNormal(
                      "Teleport",
                      "Please specify a valid player ID.",
                      "Error",
                      16776960
                    );
                  if ("number" != typeof t || "number" != typeof s)
                    return sendNormal(
                      "Set Score",
                      "Please specify a valid X,Y position.",
                      "Error",
                      16776960
                    );
                  let i = getEntity(e);
                  if (null == i) return sendInvalidID("Teleport", e);
                  (i.x = t),
                    (i.y = s),
                    sendNormal(
                      "Teleport",
                      "Teleported " +
                        trimName(i.name) +
                        " to (" +
                        t +
                        ", " +
                        s +
                        ").",
                      "Info",
                      2588365
                    );
                }
                break;
              case prefix + "setentity":
              case prefix2 + "setentity":
                {
                  if (commandsDisabled) return sendDisabled("Set F Key Entity");
                  if (!checkPermission(!0, 1)) return;
                  let e = +command[1],
                    t = command[2];
                  if ("number" != typeof e)
                    return sendNormal(
                      "Set F Key Entity",
                      "Please specify a valid player ID.",
                      "Error",
                      16776960
                    );
                  if (!t || !isNaN(t))
                    return sendNormal(
                      "Set F Key Entity",
                      "Please specify a valid tank export.",
                      "Error",
                      16776960
                    );
                  let s = getEntity(e);
                  if (null == s) return sendInvalidID("Set F Key Entity", e);
                  (s.keyFEntity = t),
                    sendNormal(
                      "Set F Key Entity",
                      "Set " +
                        trimName(s.name) +
                        "'s F key entity to " +
                        t +
                        ".",
                      "Info",
                      2588365
                    );
                }
                break;
              case prefix + "botamount":
              case prefix2 + "botamount":
                {
                  if (commandsDisabled) return sendDisabled("Set Bot Amount");
                  if (!checkPermission(!0, 1)) return;
                  let e = command[1];
                  if (!e || isNaN(e))
                    return sendNormal(
                      "Set Bot Amount",
                      "Please specify a valid bot amount.",
                      "Error",
                      16776960
                    );
                  (room.maxBots = e),
                    sendNormal(
                      "Set Bot Amount",
                      "Set the maximum bot amount to " + e + ".",
                      "Info",
                      2588365
                    );
                }
                break;
              case prefix + "k":
              case prefix2 + "k":
                bot.createMessage(
                  msg.channel.id,
                  [
                    "k",
                    "***__K__***",
                    ":regional_indicator_k:",
                    "<:arrask:479873599868633089>",
                    "|/\n|\\\\",
                    "<:arrask2:479873599834947587>",
                    "K",
                    "ʞ",
                    "ⓚ",
                  ][Math.floor(9 * Math.random())]
                );
                break;
              case prefix + "link":
              case prefix2 + "link":
                sendNormal(
                  "Link",
                  "http://woomy.surge.sh/",
                  "Here is the link to join. If you are looking to join a specific server, hover your mouse over the server name in the start menu and scroll to find it.",
                  9092159
                );
                break;
              case prefix + "setstatus":
              case prefix2 + "setstatus":
                if (commandsDisabled) return sendDisabled("Set Bot Status");
                if (!checkPermission(!0, 1)) return;
                (status = command[1]),
                  "online" !== status &&
                    "dnd" !== status &&
                    "idle" !== status &&
                    "invisible" !== status &&
                    sendNormal(
                      "Set Bot Status",
                      "Invalid online status! Valid statuses are `online`, `idle`, `dnd` and `invisible`.",
                      "Error",
                      16776960
                    ),
                  bot.editStatus(status, {
                    name: playingTag,
                    type: 0,
                  }),
                  sendNormal(
                    "Set Bot Status",
                    "My online status has been set to " + status + ".",
                    "Info",
                    2588365
                  );
                break;
              case prefix + "ut":
              case prefix + "uptime":
              case prefix2 + "ut":
              case prefix2 + "uptime":
                {
                  if (commandsDisabled) return sendDisabled("Uptime");
                  const e = (e) => {
                    let t = (e) => (e < 10 ? "0" : "") + e,
                      s = Math.floor(e / 3600),
                      i = Math.floor((e % 3600) / 60),
                      a = Math.floor(e % 60);
                    return t(s) + ":" + t(i) + ":" + t(a);
                  };
                  sendNormal(
                    "Uptime",
                    "`" + e(process.uptime()) + "`",
                    "Server Uptime:",
                    9092159
                  );
                }
                break;
              case prefix + "playingtag":
              case prefix2 + "playingtag":
                {
                  if (commandsDisabled)
                    return sendDisabled("Set Playing Status");
                  if (!checkPermission(!0, 1)) return;
                  let e = command.slice(1, command.length).join(" ");
                  (playingTag = e || "Type +help for commands!"),
                    (overrideInterval = !!e),
                    bot.editStatus(status, {
                      name: playingTag,
                      type: 0,
                    }),
                    sendNormal(
                      "Set Playing Status",
                      "My playing tag has been set to `" + playingTag + "`.",
                      "Info",
                      2588365
                    );
                }
                break;
              case prefix + "setgodmode":
              case prefix2 + "setgodmode":
                {
                  if (commandsDisabled) return sendDisabled("Set God-mode");
                  if (room.arenaClosed)
                    return sendNormal(
                      "Set God-mode",
                      "This command cannot be used when the arena is closing.",
                      "Warning",
                      16711680
                    );
                  if (!checkPermission(!0, 1)) return;
                  let e = +command[1];
                  if ("number" != typeof e)
                    return sendNormal(
                      "Set God-mode",
                      "Please specify a valid player ID.",
                      "Error",
                      16776960
                    );
                  let t = getEntity(e);
                  if (null == t) return sendInvalidID("Set God-mode", e);
                  t.godmode = !t.godmode;
                  for (let e of entities)
                    e.master.id === t.id &&
                      e.id !== t.id &&
                      (e.diesToTeamBase = !t.godmode);
                  sendNormal(
                    "Set God-mode",
                    (t.godmode ? "En" : "Dis") +
                      "abled god-mode for " +
                      trimName(t.name) +
                      ".",
                    "Info",
                    2588365
                  );
                }
                break;
              case prefix + "setpassive":
              case prefix2 + "setpassive":
                {
                  if (commandsDisabled) return sendDisabled("Set Passive Mode");
                  if (room.arenaClosed)
                    return sendNormal(
                      "Set Passive Mode",
                      "This command cannot be used when the arena is closing.",
                      "Warning",
                      16711680
                    );
                  if (!checkPermission(!0, 1)) return;
                  let e = +command[1];
                  if ("number" != typeof e)
                    return sendNormal(
                      "Set Passive Mode",
                      "Please specify a valid player ID.",
                      "Error",
                      16776960
                    );
                  let t = getEntity(e);
                  if (null == t) return sendInvalidID("Set Passive Mode", e);
                  t.passive = !t.passive;
                  for (let e of entities)
                    e.master.id === t.id &&
                      e.id !== t.id &&
                      (e.passive = t.passive);
                  sendNormal(
                    "Set Passive Mode",
                    (t.passive ? "En" : "Dis") +
                      "abled passive mode for " +
                      trimName(t.name) +
                      ".",
                    "Info",
                    2588365
                  );
                }
                break;
              case prefix + "rainbowspeed":
              case prefix2 + "rainbowspeed":
                {
                  if (commandsDisabled)
                    return sendDisabled("Set Rainbow Cycle Speed");
                  if (!checkPermission(!0, 3)) return;
                  let e = +command[1],
                    t = +command[2];
                  if ("number" != typeof e)
                    return sendNormal(
                      "Set Rainbow Cycle Speed",
                      "Please specify a valid player ID.",
                      "Error",
                      16776960
                    );
                  if (!t || isNaN(t))
                    return sendNormal(
                      "Set Rainbow Cycle Speed",
                      "Please specify a valid rainbow speed value.",
                      "Error",
                      16776960
                    );
                  let s = getEntity(e);
                  if (null == s)
                    return sendInvalidID("Set Rainbow Cycle Speed", e);
                  (s.rainbowSpeed = t),
                    s.toggleRainbow(),
                    s.toggleRainbow(),
                    sendNormal(
                      "Set Rainbow Cycle Speed",
                      "Set" +
                        trimName(s.name) +
                        "'s rainbow cycle speed to " +
                        s.rainbowSpeed +
                        ".",
                      "Info",
                      2588365
                    );
                }
                break;
              case prefix + "togglecommands":
              case prefix2 + "togglecommands":
                if (!checkPermission(!0, 1)) return;
                (commandsDisabled = !commandsDisabled),
                  (disabledBy = msg.author.username),
                  sendNormal(
                    "Toggle Commands",
                    "Commands have been " +
                      (commandsDisabled ? "dis" : "en") +
                      "abled.",
                    "Info",
                    2588365
                  );
                break;
              case prefix + "eval":
              case prefix2 + "eval":
                if (commandsDisabled) return sendDisabled("Eval");
                if (!checkPermission(!0, 1)) return;
                try {
                  let string = command.slice(1, command.length).join(" ");
                  sendNormal(
                    "Eval",
                    "```js\n" + eval(string) + "\n```",
                    "OUTPUT               ​",
                    16746496
                  );
                } catch (e) {
                  sendNormal(
                    "Eval",
                    "```js\n" + e + "\n```",
                    "OUTPUT               ​",
                    16746496
                  );
                }
                util.warn(
                  msg.author.username +
                    " ran the eval command in " +
                    (msg.channel.name ? "the " + msg.channel.name : "a DM") +
                    " channel."
                );
                break;
              case prefix + "ae":
              case prefix + "advancedeval":
              case prefix2 + "ae":
              case prefix2 + "advancedeval":
                {
                  if (commandsDisabled) return sendDisabled("Eval Deluxe");
                  if (!checkPermission(!0, 1)) return;
                  let out = null;
                  try {
                    out = eval(command.slice(1, command.length).join(" "));
                  } catch (e) {
                    out = e;
                  }
                  try {
                    let e = require("util").inspect;
                    out = e(out, {
                      depth: 2,
                      maxArrayLength: 30,
                      breakLength: 120,
                    });
                  } catch (e) {
                    out = `[${typeof out}] ${out}`;
                  }
                  sendNormal(
                    "Eval Deluxe",
                    "```js\n" + out + "\n```",
                    "OUTPUT               ​",
                    16746496
                  ),
                    util.warn(
                      msg.author.username +
                        " ran the advancedeval command in " +
                        (msg.channel.name
                          ? "the " + msg.channel.name
                          : "a DM") +
                        " channel."
                    );
                }
                break;
              case prefix + "ge":
              case prefix + "globaleval":
              case prefix2 + "ge":
              case prefix2 + "globaleval":
                {
                  if (commandsDisabled) return sendDisabled("Eval");
                  if (!checkPermission(!0, 1)) return;
                  let fail = !0,
                    string = command.slice(1, command.length).join(" ");
                  try {
                    sendNormal(
                      "Global Eval",
                      "```js\n" + eval(string) + "\n```",
                      "OUTPUT​",
                      16746496
                    ),
                      (fail = !1);
                  } catch (e) {
                    sendNormal(
                      "Global Eval",
                      "```js\n" + e + "\n```",
                      "OUTPUT​",
                      16746496
                    );
                  }
                  if (!fail) {
                    let e = "+_&.%;=";
                    for (let t = 0; t < e.length; t++)
                      prefix !== e[t] &&
                        setTimeout(
                          () =>
                            bot.createMessage(
                              "505934246389612554",
                              e[t] + "silenteval " + string
                            ),
                          1e3 * t
                        );
                  }
                  util.warn(
                    msg.author.username +
                      " ran the globaleval command in " +
                      (msg.channel.name ? "the " + msg.channel.name : "a DM") +
                      " channel."
                  );
                }
                break;
              case prefix + "silenteval":
              case prefix2 + "silenteval":
                if (commandsDisabled) return sendDisabled("Eval");
                if (!checkPermission(!1, 1)) return;
                try {
                  let string = command.slice(1, command.length).join(" ");
                  eval(string);
                } catch (e) {}
                break;
              case prefix + "ban":
              case prefix2 + "ban":
                {
                  if (commandsDisabled) return sendDisabled("Ban");
                  if (!checkPermission(!0, 3)) return;
                  let e = +command[1],
                    t = command.slice(2, command.length).join(" ");
                  if ("number" != typeof e)
                    return sendNormal(
                      "Ban",
                      "Please specify a valid socket ID.",
                      "Error",
                      16776960
                    );
                  sockets.ban(
                    e,
                    t,
                    msg.author.username +
                      " has banned you from the server. Reason: " +
                      (t || "Unspecified.")
                  )
                    ? sendNormal(
                        "Ban",
                        `Socket (${e}) has been banned. Reason: ${
                          t || "Unspecified."
                        }`,
                        "Info",
                        2588365
                      )
                    : sendNormal(
                        "Ban",
                        "This user couldn't be banned.",
                        "Error",
                        16776960
                      );
                }
                break;
              case prefix + "unban":
              case prefix2 + "unban":
                {
                  if (commandsDisabled) return sendDisabled("Unban");
                  if (!checkPermission(!0, 3)) return;
                  let e = +command[1];
                  if ("number" != typeof e)
                    return sendNormal(
                      "Ban",
                      "Please specify a valid socket ID.",
                      "Error",
                      16776960
                    );
                  sockets.unban(e)
                    ? sendNormal(
                        "Unban",
                        `Socket (${e}) is no longer banned from the server.`,
                        "Info",
                        2588365
                      )
                    : sendNormal(
                        "Unban",
                        "This user couldn't be unbanned.",
                        "Error",
                        16776960
                      );
                }
                break;
              case prefix + "dm":
              case prefix + "directmessage":
              case prefix2 + "dm":
              case prefix2 + "directmessage":
                {
                  if (commandsDisabled) return sendDisabled("Direct Message");
                  let e = +command[1],
                    t = command.slice(2, command.length).join(" ");
                  if ("number" != typeof e)
                    return sendNormal(
                      "Direct Message",
                      "Please specify a valid player ID.",
                      "Error",
                      16776960
                    );
                  if (!t)
                    return sendNormal(
                      "Direct Message",
                      "Please specify a message to send.",
                      "Error",
                      16776960
                    );
                  let s = getEntity(e);
                  if (null == s) return sendInvalidID("Direct Message", e);
                  s.sendMessage(msg.author.username + " says to you: " + t),
                    sendNormal(
                      "Direct Message",
                      "Sending your message to " + trimName(s.name) + ".",
                      "Info",
                      2588365
                    );
                }
                break;
              case prefix + "exit":
              case prefix + "closearena":
              case prefix2 + "exit":
              case prefix2 + "closearena":
                if (commandsDisabled) return sendDisabled("Close Arena");
                if (!checkPermission(!0, 1)) return;
                room.arenaClosed &&
                  (util.warn(msg.author.username + " induced a force exit."),
                  sendNormal(
                    "Close Arena",
                    "Force exit induced! Closing server...",
                    "Warning",
                    16711680
                  ),
                  process.exit()),
                  util.warn(
                    "Arena has been closed by " + msg.author.username + "."
                  ),
                  c.enableBot &&
                    sendClosed(
                      c.serverName,
                      "Reason: Force Exit",
                      "Arena has been closed by " + msg.author.username + "."
                    ),
                  sendNormal(
                    "Close Arena",
                    "Arena Closed: No players can join.",
                    "Warning",
                    16711680
                  ),
                  closeArena();
                break;
              case prefix + "mb":
              case prefix + "setcontrol":
              case prefix + "multibox":
              case prefix2 + "mb":
              case prefix2 + "setcontrol":
              case prefix2 + "multibox":
                {
                  if (commandsDisabled) return sendDisabled("Multibox");
                  if (!checkPermission(!0, 1)) return;
                  let e = +command[1],
                    t = +command[2];
                  if ("number" != typeof e)
                    return sendNormal(
                      "Multibox",
                      "Please specify a valid player ID.",
                      "Error",
                      16776960
                    );
                  let s = getEntity(e);
                  if (null == s) return sendInvalidID("Multibox", e);
                  if ("number" != typeof t)
                    return sendNormal(
                      "Multibox",
                      "Please specify a valid number of tanks to control.",
                      "Error",
                      16776960
                    );
                  for (let e of users)
                    if (e.player.body.id === s.id) {
                      if (0 === t)
                        return s.multibox.enabled
                          ? (sendNormal(
                              "Multibox",
                              "Multiboxing has been disabled for " +
                                trimName(s.name) +
                                ".",
                              "Info",
                              2588365
                            ),
                            (s.multibox.enabled = !1),
                            s.onDead(),
                            (s.onDead = null))
                          : sendNormal(
                              "Multibox",
                              "Multiboxing is already disabled for " +
                                trimName(s.name) +
                                ".",
                              "Error",
                              16776960
                            );
                      for (
                        sendNormal(
                          "Multibox",
                          trimName(s.name) +
                            " is now controlling " +
                            t +
                            (t > 1 ? " entities" : " entity") +
                            ".",
                          "Info",
                          2588365
                        );
                        t-- > 0;

                      ) {
                        let t = new Entity({
                          x: s.x + 5 * Math.random(),
                          y: s.y - 5 * Math.random(),
                        });
                        "tdm" === room.gameMode
                          ? (t.team = s.team)
                          : (s.team = t.team = -9),
                          t.define(Class.basic),
                          (t.controllers = [
                            new ioTypes.listenToPlayer(s, e.player),
                          ]),
                          (t.invuln = !1),
                          (t.color = s.color),
                          (t.settings.leaderboardable = !1),
                          s.multibox.controlledTanks.push(t);
                      }
                      (s.onDead = () => {
                        null != s.multibox.intervalID &&
                          clearInterval(s.multibox.intervalID);
                        for (let e of s.multibox.controlledTanks)
                          e.isAlive() && e.kill();
                        s.multibox.controlledTanks = [];
                      }),
                        s.multibox.enabled || s.toggleMultibox(),
                        (s.multibox.enabled = !0);
                    }
                }
                break;
              case prefix + "disco":
              case prefix2 + "disco":
                {
                  if (commandsDisabled) return sendDisabled("Disco");
                  if (!checkPermission(!0, 1)) return;
                  let e = command.slice(1, command.length).join(" ");
                  if ((isNaN(e) || e < 0 || e > 8) && "reset" !== e)
                    return sendNormal(
                      "Disco",
                      "Please specify a number between 0 and 8, or the word `reset`.",
                      "Error",
                      16776960
                    );
                  for (let t of room.norm)
                    room.setType(
                      [
                        "n_b1",
                        "n_b2",
                        "n_b3",
                        "n_b4",
                        "n_b5",
                        "n_b6",
                        "n_b7",
                        "n_b8",
                        "domi",
                        "norm",
                        "roid",
                        "rock",
                      ][
                        "reset" !== e ? e || Math.floor(12 * Math.random()) : 9
                      ],
                      t
                    );
                  let t = "reset" !== e ? "discofied" : "reset";
                  sendNormal(
                    "Disco",
                    "Map has been " + t + ".",
                    "Info",
                    2588365
                  );
                }
                break;
              case prefix + "manualOffset":
              case prefix + "mo":
              case prefix2 + "manualOffset":
              case prefix2 + "mo":
                {
                  if (commandsDisabled) return sendDisabled("Manual Offset");
                  if (!checkPermission(!0, 1)) return;
                  let e = command.slice(1, command.length).join(" ");
                  if (isNaN(e) || e < -188 || e > tankList.length - 189)
                    return sendNormal(
                      "Manual Offset",
                      "Please specify a number between -188 and " +
                        (tankList.length - 189) +
                        " .",
                      "Error",
                      16776960
                    );
                  "" == e &&
                    (e =
                      Math.floor(Math.random() * tankList.length - 189) - 188),
                    (room.manualOffset = Number(e)),
                    sendNormal(
                      "Manual Offset",
                      "The Upgrades have been mixed up. Seed: " + e,
                      "Info",
                      2588365
                    );
                }
                break;
              case prefix + "push":
              case prefix2 + "push":
                {
                  if (commandsDisabled) return sendDisabled("Push Upgrades");
                  if (!checkPermission(!0, 1)) return;
                  let e = command.slice(1, 2).join(" "),
                    t = +command[2],
                    s = command.slice(3, command.length).join(" ");
                  if (t < 2 || t > 4 || isNaN(t))
                    return sendNormal(
                      "Push Upgrades",
                      "Tier value must be between 2 and 4.",
                      "Error",
                      16776960
                    );
                  switch (t) {
                    case 2:
                      Class[e].UPGRADES_TIER_2.push(Class[s]);
                      break;
                    case 3:
                      Class[e].UPGRADES_TIER_3.push(Class[s]);
                      break;
                    case 4:
                      Class[e].UPGRADES_TIER_4.push(Class[s]);
                  }
                  sendNormal(
                    "Push Upgrades",
                    `${Class[s].LABEL} is now a tier ${t + 1} upgrade from ${
                      Class[e].LABEL
                    }.`,
                    "Info",
                    2588365
                  );
                }
                break;
              case prefix + "msg":
              case prefix + "message":
              case prefix2 + "msg":
              case prefix2 + "message":
                {
                  if (commandsDisabled) return sendDisabled("Message");
                  if (!checkPermission(!0, 3)) return;
                  let e = command.slice(1, 2).join(" "),
                    t = command.slice(2, command.length).join(" ");
                  if (isNaN(e))
                    return sendNormal(
                      "Message",
                      "Please specify a valid channel ID.",
                      "Error",
                      16776960
                    );
                  bot.createMessage(e, t),
                    sendNormal(
                      "Message",
                      `Message sent to <#${e}>.`,
                      "Info",
                      2588365
                    );
                }
                break;
              case prefix + "s":
              case prefix + "search":
              case prefix2 + "s":
              case prefix2 + "search":
                {
                  if (commandsDisabled) return sendDisabled("Search Query");
                  let e = [],
                    t = command.slice(1, 2).join(" "),
                    s = command.slice(2, command.length).join(" "),
                    i = null;
                  if (
                    ((i = Array.isArray(s)
                      ? entities.filter((e) => e[`${t}`] == s[0])
                      : entities.filter((e) => e[`${t}`] == `${s}`)),
                    !t.length || !s.length)
                  )
                    return sendNormal(
                      "Search Query",
                      "There must at least two valid inputs."
                    );
                  if (!i.length)
                    return sendNormal(
                      "Search Query",
                      "That's not in the server.",
                      "Info",
                      2588365
                    );
                  let a = !1;
                  i.length > 25 && ((i.length = 25), (a = !0));
                  for (let t of i)
                    e.push({
                      name: trimName(t.name) + " - " + t.index,
                      value:
                        t.id + " - " + t.label + " (" + t.skill.score + ")",
                      inline: !1,
                    });
                  bot.createMessage(msg.channel.id, {
                    embed: {
                      author: {
                        name:
                          "Search Query (" +
                          i.length +
                          ")" +
                          (a ? " (1st 25 only)" : ""),
                        icon_url:
                          "https://cdn.discordapp.com/avatars/462721019959050240/ee8807bc4fccc425cde794713c9daf54.png?size=256",
                      },
                      color: 9092159,
                      fields: JSON.parse(JSON.stringify(e)),
                    },
                  });
                }
                break;
              case prefix + "tpt":
              case prefix2 + "tpt":
                {
                  if (commandsDisabled) return sendDisabled("Teleport To");
                  if (!checkPermission(!0, 3)) return;
                  let e = +command[1],
                    t = +command[2];
                  if ("number" != typeof e || "number" != typeof t)
                    return sendNormal(
                      "Teleport",
                      "Please specify valid player IDs.",
                      "Error",
                      16776960
                    );
                  let s = getEntity(e),
                    i = getEntity(t);
                  if (null == s) return sendInvalidID("Teleport To", e);
                  if (null == i) return sendInvalidID("Teleport To", t);
                  (s.x = i.x),
                    (s.y = i.y),
                    sendNormal(
                      "Teleport To",
                      "Teleported " +
                        trimName(s.name) +
                        " to " +
                        trimName(i.name) +
                        ".",
                      "Info",
                      2588365
                    );
                }
                break;
              case prefix + "guninfo":
              case prefix + "g":
              case prefix2 + "guninfo":
              case prefix2 + "g":
                {
                  if (commandsDisabled) return sendDisabled("Gun Info");
                  let e = +command[1],
                    t = command[2];
                  if ("number" != typeof e)
                    return sendNormal(
                      "Gun Info",
                      "Please specify a valid tank export.",
                      "Error",
                      16776960
                    );
                  let s = getEntity(e);
                  if (null == s) return sendInvalidID("Gun Info", e);
                  if ("string" != typeof t && null != t)
                    return sendNormal(
                      "Gun Info",
                      "Please specify a valid gun value.",
                      "Error",
                      16776960
                    );
                  if (null == t)
                    return sendNormal(
                      "Gun Info",
                      trimName(s.name) + "'s gun amount: " + s.guns.length,
                      "Info",
                      2588365
                    );
                  if (isNaN(t) || t > s.guns.length || t < 1)
                    return sendNormal(
                      "Gun Info",
                      "Please specify a valid gun value.",
                      "Error",
                      16776960
                    );
                  t--, (t = s.guns[t]);
                  let i = "N/a",
                    a = "N/a",
                    o = "false",
                    r = "false";
                  t.canShoot &&
                    ((i = t.settings),
                    (i = "`" + Object.keys(i).map((e) => i[e]) + "`"),
                    (a = t.bulletTypes[0].LABEL),
                    null != t.bulletTypes[0].POISON &&
                      (r = "'" + t.bulletTypes[0].POISON[0] + "'")),
                    bot.createMessage(msg.channel.id, {
                      embed: {
                        author: {
                          name: "Gun Info (" + c.serverName + ")",
                          icon_url:
                            "https://cdn.discordapp.com/avatars/462721019959050240/ee8807bc4fccc425cde794713c9daf54.png?size=256",
                        },
                        color: 2588365,
                        fields: [
                          {
                            name: "Stats",
                            value: i,
                            inline: !1,
                          },
                          {
                            name: "Ammunition",
                            value: a,
                            inline: !1,
                          },
                          {
                            name: "Skin",
                            value: t.skin,
                            inline: !1,
                          },
                        ],
                      },
                    });
                }
                break;
              case prefix + "rt":
              case prefix + "restarttime":
              case prefix2 + "rt":
              case prefix2 + "restarttime":
                {
                  if (commandsDisabled) return sendDisabled("Restart Timer");
                  if (!c.restarts.enabled)
                    return sendNormal(
                      "Restart Timer",
                      "Automatic restarting is not enabled for this server.",
                      "Error",
                      16776960
                    );
                  let e = +command[1];
                  if (e) {
                    if (!checkPermission(!0, 1)) return;
                    if (isNaN(e))
                      return sendNormal(
                        "Restart Timer",
                        "Please specify a valid restart time.",
                        "Error",
                        16776960
                      );
                    room.timeUntilRestart = e;
                    let t = (e / 60 / 60).toFixed(2),
                      s = (e / 60).toFixed(1);
                    sendNormal(
                      "Restart Timer",
                      "Set the automatic restart timer to " +
                        (t < 1 ? s : t) +
                        (t < 1 ? " minutes." : " hours."),
                      "Info",
                      9092159
                    );
                  } else {
                    let e = (room.timeUntilRestart / 60 / 60).toFixed(2),
                      t = (room.timeUntilRestart / 60).toFixed(1);
                    sendNormal(
                      "Restart Timer",
                      (e < 1 ? t : e) + (e < 1 ? " minutes." : " hours."),
                      "Time until the next restart:",
                      9092159
                    );
                  }
                }
                break;
              default:
                (msg.content.startsWith(prefix) ||
                  msg.content.startsWith(prefix2)) &&
                  msg.content.length > 1 &&
                  sendNormal(
                    "Arras.io Controller",
                    "That is an invalid command. Try `" +
                      prefix +
                      "help` for a list of commands.",
                    "Error",
                    16711680
                  );
            }
          } catch (e) {
            util.error(
              "The following error occurred while running the command " +
                command[0].toLowerCase() +
                ":"
            ),
              util.error(e),
              bot.createMessage("464874675999211522", {
                embed: {
                  author: {
                    name: c.serverName,
                    icon_url:
                      "https://cdn.discordapp.com/avatars/462721019959050240/ee8807bc4fccc425cde794713c9daf54.png?size=256",
                  },
                  color: 16776960,
                  fields: [
                    {
                      name: "Command Parsing Error",
                      value: " " + e,
                      inline: !1,
                    },
                    {
                      name: "Culprit Command",
                      value: command[0].toLowerCase(),
                      inline: !1,
                    },
                  ],
                },
              });
          }
        }),
        bot.editStatus(status, {
          name: playingTag,
          type: 0,
        }),
        bot.connect();
    }
    if (c.commandParsing) {
      setTimeout(() => util.log("Command parsing is enabled."), 345);
      const input = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      let CommandList = {
        help: () => {
          console.log("+--------------------+"),
            console.log("|  [33mLIST OF COMMANDS[0m  |"),
            console.log(
              "+--------------------+-------------------------------------------------------------------------+"
            ),
            console.log(
              "| say [text]         | Simply makes the console say what you put in place of [text].           |"
            ),
            console.log(
              "| exit               | Closes the arena. Running it a second time force shuts down the server. |"
            ),
            console.log(
              "| botamount [number] | Sets the maximum amount of bots that can spawn.                         |"
            ),
            console.log(
              "| playerlist         | Lists all players currently playing in the server.                      |"
            ),
            console.log(
              "| broadcast [text]   | Sends a message to all players.                                         |"
            ),
            console.log(
              "| eval [code]        | Makes the server run specified code.                                    |"
            ),
            console.log(
              "| keyhelp            | Lists all keys that come with level 1 and 2 beta-testers.               |"
            ),
            console.log(
              "+----------------------------------------------------------------------------------------------+"
            );
        },
        keyhelp: () => {
          console.log("+---------------+"),
            console.log("| [33mDEV MODE KEYS[0m |"),
            console.log("+---------------------------------+"),
            console.log("| [33m/[0m | Upgrade to TESTBED          |"),
            console.log("| [33mK[0m | Suicide                     |"),
            console.log("| [33mP[0m | Reset to Basic tank         |"),
            console.log("| [33m=[0m | Enable/disable rainbow mode |"),
            console.log("| [33mX[0m | Enable/disable passive mode |"),
            console.log("| [33mB[0m | Change color                |"),
            console.log("| [33m;[0m | Enable/disable godmode      |"),
            console.log("| [33mF[0m | Spawn stuff at mouse        |"),
            console.log("| [33mT[0m | Teleport to mouse           |"),
            console.log("| [33mY[0m | Reset to default color      |"),
            console.log("| [33mG[0m | Kill what your mouse is on  |"),
            console.log("| [33mJ[0m | Enable/disable stealth mode |"),
            console.log("+---------------------------------+");
        },
        say: (e) => {
          console.log(e.slice(1, e.length).join(" "));
        },
        exit: () => {
          room.arenaClosed
            ? (util.warn("Force exit induced! Ending process..."),
              process.exit())
            : (util.warn("Server going down! Warning broadcasted."),
              c.enableBot &&
                sendClosed(
                  c.serverName,
                  "Reason: Force Exit",
                  "Arena has been closed by the console."
                ),
              closeArena());
        },
        botamount: (e) => {
          let t = e[1];
          if (!t) return util.warn("Please specify a valid bot amount.");
          (room.maxBots = t),
            util.info("Set the maximum bot amount to " + t + ".");
        },
        playerlist: () => {
          let e = clients.filter(
            (e) => null != e.player.body && !e.player.body.isGhost
          );
          if (!e.length)
            return util.info("No players are currently playing in the server.");
          let t = "[PLAYERLIST]:\n ";
          for (let s of e) {
            let e = s.player.body;
            t +=
              "  " +
              trimName(e.name) +
              ": " +
              e.id +
              " - " +
              e.label +
              " (" +
              e.skill.score +
              ")\n ";
          }
          console.log(t);
        },
        broadcast: (e) => {
          sockets.broadcast(e.slice(1, e.length).join(" ")),
            util.info("Broadcasted your message to all players.");
        },
        eval: (args) => {
          try {
            console.log(
              "[31m[OUTPUT][0m " + eval(args.slice(1, args.length).join(" ")) + "."
            );
          } catch (e) {
            util.error(e);
          }
        },
      };
      const parseCommands = (e) => {
          if (!e) return;
          let t = e.split(" "),
            s = CommandList[t[0].toLowerCase()];
          if (void 0 === s) return util.warn("Invalid command specified.");
          s(t);
        },
        prompt = () => {
          input.question("", (e) => {
            try {
              parseCommands(e);
            } catch (e) {
              util.error(e.stack);
            } finally {
              setTimeout(prompt, 0);
            }
          });
        };
      setTimeout(prompt, 200);
    }
    setInterval(function () {
      newLogs.network.reset();
      for (let e of players)
        e.socket.view.gazeUpon(), (e.socket.lastUptime = 1 / 0);
    }, 1e3 / 30),
      setInterval(function () {
        for (let e of players) e.socket.view.setView([]);
        for (let e of entities) for (let t of players) t.socket.view.add(e);
      }, c.visibleListInterval),
      c.RANKED_BATTLE &&
        setInterval(function () {
          let e = clients.filter((e) => null == e.roomId);
          e.length > 1 &&
            ((e.length = 2),
            console.log("New room created!"),
            new RankedRoom(e));
        }, 500);
  })();
