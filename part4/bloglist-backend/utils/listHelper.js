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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}