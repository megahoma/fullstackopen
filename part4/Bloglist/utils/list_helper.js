const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  let sum = 0
  blogs.map((blog) => (sum += blog.likes))
  return sum
}

const favoriteBlog = (blogs) => {
  let maxLikes = 0
  let BlogObject = null

  blogs.map((blog) => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes
      BlogObject = blog
    }
  })
  return BlogObject
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
