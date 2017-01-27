function memoize(fn) {

  const cache = {}
  const monadic = fn.length === 1
  const serializer = JSON.stringify

  function isPrimitive(value) { return value == null || (typeof value !== 'function' && typeof value !== 'object') }

  return function memoized(first, ...args) {
    const key = monadic && isPrimitive(first) ? first : serializer([first, ...args])
    const value = cache[key]
    if (value) { return value }
    return cache[key] = fn(first, ...args)
  }
}

module.exports = memoize
