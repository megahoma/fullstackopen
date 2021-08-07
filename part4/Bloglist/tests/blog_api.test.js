const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./helper_test')

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

afterAll(() => {
  mongoose.connection.close()
})
