const listHelper = require('../utils/listHelper')

describe('dummy function', () => {
    const blogs = []
    
    test('always returns 1', () => {
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})