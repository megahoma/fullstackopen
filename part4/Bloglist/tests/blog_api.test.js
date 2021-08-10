const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./helper_test')
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

beforeAll(async () => {
  await User.deleteMany({})
  const user = {
    username: 'test',
    name: 'test user',
    password: 'password',
  }

  await api
    .post('/api/users')
    .send(user)
    .set('Accept', 'application/json')
    .expect('Content-Type', /application\/json/)
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('Api testing', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('query if a blog has id or _id', async () => {
    const singleBlog = await helper.blogsInDb()

    expect(singleBlog[0].id).toBeDefined()
    expect(singleBlog[0]._id).toBe(undefined)
  })

  test('a valid blog can be added', async () => {
    const loginUser = {
      username: 'test',
      password: 'password',
    }

    const loggedUser = await api
      .post('/api/login')
      .send(loginUser)
      .expect('Content-Type', /application\/json/)

    const newBlog = {
      title: 'Test an app',
      author: 'megahoma',
      url: 'github.com',
      likes: 4,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${loggedUser.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((t) => t.title)
    expect(titles).toContain('Test an app')
  })

  test('verify if likes', async () => {
    const loginUser = {
      username: 'test',
      password: 'password',
    }

    const loggedUser = await api
      .post('/api/login')
      .send(loginUser)
      .expect('Content-Type', /application\/json/)

    const newBlog = {
      title: 'Test an app',
      author: 'megahoma',
      url: 'github.com',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${loggedUser.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toBe(0)
  })

  test('if token is not provided blog is not added', async () => {
    const newBlog = {
      title: 'Test an app',
      author: 'megahoma',
      url: 'github.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close
})
