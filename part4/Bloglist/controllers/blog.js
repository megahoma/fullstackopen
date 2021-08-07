const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({})
  response.json(result)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.likes) {
    blog.likes = 0
  }

  if (!blog.title && !blog.url) {
    response
      .status(400)
      .json({
        error: 'content missing',
      })
      .end()
    return
  }

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter
