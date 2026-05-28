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
                    this.url = url
                    this.__platform = platform // "client" or "server"
                    window.__websocketPolyfill[this.__platform].sockets[url] = this
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