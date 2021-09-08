import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { Blog } from './Blog'

describe('Blog component tests', () => {
  let blog = {
    title: 'Testing blog',
    author: 'Test Bot',
    url: 'https://fullstackopen.com/',
    likes: 0,
  }

  let mockHandler = jest.fn()

  test('renders title and author', () => {
    const component = render(<Blog blog={blog} mockHandler={mockHandler} />)
    expect(component.container).toHaveTextContent('Testing blog - Test Bot')
  })

  test('url and likes check', () => {
    const component = render(<Blog blog={blog} mockHandler={mockHandler} />)

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
  })

  test('double click on the button and increase the likes', () => {
    const component = render(<Blog blog={blog} mockHandler={mockHandler} />)

    const button = component.getByText('view')
    fireEvent.click(button)

    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(component.container).toHaveTextContent(blog.likes + 2)
  })
})
