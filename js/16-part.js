/*jslint node: true */
"use strict";

// Seed math

const random = x => {
    return x * Math.random();
};

const randomAngle = () => {
    return Math.PI * 2 * Math.random();
};

let randomRange = (min, max) => {
    return Math.random() * (max - min) + min;
};

let irandom = i => {
    let max = i | 0;
    return (Math.random() * (max + 1)) | 0; //Inclusive
};

let irandomRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Inclusive
};

let gauss = (mean, deviation) => {
    let x1, x2, w;
    let i = 5;
    do {
        x1 = 2 * Math.random() - 1;
        x2 = 2 * Math.random() - 1;
        w = x1 * x1 + x2 * x2;
        i--;
    } while ((0 == w || w >= 1) && i > 0);

    w = Math.sqrt(-2 * Math.log(w) / w);
    return mean + deviation * x1 * w;
};

let gaussInverse = (min, max, clustering) => {
    let range = max - min;
    let output = gauss(0, range / clustering);
    let i = 3;
    while (output < 0 && i > 0) {
        output += range;
        i--;
    }
    i = 3;
    while (output > range && i > 0) {
        output -= range;
        i--;
    }

    return output + min;
};

let gaussRing = (radius, clustering) => {
    let r = random(Math.PI * 2);
    let d = gauss(radius, radius * clustering);
    return {
        x: d * Math.cos(r),
        y: d * Math.sin(r),
    };
};

let chance = prob => {
    return random(1) < prob;
};

let dice = sides => {
    return random(sides) < 1;
};

let choose = arr => {
    return arr[irandom(arr.length - 1)];
};

let chooseN = (arr, n) => {
    let o = [];
    for (let i = 0; i < n; i++) {
        o.push(arr.splice(irandom(arr.length - 1), 1)[0]);
    }
    return o;
};

let chooseChance = (...arg) => {
    let totalProb = 0;
    arg.forEach(function (value) { totalProb += value; });
    let answer = random(totalProb);
    for (let i = 0; i < arg.length; i++) {
        if (answer < arg[i]) return i;
        answer -= arg[i];
    }
};

const botNames = [];
"That Guy\nSOMEONE\nê§à¼ºð“˜ð“·ð“¼ð“ªð“·ð“²ð“½ð”‚à¼»ê§‚\nðŸ…¸ ðŸ…°ðŸ…¼ ðŸ…¶ðŸ…¾ðŸ…³\nI\njaffa calling\nIll Tear your eyes out..\nMe-arac\nAniketos\nðŸŒŒMiÃ±eðŸŒŒ\nâ„­ð”¬ð”£ð”£ð”¢ð”¢\nAkilina\nMythical\nexc\n=\no o o o o o o o\n!!!\nLixeiro do mal\nThanks M8\nFrost? Mobile\nDream\nWe Do A Little Trolling\nearth\nNightFire\nFree to insult\ndino\nAMOGUS??????????????\nbruh\n\nNo Surviors\n<[AXS]> RASHOT\nPizza Bread\n[lag]Armando\nGay Overlord\nwillim\nEverything RAM Mobile\nGeneral\nHÌµÍŠÌ•eÌµÌ‡Ì®lÌ·Í„ÍŽlÌµÌ…Í›oÌ¸ÍŠÌ›\n{WOF} Nightwing\nfooteloka\n[âš”ï¸wiki]â‚µâ‚³Vâ‚³â± Å‚É†â±¤\nJes;/;ter\nTeam Boom\nðŸ–¤ISAACðŸ–¤\nnaruto\nÐ·Ð°Ð½ÑÑ‚Ð¾42/Busybody42\nA+\nRaul39\nLety <3 :)\nteam protect\ni will troll :D\nim a dev\nheroy_105\n[FBI]Î£viâ‚ºâ„­â„á¼â€â‚´#1628\nBigBadBoom\nnope\nglurip\nffk the desrtroy\nSpin=Team\ncomrade\nAlkali\nImpact of TY-77\nðŸ˜ˆStormys DomainðŸ˜ˆ\nYOUR BAD = YOUR DEAD!!!\npushmetothe sancuary\nIm not a tank\nSnow\nHm\nDanceTillYou'reDead\ngmonster\nDie!!!\ndeveloper\nnoob\nzX-TwinChilla-Xz\n[BK] [XC] PAKISTAN\nBryson\nMusaâ™— - The Shipwrecker\nbob\nMothership Drone\nt-rex vs raptor\nmai\nArisu\ngamer.io\nRÄ°KKET FAN\nFOLLOW ME OCTO TANKS\nXP_Toxic_CJS\nTV\nconstructor\namong us\njkl\nXP_Toxic_CST\nd\nI love nahu\n\nXxNicolas GamerxX\nxAd_rian\nFabianTu\nEminx\nmax\nOOOOOOOOFfffffffffffffff\nWalleeE\n KA2\nMIKE\npedro :(\nBEDROCK\nFrostbite#6915\nkoishi\neu tenho a melhor mae^-^\nasdfghjkl;:]@ouytrewq\nðŸ˜ŽðŸ‘¿david988ðŸ˜ŽðŸ‘¿\nZaphkiel\ntryhard mode on !!!!!!!\nâš°ï¸ðŸ”¥ðŸ‘»WITNESS MEðŸ‘»ðŸ”¥âš°ï¸\n[Î£Ï°][Î©Ï°] ...\nThat Guy\nAniketos\nPlay wommy-arras.io\nARMADA\n// jAX\nðŸ”±Æ‘Î¹ÑÑ”Ï‰ÏƒÑÐºðŸš«\nDEATH TO TEAMERS\nMilan\nyour worst lightmare\nXxshadowxX Ilove u\nAlkaios\n ðŸ¥§Ï€ðŸ¥§\nðŸ”± ð“½ð“²ð“¶ð“®ð“½ð“¸ð“­ð“²ð“® ðŸš«\nCan u see me? :D\nApollon\nok\nCrazyattacker9YT\nXtremeJoan\ncz sk\ngive me your butt dude\n[ðŸŒ€]Brainð¼nHalf\nHexagon Temple\n-_-\nYou\nCACA\nAthena\nArtemis\nDOEBLE TOP!\nthe only one\nhi (original)\nSOMEONE\ncan you beat me smashey\ns7ã…‹ã…‹ã…‹\npika :P\nFallen\nBig Papa\nmÌ¸ÌÌ½áµƒð”­ÊŸâ‚‘à±ªðŸŒ¸ðŸŽ€ðŸŒºðŸŒ·ðŸ©°ðŸ§\nGONIALS\nÐ¿Ñ€Ñ–Ð²Ñ–Ñ‚\nlnwZa007\nðŸ¸ðŸŒã€HapPyã€‘\nDaluns the one?\nCAMALEON\nfactory not op :(\n/BIG BOYRockety\ncircus of the dead\nð’®ð”­00ð”¡ð”¢ð”¯ð”ªð”žð”«\nhackercool\nðŸ”±â¨Š $Ø‹â‚²â‚¥â‚³ðŸš«\nGo Away\nProtector Of Worlds\nme\nvn\nRAHAN\n........................\nSoviet Union\nFlash\nâ°ðž‘ðž¡ðž£â± ð™ð¼ð´ð¶ð˜‚ð´\nðŸŒŒMiÃ±eðŸŒŒ\nKing Pikachu\nEzzeKiel\nh\nHomeless man\nAsdfghjkjjhgfdsdfghjhgfd\nFelchas\nstarwarrior\nSpin=Team\nTERA BAAPâœ¿AYAâ˜…ðŸ’“Bhagwanmr noob\nDream\nDIEGO\nLagmat YT = ðŸŽ· channel\nbe dum like me\nlagg\nAPplayer113\ntiky\nðŸ‡§ðŸ‡·HUEðŸ‡§ðŸ‡·\nam low, I Need Backup!\nThunder(Tapenty)\nBeeg Yoshi Squad\nreeeeeeee\n;]\nArena Closer\nabd lhalim\nBadaracco\nemir\nTÃ¼rk  polisi\nPaladin\nstop plz\nd\n(âÂ´â—¡`â)(*/Ï‰ï¼¼*)(^///^):-)\nglenn <3 rachel\n[AI] Kidell\ndan\nI am milk\nTÃ¼rk'Ã¼n GÃ¼cÃ¼ AdÄ±naðŸŒ¸ OwO\nÒ‰sÒ‰hÒ‰uÒ‰nÒ‰aÒ‰\nTeuge\nDave\nabbi_alin\nim a joke\nhuy vn :D\nðŸŒŠðŸ¦ˆðŸŒŠ\nscortt reach 1m friend\nET\nvlasta\nð’°ð’žâ„‹Ä°â„‹ð’œ\nNyroca\nGerman\n[É¨Æ™]É³Ã¸Ê˜É—É«Éš\nI'm so lag(sinbadx)\nðŸ‡¸ðŸ‡¦\nasdf\nXâ„˜ExÍ¥plÍ£oÍ«àº®áŽ¥veï¾‚âœ”\nApollon\n^^\nI\nnatasha\nno me mates amigos\ndÃ¡wsda\nFEWWW....\nlol\nA team with ðŸ’š is doomed\nRaul39\nNoob AC\nddqdqwdqw\n[MG] GLITCH TR\nLemonTea\nParty_CZE\nDiep_daodan\nWhat?\nkuro\ncute pet\ndemon\nALEXANDERðŸ‘‘ðŸ’Ž\nCursed\ncopy The tank\n\ndsa.\nVinh HD\nMago\nhi UwU\navn\nd\nnaruto\nARRASMONSTER KILLYOUha5x\nMICAH\nJotaro\nking vn\nð•°ð–“ð–Šð–’ð–ž_ð•¯ð–”ð–Œ\nRaoof\nLeviathan\nSUN\nâ¬â˜¬â­  âšœï¸Ãð™ð• ãƒƒ ã€œ ðŸŒ·\nFALLEN SWORD\nðŸ‡§ðŸ‡·HUEðŸ‡§ðŸ‡·\nBoyFriend [FnF]\nmotherhip\nð“¼ð“®ð“»ð“²ð“¸ð“¾ð“¼ð“µð”‚\nlolera\nDark Devil\npress F\nDetective Conan\nPet\nMAICROFT\nHoly\nIXGAMÃ‹SS\nh\numm,dab?\nIhavelocty\newqasd2021vinicius\n[ðŸ‡»ðŸ‡³] HÃ¹ng\nI Love you\nHealer\nhacker lololololol\nboooster.io\ndscem\nbibi\nTEAM POLICE\n\njj\nSHARK\narena closer\nâ€¢é•¿Ä…Ï®Ã«Ä…â„“â€á¶œáµ˜áµ—áµ‰â•° â€¿ â•¯ â˜‚\nWeÑwð•–ð‘ÏŽâ‚¬Ñð“ºq2ï¸âƒ£prankeo\nnani?\nOTTOMAN EMPÄ°RE\n------------------------\nkr9ssy\nnot P\nwinnner\nfriendly\ngenocide BBB\nHI\nI'm poor:(fortnine duo\nJSABJSAB\njmanplays\nstarwarrior\nwere\nPLAYER\nmothership protrector 1\nGamerðŸŽ®\n6109\nPRO\nenr\n_____P___E___N___E______\nannialator\nkaio\n(UwU)\nArras.io\n...\nDenied\nPaladin\nZaphkiel\nPikachu ^~^\nah~\nSteve\n{<:Void\nAÆ“ AÎ·gÑ”â„“#Use AÆ“  Tag\nAmyntas\nâ„â€¢â„Ï‰â„â€¢â„å¡æ¯”ç¸ðŸ–¤\npoui\nPH - rÒ‰aÒ‰iÒ‰nÒ‰\nA M O U G U S\nidk bro\nArtemis\nHey team\nb Tè¦Rã„©IesçŸ©W Ë‹*ËŠd\ní•œêµ­ Lime Lemon\nphong fan vn!\nme fan valt shu lui free\nMobile no work\nHi é¦™æ¸¯ðŸ˜˜> pls don't killï¿½\n[/G]/O1D SL/Y3R\nmil leches\nMajor Meowzer YT\nProvidence\nLore\nÐžÐ¥ÐžÐ¢ÐÐ˜Ðš\nvordt\nLinghtning McQueen\nPentagon Nest Miner\nê§â˜¬â˜¬ðŸ˜ˆê§ê§‚ â˜ HARSH â˜ ê§ê§‚ðŸ˜ˆ â˜¬â˜¬ê§‚\nvovotthh\nNope :))\n||||||||||||||||||||||||\n ê§â„¤ð•–ð”±ð”¥ð”¢ð”¯ð”«ð•šð•’ê§‚\nCTRL+W=godmode(viet nam)\nðŸ”±LordÎ›à¸ ð“°ð–‘É†ðŸš«\n1 + 1 = 3\nXYZ\n[PFF][|| Ä±'É± áƒªÄ…áƒªáƒ§||]\nBoop\nRAPTURE\no\n/.//.[]\n\nRoskarya\nno. 9\nLost MvP#7777\nJon\nðŸ”±Saint LilYâšœðŸš«\nGreen.grey.purple.blue.\n:P\nC - 4 Spank Spank\nVN\nSnapwingfriendstriker007\noverlord is:):)\n plussäº—\n[Repsaj]ÄŽÄ…Å—Ä¸MÃ£ÅŸtÉ›É¾\nPhoenix_Gamer\nRelatively Harmless Tonk\nArray.io\nSpin=Team\nI am your shield :)\nj\n1\nTheBasil\nã€The L1litle Oneã€‘\nX.Clamator .YT\nENDERMÃ‰N\nCC\nBEST\nAmong Us\nlobo\nasky\nOpan Come Go Note Yeah\nBowler\nad\nhaha bowler no 1M\nTin\n[GZ]GESETA\nwoomy arras.io\nRemuru Tempest\nPvPok\nScarlet Rage(mobile)\nnam\nSTRIKER007\n[VN] MeltedGirl\n100000000000000000000000\neee\nQ\nmáº¯m tÃ´m\nREVENGEâœ¨\nAchi\nAC PerÃº\nbvnfgh\nhi\nPet :3\nlittle bitch\nkhang\nlets be freinds guys!!!!\nsans pro\nphantanduy\n[AC] VGamerZ\nStevenUniverseFan\nazen\nWaffles\njesian\nâ±«Å‚â‚­â±¤Å‚â‚®â‚³Ó¾\nGay Overlord\npikachuboi124\nmundo x bomb\nducky\nðŸŒ€DESTROYERðŸŒ€\nStupid Overlord\n++\nphantantri\nVoteOutRacists\nDenied\nfloof\nBowler\nSinbadx\nðŸŽˆITðŸŽˆ APOCOLYPSE\nExpectMe2BeDeadCuzOfLag\nDamage\nAniketos\nâ¨âˆ‘â‚®Î¾â‚¹Í¶Î›Lâ¨\nArtemis\n_\nArchimedes\nâ™ªKINGâ™«â™•-dev#3917\nno\nDoofus\nMINI defender\nê§âœ¯[ðŸ•‹]MÃ‚RSHMÃ†LLÃ˜W ð–£˜âœ¯ê§‚\nAlkaios\n(ãƒ»Ï‰ãƒ»ï¼¼)i am(/ãƒ»Ï‰ãƒ»)/pinch!\nViá»‡t CÆ°á»ng 2A5\nI Love you\nfdsmn\n!\nR\nyou shall not pass!!\nharmless shower\nlol\nMythical\noath sign\nfinland\nbob\nhetman666\nlio\nVN~I LoVe You Chu Ca Mo\nYour mom\nFriendly\nthe protector\nleave me alone pls\nGrill my flippen butt\nn o i c e\nbo\nonsen\n._.\nFrostbite#6915\nðŸ’ž\nCTRL+W=godmode\nnoob\nad\nSoviet Union\nbe freind\n   HCM MUÃ”N NÄ‚M\n:P\nFALLEN SWORD\nanh tuáº¥n anh nÃ¨ tÃ´m\nfnf is a poop\nZp r oZ\nê§Òˆ$ê«€êª–  ,Ò‰â„­Õ¶ðšŒÕ´êª‘ðœ·ê«€á¥… à¼»\nVN:P\nmargaret thatcha\n[VN]áº¢o VÃ£i Lá»“nðŸ¤”\nã…‹ã…‹ã„¹ã…ƒã…ƒ\npin h 3\nVá»¹ Ä‘áº¹p zai\nSnapwingfriendstriker007\neverybodybecomespike\na\n1\nvyde\nMothership Drone\nop\nclick \"F\"\nNoob\nðŸ°chiroðŸ°\nPJfd13\nCELESTIAL\nTeam\nPet :3\nFeZTiVAL\nanime\nt\nC - 4 Spank Spank\nRockety\nValley\nIm New,dont kill me pls\nFriends?\ní•˜ì´ë£¨\nKILL ME I DARE YOU\npet basic -(======>\npet\nâ™• â¤VIá»†T NAM â¤â™•\nfuck\nteam ?\nê§à¼’â˜¬âœžðŸ˜ˆVÃ®LLÃ£Ã±ðŸ˜ˆâœžâ˜¬à¼’ ê§‚\nCÃ´ng\nOpan Come Go Note Yeah\n1 + 1 = 3\nElite Knigh*\nvn{CHP}\nDasher8162\nXlo-250\nunder_gamer092\nVN\nMtp tv tiktoker\nDenied\nPaladin\nã€ŽYTã€Justð•¸ð–Ÿð–†ð–ãƒ…\nshame\nCorrupt Y\nspin= team\nPlease no more Y team\nSyringe\nPickerel Frog\nBitter Dill\nYour Triggering Me ðŸ¤¬\n117\nFleRex\nArchimedes\nNeonlights\nðŸŒŒMiÃ±eðŸŒŒ\nã€–-9999ã€—-Ò‰RÒ‰eÒ‰XÒ‰xÒ‰XÒ‰xÒ‰XÒ‰\nFEWWW....\nbob\n0800 fighterÂ¯_(ãƒ„)_/Â¯\nâ—¯ . â—¯âƒ¨Ì…\nð•ð•–ð•¤ð•¥ð•–ð•£\nApollon\nÆá¹á¹™á¸•d á¹–lÃ¤Ã¿á»‡Å• {âœ¨}\ni never bin 1 mill\næ®‹å¿µãªäºº\nKillerTMSJ\nÐ”Ñ€Ð°ÐºÐ¾Ð½\n[VN]áº¢o VÃ£i Lá»“nðŸ¤”\nðŸ˜Ž\nwarrion\nARMADA\nasd\nalr-ight\nAAAAAAAAAAAAAAAAAAAAAAAA\nâ™£â˜†  â“‚â’¶ð“»sð‡â“‚ð”¼ð•á’ªÏƒÏ‰  â˜¯â™š\nFREJEA CELESTIAL 1.48MXyn\npoker 567\nC\n4tomiX\nmeliodas\nViá»‡t CÆ°á»ng 2A5\n(ZV) foricor\n\nMarxtu\nme?? ðŸ˜¢\nmÌ¸ÌÌ½áµƒð”­ÊŸâ‚‘à±ªðŸŒ¸ðŸŽ€ðŸŒºðŸŒ·ðŸ©°ðŸ§\nPeaceKeeper\nEeeeeeva\ndiá»‡n\n[MM]  â’»ð“¸ð“»ð“«ð“²ð“­ð“­ð“®ð“·\nDoofus\nTS/RRRR\nNothing.\nðŸ¶(X)~pitÂ¥ðŸºte matare jajaja\nâŒ¿âƒâ‹âŽ…âƒ\ngo\n[PFF][|| Ä±'É± áƒªÄ…áƒªáƒ§||]\nhola\npolyagon\nGalactic slush\n9999999999999999999999dx\nzaphkiel celestial\nnoob\n$$$%$la plaga$%$$$\nSorry broh\nRoberto\nEHSY BAAA\nNnmnnnmmmnmmmm\nuse fighter plsss :)\nMini\nspitandsteelfriend\n;)\nlol\nMobile player\nthe ultimate multitool\ni vow to protect\noofania\nhi\nwhy am i here\nHÌµÍŠÌ•eÌµÌ‡Ì®lÌ·Í„ÍŽlÌµÌ…Í›oÌ¸ÍŠÌ›\nA.L.\nHi\nONE SHOT\nluis\nsaitan\nFelchas\nIm gonna knock you out\nAquiles TEAM LOVE\nqwertyuiop\n:3\ndiep.io\ninvisible drones\nteam plz:(\nDIONAX\nagain and again\n100000000000000000000000\nnicolas123\nJESUS E AMOR".split("\n").forEach(n => botNames.push(n));

