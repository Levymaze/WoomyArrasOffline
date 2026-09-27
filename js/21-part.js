module.exports("ranked", {
                "MODE": "ffa",
                "serverName": "Ranked 1v1",
                "ROOM_SETUP": [
                    ["roid", "norm", "norm", "norm", "norm"],
                    ["norm", "norm", "norm", "norm", "norm"],
                    ["norm", "norm", "nest", "norm", "norm"],
                    ["norm", "norm", "norm", "norm", "norm"],
                    ["norm", "norm", "norm", "norm", "norm"]
                ],
                "RANKED_BATTLE": true,
                "X_GRID": 5,
                "Y_GRID": 5,
                "WIDTH": 3500,
                "HEIGHT": 3500,
                "BOTS": 0,
                "MAZE": {
                    "width": 16,
                    "height": 16,
                    erosionPattern: {
                        amount: .5,
                        getter: (i, max) => {
                            if (i > max * .7) {
                                return [(Math.random() * 3 | 0), 2];
                            } else if (i > max * .6) {
                                return [Math.random() * 3 | 0, 1];
                            } else {
                                return [(Math.random() * 2 | 0), (Math.random() * 2 | 0) * 2];
                            }
                        }
                    }
                },
                "connectionLimit": 30
            })