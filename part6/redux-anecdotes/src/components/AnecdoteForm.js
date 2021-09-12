import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

import { createNew } from '../service/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newContent = await createNew(content)
    dispatch(createAnecdote(newContent))
    dispatch(createNotification(`Anecdote added'${content}'`))
    setTimeout(() => {
      dispatch(createNotification(null))
    }, 5000)
  }

  return (
    <>
      <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div>
            <input name="anecdote" />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </>
  )
}

export { AnecdoteForm }