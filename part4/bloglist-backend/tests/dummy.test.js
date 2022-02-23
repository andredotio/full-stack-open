const listHelper = require('../utils/listHelper')

describe('dummy function that returns 1', () => {
    const blogs = []
    
    test('always returns 1', () => {
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})