let origin = window.location.href.split("index.html")[0]
let modes = [
    ["2dom", {
        "WIDTH": 5000,
        "HEIGHT": 5000,
        "MODE": "tdm",
        "serverName": "2 TDM Domination",
        "TEAM_AMOUNT": 2,
        "SPAWN_DOMINATORS": true,
        "ROOM_SETUP": [
            ["bas1", "n_b1", "norm", "norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "rock"],
            ["n_b1", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "domi", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "domi", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "rock", "nest", "rock", "roid", "rock", "nest", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "rock", "nest", "rock", "norm", "rock", "nest", "rock", "norm", "norm", "norm", "norm"],
            ["roid", "norm", "roid", "norm", "roid", "nest", "norm", "domi", "norm", "nest", "roid", "norm", "roid", "norm", "roid"],
            ["norm", "norm", "norm", "norm", "rock", "nest", "rock", "norm", "rock", "nest", "rock", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "rock", "nest", "rock", "roid", "rock", "nest", "rock", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "domi", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "domi", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "n_b2"],
            ["rock", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm", "norm", "n_b2", "bas2"]
        ],
        "X_GRID": 15,
        "Y_GRID": 15,
        "BOTS": 39
    }],
    ["2mot", {
        "MODE": "tdm",
        "serverName": "2 TDM Mothership",
        "TEAM_AMOUNT": 2,
        "ROOM_SETUP": [
            ["roid", "norm", "norm", "norm", "rock", "norm", "norm", "norm", "rock", "rock", "norm", "norm", "norm", "rock", "norm", "norm", "norm", "roid"],
            ["norm", "mot1", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock", "norm", "norm", "norm"],
            ["rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "roid", "nest", "nest", "nest", "nest", "roid", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["rock", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "roid", "roid", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "rock"],
            ["rock", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "roid", "roid", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "rock"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "roid", "nest", "nest", "nest", "nest", "roid", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock", "rock"],
            ["norm", "norm", "norm", "rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "mot2", "norm"],
            ["roid", "norm", "norm", "norm", "rock", "norm", "norm", "norm", "rock", "rock", "norm", "norm", "norm", "rock", "norm", "norm", "norm", "roid"]
        ],
        "X_GRID": 18,
        "Y_GRID": 18,
        "BOTS": 39
    }],
    ["2tag", {
        "MODE": "tdm",
        "serverName": "2 TDM Tag",
        "TEAM_AMOUNT": 2,
        "SPAWN_DOMINATORS": true,
        "ROOM_SETUP": [
            ["roid", "rock", "norm", "norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm", "norm", "rock", "roid"],
            ["rock", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "rock"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "rock", "nest", "rock", "roid", "rock", "nest", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "rock", "nest", "rock", "norm", "rock", "nest", "rock", "norm", "norm", "norm", "norm"],
            ["roid", "norm", "roid", "norm", "roid", "nest", "norm", "domi", "norm", "nest", "roid", "norm", "roid", "norm", "roid"],
            ["norm", "norm", "norm", "norm", "rock", "nest", "rock", "norm", "rock", "nest", "rock", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "rock", "nest", "rock", "roid", "rock", "nest", "rock", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["rock", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "rock"],
            ["roid", "rock", "norm", "norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm", "norm", "rock", "roid"]
        ],
        "X_GRID": 15,
        "Y_GRID": 15,
        "WIDTH": 4500,
        "HEIGHT": 4500,
        "BOTS": 39
    }],
    ["4dom", {
        "MODE": "tdm",
        "serverName": "4 TDM Domination",
        "TEAM_AMOUNT": 4,
        "SPAWN_DOMINATORS": true,
        "ROOM_SETUP": [
            ["bas1", "n_b1", "norm", "norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm", "norm", "n_b4", "bas4"],
            ["n_b1", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "n_b4"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "domi", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "rock", "nest", "rock", "roid", "rock", "nest", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "rock", "nest", "rock", "norm", "rock", "nest", "rock", "norm", "norm", "norm", "norm"],
            ["roid", "norm", "domi", "norm", "roid", "nest", "norm", "domi", "norm", "nest", "roid", "norm", "domi", "norm", "roid"],
            ["norm", "norm", "norm", "norm", "rock", "nest", "rock", "norm", "rock", "nest", "rock", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "rock", "nest", "rock", "roid", "rock", "nest", "rock", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "domi", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["n_b3", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "n_b2"],
            ["bas3", "n_b3", "norm", "norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm", "norm", "n_b2", "bas2"]
        ],
        "X_GRID": 15,
        "Y_GRID": 15,
        "BOTS": 39
    }],
    ["4mot", {
        "MODE": "tdm",
        "serverName": "4 TDM Mothership",
        "TEAM_AMOUNT": 4,
        "ROOM_SETUP": [
            ["roid", "norm", "norm", "norm", "rock", "norm", "norm", "norm", "rock", "rock", "norm", "norm", "norm", "rock", "norm", "norm", "norm", "roid"],
            ["norm", "mot1", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "mot4", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock", "norm", "norm", "norm"],
            ["rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "roid", "nest", "nest", "nest", "nest", "roid", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["rock", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "roid", "roid", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "rock"],
            ["rock", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "roid", "roid", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "rock"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "roid", "nest", "nest", "nest", "nest", "roid", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock"],
            ["norm", "norm", "norm", "rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "mot3", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "mot2", "norm"],
            ["roid", "norm", "norm", "norm", "rock", "norm", "norm", "norm", "rock", "rock", "norm", "norm", "norm", "rock", "norm", "norm", "norm", "roid"]
        ],
        "X_GRID": 18,
        "Y_GRID": 18,
        "BOTS": 39
    }],
    ["4tag", {
        "MODE": "tdm",
        "serverName": "4 TDM Tag",
        "TEAM_AMOUNT": 4,
        "SPAWN_DOMINATORS": true,
        "ROOM_SETUP": [
            ["roid", "rock", "norm", "norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm", "norm", "rock", "roid"],
            ["rock", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "rock"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "rock", "nest", "rock", "roid", "rock", "nest", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "rock", "nest", "rock", "norm", "rock", "nest", "rock", "norm", "norm", "norm", "norm"],
            ["roid", "norm", "roid", "norm", "roid", "nest", "norm", "domi", "norm", "nest", "roid", "norm", "roid", "norm", "roid"],
            ["norm", "norm", "norm", "norm", "rock", "nest", "rock", "norm", "rock", "nest", "rock", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "rock", "nest", "rock", "roid", "rock", "nest", "rock", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["rock", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "rock"],
            ["roid", "rock", "norm", "norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm", "norm", "rock", "roid"]
        ],
        "X_GRID": 15,
        "Y_GRID": 15,
        "WIDTH": 4500,
        "HEIGHT": 4500,
        "BOTS": 39
    }],
    ["4tdm", {
        "MODE": "tdm",
        "serverName": "4 TDM",
        "TEAM_AMOUNT": 4,
        "ROOM_SETUP": [
            ["bas1", "n_b1", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "roid", "roid", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "n_b4", "bas4"],
            ["n_b1", "n_b1", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "n_b4", "n_b4"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm"],
            ["roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "nest", "nest", "nest", "nest", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["roid", "norm", "norm", "roid", "norm", "norm", "nest", "nest", "nest", "roid", "norm", "nest", "nest", "nest", "norm", "norm", "roid", "norm", "norm", "roid"],
            ["roid", "norm", "norm", "roid", "norm", "norm", "nest", "nest", "nest", "norm", "roid", "nest", "nest", "nest", "norm", "norm", "roid", "norm", "norm", "roid"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "nest", "nest", "nest", "nest", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid"],
            ["norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "roid", "norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["n_b2", "n_b2", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "n_b3", "n_b3"],
            ["bas2", "n_b2", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "roid", "roid", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "n_b3", "bas3"]
        ],
        "X_GRID": 20,
        "Y_GRID": 20,
        "BOTS": 8
    }],
    ["boss", {
        "MODE": "tdm",
        "serverName": "Boss Rush",
		"SPAWN_DOMINATORS": true,
        "TEAM_AMOUNT": 1,
        "ROOM_SETUP": [
            ["domi", "nest", "rock","norm","norm", "norm", "rock","nest", "domi", "nest","rock", "norm", "norm","norm", "rock", "nest","domi"],
			["nest", "nest", "rock","norm","norm", "norm", "rock","nest", "nest", "nest","rock", "norm", "norm","norm", "rock", "nest","nest"],
			["rock", "rock", "rock","rock","rock", "norm", "rock","rock", "rock", "rock","rock", "norm", "rock","rock", "rock", "rock","rock"],
			["norm", "norm", "rock","domi","rock", "norm", "norm","rock", "spn1", "rock","norm", "norm", "rock","domi", "rock", "norm","norm"],
			["norm", "norm", "rock","rock","rock", "norm", "norm","rock", "rock", "rock","norm", "norm", "rock","rock", "rock", "norm","norm"],
			["norm", "norm", "norm","norm","norm", "norm", "norm","norm", "norm", "norm","norm", "norm", "norm","norm", "norm", "norm","norm"],
			["rock", "rock", "rock","norm","norm", "norm", "roid","roid", "roid", "roid","roid", "norm", "norm","norm", "rock", "rock","rock"],
			["nest", "nest", "rock","rock","rock", "norm", "roid","spn1", "spn1", "spn1","roid", "norm", "rock","rock", "rock", "nest","nest"],
            ["domi", "nest", "rock","spn1","rock", "norm", "roid","spn1", "spn1", "spn1","roid", "norm", "rock","spn1", "rock", "nest","domi"],
			["nest", "nest", "rock","rock","rock", "norm", "roid","spn1", "spn1", "spn1","roid", "norm", "rock","rock", "rock", "nest","nest"],
			["rock", "rock", "rock","norm","norm", "norm", "roid","roid", "roid", "roid","roid", "norm", "norm","norm", "rock", "rock","rock"],
			["norm", "norm", "norm","norm","norm", "norm", "norm","norm", "norm", "norm","norm", "norm", "norm","norm", "norm", "norm","norm"],
			["norm", "norm", "rock","rock","rock", "norm", "norm","rock", "rock", "rock","norm", "norm", "rock","rock", "rock", "norm","norm"],
			["norm", "norm", "rock","domi","rock", "norm", "norm","rock", "spn1", "rock","norm", "norm", "rock","domi", "rock", "norm","norm"],
			["rock", "rock", "rock","rock","rock", "norm", "rock","rock", "rock", "rock","rock", "norm", "rock","rock", "rock", "rock","rock"],
			["nest", "nest", "rock","norm","norm", "norm", "rock","nest", "nest", "nest","rock", "norm", "norm","norm", "rock", "nest","nest"],
			["domi", "nest", "rock","norm","norm", "norm", "rock","nest", "domi", "nest","rock", "norm", "norm","norm", "rock", "nest","domi"]
        ],
        "X_GRID": 17,
        "Y_GRID": 17,
        "BOTS": 34
    }],
    ["carrierBattle", {
        "MODE": "tdm",
        "serverName": "Carrier Battle",
        "connectionLimit": 15,
        "TEAM_AMOUNT": 2,
        "SPAWN_DOMINATORS": true,
        "WIDTH": 10000,
        "HEIGHT": 10000,
        "ROOM_SETUP": [
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "spn1", "spn1", "spn1", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "spn1", "spn1", "spn1", "norm", "norm", "norm", "norm", "domi", "domi", "norm", "norm", "norm", "norm", "norm", "domi", "norm", "norm"],
            ["norm", "spn1", "spn1", "spn1", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "domi", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "domi", "domi", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "domi", "norm", "norm", "nest", "nest", "domi", "nest", "nest", "domi", "nest", "nest", "norm", "norm", "domi", "norm", "norm"],
            ["norm", "norm", "domi", "norm", "norm", "nest", "nest", "domi", "nest", "nest", "domi", "nest", "nest", "norm", "norm", "domi", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "domi", "domi", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "domi", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "spn2", "spn2", "spn2", "norm"],
            ["norm", "norm", "domi", "norm", "norm", "norm", "norm", "norm", "domi", "domi", "norm", "norm", "norm", "norm", "spn2", "spn2", "spn2", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "spn2", "spn2", "spn2", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"]
        ],
        "X_GRID": 18,
        "Y_GRID": 18,
        "BOTS": 39
    }],
    ["crptTanks", {
        "WIDTH": 5000,
        "HEIGHT": 5000,
        "connectionLimit": 20,
        "MODE": "ffa",
        "serverName": "Corrupted Tanks",
        "ROOM_SETUP": [
            ["roid", "norm", "norm", "norm", "rock", "norm", "norm", "norm", "rock", "rock", "norm", "norm", "norm", "rock", "norm", "norm", "norm", "roid"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock", "norm", "norm", "norm"],
            ["rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "roid", "nest", "nest", "nest", "nest", "roid", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["rock", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "roid", "roid", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "rock"],
            ["rock", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "roid", "roid", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "rock"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "roid", "nest", "nest", "nest", "nest", "roid", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock"],
            ["norm", "norm", "norm", "rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["roid", "norm", "norm", "norm", "rock", "norm", "norm", "norm", "rock", "rock", "norm", "norm", "norm", "rock", "norm", "norm", "norm", "roid"]
        ],
        "X_GRID": 18,
        "Y_GRID": 18,
        "BOTS": 0
    }],
    ["dev", {
        "maxPlayers": 20,
        "BETA": 1,
        "WIDTH": 7500,
        "HEIGHT": 7500,
        "serverName": "Developer Server",
        "RANDOM_COLORS": false,
        "BOTS": 20,
        "IS_DEV_SERVER": true
    }],
    ["ffa", {
        "MODE": "ffa",
        "serverName": "Free For All",
        "ROOM_SETUP": [
            ["roid", "norm", "norm", "norm", "rock", "norm", "norm", "norm", "rock", "rock", "norm", "norm", "norm", "rock", "norm", "norm", "norm", "roid"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock", "norm", "norm", "norm"],
            ["rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "roid", "nest", "nest", "nest", "nest", "roid", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["rock", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "roid", "roid", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "rock"],
            ["rock", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "roid", "roid", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "rock"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "roid", "nest", "nest", "nest", "nest", "roid", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock"],
            ["norm", "norm", "norm", "rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["roid", "norm", "norm", "norm", "rock", "norm", "norm", "norm", "rock", "rock", "norm", "norm", "norm", "rock", "norm", "norm", "norm", "roid"]
        ],
        "X_GRID": 18,
        "Y_GRID": 18,
        "BOTS": 39
    }],
    ["brawlffaSmall", {
        "MODE": "ffa",
        "serverName": "Brawl Small",
        "ROOM_SETUP": [
            ["nest","nest","nest","nest","nest"],
            ["nest","nest","nest","nest","nest"],
            ["nest","nest","nest","nest","nest"],
            ["nest","nest","nest","nest","nest"],
            ["nest","nest","nest","nest","nest"]
        ],
        "X_GRID": 5,
        "Y_GRID": 5,
        "WIDTH": 2500,
        "HEIGHT": 2500,
        "BOTS": 39
    }],
    ["brawlffaLarge", {
        "MODE": "ffa",
        "serverName": "Brawl Large",
        "ROOM_SETUP": [
            ["nest","nest","nest","nest","nest", "nest", "nest"],
            ["nest","roid","nest","nest","nest", "roid", "nest"],
            ["nest","nest","nest","nest","nest", "nest", "nest"],
            ["nest","nest","nest","roid","nest", "nest", "nest"],
            ["nest","nest","nest","nest","nest", "nest", "nest"],
            ["nest","roid","nest","nest","nest", "roid", "nest"],
            ["nest","nest","nest","nest","nest", "nest", "nest"]
        ],
        "X_GRID": 7,
        "Y_GRID": 7,
        "WIDTH": 5000,
        "HEIGHT": 5000,
        "BOTS": 39
    }],
    ["longHallway", {
        "MODE": "ffa",
        "serverName": "Long Hallway",
        "ROOM_SETUP": [
            ["nest","nest","nest","roid","nest", "nest", "nest"]
        ],
        "X_GRID": 7,
        "Y_GRID": 1,
        "WIDTH": 7000,
        "HEIGHT": 1000,
        "BOTS": 39
    }],
    ["rockHell", {
        "MODE": "ffa",
        "serverName": "Rock Hell",
        "ROOM_SETUP": [
            ["roid","roid"],
            ["roid","roid"]
        ],
        "X_GRID": 2,
        "Y_GRID": 2,
        "WIDTH": 2500,
        "HEIGHT": 2500,
        "BOTS": 27
    }],
    ["2skrim", {
        "MODE": "tdm",
        "serverName": "2TDM Skrimish",
        "TEAM_AMOUNT": 2,
        "ROOM_SETUP": [
            ["spn1","nest","nest","nest","nest","nest","nest"],
            ["nest","nest","nest","nest","nest","nest","nest"],
            ["nest","nest","nest","nest","nest","nest","nest"],
            ["nest","nest","nest","nest","nest","nest","nest"],
            ["nest","nest","nest","nest","nest","nest","nest"],
            ["nest","nest","nest","nest","nest","nest","nest"],
            ["nest","nest","nest","nest","nest","nest","spn2"]
            ],
        "X_GRID": 7,
        "Y_GRID": 7,
        "WIDTH": 2500,
        "HEIGHT": 2500,
        "BOTS": 39
    }],
    ["4skrim", {
        "MODE": "tdm",
        "serverName": "2TDM Skrimish",
        "TEAM_AMOUNT": 4,
        "ROOM_SETUP": [
            ["spn1","nest","nest","nest","nest","nest","spn4"],
            ["nest","nest","nest","nest","nest","nest","nest"],
            ["nest","nest","nest","nest","nest","nest","nest"],
            ["nest","nest","nest","nest","nest","nest","nest"],
            ["nest","nest","nest","nest","nest","nest","nest"],
            ["nest","nest","nest","nest","nest","nest","nest"],
            ["spn3","nest","nest","nest","nest","nest","spn2"]
            ],
        "X_GRID": 7,
        "Y_GRID": 7,
        "WIDTH": 2500,
        "HEIGHT": 2500,
        "BOTS": 39
    }],
    ["p2mot", {
        "MODE": "tdm",
        "serverName": "Portal Mothership",
        "TEAM_AMOUNT": 2,
        "WIDTH": 10800,
        "HEIGHT": 4680,
        "ROOM_SETUP": [
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "mot1", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "nest", "nest", "port", "nest", "nest", "norm", "norm", "norm", "norm", "edge", "edge", "edge", "edge", "norm", "norm", "norm", "norm", "nest", "nest", "port", "nest", "nest", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "mot2", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"]
        ],
        "X_GRID": 30,
        "Y_GRID": 13,
        "BOTS": 39,
        "PORTALS": {
            "ENABLED": true,
            "THRESHOLD": 500,
            "LAUNCH_FORCE": 500,
            "GRAVITY": 20000,
            "DIVIDER_1": {
                "ENABLED": true,
                "LEFT": 4860,
                "RIGHT": 5940
            },
            "DIVIDER_2": {
                "ENABLED": false
            }
        }
    }],
    ["pffa", {
        "MODE": "ffa",
        "serverName": "Portal FFA",
        "PORTALS": {
            "ENABLED": true,
            "THRESHOLD": 500,
            "LAUNCH_FORCE": 500,
            "GRAVITY": 20000,
            "DIVIDER_1": {
                "ENABLED": true,
                "LEFT": 3666.6666666666665,
                "RIGHT": 4333.333333333333
            },
            "DIVIDER_2": {
                "ENABLED": true,
                "TOP": 3666.6666666666665,
                "BOTTOM": 4333.333333333333
            }
        },
        "WIDTH": 8000,
        "HEIGHT": 8000,
        "ROOM_SETUP": [
            ["rock", "norm", "norm", "norm", "rock", "rock", "rock", "norm", "norm", "roid", "norm", "edge", "edge", "roid", "norm", "norm", "norm", "rock", "rock", "rock", "norm", "norm", "norm", "rock"],
            ["norm", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["rock", "norm", "norm", "norm", "nest", "nest", "nest", "norm", "norm", "rock", "norm", "edge", "edge", "rock", "norm", "norm", "norm", "nest", "nest", "nest", "norm", "norm", "norm", "rock"],
            ["rock", "norm", "norm", "norm", "nest", "port", "nest", "norm", "norm", "rock", "norm", "edge", "edge", "rock", "norm", "norm", "norm", "nest", "port", "nest", "norm", "norm", "norm", "rock"],
            ["rock", "norm", "norm", "norm", "nest", "nest", "nest", "norm", "norm", "rock", "norm", "edge", "edge", "rock", "norm", "norm", "norm", "nest", "nest", "nest", "norm", "norm", "norm", "rock"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["roid", "norm", "norm", "norm", "rock", "rock", "rock", "norm", "norm", "roid", "norm", "edge", "edge", "roid", "norm", "norm", "norm", "rock", "rock", "rock", "norm", "norm", "norm", "roid"],
            ["edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge"],
            ["edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge"],
            ["roid", "norm", "norm", "norm", "rock", "rock", "rock", "norm", "norm", "roid", "norm", "edge", "edge", "roid", "norm", "norm", "norm", "rock", "rock", "rock", "norm", "norm", "norm", "roid"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["rock", "norm", "norm", "norm", "nest", "nest", "nest", "norm", "norm", "rock", "norm", "edge", "edge", "rock", "norm", "norm", "norm", "nest", "nest", "nest", "norm", "norm", "norm", "rock"],
            ["rock", "norm", "norm", "norm", "nest", "port", "nest", "norm", "norm", "rock", "norm", "edge", "edge", "rock", "norm", "norm", "norm", "nest", "port", "nest", "norm", "norm", "norm", "rock"],
            ["rock", "norm", "norm", "norm", "nest", "nest", "nest", "norm", "norm", "rock", "norm", "edge", "edge", "rock", "norm", "norm", "norm", "nest", "nest", "nest", "norm", "norm", "norm", "rock"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
            ["norm", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "edge", "edge", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "norm"],
            ["rock", "norm", "norm", "norm", "rock", "rock", "rock", "norm", "norm", "roid", "norm", "edge", "edge", "roid", "norm", "norm", "norm", "rock", "rock", "rock", "norm", "norm", "norm", "rock"]
        ],
        "X_GRID": 24,
        "Y_GRID": 24,
        "BOTS": 5
    }]
]
const cloneModeConfig = (mode) => JSON.parse(JSON.stringify(mode[1]));
const applyGrowthDefaults = (cfg) => {
    cfg.GROWTH_MODE = true;
    cfg.testingMode = false;
    cfg.modelMode = false;
    cfg.BOTS = Math.max(24, Number(cfg.BOTS || 0));
    return cfg;
};
const growthBaseMode =
    modes.find((entry => entry[1] && entry[1].serverName === "Free For All")) ||
    modes.find((entry => entry[1] && "ffa" === entry[1].MODE)) ||
    modes[0];
if (growthBaseMode) {
    const growthConfig = applyGrowthDefaults(cloneModeConfig(growthBaseMode));
    growthConfig.serverName = "Growth";
    growthConfig.MODE = "ffa";
    modes.push(["growth", growthConfig]);
}
const bossBaseMode = modes.find((entry) => entry[0] === "boss");
if (bossBaseMode) {
    const growthBossConfig = applyGrowthDefaults(cloneModeConfig(bossBaseMode));
    growthBossConfig.serverName = "Growth Siege (Boss Rush)";
    modes.push(["growthboss", growthBossConfig]);
    modes.push(["growthsiege", JSON.parse(JSON.stringify(growthBossConfig))]);
    modes.push(["growthseige", JSON.parse(JSON.stringify(growthBossConfig))]);
}
const mazeBaseMode =
    modes.find(
        (entry) =>
            entry[1] &&
            "ffa" === entry[1].MODE &&
            entry[1].MAZE &&
            entry[1].MAZE.ENABLED
    ) || growthBaseMode;
if (mazeBaseMode) {
    const growthMazeConfig = applyGrowthDefaults(cloneModeConfig(mazeBaseMode));
    growthMazeConfig.serverName = "Growth Maze";
    growthMazeConfig.MODE = "ffa";
    growthMazeConfig.MAZE = Object.assign({}, growthMazeConfig.MAZE || {}, {
        ENABLED: true,
    });
    modes.push(["growthmaze", growthMazeConfig]);
}
const tdmBaseMode =
    modes.find((entry) => entry[0] === "4tdm") ||
    modes.find((entry) => entry[1] && "tdm" === entry[1].MODE);
if (tdmBaseMode) {
    const growthTdmConfig = applyGrowthDefaults(cloneModeConfig(tdmBaseMode));
    growthTdmConfig.serverName = "Growth TDM";
    growthTdmConfig.MODE = "tdm";
    growthTdmConfig.TEAM_AMOUNT = Math.max(2, Number(growthTdmConfig.TEAM_AMOUNT || 0));
    modes.push(["growthtdm", growthTdmConfig]);
}
for(let mode of modes){
    module.exports("config-"+mode[0], mode[1])
}

const config = {
    "host": "0.0.0.0",
    "servesStatic": true,
    "mockupChunkLength": 200,
    "port": 3001,
    "restarts": {
        "enabled": true,
        "interval": 14400
    },
    "networkUpdateFactor": 24,
    "socketWarningLimit": 5,
    "tabLimit": 2,
    "maxPlayers": 30,
    "BETA": 0,
    "networkFrontlog": 1,
    "networkFallbackTime": 150,
    "visibleListInterval": 250,
    "gameSpeed": 1,
    "runSpeed": 1.5,
    "maxHeartbeatInterval": 360000,
    "verbose": true,
    "enableBot": false,
    "botPrefix": "$",
    "WIDTH": 6500,
    "HEIGHT": 6500,
    "connectionLimit": 30,
    "MODE": "ffa",
    "serverName": "Free For All",
    "TEAM_AMOUNT": 2,
    "RANDOM_COLORS": false,
    "BOSS_SPAWN_TIMER": 2000,
    "PORTALS": {
        "ENABLED": false,
        "TANK_FORCE": 3000,
        "TANK_DAMP": 4000,
        "BOSS_FORCE": 12500,
        "DIVIDER_1": {
            "ENABLED": true,
            "LEFT": 2979,
            "RIGHT": 3521
        },
        "DIVIDER_2": {
            "ENABLED": true,
            "TOP": 2979,
            "BOTTOM": 3521
        }
    },
    "MAZE": {
        "ENABLED": false
    },
    "BANNED_CHARACTER_REGEX": "/[\uFDFD\u200E\u0000]/gi",
    "ROOM_SETUP": [
        ["roid", "norm", "norm", "norm", "rock", "norm", "norm", "norm", "rock", "rock", "norm", "norm", "norm", "rock", "norm", "norm", "norm", "roid"],
        ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
        ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
        ["norm", "norm", "norm", "rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock", "norm", "norm", "norm"],
        ["rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock"],
        ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
        ["norm", "norm", "norm", "norm", "norm", "norm", "roid", "nest", "nest", "nest", "nest", "roid", "norm", "norm", "norm", "norm", "norm", "norm"],
        ["norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm"],
        ["rock", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "roid", "roid", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "rock"],
        ["rock", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "roid", "roid", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "rock"],
        ["norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm"],
        ["norm", "norm", "norm", "norm", "norm", "norm", "roid", "nest", "nest", "nest", "nest", "roid", "norm", "norm", "norm", "norm", "norm", "norm"],
        ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
        ["rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock"],
        ["norm", "norm", "norm", "rock", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "rock", "norm", "norm", "norm"],
        ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
        ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
        ["roid", "norm", "norm", "norm", "rock", "norm", "norm", "norm", "rock", "rock", "norm", "norm", "norm", "rock", "norm", "norm", "norm", "roid"]
    ],
    "X_GRID": 18,
    "Y_GRID": 18,
    "DAMAGE_CONSTANT": 0.75,
    "KNOCKBACK_CONSTANT": 1.5,
    "BORDER_FORCE": 0.01,
    "FOOD": [0, 0.75, 0.22, 0.1, 0.005, 0, 0, 0, 0, 0, 0, 0],
    "FOOD_NEST": [0, 0.0, 0.0, 0.75, 0.5, 0.3, 0.1, 0.025, 0.005, 0.001],
    "MAX_SKILL": 9,
    "SOFT_MAX_SKILL": 0.59,
    "REGEN_MULTIPLIER": 0.45,
    "TIER_1": 15,
    "TIER_2": 30,
    "TIER_3": 45,
    "TIER_4": 60,
    "SKILL_CAP": 60,
    "SKILL_SOFT_CAP": 0,
    "SKILL_CHEAT_CAP": 60,
    "SKILL_LEAK": 0,
    "STEALTH": 4,
    "MIN_SPEED": 0.001,
    "MIN_DAMAGE": 0,
    "FOOD_AMOUNT": 0.2,
    "SKILL_BOOST": 5,
    "BOTS": 10,
    "GLASS_HEALTH_FACTOR": 1.8,
    "DO_BASE_DAMAGE": true,
    "commandParsing": false,
    "liveTankEditor": true
}
module.exports("config.json", config)