module.exports("tdm", {
                "MODE": "tdm",
                "serverName": teams + " TDM",
                "TEAM_AMOUNT": teams,
                "ROOM_SETUP": (function () {
                    const base = setup({
                        width: 12,
                        height: 12,
                        rockScatter: .3,
                        nestWidth: 0,
                        nestHeight: 0
                    });
                    // Draw nest
                    for (let i = 4; i <= 7; i++) {
                        //base[i][4] = base[4][i] = base[8 - i][4] = base[4][8 - i] = "nest";
                        base[4][i] = base[i][4] = base[7][i] = base[i][7] = "nest";
                    }
                    const bases = getBaseShuffling(teams);
                    if (Math.random() > .667) {
                        // Team 1
                        base[0][4] = base[0][7] = id(bases[0], 0);
                        base[0][2] = base[0][3] = base[0][5] = base[0][6] = base[0][8] = base[0][9] = id(bases[0], 1);
                        // Team 2
                        base[4][0] = base[7][0] = id(bases[1], 0);
                        base[2][0] = base[3][0] = base[5][0] = base[6][0] = base[8][0] = base[9][0] = id(bases[1], 1);
                        // Team 3
                        base[11][4] = base[11][7] = id(bases[2], 0);
                        base[11][2] = base[11][3] = base[11][5] = base[11][6] = base[11][8] = base[11][9] = id(bases[2], 1);
                        // Team 4
                        base[4][11] = base[7][11] = id(bases[3], 0);
                        base[2][11] = base[3][11] = base[5][11] = base[6][11] = base[8][11] = base[9][11] = id(bases[3], 1);
                    } else if (Math.random() > .5) {
                        // Team 1
                        base[0][0] = id(bases[0], 0);
                        base[0][1] = base[0][2] = base[1][0] = base[2][0] = id(bases[0], 1);
                        // Team 2
                        base[11][0] = id(bases[1], 0);
                        base[11][1] = base[11][2] = base[10][0] = base[9][0] = id(bases[1], 1);
                        // Team 3
                        base[11][11] = id(bases[2], 0);
                        base[11][10] = base[11][9] = base[10][11] = base[9][11] = id(bases[2], 1);
                        // Team 4
                        base[0][11] = id(bases[3], 0);
                        base[0][10] = base[0][9] = base[1][11] = base[2][11] = id(bases[3], 1);
                    } else {
                        // Team 1
                        base[0][0] = id(bases[0], 0);
                        base[0][1] = base[1][0] = base[1][1] = id(bases[0], 1);
                        // Team 2
                        base[11][11] = id(bases[1], 0);
                        base[11][10] = base[10][11] = base[10][10] = id(bases[1], 1);
                        // Team 3
                        base[11][0] = id(bases[2], 0);
                        base[11][1] = base[10][0] = base[10][1] = id(bases[2], 1);
                        // Team 4
                        base[0][11] = id(bases[3], 0);
                        base[0][10] = base[1][11] = base[1][10] = id(bases[3], 1);
                    }
                    return base;
                })(),
                "X_GRID": 12,
                "Y_GRID": 12,
                "BOTS": 2 * teams
            })