import React from 'react'
import blogService from '../services/blogs'

import { Blog } from './Blog'
import { BlogsForm } from './BlogsForm'

const UserInfo = ({ user, setUser, setMessage }) => {
  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setMessage('Logout success')
    setUser(null)
  }
  return (
    <>
      <p>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </p>
    </>
  )
}

const BlogsInfo = ({
  blogs,
  setBlogs,
  user,
  setUser,
  setMessage,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  BlogVisible,
  setBlogVisible,
}) => {
  const hideWhenVisible = { display: BlogVisible ? 'none' : '' }
  const showWhenVisible = { display: BlogVisible ? '' : 'none' }

  const removeBlog = async (blogDelete) => {
    try {
      if (window.confirm('Delete', blogDelete.title, '?')) {
        blogService.remove(blogDelete.id)
        setMessage('Blog', blogDelete.title, 'deleted')
        setBlogs(blogs.filter((blog) => blog.id !== blogDelete.id))
        setMessage(null)
      }
    } catch (exception) {
      setMessage('Cannot delete blog', blogDelete.title)
      setMessage(null)
    }
  }

  return (
    <>
      <h2>blogs</h2>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogVisible(true)}>create new Blog</button>
      </div>
      <div style={showWhenVisible}>
        <BlogsForm
          blogs={blogs}
          setBlogs={setBlogs}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
          setMessage={setMessage}
          setBlogVisible={setBlogVisible}
        />

        <button onClick={() => setBlogVisible(false)}>cancel</button>
      </div>

      <UserInfo user={user} setUser={setUser} setMessage={setMessage} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} removeBlog={removeBlog} />
      ))}
    </>
  )
}

export { BlogsInfo }
