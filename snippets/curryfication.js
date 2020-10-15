// source: grafikart
function curry (func, arity = null) {
    return function curried (...args) {
        if (args.length >= (arity || func.length)) {
            return func.apply(this, args)
        }
        return curried.bind(this, ...args)
    }
}

function curryRight (func, arity = null) {
    return function curried (...args) {
        if (args.length >= (arity || func.length)) {
            return func.apply(this, args)
        }
        return function (...args2) {
            return curried.apply(this, [...args2, ...args])
        }
    }
}

curry(multiply)(1)(2)(3)
curryRight(multiply)(3)(2)(1)
