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

    let middle = (params, paramsMap) => {
        let handler = (v, index) => {
            if (paramCount === 0)
                return f.apply(context);

            if (index === undefined) index = params.length;

            if (!isInteger(index))
                throw new TypeError("Expect integer for index.");

            if (index < 0)
                throw new Error("index is less than 0.");

            if (index > paramCount - 1)
                throw new Error("index is bigger than paramCount.");

            let clonedParams = params.slice(0);
            let clonedParamMap = cloneMap(paramsMap);
            clonedParams[index] = v;
            clonedParamMap[index] = v;

            if (getKeyLength(clonedParamMap) === paramCount)
                return f.apply(context, clonedParams);

            return middle(clonedParams, clonedParamMap);
        }
        handler.unique = unique;
        return handler;
    }
    return middle([], {});
}

curry.isFinished = (handler) => !(
    handler &&
    typeof handler === "function" &&
    handler.unique === unique
);

let cloneMap = (map) => {
    let newMap = {};
    for (let name in map) {
        newMap[name] = map[name];
    }
    return newMap;
}

let isInteger = (obj) => typeof obj === 'number' && obj % 1 === 0;

let getKeyLength = (map) => {
    if (Object.keys) return Object.keys(map).length;
    let counter = 0;
    for (let name in map) {
        counter++;
    }
    return counter;
}

export default curry;