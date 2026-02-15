/* jslint node: true */
'use strict';
let addArticle = function(string, cap = false) {
    let output = (/[aeiouAEIOU]/.test(string[0])) ? 'an ' + string : 'a ' + string;
    if (cap) {
        output = output.split("");
        output[0] = output[0].toUpperCase();
        output = output.join("");
    }
    return output;
};
let getDistance = function(p1, p2) {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
};
let getDirection = function(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
};
let clamp = function(value, min, max) {
    return value > max ? max : value < min ? min : value;
};
let lerp = (a, b, x) => a + x * (b - a);
let angleDifference = (() => {
    let mod = function(a, n) {
        return (a % n + n) % n;
    };
    return (sourceA, targetA) => {
        let a = targetA - sourceA;
        return mod(a + Math.PI, 2 * Math.PI) - Math.PI;
    };
})();
let loopSmooth = (angle, desired, slowness) => {
    return angleDifference(angle, desired) / slowness;
};
let deepClone = (obj, hash = new WeakMap()) => {
    let result;
    // Do not try to clone primitives or functions
    if (Object(obj) !== obj || obj instanceof Function) return obj;
    if (hash.has(obj)) return hash.get(obj); // Cyclic reference
    try { // Try to run constructor (without arguments, as we don't know them)
        result = new obj.constructor();
    } catch (e) { // Constructor failed, create object without running the constructor
        result = Object.create(Object.getPrototypeOf(obj));
    }
    // Optional: support for some standard constructors (extend as desired)
    if (obj instanceof Map) Array.from(obj, ([key, val]) => result.set(deepClone(key, hash), deepClone(val, hash)));
    else if (obj instanceof Set) Array.from(obj, (key) => result.add(deepClone(key, hash)));
    // Register in hash
    hash.set(obj, result);
    // Clone and assign enumerable own properties recursively
    return Object.assign(result, ...Object.keys(obj).map(key => ({
        [key]: deepClone(obj[key], hash)
    })));
};
let averageArray = arr => {
    if (!arr.length) return 0;
    var sum = arr.reduce((a, b) => {
        return a + b;
    });
    return sum / arr.length;
};
let sumArray = arr => {
    if (!arr.length) return 0;
    var sum = arr.reduce((a, b) => {
        return a + b;
    });
    return sum;
};
let signedSqrt = x => {
    return Math.sign(x) * Math.sqrt(Math.abs(x));
};
let getJackpot = x => {
    return (x > 26300 * 1.5) ? Math.pow(x - 26300, 0.85) + 26300 : x / 1.5;
};
let serverStartTime = Date.now();
// Get a better logging function
let time = () => {
    return Date.now() - serverStartTime;
};
let formatTime = x => Math.floor(x / (1000 * 60 * 60)) + " hours, " + Math.floor(x / (1000 * 60)) % 60 + " minutes and " + Math.floor(x / 1000) % 60 + " seconds";
// create a custom timestamp format for log statements
let getLogTime = () => (time() / 1000).toFixed(3);
let log = text => {
    console.log('[' + getLogTime() + ']: ' + text);
};
let info = log
let spawn = log
let warn = text => {
    console.log('[' + getLogTime() + ']: ' + '[WARNING] ' + text);
};
let error = text => {
    console.log('[' + getLogTime() + ']: ' + '[ERROR] ' + text);
};
let remove = (array, index) => {
    // there is more than one object in the container
    if (index === array.length - 1) {
        // special case if the obj is the newest in the container
        return array.pop();
    } else {
        let o = array[index];
        array[index] = array.pop();
        return o;
    }
};
let formatLargeNumber = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
let timeForHumans = x => {
    // ought to be in seconds
    let seconds = x % 60;
    x /= 60;
    x = Math.floor(x);
    let minutes = x % 60;
    x /= 60;
    x = Math.floor(x);
    let hours = x % 24;
    x /= 24;
    x = Math.floor(x);
    let days = x;
    let y = '';
    function weh(z, text) {
        if (z) {
            y = y + ((y === '') ? '' : ', ') + z + ' ' + text + ((z > 1) ? 's' : '');
        }
    }
    weh(days, 'day');
    weh(hours, 'hour');
    weh(minutes, 'minute');
    weh(seconds, 'second');
    if (y === '') {
        y = 'less than a second';
    }
    return y;
};

let formatDate = function(date = new Date()) {
    function pad2(n) {
        return (n < 10 ? '0' : '') + n;
    }
    var month = pad2(date.getMonth() + 1);
    var day = pad2(date.getDate());
    var year = date.getFullYear();
    return [month, day, year].join("/");
}

let constructDateWithYear = function(month = (new Date()).getMonth() + 1, day = (new Date()).getDate(), year = (new Date()).getFullYear()) {
    function pad2(n) {
        return (n < 10 ? '0' : '') + n;
    }
    month = pad2(month);
    day = pad2(day);
    year = year;
    return [month, day, year].join("/");
}

let dateCheck = function(from, to, check = formatDate()) {
    var fDate, lDate, cDate;
    fDate = Date.parse(from);
    lDate = Date.parse(to);
    cDate = Date.parse(check);
    return cDate <= lDate && cDate >= fDate;
}

let cleanString = string => {
    if (typeof string !== "string") {
        return "";
    }
    return string.replace(/[\u0000\uFDFD\u202E\uD809\uDC2B\x00\x01\u200b\u200e\u200f\u202a-\u202e\ufdfd\ufffd-\uffff]/g, "").trim();
}

module.exports("util", { addArticle, getDistance, getDirection, clamp, lerp, angleDifference, loopSmooth, deepClone, averageArray, sumArray, signedSqrt, getJackpot, serverStartTime, time, formatTime, getLogTime, log, info, spawn, warn, error, remove, formatLargeNumber, timeForHumans, formatDate, constructDateWithYear, dateCheck, cleanString })
global.utility = require("util")