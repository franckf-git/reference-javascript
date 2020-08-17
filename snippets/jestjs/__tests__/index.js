const func = require('./../index.js')

describe('Test fast math operations', () => {

test('addition s', () => {
expect(func.add(45,5)).toBe(50)
})

test('multi s', () => {
expect(func.multi(10,5)).toBe(50)
})

})
