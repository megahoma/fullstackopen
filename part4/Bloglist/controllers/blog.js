const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const users = await User.find({})

  if (!body.likes) {
    body.likes = 0
  }
  /*
  if (!blog.title && !blog.url) {
    response
      .status(400)
      .json({
        error: 'content missing',
      })
      .end()
    return
  }
  */

  const randomUser = users[Math.floor(Math.random() * users.length)]
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: randomUser._id,
  })

  const savedBlog = await blog.save()
  randomUser.blogs = randomUser.blogs.concat(savedBlog._id)
  await randomUser.save()

  response.json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updateBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const result = await Blog.findByIdAndUpdate(request.params.id, updateBlog, {
    new: true,
  })
  response.json(result)
})

module.exports = blogsRouter
