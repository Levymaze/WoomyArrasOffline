(() => {
                // Just so you know how it works, this is the UI part of it. The actual code is in app.js, fine "window.Woomy = ";
                window.resetOptions = (function (dontOutput) {
                    localStorage.hasLoadedBefore = true;
                    for (let _ in window.Woomy) {
                        let setting = window.Woomy[_];
                        let element = document.getElementById(`Woomy_${setting.key}`);
                        if (element.type === "checkbox") element.checked = setting.default;
                        else element.value = setting.default;
                        setting.set(element.type === "checkbox" ? element.checked : element.value);
                    }
                    if (dontOutput) return;
                    document.getElementById("optionsResult").value = "";
                    document.getElementById("optionsResult").placeholder = "Your options have been restored to default";
                });
                window.initOptions = () => {
                    let holder = document.createElement("div");
                    document.body.appendChild(holder);
                    holder.id = "optionsMenu";
                    holder.style.display = "none";
                    holder.style.width = 0;
                    holder.style.height = 0;
                    holder.style.opacity = 0;
                    holder.innerHTML += `<center><h2>Settings</h2></center>`;
                    let createInput = setting => {
                        if (setting.dropDown.status) {
                            let HTML = `<label for="Woomy_${setting.key}">${setting.name}:</label><select id="Woomy_${setting.key}" tabindex="-1" value="${setting.value}">`;
                            for (let option of setting.dropDown.options) HTML += `<option value="${option}">${(option = option.split(""), option[0] = option[0].toUpperCase(), option = option.join(""), `${option} ${setting.dropDown.suffix}`)}</option>`;
                            HTML += "</select><br/>";
                            holder.innerHTML += HTML;
                            document.getElementById(`Woomy_${setting.key}`).value = setting.value;
                            return;
                        }
                        switch (setting.type) {
                            case "boolean": {
                                let HTML = `<label for="Woomy_${setting.key}">${setting.name}: </label><label class="checkbox-container"><input id="Woomy_${setting.key}" tabindex="-1" type="checkbox"${setting.value ? " checked" : ""}><span class="checkbox-indicator"></span></label></br>`;
                                holder.innerHTML += HTML;
                            } break;
                            case "number": {
                                let HTML = `<label for="Woomy_${setting.key}">${setting.name}: </label> <input id="Woomy_${setting.key}" tabindex="-1" class="optionInput" type="number" step="0.01" min="0" max="100" value="${setting.value}"></br>`;
                                holder.innerHTML += HTML;
                            } break;
                            case "string": {
                                let HTML = `<label for="Woomy_${setting.key}">${setting.name}: </label> <input id="Woomy_${setting.key}" tabindex="-1" class="optionInput" type="text" value="${setting.value}"></br>`;
                                holder.innerHTML += HTML;
                            } break;
                        }
                    };
                    for (let _ in window.Woomy) {
                        let setting = window.Woomy[_];
                        createInput(setting);
                    }
                    holder.innerHTML += `<button id="saveOptions">Save & Apply Options</button><button id="resetOptions">Reset Options</button><br><button id="exportOptions">Export Options</button><button id="importOptions">Import Options</button><br><input type="text" autofocus tabindex="0" spellcheck="false" placeholder="..." id="optionsResult"/>`;
                    document.body.appendChild(holder);
                    document.getElementById("Woomy_theme").value = Woomy["Theme"].value;
                    document.getElementById("Woomy_shaders").value = Woomy["Shader Casting"].value;
                    document.getElementById("Woomy_filter").value = Woomy["Filters"].value;
                    document.getElementById("Woomy_resolutionScale").value = Woomy["Resolution"].value;
                    let toggle = document.createElement("div");
                    toggle.id = "settings-button";
                    //if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|android|mobi/i.test(navigator.userAgent)) {
                    document.body.appendChild(toggle);
                    //}
                    toggle.onclick = () => {
                        let hstyle = holder.style;
                        let waitTime = Number(window.getComputedStyle(document.body).getPropertyValue("--transition-time").replace(/[^\d]/g, '')) * 10;
                        if (hstyle.display == "none") {
                            hstyle.display = "block";
                            setTimeout(() => {
                                hstyle.width = "25%";
                                hstyle.height = "50%";
                                hstyle.opacity = 1;
                            });
                        } else {
                            hstyle.width = 0;
                            hstyle.height = 0;
                            hstyle.opacity = 0;
                            setTimeout(() => {
                                hstyle.display = "none"
                            }, waitTime);
                        }
                    };
                    let adminHolder = document.createElement("div");
                    document.body.appendChild(adminHolder);
                    adminHolder.id = "adminMenu";
                    adminHolder.style.display = "none";
                    adminHolder.style.width = 0;
                    adminHolder.style.height = 0;
                    adminHolder.style.opacity = 0;
                    adminHolder.innerHTML += `<center><h2>Test Panel</h2></center>`;
                    adminHolder.innerHTML += `<div class="test-panel-section"><p class="test-panel-title">Testing Actions</p><p class="test-panel-note">Edits apply to your current tank. Score changes are capped at 100,000,000 server-side.</p><label>Score Delta (+/-): </label><input id="Woomy_AdminScoreDelta" tabindex="-1" type="number" step="1" min="-100000000" max="100000000" value="1000"></br><button id="Woomy_AdminApplyScoreDelta">Apply Score Delta</button></br><label>Set Score: </label><input id="Woomy_AdminSetScore" tabindex="-1" type="number" step="1" min="0" max="100000000" value="0"></br><button id="Woomy_AdminApplySetScore">Set Score</button></br><p class="test-panel-note">Skill points are separate from score. Use these to test builds quickly.</p><label>Skill Point Delta (+/-): </label><input id="Woomy_AdminPointsDelta" tabindex="-1" type="number" step="1" value="1"></br><button id="Woomy_AdminApplyPointsDelta">Apply Skill Delta</button></br><label>Set Skill Points: </label><input id="Woomy_AdminSetPoints" tabindex="-1" type="number" step="1" value="0"></br><button id="Woomy_AdminApplySetPoints">Set Skill Points</button></br></div>`;
                    adminHolder.innerHTML += `<div class="test-panel-section"><p class="test-panel-title">World Edit</p><p class="test-panel-note">Adjusts map population limits. Lowering values will remove extras immediately; increasing values allows more to spawn over time. Bots are capped at 50; polygons are capped server-side.</p><button id="Woomy_AdminSpawnBoss">Spawn Random Boss</button></br><label>Bot Delta (+/-): </label><input id="Woomy_AdminBotsDelta" tabindex="-1" type="number" step="1" min="-50" max="50" value="1"></br><button id="Woomy_AdminApplyBotsDelta">Apply Bot Delta</button></br><label>Set Bots: </label><input id="Woomy_AdminSetBots" tabindex="-1" type="number" step="1" min="0" max="50" value="0"></br><button id="Woomy_AdminApplySetBots">Set Bots</button></br><label>Polygon Delta (+/-): </label><input id="Woomy_AdminPolysDelta" tabindex="-1" type="number" step="1" min="-2000" max="2000" value="10"></br><button id="Woomy_AdminApplyPolysDelta">Apply Polygon Delta</button></br><label>Set Polygons: </label><input id="Woomy_AdminSetPolys" tabindex="-1" type="number" step="1" min="0" max="2000" value="0"></br><button id="Woomy_AdminApplySetPolys">Set Polygons</button></div>`;
                    adminHolder.innerHTML += `<div class="test-panel-section"><p class="test-panel-title">Developer Token Keybinds</p><p class="test-panel-note">Requires a developer token.</p><ul class="test-panel-shortcuts"><li>\` and / - Switch to Developer tank</li><li>F - Summon square; hold to spawn more</li><li>G - Kill entity</li><li>B - Change tank color</li><li>T - Change tank color to team color</li><li>X - Passive mode toggle</li><li>J - Stealth mode toggle</li><li>; - Godmode toggle</li><li>P - Change to Basic; also resets score</li><li>K - Self-destruct</li><li>Q - Teleport to cursor; hold is ignored</li><li>I - Give +100,000 score to entity under cursor; hold to repeat</li><li>U - Remove 100,000 score from entity under cursor; hold to repeat</li><li>+ - Increase FoV</li><li>- - Decrease FoV</li><li>H - Heal entity under cursor; hold to repeat (Shift+H controls Dominator/Mothership)</li></ul></div>`;
                    let adminToggle = document.createElement("div");
                    adminToggle.id = "admin-button";
                    document.body.appendChild(adminToggle);
                    // Test Panel should only be visible to Beta Tester or Developer tokens.
                    adminToggle.style.display = "none";
                    const getPlayerKey = () => {
                        let keyEl = document.getElementById("playerKeyInput");
                        let key = (keyEl && typeof keyEl.value === "string") ? keyEl.value : (typeof localStorage.playerKeyInput === "string" ? localStorage.playerKeyInput : "");
                        // In some modes the menu input isn't the source of truth; fall back to the in-game token.
                        if (!key && typeof global !== "undefined" && global && typeof global.playerKey === "string") key = global.playerKey;
                        return (key || "").trim();
                    };
                    const getTokenLevel = () => {
                        try {
                            let key = getPlayerKey();
                            if (!key || !window.tokens || !window.tokens.BETA) return 0;
                            // Allow the developer bypass key too (used server-side for full permissions).
                            if (window.tokens.oblivion_2 && key === window.tokens.oblivion_2) return 3;
                            let t = window.tokens.BETA.find(e => e && e[0] === key);
                            return t ? (Number(t[1]) || 0) : 0;
                        } catch (e) {
                            return 0;
                        }
                    };
                    const hasTestPanelAccess = () => getTokenLevel() >= 1;
                    const hasDevToken = () => getTokenLevel() >= 3;
                    const updateTestPanelAccess = () => {
                        let allowed = hasTestPanelAccess();
                        adminToggle.style.display = allowed ? "block" : "none";
                        if (!allowed) {
                            // Force-close the panel if access is removed/invalidated.
                            adminHolder.style.width = 0;
                            adminHolder.style.height = 0;
                            adminHolder.style.opacity = 0;
                            adminHolder.style.display = "none";
                        }
                    };
                    updateTestPanelAccess();
                    // Expose helpers so other parts of the client (keybinds, etc.) can check token level safely.
                    window.__woomyGetTokenLevel = getTokenLevel;
                    window.__woomyHasTestPanelAccess = hasTestPanelAccess;
                    window.__woomyHasDevToken = hasDevToken;
                    window.__woomyUpdateTestPanelAccess = updateTestPanelAccess;
                    let keyInput = document.getElementById("playerKeyInput");
                    if (keyInput) {
                        keyInput.addEventListener("input", updateTestPanelAccess);
                        keyInput.addEventListener("change", updateTestPanelAccess);
                    }
                    window.addEventListener("storage", ev => {
                        if (ev && ev.key === "playerKeyInput") updateTestPanelAccess();
                    });
                    adminToggle.onclick = () => {
                        if (!hasTestPanelAccess()) return;
                        let hstyle = adminHolder.style;
                        let waitTime = Number(window.getComputedStyle(document.body).getPropertyValue("--transition-time").replace(/[^\d]/g, '')) * 10;
                        if (hstyle.display == "none") {
                            hstyle.display = "block";
                            setTimeout(() => {
                                hstyle.width = "28%";
                                hstyle.height = "58%";
                                hstyle.opacity = 1;
                            });
                        } else {
                            hstyle.width = 0;
                            hstyle.height = 0;
                            hstyle.opacity = 0;
                            setTimeout(() => {
                                hstyle.display = "none"
                            }, waitTime);
                        }
                    };
                    const sendAdminPacket = (op, value) => {
                        let sock = null;
                        if (window.module && window.module.exports && window.module.exports.socket) sock = window.module.exports.socket;
                        else if (window.canvas && window.canvas.socket) sock = window.canvas.socket;
                        if (!sock || !sock.talk) return;
                        sock.talk("A", op, Number(value) || 0);
                    };
                    document.getElementById("Woomy_AdminApplyScoreDelta").onclick = () => sendAdminPacket("score_delta", document.getElementById("Woomy_AdminScoreDelta").value);
                    document.getElementById("Woomy_AdminApplySetScore").onclick = () => sendAdminPacket("score_set", document.getElementById("Woomy_AdminSetScore").value);
                    document.getElementById("Woomy_AdminApplyPointsDelta").onclick = () => sendAdminPacket("points_delta", document.getElementById("Woomy_AdminPointsDelta").value);
                    document.getElementById("Woomy_AdminApplySetPoints").onclick = () => sendAdminPacket("points_set", document.getElementById("Woomy_AdminSetPoints").value);
                    document.getElementById("Woomy_AdminSpawnBoss").onclick = () => sendAdminPacket("spawn_boss", 0);
                    document.getElementById("Woomy_AdminApplyBotsDelta").onclick = () => sendAdminPacket("bots_delta", document.getElementById("Woomy_AdminBotsDelta").value);
                    document.getElementById("Woomy_AdminApplySetBots").onclick = () => sendAdminPacket("bots_set", document.getElementById("Woomy_AdminSetBots").value);
                    document.getElementById("Woomy_AdminApplyPolysDelta").onclick = () => sendAdminPacket("polygons_delta", document.getElementById("Woomy_AdminPolysDelta").value);
                    document.getElementById("Woomy_AdminApplySetPolys").onclick = () => sendAdminPacket("polygons_set", document.getElementById("Woomy_AdminSetPolys").value);
                    const bindAdminEnter = (inputId, clickId) => {
                        let input = document.getElementById(inputId);
                        let btn = document.getElementById(clickId);
                        if (!input || !btn) return;
                        input.addEventListener("keydown", event => {
                            if ("Enter" === event.key) btn.click();
                        });
                    };
                    bindAdminEnter("Woomy_AdminScoreDelta", "Woomy_AdminApplyScoreDelta");
                    bindAdminEnter("Woomy_AdminSetScore", "Woomy_AdminApplySetScore");
                    bindAdminEnter("Woomy_AdminPointsDelta", "Woomy_AdminApplyPointsDelta");
                    bindAdminEnter("Woomy_AdminSetPoints", "Woomy_AdminApplySetPoints");
                    bindAdminEnter("Woomy_AdminBotsDelta", "Woomy_AdminApplyBotsDelta");
                    bindAdminEnter("Woomy_AdminSetBots", "Woomy_AdminApplySetBots");
                    bindAdminEnter("Woomy_AdminPolysDelta", "Woomy_AdminApplyPolysDelta");
                    bindAdminEnter("Woomy_AdminSetPolys", "Woomy_AdminApplySetPolys");
                    let saveButton = document.getElementById("saveOptions");
                    let resetButton = document.getElementById("resetOptions");
                    let exportButton = document.getElementById("exportOptions");
                    let inportButton = document.getElementById("importOptions");
                    let resultField = document.getElementById("optionsResult");
                    let respond = (text, value = false) => {
                        document.getElementById("optionsResult").value = value ? text : "";
                        document.getElementById("optionsResult").placeholder = value ? "..." : text;
                    }
                    inportButton.onclick = () => {
                        let input = resultField.value;
                        if (input.value == "") respond("Paste your settings here!");
                        switch (input) {
                            case "Pixel Mode":
                                respond("Pixel Mode has been added.");
                                let op = document.createElement("option");
                                op.value = op.innerHTML = "PixelMode (8%)"
                                document.getElementById("Woomy_resolutionScale").appendChild(op);
                                break;
                            default: {
                                try {
                                    input = JSON.parse(input);
                                    if (input instanceof Array || (!typeof input === "object")) throw ("Not an object");
                                    for (let _ in window.Woomy) {
                                        let setting = window.Woomy[_];
                                        if (input[setting.name] == null) continue;
                                        let element = document.getElementById(`Woomy_${setting.key}`);
                                        let value = input[setting.name];
                                        if (element.type === "checkbox") element.checked = value;
                                        else element.value = value;
                                        setting.set(element.type === "checkbox" ? element.checked : element.value);
                                    }
                                    console.log("Settings " + resultField.value + " imported.")
                                    respond("Options have been succsesfully imported");
                                } catch (error) {
                                    respond("Failed to parse the provided options");
                                    console.warn('Failed to load "' + input + '" because ' + `${error}`);
                                };
                            }
                        };
                    };
                    exportButton.onclick = () => {
                        let out = {};
                        for (let key of Object.keys(window.Woomy)) out[key] = window.Woomy[key].value
                        navigator.clipboard.writeText(JSON.stringify(out));
                        console.log("Exported settings.");
                        respond(JSON.stringify(out), true);
                    }
                    saveButton.onclick = () => {
                        for (let _ in window.Woomy) {
                            let setting = window.Woomy[_];
                            let option = document.getElementById(`Woomy_${setting.key}`);
                            let value = option.value;
                            if (option.type === "checkbox") value = option.checked;
                            setting.set(value);
                        }
                        console.log("Saved settings.");
                        respond("Your options have been saved")
                    };
                    resultField.addEventListener("keydown", event => {
                        if (event.key == "Enter") inportButton.click();
                    })
                    window.setTimeout(() => resetButton.onclick = window.resetOptions, 1000);
                    if (!localStorage.hasLoadedBefore) {
                        console.log("First time, loading default settings...")
                        window.resetOptions(true);
                    };
                }
            })();