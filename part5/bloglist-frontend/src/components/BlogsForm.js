import React from 'react'
import blogService from '../services/blogs'

const BlogsForm = ({
  blogs,
  setBlogs,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  setMessage,
  setBlogVisible,
}) => {
  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.create({
        title,
        author,
        url,
      })
      setBlogs(blogs.concat(response))
      setBlogVisible(false)
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage('new blog added')
    } catch (exception) {
      setMessage('new blog not added')
    }
  }

  return (
    <>
      <form onSubmit={handleAddBlog}>
        <div>
          Title
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type="submit">create</button>
      </form>
    </>
  )
}

export { BlogsForm }
