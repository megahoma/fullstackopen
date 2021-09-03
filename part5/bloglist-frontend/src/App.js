import React, { useState, useEffect } from 'react'
import { BlogsInfo } from './components/BlogsInfo'
import { LoginForm } from './components/LoginForm'
import { Notification } from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const [BlogVisible, setBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1))
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }, [message])

  return (
    <>
      <Notification message={message} />

      {user === null ? (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
          setMessage={setMessage}
        />
      ) : (
        <BlogsInfo
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          setUser={setUser}
          setMessage={setMessage}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
          BlogVisible={BlogVisible}
          setBlogVisible={setBlogVisible}
        />
      )}
    </>
  )
}

export default App
