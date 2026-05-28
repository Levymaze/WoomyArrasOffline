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
                    const adminBossOptionGroups = [{
                        label: null,
                        options: [{ value: 0, label: "Random" }]
                    }, {
                        label: "Vanilla Bosses",
                        options: [
                            { value: 1, label: "EK-1 (Egg)" },
                            { value: 2, label: "Summoner (Square)" },
                            { value: 3, label: "Defender (Triangle)" },
                            { value: 4, label: "Leviathan (Pentagon)" },
                            { value: 5, label: "Snowflake (Snowball)" }
                        ]
                    }, {
                        label: "Elite Crashers",
                        options: [
                            { value: 6, label: "Elite Destroyer" },
                            { value: 7, label: "Elite Gunner" },
                            { value: 8, label: "Elite Sprayer" },
                            { value: 9, label: "Elite Twin" },
                            { value: 10, label: "Elite Machine" },
                            { value: 11, label: "Elite Trapper" },
                            { value: 12, label: "Elite Borer" },
                            { value: 13, label: "Elite Sniper" },
                            { value: 14, label: "Elite Basic" },
                            { value: 15, label: "Elite Inferno" },
                            { value: 16, label: "Elite Rifle" }
                        ]
                    }, {
                        label: "Fallen Bosses",
                        options: [
                            { value: 33, label: "Fallen Booster" },
                            { value: 34, label: "Fallen Overlord" },
                            { value: 35, label: "Fallen Piston" },
                            { value: 36, label: "Fallen Auto Tank" },
                            { value: 58, label: "Fallen Cavalcade" },
                            { value: 59, label: "Fallen Fighter" }
                        ]
                    }, {
                        label: "Egg Queen Bosses",
                        options: [
                            { value: 37, label: "Egg Queen Tier 1" },
                            { value: 38, label: "Egg Queen Tier 2" },
                            { value: 39, label: "Egg Queen Tier 3" }
                        ]
                    }, {
                        label: "AWP Bosses",
                        options: [
                            { value: 40, label: "AWP-1" },
                            { value: 41, label: "AWP-14" },
                            { value: 42, label: "AWP-SIN16" },
                            { value: 43, label: "AWP-TAN54" },
                            { value: 44, label: "AWP-LOG24" },
                            { value: 45, label: "AWP-69" },
                            { value: 46, label: "AWP-COS39" },
                            { value: 47, label: "AWP-Ice" },
                            { value: 48, label: "AWP-24" },
                            { value: 49, label: "AWP-Ring" },
                            { value: 50, label: "AWP-COS5" },
                            { value: 51, label: "AWP-PS" },
                            { value: 52, label: "AWP-11" },
                            { value: 53, label: "AWP-8" },
                            { value: 54, label: "AWP-21" },
                            { value: 55, label: "AWP-28" }
                        ]
                    }, {
                        label: "Reanimated Bosses",
                        options: [
                            { value: 60, label: "Reanim Farmer" },
                            { value: 61, label: "Reanim Hepta Trap" },
                            { value: 62, label: "Reanim Uzi" }
                        ]
                    }, {
                        label: "Army Sentry Bosses",
                        options: [
                            { value: 72, label: "Army Sentry Swarm" },
                            { value: 73, label: "Army Sentry Gun" },
                            { value: 74, label: "Army Sentry Trap" },
                            { value: 75, label: "Army Sentry Ranger" }
                        ]
                    }, {
                        label: "Dominators",
                        options: [
                            { value: 90, label: "Destroyer Dominator" },
                            { value: 91, label: "Gunner Dominator" },
                            { value: 92, label: "Trapper Dominator" },
                            { value: 93, label: "Drone Dominator" },
                            { value: 94, label: "Auto-Dominator" },
                            { value: 95, label: "Steamroller Dominator" },
                            { value: 96, label: "Crockett Dominator" }
                        ]
                    }, {
                        label: "Other Bosses",
                        options: [
                            { value: 17, label: "Guardian" },
                            { value: 18, label: "Palisade" },
                            { value: 19, label: "Skim Boss" },
                            { value: 20, label: "Octogeddon" },
                            { value: 21, label: "Hexadecagor" },
                            { value: 22, label: "Blitzkrieg" },
                            { value: 23, label: "Demolisher" },
                            { value: 24, label: "Cutter" },
                            { value: 25, label: "Pulsar" },
                            { value: 26, label: "Collider" },
                            { value: 27, label: "Deltrablade" },
                            { value: 28, label: "Magnetar" },
                            { value: 29, label: "XYV" },
                            { value: 30, label: "Constellation" },
                            { value: 31, label: "Bow" },
                            { value: 32, label: "Green Guardian" },
                            { value: 56, label: "RK-1" },
                            { value: 57, label: "Hexaship" },
                            { value: 63, label: "Ult Multitool" },
                            { value: 64, label: "Nailer" },
                            { value: 65, label: "Gravibus" },
                            { value: 66, label: "Comet" },
                            { value: 67, label: "Brown Comet" },
                            { value: 68, label: "Orangicus" },
                            { value: 69, label: "Atrium" },
                            { value: 70, label: "Constructionist" },
                            { value: 71, label: "Dropship" },
                            { value: 76, label: "Derogator" },
                            { value: 77, label: "Octagron" },
                            { value: 78, label: "Ultimate" },
                            { value: 79, label: "Alpha Sentry" },
                            { value: 80, label: "Asteroid" },
                            { value: 81, label: "Trape Fighter" },
                            { value: 82, label: "Vis Ultima" },
                            { value: 83, label: "Gunship" },
                            { value: 84, label: "Messenger" },
                            { value: 85, label: "Aquamarine" },
                            { value: 86, label: "Kiosk" },
                            { value: 87, label: "Vanguard" },
                            { value: 88, label: "Conquistador" },
                            { value: 89, label: "Sassafras" }
                        ]
                    }];
                    const bossSelectOptionsHtml = adminBossOptionGroups.map(group => {
                        const optionsHtml = group.options.map(option => `<option value="${option.value}">${option.label}</option>`).join("");
                        return group.label ? `<optgroup label="${group.label}">${optionsHtml}</optgroup>` : optionsHtml;
                    }).join("");
                    const prettifyShapeKey = key => (key || "")
                        .replace(/_/g, " ")
                        .replace(/([a-z])([A-Z])/g, "$1 $2")
                        .replace(/\s+/g, " ")
                        .trim()
                        .replace(/\b\w/g, c => c.toUpperCase());
                    const shapeTypeCache = new WeakMap();
                    const resolveShapeType = (def, stack = new Set()) => {
                        if (!def || typeof def !== "object") return null;
                        if (shapeTypeCache.has(def)) return shapeTypeCache.get(def);
                        if (stack.has(def)) return null;
                        stack.add(def);
                        let resolved = null;
                        if ("string" === typeof def.TYPE) {
                            let directType = def.TYPE.toLowerCase();
                            if ("food" === directType || "crasher" === directType) resolved = directType;
                        }
                        if (!resolved && Array.isArray(def.PARENT)) {
                            for (let parent of def.PARENT) {
                                let parentType = resolveShapeType(parent, stack);
                                if (parentType) {
                                    resolved = parentType;
                                    break;
                                }
                            }
                        }
                        stack.delete(def);
                        shapeTypeCache.set(def, resolved);
                        return resolved;
                    };
                    const getShapeCategory = (key, def, resolvedType, label) => {
                        let loweredKey = (key || "").toLowerCase();
                        let loweredLabel = (label || "").toLowerCase();
                        if ("crasher" === resolvedType) {
                            if (loweredKey.startsWith("fallen") || loweredLabel.startsWith("fallen")) return "Crashers - Fallen";
                            if (loweredKey.includes("kamikaze") || loweredLabel.includes("kamikaze")) return "Crashers - Kamikaze";
                            return "Crashers - Other";
                        }
                        if (loweredKey.includes("nest") || loweredLabel.includes("nest")) return "Food - Nest";
                        if (loweredKey.includes("snow") || loweredLabel.includes("snow")) return "Food - Snow";
                        let shape = Number(def && def.SHAPE);
                        if (Number.isFinite(shape)) {
                            if (0 === shape) return "Food - Eggs";
                            if (3 === shape) return "Food - Triangles";
                            if (4 === shape) return "Food - Squares";
                            if (5 === shape) return "Food - Pentagons";
                            if (6 === shape) return "Food - Hexagons";
                            if (7 === shape) return "Food - Heptagons";
                            if (8 === shape) return "Food - Octagons";
                            if (shape > 0) return "Food - Other Polygons";
                        }
                        return "Food - Other";
                    };
                    const buildShapeGroups = () => {
                        let defs = window.defExport || {};
                        let rows = [];
                        for (let key of Object.keys(defs)) {
                            let def = defs[key];
                            let resolvedType = resolveShapeType(def);
                            if (!resolvedType) continue;
                            let label = ("string" === typeof def.LABEL && def.LABEL.trim()) ? def.LABEL.trim() : prettifyShapeKey(key);
                            rows.push({
                                key,
                                label,
                                category: getShapeCategory(key, def, resolvedType, label),
                            });
                        }
                        let labelCount = new Map();
                        for (let row of rows) labelCount.set(row.label, (labelCount.get(row.label) || 0) + 1);
                        for (let row of rows) row.display = (labelCount.get(row.label) > 1) ? `${row.label} (${row.key})` : row.label;
                        rows.sort((a, b) => a.category.localeCompare(b.category) || a.display.localeCompare(b.display));
                        let groups = new Map();
                        for (let row of rows) {
                            if (!groups.has(row.category)) groups.set(row.category, []);
                            groups.get(row.category).push({ value: row.key, label: row.display });
                        }
                        let orderedCategories = [
                            "Food - Eggs",
                            "Food - Squares",
                            "Food - Triangles",
                            "Food - Pentagons",
                            "Food - Hexagons",
                            "Food - Heptagons",
                            "Food - Octagons",
                            "Food - Nest",
                            "Food - Snow",
                            "Food - Other Polygons",
                            "Food - Other",
                            "Crashers - Fallen",
                            "Crashers - Kamikaze",
                            "Crashers - Other",
                        ];
                        let ordered = [];
                        for (let name of orderedCategories) {
                            if (groups.has(name)) ordered.push({ label: name, options: groups.get(name) });
                            groups.delete(name);
                        }
                        for (let [name, options] of groups.entries()) ordered.push({ label: name, options });
                        return ordered;
                    };
                    const adminShapeOptionGroups = buildShapeGroups();
                    const shapeSelectOptionsHtml = adminShapeOptionGroups.length
                        ? adminShapeOptionGroups.map(group => {
                            let optionsHtml = group.options.map(option => `<option value="${option.value}">${option.label}</option>`).join("");
                            return `<optgroup label="${group.label}">${optionsHtml}</optgroup>`;
                        }).join("")
                        : `<option value="egg">Egg</option>`;
                    adminHolder.innerHTML += `<div class="test-panel-section"><p class="test-panel-title">World Edit</p><p class="test-panel-note">Adjusts map population limits. Lowering values will remove extras immediately; increasing values allows more to spawn over time. Bots are capped at 50; polygons and obstacles are capped server-side.</p><label>Boss Type: </label><select id="Woomy_AdminBossType" tabindex="-1">${bossSelectOptionsHtml}</select></br><button id="Woomy_AdminSpawnBoss">Spawn Selected Boss</button></br><label>Shape Type: </label><select id="Woomy_AdminShapeType" tabindex="-1">${shapeSelectOptionsHtml}</select></br><button id="Woomy_AdminSpawnShape">Spawn Selected Shape</button></br><label>Bot Delta (+/-): </label><input id="Woomy_AdminBotsDelta" tabindex="-1" type="number" step="1" min="-50" max="50" value="1"></br><button id="Woomy_AdminApplyBotsDelta">Apply Bot Delta</button></br><label>Set Bots: </label><input id="Woomy_AdminSetBots" tabindex="-1" type="number" step="1" min="0" max="50" value="0"></br><button id="Woomy_AdminApplySetBots">Set Bots</button></br><label>Polygon Delta (+/-): </label><input id="Woomy_AdminPolysDelta" tabindex="-1" type="number" step="1" min="-2000" max="2000" value="10"></br><button id="Woomy_AdminApplyPolysDelta">Apply Polygon Delta</button></br><label>Set Polygons: </label><input id="Woomy_AdminSetPolys" tabindex="-1" type="number" step="1" min="0" max="2000" value="0"></br><button id="Woomy_AdminApplySetPolys">Set Polygons</button></br><label>Reduce Obstacles: </label><input id="Woomy_AdminSetObstacles" tabindex="-1" type="number" step="1" min="0" max="2000" value="0"></br><button id="Woomy_AdminApplySetObstacles">Set Obstacles</button></div>`;
                    adminHolder.innerHTML += `<div class="test-panel-section"><p class="test-panel-title">Developer Token Keybinds</p><p class="test-panel-note">Requires a developer token.</p><ul class="test-panel-shortcuts"><li>\` and / - Switch to Developer tank</li><li>F - Summon square; hold to spawn more</li><li>G - Kill entity</li><li>B - Change tank color</li><li>T - Copy team/color from entity under cursor (updates team path color)</li><li>Y - Cycle team for entity under cursor (shows team message)</li><li>V - Maze wall tool: tap to place/remove at cursor, hold V and move cursor to resize</li><li>X - Passive mode toggle</li><li>J - Stealth mode toggle</li><li>; - Godmode toggle</li><li>P - Change to Basic; also resets score</li><li>K - Self-destruct</li><li>Q - Teleport to cursor; hold is ignored</li><li>Z - Pick up nearby entities, drag/hold with cursor, and press Z again to drop</li><li>I - Give +100,000 score to entity under cursor; hold to repeat</li><li>U - Remove 100,000 score from entity under cursor; hold to repeat</li><li>+ - Increase FoV</li><li>- - Decrease FoV</li><li>H - Heal entity under cursor; hold to repeat (Shift+H controls Dominator/Mothership)</li></ul></div>`;
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
                    let adminSpawnMode = "boss";
                    let adminEnterSpawnArmed = false;
                    const updateTestPanelAccess = () => {
                        let allowed = hasTestPanelAccess();
                        adminToggle.style.display = allowed ? "block" : "none";
                        if (!allowed) {
                            // Force-close the panel if access is removed/invalidated.
                            adminHolder.style.width = 0;
                            adminHolder.style.height = 0;
                            adminHolder.style.opacity = 0;
                            adminHolder.style.display = "none";
                            adminEnterSpawnArmed = false;
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
                        let payload = ("spawn_shape" === op) ? String(value || "") : (Number(value) || 0);
                        sock.talk("A", op, payload);
                    };
                    const adminBossSelect = document.getElementById("Woomy_AdminBossType");
                    const adminShapeSelect = document.getElementById("Woomy_AdminShapeType");
                    const adminSpawnBossButton = document.getElementById("Woomy_AdminSpawnBoss");
                    const adminSpawnShapeButton = document.getElementById("Woomy_AdminSpawnShape");
                    const setAdminSpawnMode = mode => {
                        adminSpawnMode = mode;
                        adminEnterSpawnArmed = true;
                    };
                    const spawnSelectedBoss = () => sendAdminPacket("spawn_boss", adminBossSelect ? adminBossSelect.value : 0);
                    const spawnSelectedShape = () => sendAdminPacket("spawn_shape", adminShapeSelect ? adminShapeSelect.value : "");
                    if (adminBossSelect) {
                        adminBossSelect.addEventListener("change", () => setAdminSpawnMode("boss"));
                        adminBossSelect.addEventListener("focus", () => setAdminSpawnMode("boss"));
                    }
                    if (adminShapeSelect) {
                        adminShapeSelect.addEventListener("change", () => setAdminSpawnMode("shape"));
                        adminShapeSelect.addEventListener("focus", () => setAdminSpawnMode("shape"));
                    }
                    document.getElementById("Woomy_AdminApplyScoreDelta").onclick = () => sendAdminPacket("score_delta", document.getElementById("Woomy_AdminScoreDelta").value);
                    document.getElementById("Woomy_AdminApplySetScore").onclick = () => sendAdminPacket("score_set", document.getElementById("Woomy_AdminSetScore").value);
                    document.getElementById("Woomy_AdminApplyPointsDelta").onclick = () => sendAdminPacket("points_delta", document.getElementById("Woomy_AdminPointsDelta").value);
                    document.getElementById("Woomy_AdminApplySetPoints").onclick = () => sendAdminPacket("points_set", document.getElementById("Woomy_AdminSetPoints").value);
                    adminSpawnBossButton.onclick = () => {
                        setAdminSpawnMode("boss");
                        spawnSelectedBoss();
                    };
                    adminSpawnShapeButton.onclick = () => {
                        setAdminSpawnMode("shape");
                        spawnSelectedShape();
                    };
                    document.getElementById("Woomy_AdminApplyBotsDelta").onclick = () => sendAdminPacket("bots_delta", document.getElementById("Woomy_AdminBotsDelta").value);
                    document.getElementById("Woomy_AdminApplySetBots").onclick = () => sendAdminPacket("bots_set", document.getElementById("Woomy_AdminSetBots").value);
                    document.getElementById("Woomy_AdminApplyPolysDelta").onclick = () => sendAdminPacket("polygons_delta", document.getElementById("Woomy_AdminPolysDelta").value);
                    document.getElementById("Woomy_AdminApplySetPolys").onclick = () => sendAdminPacket("polygons_set", document.getElementById("Woomy_AdminSetPolys").value);
                    document.getElementById("Woomy_AdminApplySetObstacles").onclick = () => sendAdminPacket("obstacles_set", document.getElementById("Woomy_AdminSetObstacles").value);
                    document.addEventListener("keydown", event => {
                        if ("Enter" !== event.key || event.repeat) return;
                        if (!hasTestPanelAccess() || !adminEnterSpawnArmed) return;
                        let target = event.target;
                        let tag = target && target.tagName ? target.tagName.toUpperCase() : "";
                        if ("INPUT" === tag || "TEXTAREA" === tag || (target && target.isContentEditable)) return;
                        if ("SELECT" === tag && target !== adminBossSelect && target !== adminShapeSelect) return;
                        event.preventDefault();
                        ("shape" === adminSpawnMode ? spawnSelectedShape : spawnSelectedBoss)();
                    });
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
                    bindAdminEnter("Woomy_AdminSetObstacles", "Woomy_AdminApplySetObstacles");
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
