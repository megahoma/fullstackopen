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
describe('api testing', () => {
  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)

  test('verifies that the unique identifier property of the blog posts is named id', async () => {
    const result = await api.get('/api/blogs').expect(200)
    expect(result.body[0].id).toBeDefined()
  })

  test('POST request saves blog to MongoDB', async () => {
    const newBlog = {
      title: 'Api testing',
      author: 'megahoma',
      url: 'github.com',
      likes: 1,
    }
    await api.post('/api/blogs').send(newBlog)

    const blogs_ = await helper.blogsInDb()
    expect(blogs_).toHaveLength(helper.initialBlogs.length + 1)

    const content = blogs_.map((x) => x.author)
    expect(content).toContain('megahoma')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
