'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * curry
 *
 * @author ddchen
 */

var unique = 'ddchen_uuid_87cf6bb6-7983-4d2b-b9cc-b71200356803';

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

    if (typeof f !== 'function') throw new TypeError('Expect function for f.');

    if (!isInteger(paramCount)) throw new TypeError('Expect integer for paramCount.');

    if (paramCount < 0) throw new Error('Expect integer not less than 0.');

    var middle = function middle(params, paramsMap) {
        var addParam = function addParam(v, index) {
            if (index === undefined) index = params.length;

            if (!isInteger(index)) throw new TypeError('Expect integer for index.');

            if (index < 0) throw new Error('index is less than 0.');

            if (index > paramCount - 1) throw new Error('index is bigger than paramCount.');

            var clonedParams = params.slice(0);
            var clonedParamMap = cloneMap(paramsMap);

            clonedParams[index] = v;
            clonedParamMap[index] = v;
            return {
                newParams: clonedParams,
                newParamsMap: clonedParamMap
            };
        };

        var handler = function handler(v, index) {
            if (paramCount === 0) return f.apply(context);

            var _addParam = addParam(v, index);

            var newParams = _addParam.newParams;
            var newParamsMap = _addParam.newParamsMap;

            if (getKeyLength(newParamsMap) === paramCount) return f.apply(context, newParams);

            return middle(newParams, newParamsMap);
        };

        handler.unique = unique;

        handler.finish = function () {
            return f.apply(context, params);
        };

        return handler;
    };
    return middle([], {});
};

curry.isFinished = function (handler) {
    return !(handler && typeof handler === 'function' && handler.unique === unique);
};

curry.finish = function (handler) {
    if (typeof handler !== 'function') {
        return handler;
    } else {
        if (handler.unique === unique) {
            return handler.finish();
        } else {
            return handler();
        }
    }
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