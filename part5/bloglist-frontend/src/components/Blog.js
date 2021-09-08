import React, { useState } from 'react'
import blogService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}
const blogUlStyle = {
  margin: 0,
  padding: 0,
}

const Blog = (props) => {
  const blog = props.blog
  const [blogObject, setBlogObject] = useState(blog)
  const [BlogTextVisible, setBlogTextVisible] = useState(false)

  const hideWhenVisible = { display: BlogTextVisible ? 'none' : '' }
  const showWhenVisible = { display: BlogTextVisible ? '' : 'none' }

  const likeUp = async () => {
    const updateBlog = {
      _id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    await blogService.update(updateBlog)
    setBlogObject(updateBlog)
  }

  const remBlog = () => props.removeBlog(blog)

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} - {blog.author}
        <button
          onClick={() => {
            setBlogTextVisible(true)
          }}
        >
          view
        </button>
      </div>

      <div style={showWhenVisible}>
        <ul style={blogUlStyle}>
          <li>
            {blog.title}{' '}
            <button
              onClick={() => {
                setBlogTextVisible(false)
              }}
            >
              hide
            </button>
          </li>
          <li>{blog.url}</li>
          <li>
            {blogObject.likes}{' '}
            <button
              onClick={() => {
                likeUp()
              }}
            >
              like
            </button>
          </li>
          <li>{blog.author}</li>
        </ul>
        <button
          onClick={() => {
            remBlog(blog)
          }}
        >
          remove
        </button>
      </div>
    </div>
  )
}

export { Blog }
