module.exports("twfr", {
                "MODE": "tdm",
                "serverName": "Trench Warfare",
                "TEAM_AMOUNT": 2,
				"BOTS": 39,
                "MODE": "tdm",
                "WIDTH": 6500,
                "HEIGHT": 6500,
                "X_GRID": 32,
                "Y_GRID": 32,
                "MAZE": {
                    "ENABLED": true,
                    mapString: `
            --------------------------------
            -##############################-
            -#----------------------------#-
            -#----------------------------#-
            -#----------------------------#-
            -#----------------------------#-
            -#----------------------------#-
            -#----------------------------#-
            -#----------------------------#-
            -#----------------------------#-
            -#----------------------------#-
            -#----------------------------#-
            -#----------------------------#-
            -#----------------------------#-
            -#----------------------------#-
            -#@@@@@@@@@@@@@@@@@@@@@-@@-@@@#-
            -#@@------------@@@@@##-##-@@@#-
            -#@@-@@@@@@#-#@-@@@@@#---#-@@@#-
            -#@@-@@@@@@###@-@@@@@#---#-@@@#-
            -#@@-@@-@@@@@@@-@@@@@@@@@@-@@@#-
            -#@@-@@-@@#####-#@@@###@@@-@@@#-
            -#@@-@@-@@#-----#@@@#-#@@@-@@@#-
            -#@@-@@-@@#-----#@@@#-#@---@@@#-
            -#@@-@@-@@#######@@@#-#@-####-#-
            -#@----------@@@@@@@#-#@------#-
            -#@-######@@-@@@@@@@#----#@---#-
            -#@--@---#@@-@@@@@@@###@@######-
            -##@---###@@-@@-------#@@##---#-
            -####-#@@@@@-@@-@@@-######----#-
            -#----#@@@@@----@@@-----------#-
            -##############################-
            --------------------------------
            `,
                    erosionPattern: {
                        amount: .15,
                        getter: (i, max) => {
                            if (i > max * .8) {
                                return [(Math.random() * 3 | 0), 2];
                            } else if (i > max * .7) {
                                return [Math.random() * 3 | 0, 1];
                            } else {
                                return [(Math.random() * 2 | 0), (Math.random() * 2 | 0) * 2];
                            }
                        }
                    }
                },
                "ROOM_SETUP": [
                    ["outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "bas1", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "dom2", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "dom2", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "dom2", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "dom2", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "dom2", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "dom2", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "dom2", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "dom2", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "norm", "dom2", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "door", "norm", "norm", "norm", "norm", "norm", "norm", "bas2", "norm", "outb"],
                    ["outb", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "outb"],
                    ["outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb", "outb"]
                ],
                "DO_BASE_DAMAGE": false,
                "TRENCH_WARFARE": true,
                "BOTS": 6
            })