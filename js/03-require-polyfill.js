window.require = (path) => {
                if (window.__modulePolyfill[path] !== undefined) {
                    return window.__modulePolyfill[path];
                }
                let bestMatch = null;
                for (let mdl in window.__modulePolyfill) {
                    if (path.includes(mdl) && (!bestMatch || mdl.length > bestMatch.length)) {
                        bestMatch = mdl;
                    }
                }
                return bestMatch ? window.__modulePolyfill[bestMatch] : undefined;
            }