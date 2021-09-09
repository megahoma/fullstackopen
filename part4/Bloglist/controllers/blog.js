const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!body.likes) {
    body.likes = 0
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

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
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete.user._id.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  const user = await User.findById(decodedToken.id)
  const blogToUpdate = await Blog.findById(request.params.id)

  if (blogToUpdate.user._id.toString() === user._id.toString()) {
    const updateBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    }

    const result = await Blog.findByIdAndUpdate(request.params.id, updateBlog, {
      new: true,
    })
    response.json(result.toJSON())
  } else {
    return response.status(401).json({ error: `Unauthorized` })
  }
})

module.exports = blogsRouter
