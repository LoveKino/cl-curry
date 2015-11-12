/**
 * curry
 *
 * @author ddchen
 */

let unique = {};

/**
 * cury function
 * 
 * @param  {function} f
 * @param  {integer} paramCount
 * @param  {} context
 */
let curry = (f, paramCount = 0, context) => {
    if (typeof f !== "function")
        throw new TypeError("Expect function for f.");

    if (!isInteger(paramCount))
        throw new TypeError("Expect integer for paramCount.");

    if (paramCount < 0)
        throw new Error("Expect integer not less than 0.");
    
    let handler = high(f, paramCount, context)([], {});

    handler.unique = unique;

    return handler;
}

let high = (f, paramCount, context) => (params, paramsMap) => (v, index) => {
    if (paramCount === 0)
        return f.apply(context);

    if (index === undefined) index = params.length;

    if (!isInteger(index))
        throw new TypeError("Expect integer for index.");

    if (index < 0 || index > paramCount - 1)
        throw new Error("index is less than 0 or bigger than paramCount.");

    params[index] = v;
    paramsMap[index] = v;
    if (getKeyLength(paramsMap) === paramCount)
        return f.apply(context, params);

    let handler = high(f, paramCount, context)(cloneList(params), cloneMap(paramsMap));
    handler.unique = unique;

    return handler;
}

let cloneList = (list) => {
    let newList = [];
    for (let i = 0; i < list.length; i++) {
        newList.push(list[i]);
    }
    return newList;
}

let cloneMap = (map) => {
    let newMap = {};
    for (let name in map) {
        newMap[name] = map[name];
    }
    return newMap;
}

curry.isFinished = (handler) => {
    if (handler &&
        typeof handler === "function" &&
        handler.unique === unique) {
        return false;
    }
    return true;
}

let isInteger = (obj) => {
    return typeof obj === 'number' && obj % 1 === 0
}

let getKeyLength = (map) => {
    if (Object.keys) return Object.keys(map).length;
    let counter = 0;
    for (let name in map) {
        counter++;
    }
    return counter;
}

export default curry;