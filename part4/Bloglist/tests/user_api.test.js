const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const helper = require('./helper_test')
const User = require('../models/user')

describe('User api testing', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const users = await helper.usersInDb()

    const newUser = {
      username: 'megahoma',
      name: 'Homa',
      password: 'password_megahoma',
    }

    await api.post('/api/users').send(newUser).expect(200)

    const users_ = await helper.usersInDb()
    expect(users_).toHaveLength(users.length + 1)

    const usernames = users_.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails username ', async () => {
    const users = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Test',
      password: 'testing',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    const users_ = await helper.usersInDb()
    expect(users_).toHaveLength(users.length)
  })

  test('creation fails username', async () => {
    const users = await helper.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'Test',
      password: 'testing',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    const users_ = await helper.usersInDb()
    expect(users_).toHaveLength(users.length)
  })

  test('creation fails password ', async () => {
    const users = await helper.usersInDb()

    const newUser = {
      username: 'test-user',
      name: 'Test',
      password: 't',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    const users_ = await helper.usersInDb()
    expect(users_).toHaveLength(users.length)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