let chooseBotName = () => {
    return choose([...botNames,
        'Alice',
        'Bob',
        'Carmen',
        'David',
        'Edith',
        'Freddy',
        'Gustav',
        'Helga',
        'Janet',
        'Lorenzo',
        'Mary',
        'Nora',
        'Olivia',
        'Peter',
        'Queen',
        'Roger',
        'Suzanne',
        'Tommy',
        'Ursula',
        'Vincent',
        'Wilhelm',
        'Xerxes',
        'Yvonne',
        'Zachary',
        'Alpha',
        'Bravo',
        'Charlie',
        'Delta',
        'Echo',
        'Foxtrot',
        'Hotel',
        'India',
        'Juliet',
        'Kilo',
        'Lima',
        'Mike',
        'November',
        'Oscar',
        'Papa',
        'Quebec',
        'Romeo',
        'Sierra',
        'Tango',
        'Uniform',
        'Victor',
        'Whiskey',
        'X-Ray',
        'Yankee',
        'Zulu',
        'The Bron Jame',
        "[MG] Team",
    "team??!",
    "trump",
    "facu++",
    "TEST",
    "Jake",
    "PEST_YT",
    "GOKU",
    "big me!",
    "arras > diep",
    "k",
    "[MG] PRO TEAM",
    "Solomon",
    "novice",
    "noob",
    "Angel",
    "ðŸ˜ˆ",
    "max",
    "Allah Is King",
    "Hug Me",
    "dont touch me",
    "leonardo",
    "colombia",
    "",
    "",
    "",
    "Friends?",
    "âœˆ",
    "Kim Jong-Un",
    "1",
    "An unnamed player",
    "agar.io",
    "road to 1m",
    "FEED ME",
    "DOGE",
    "GABE",
    "boi",
    "[GZ] team",
    "buff arena closer",
    ".",
    "Ramen",
    "SPICY RAMEN",
    "Jera",
    "[insert creative name]",
    "Rake",
    "arras.io",
    "KOA",
    "die",
    "king of diep",
    "Hagalaz",
    "Ehwaz",
    "Dagaz",
    "Berkanan",
    "Algiz",
    "Blank",
    "Mango",
    "TOUCAN",
    "Bee",
    "Honey Bee",
    "oof",
    "Toast",
    "Captian",
    "Alexis",
    "FeZTiVAl",
    "kitten",
    "Derp",
    "Gabogc",
    "Uâ€€Sâ€€A",
    "name",
    "[IX] clan",
    "LOL",
    "ur mom",
    "llego el pro!",
    "Impeach Trump",
    "luka modric",
    "bob",
    "MATRIX",
    "no",
    "e",
    "kek",    "read and u gay",
    "Decagon?",
    "take this L",
    "mm",
    "Aleph Null",
    "summoner",
    "T-REX",
    "buff basic",
    "stink",
    "jumla",
    "no team Kill",
    "pet",
    "V",
    "Broccoli",
    "toon",
    "Sinx",
    "JTG",
    "Hammer",
    " ",
    "Basic",
    "Discord",
    "NO WITCH-HUNTING",
    "salty",
    "CJ",
    "angel",
    "a salty discord kid",
    "satan",
    "NoCopyrightSounds",
    "Am I Sinbadx?",
    "AHHHHHH!",
    "rush",
    "squirt",
    "AMIGOS",
    "Windows 98",
    "FeZTivAL",
    "illuminati",
    "Fallen Bot",
    "Anonymous",
    "koala",
    "iXPLODE",
    ":D",
    "BrOBer The Prod",
    "OwO",
    "O_O",
    "UwU",
    "Alpha",
    "TheFatRat",
    "kokak",
    "D:",
    "YouRIP",
    "WOOT",
    "ð•¯ð–†ð–™ ð•ºð–“ð–Š ð•­ð–”ð–Ž",
    "hell",
    "Y",
    "why",
    "Lucas",
    "LOCO",
    "FeZTi Fan",
    "0",
    "AK-47",
    "Friend pls",
    "cool",
    "NO U",
    "hmst",
    "Sub 2 Pewdiepie",
    "T-Gay",
    "t-series succs",
    "Balloon",
    "CX Fan",
    "The Nameless",
    "What?",
    "Our World of Tanks",
    "Real AI",
    "Totally Not A Bot",
    "...",
    "Fallen AI",
    "green square",
    "Dagaz 2.0",
    "Internet Explorer",
    "teamplz",
    "Paradox",
    "Fallen Nothing",
    "developer",
    "ruler of tanks",
    "IRS",
    "king slayer",
    "sael savage",
    "Zplit",
    "CUCK",
    "Popo",
    "Â¡AY PAPI!",
    "Vogelaj",
    "Ruthless",
    "BOMBS AWAY",
    "im new",
    "best",
    ".-.",
    "dont feed me",
    "rIsKy",
    "Brian",
    "Angel",
    "Knoz",
    "Caesar",
    "Baller",
    "Â¿Equipo?",
    "Â¡Vamos!",
    "Road To 10m",
    "Real Hellcat",
    "Real Kitty!",
    "Canada > USA",
    "A named player",
    "Tyson",
    "Slayer",
    "666",
    "Nooblet",
    "M8",
    "Trans Rights",
    "Bar Milk",
    "Jambi",
    "Elmo is gone",
    "The Grudge",
    "Rosetta Stoned",
    "Lateralus",
    "Fourty-Six & 2",
    "Vicarious",
    "Judith",
    "Give Me Wings",
    "The Pot",
    "look behind you",
    "Bruh Momentum",
    "Sucko mode",
    "ArenaC",
    "!foO",
    "Lateralus",
    "Disposition",
    "Reflection",
    "Triad",
    "Mantra",
    "The Patient",
    "Real CreepyDaPolyplanet",
    "Real Despacit.io",
    "Mew",
    "Magikarp",
    "Real Dark Knight",
    "ok boomer",
    "PP Tank",
    "COPPA Sucks",
    "meme",
    "Womp Womp",
    "W = Team",
    "Real CX",
    "Neo",
    "crasher",
    "Minecrafter",
    "King of Pros",
    "Vanze",
    "Have mercy...",
    "Im scary",
    "cookie",
    "Liberty Prime",
    "bruh moment",
    "Rubrub",
    "Banarama",
    "poyo",
    "Nova",
    "Creeper, Aw Man",
    "Theory of Everything",
    "DJVI",
    "jotaro kujo",
    "Faaip de Oiad",
    "MrBeast",
    "ForeverBound",
    "Are you okay?",
    "BUSTER WOLF",
    "MJK",
    "F-777",
    "Dex Arson",
    "alpharad",
    "ORA ORA ORA",
    "Waterflame",
    "DJ-Nate",
    "penguinz0",
    "#teamtrees",
    "Electrodynamix",
    "brogle",
    "im beef",
    "Salsa Verde",
    "The Audacity of this tank",
    "Joe Mamma",
    "Red Hot Chili Pepper",
    "Halal Certified Tank",
    "Coronavirus",
    "The Common Cold",
    "The Flu",
    "Ight Bro",
    "Little Red Rocket",
    "Bruh Monument",
    "Bruh Monumentum",
    "Spree",
    "KING CRIMSON!",
    "THE WORLD!",
    "ZA WARUDO!",
    "taal volcano",
    "Synth",
    "Brotherhood of Steel",
    "Railroad",
    "A Settlement Needs Your Help",
    "final destination, fox only",
    "food",
    "fezti fan",
    "FeZtiVaL",
    "CATS",
    "Careenervirus",
    "Dumb",
    "[AI]",
    "Insanity",
    "Steven Universe",
    "MrBeast Rules",
    "Oswald Veblen",
    "how to get testbed?",
    "Mahlo Cardinal?",
    "mf=r",
    "dragons go mlem"
    ]);
};

