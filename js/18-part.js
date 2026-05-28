function getBaseShuffling(teams, max = 5) {
                const output = [];
                for (let i = 1; i < max; i++) {
                    output.push(i > teams ? 0 : i);
                }
                return output.sort(function () {
                    return .5 - Math.random();
                });
            }

            function id(i, level = true, norm = false) {
                if (i) {
                    return !!level ? `n_b${i}` : `bas${i}`;
                } else if (norm) {
                    return "norm";
                } else {
                    const list = ["rock", "rock", "roid", "norm", "norm"];
                    return list[Math.floor(Math.random() * list.length)];
                }
            }

            function oddify(number, multiplier = 1) {
                return number + ((number % 2) * multiplier);
            }

            function setup(options = {}) {
                if (options.width == null) options.width = defaults.X_GRID;
                if (options.height == null) options.height = defaults.Y_GRID;
                if (options.nestWidth == null) options.nestWidth = Math.floor(options.width / 4) + (options.width % 2 === 0) - (1 + (options.width % 2 === 0));
                if (options.nestHeight == null) options.nestHeight = Math.floor(options.height / 4) + (options.height % 2 === 0) - (1 + (options.width % 2 === 0));
                if (options.rockScatter == null) options.rockScatter = .175;
                options.rockScatter = 1 - options.rockScatter;
                const output = [];
                const nest = {
                    sx: oddify(Math.floor(options.width / 2 - options.nestWidth / 2), -1 * ((options.width % 2 === 0) && Math.floor(options.width / 2) % 2 === 1)),
                    sy: oddify(Math.floor(options.height / 2 - options.nestHeight / 2), -1 * ((options.height % 2 === 0) && Math.floor(options.height / 2) % 2 === 1)),
                    ex: Math.floor(options.width / 2 - options.nestWidth / 2) + options.nestWidth,
                    ey: Math.floor(options.height / 2 - options.nestHeight / 2) + options.nestHeight
                };

                function testIsNest(x, y) {
                    if (options.nestWidth == 0 || options.nestHeight == 0) {
                        return false;
                    }
                    if (x >= nest.sx && x <= nest.ex) {
                        if (y >= nest.sy && y <= nest.ey) {
                            return true;
                        }
                    }
                    return false;
                }
                for (let i = 0; i < options.height; i++) {
                    const row = [];
                    for (let j = 0; j < options.width; j++) {
                        row.push(testIsNest(j, i) ? "nest" : Math.random() > options.rockScatter ? Math.random() > .5 ? "roid" : "rock" : "norm");
                    }
                    output.push(row);
                }
                return output;
            }

            module.exports("maps", {
                getBaseShuffling,
                id,
                oddify,
                setup
            });