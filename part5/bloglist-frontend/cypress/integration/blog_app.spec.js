describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test',
      username: 'test',
      password: 'test',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('test logged in')
      cy.contains('logout').click()
    })
    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('root')
      cy.get('#login-button').click()

      cy.get('#notification').should('contain', 'Wrong credentials')
    })
  })

  describe('Blog app', function () {
    describe('When logged in', function () {
      beforeEach(function () {
        cy.contains('login').click()
        cy.get('#username').type('test')
        cy.get('#password').type('test')
        cy.get('#login-button').click()
      })

      it('a new blog can be created', function () {
        cy.contains('create new Blog').click()
        cy.get('#title').type('test Blog')
        cy.get('#author').type('test')
        cy.get('#url').type('http://test.com')
        cy.contains('create').click()

        cy.contains('test Blog - test')
      })
      it('user can like a blog', function () {
        cy.contains('create new Blog').click()
        cy.get('#title').type('test')
        cy.get('#author').type('test Blog')
        cy.get('#url').type('http://test.com')
        cy.contains('create').click()

        cy.contains('test Blog - test').click()
        cy.contains('view').click()
        cy.contains('0')
        cy.get('#like-button').click()
        cy.contains('1')
      })
      it('user who created a blog can delete it', function () {
        cy.contains('create new Blog').click()
        cy.get('#title').type('test Blog')
        cy.get('#author').type('test')
        cy.get('#url').type('http://test.com')
        cy.contains('create').click()

        cy.contains('test Blog - test').click()
        cy.contains('view').click()
        cy.get('#remove').click()

        cy.get('html').should('not.contain', 'test Blog - test')
      })
    })
  })
})