let chooseBossName = (code, n) => {
    switch (code) {
        case 'a':
            return chooseN([
                "Archimedes",
                "Akilina",
                "Anastasios",
                "Athena",
                "Alkaios",
                "Amyntas",
                "Aniketos",
                "Artemis",
                "Anaxagoras",
                "Apollo",
                "Pewdiepie",
                "Ares",
                "Helios",
                "Hades",
                "Alastor",
                "Bruh Moment",
                "Shrek",
                "Geofridus",
                "Guillermo",
                "Tephania",
                "Christaire",
                "Galileo",
                "Newton",
                "Herschel",
                "Eratosthenes",
                "Maxwell",
                "Lavoisier",
                "Maynard"
            ], n);
        case 'sassafras':
            return chooseN([
                "Sassafras",
                "Sassafras",
                "Hemisphere"
            ], n);
        case 'castle':
            return chooseN([
                "Berezhany",
                "Lutsk",
                "Dobromyl",
                "Akkerman",
                "Palanok",
                "Zolochiv",
                "Palanok",
                "Mangup",
                "Olseko",
                "Brody",
                "Isiaslav",
                "Kaffa",
                "Bilhorod",
                "Cheese Block",
                "Ganondorf",
                "Weiss",
                "Spiegel",
                "Hasselhoff",
                "Konstanze",
                "Callum",
                "Maleficum",
                "Droukar",
                "Astradhur",
                "Saulazar",
                "Gervaise",
                "Reimund",
                "Nothing"
            ], n);
        case 'all':
            return chooseN([
                "Archimedes",
                "Akilina",
                "Anastasios",
                "Athena",
                "Alkaios",
                "Amyntas",
                "Aniketos",
                "Artemis",
                "Anaxagoras",
                "Apollo",
                "Pewdiepie",
                "Ares",
                "Helios",
                "Hades",
                "Alastor",
                "Bruh Moment",
                "Shrek",
                "Geofridus",
                "Guillermo",
                "Tephania",
                "Christaire",
                "Galileo",
                "Newton",
                "Herschel",
                "Eratosthenes",
                "Maxwell",
                "Lavoisier",
                "Maynard",
                "Berezhany",
                "Lutsk",
                "Dobromyl",
                "Akkerman",
                "Palanok",
                "Zolochiv",
                "Palanok",
                "Mangup",
                "Olseko",
                "Brody",
                "Isiaslav",
                "Kaffa",
                "Bilhorod",
                "Cheese Block",
                "Ganondorf",
                "Weiss",
                "Spiegel",
                "Hasselhoff",
                "Konstanze",
                "Callum",
                "Maleficum",
                "Droukar",
                "Astradhur",
                "Saulazar",
                "Gervaise",
                "Reimund",
                "Nothing"
            ], n);
        default: return ['God'];
    }
};

let randomLore = function() {
    return choose([
        "http://woomy.surge.sh/resources/YGlitch250.png",
        "Thru a petri dish..."
    ]);
}

module.exports("random", {
    random,
    randomAngle,
    randomRange,
    irandom,
    irandomRange,
    gauss,
    gaussInverse,
    gaussRing,
    chance,
    dice,
    choose,
    chooseN,
    chooseChance,
    chooseBotName,
    chooseBossName,
    randomLore
})