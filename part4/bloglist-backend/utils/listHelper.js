const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0

    if (blogs.length === 0) {
        return total
    }

    blogs.forEach(blogs => {
        total += blogs.likes
    })

    return total
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    let index = 0
    let mostLikes = 0

    blogs.forEach((blog, i) => {
        if (blog.likes > mostLikes) {
            index = i
            mostLikes = blog.likes
        }
    })

    const favBlog = {
        title: blogs[index].title,
        author: blogs[index].author,
        likes: blogs[index].likes
    }

    return favBlog
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    let index = 0;
    let max = 0;

    // returns an array of unique objects that conform to the following format: {author: someUniqueName, blogs: 0}
    const authors = [...new Map(blogs.map((blog) => [blog["author"], { author: blog.author, blogs: 0 }])).values()]

    for (let i = 0; i < authors.length; i++) {
        for (let j = 0; j < blogs.length; j++) {
            if (authors[i].author === blogs[j].author) {
                authors[i].blogs++
            }
        }
    }

    for (let i = 0; i < authors.length; i++) {
        if (authors[i].blogs > max) {
            index = i
        }
    }

    return authors[index]
}

const mostLikes = (blogs) => {
    // todo
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}