const { test, describe } = require('node:test')
const assert = require('node:assert')
const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../utils/list_helper')

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    }
]

const listWithManyBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }  
]

describe('Total likes', () => {
    test('of empty list is zero', () => {
        assert.strictEqual(totalLikes([]), 0)
    })

    test('of 1 element list is equal to likes of element', () => {
        assert.strictEqual(totalLikes(listWithOneBlog), 5)
    })

    test('of multi-element list is sum of all elements likes', () => {
        assert.strictEqual(totalLikes(listWithManyBlogs), 38)
    })
})

describe('Favorite blog', () => {
    test('of empty list is null', () => {
        assert.deepStrictEqual(favoriteBlog([]), null)
    })

    test('of 1 element list is equal to the element', () => {
        assert.deepStrictEqual(favoriteBlog(listWithOneBlog), 
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        })
    })

    test('of multi-element list is most liked element', () => {
        assert.deepStrictEqual(favoriteBlog(listWithManyBlogs), 
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 12,
            __v: 0
        })
    })
})

describe('Author with most blogs', () => {
    test('of empty list is null', () => {
        assert.strictEqual(mostBlogs([]), null)
    })

    test('of 1 element list is the author with 1 blog', () => {
        assert.deepStrictEqual(mostBlogs(listWithOneBlog), 
        {
            author: 'Edsger W. Dijkstra',
            count: 1
        })
    })

    test('of multi-element list is correct', () => {
        assert.deepStrictEqual(mostBlogs(listWithManyBlogs), 
        {
            author: 'Robert C. Martin',
            count: 3
        })
    })
})

describe('Author with most likes', () => {
    test('of empty list is null', () => {
        assert.strictEqual(mostLikes([]), null)
    })

    test('of 1 element list is the blog posts likes', () => {
        assert.deepStrictEqual(mostLikes(listWithOneBlog), 
        {
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    test('of multi-element list is correct', () => {
        assert.deepStrictEqual(mostLikes(listWithManyBlogs), 
        {
            author: 'Edsger W. Dijkstra',
            likes: 17
        })
    })
})