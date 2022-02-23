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

module.exports = { 
    dummy,
    totalLikes
}