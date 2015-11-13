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

    var middle = function middle(params, paramsMap) {
        var handler = function handler(v, index) {
            if (paramCount === 0) return f.apply(context);

            if (index === undefined) index = params.length;

            if (!isInteger(index)) throw new TypeError("Expect integer for index.");

            if (index < 0) throw new Error("index is less than 0.");

            if (index > paramCount - 1) throw new Error("index is bigger than paramCount.");

            var clonedParams = params.slice(0);
            var clonedParamMap = cloneMap(paramsMap);
            clonedParams[index] = v;
            clonedParamMap[index] = v;

            if (getKeyLength(clonedParamMap) === paramCount) return f.apply(context, clonedParams);

            return middle(clonedParams, clonedParamMap);
        };
        handler.unique = unique;
        return handler;
    };
    return middle([], {});
};

curry.isFinished = function (handler) {
    return !(handler && typeof handler === "function" && handler.unique === unique);
};

var cloneMap = function cloneMap(map) {
    var newMap = {};
    for (var name in map) {
        newMap[name] = map[name];
    }
    return newMap;
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