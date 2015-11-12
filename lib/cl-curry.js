"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * cury function
 * 
 * @param  {function} f
 * @param  {integer} paramCount
 * @param  {} context
 */
var curry = function curry(f) {
    var paramCount = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var context = arguments[2];

    if (typeof f !== "function") throw new TypeError("Expect function for f.");

    if (!isInteger(paramCount)) throw new TypeError("Expect integer for paramCount.");

    if (paramCount < 0) throw new Error("Expect integer not less than 0.");

    var params = [];
    var paramsMap = {};
    var handler = function handler(v, index) {
        if (paramCount === 0) return f.apply(context);

        if (index === undefined) index = params.length;

        if (!isInteger(index)) throw new TypeError("Expect integer for index.");

        if (index < 0 || index > paramCount - 1) throw new Error("index is less than 0 or bigger than paramCount.");

        params[index] = v;
        paramsMap[index] = v;
        if (getKeyLength(paramsMap) === paramCount) return f.apply(context, params);

        return handler;
    };
    return handler;
};

var isInteger = function isInteger(obj) {
    return typeof obj === 'number' && obj % 1 === 0;
};

var getKeyLength = function getKeyLength(map) {
    if (Object.keys) return Object.keys(map).length;
    var counter = 0;
    for (var name in map) {
        counter++;
    }
    return counter;
};

exports.default = curry;