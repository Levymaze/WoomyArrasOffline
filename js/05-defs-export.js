window.defExport = {} // only used in defs

            window.__modulePolyfill = {
                "readline": {},
                "express": () => { // also covers expressWs
                    return {
                        "use": () => { },
                        "static": () => { },
                        "json": () => { },
                        "get": () => { },
                        "ws": (ending) => {
                            return new WebSocket("ws://localhost:3001" + ending, "server")
                        }
                    }
                }
            }

            window.module = {
                exports: (name, data) => {
                    window.__modulePolyfill[name] = data
                }
            }