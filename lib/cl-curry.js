"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * curry
 *
 * @author ddchen
 */

var unique = {};

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

    var handler = high(f, paramCount, context)([], {});

    handler.unique = unique;

    return handler;
};

var high = function high(f, paramCount, context) {
    return function (params, paramsMap) {
        return function (v, index) {
            if (paramCount === 0) return f.apply(context);

            if (index === undefined) index = params.length;

            if (!isInteger(index)) throw new TypeError("Expect integer for index.");

            if (index < 0 || index > paramCount - 1) throw new Error("index is less than 0 or bigger than paramCount.");

            params[index] = v;
            paramsMap[index] = v;
            if (getKeyLength(paramsMap) === paramCount) return f.apply(context, params);

            var handler = high(f, paramCount, context)(cloneList(params), cloneMap(paramsMap));
            handler.unique = unique;

            return handler;
        };
    };
};

var cloneList = function cloneList(list) {
    var newList = [];
    for (var i = 0; i < list.length; i++) {
        newList.push(list[i]);
    }
    return newList;
};

var cloneMap = function cloneMap(map) {
    var newMap = {};
    for (var name in map) {
        newMap[name] = map[name];
    }
    return newMap;
};

curry.isFinished = function (handler) {
    if (handler && typeof handler === "function" && handler.unique === unique) {
        return false;
    }
    return true;
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