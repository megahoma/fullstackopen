import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const filter = state.filter
    const anecdotes = state.anecdotes
    if (filter === null) return anecdotes

    return anecdotes.filter((anecdote) => anecdote.content.indexOf(filter) > -1)
  })

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(voteAnecdote(anecdote))

    dispatch(setNotification(`You voted ${anecdote.content}'`, 5))
  }

  return (
    <>
      {anecdotes.sort((a, b) => (a.votes > b.votes ? -1 : 1)) &&
        anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
