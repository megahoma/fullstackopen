import { getAll, createNew, vote } from '../service/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE': {
      return state.map((anecdote) =>
        anecdote.id === action.data
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    }
    default:
      return state
  }

  return state
}

export const createAnecdote = (data) => {
  return async (dispatch) => {
    const newAnecdotes = await createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdotes,
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    await vote({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'VOTE',
      data: anecdote.id,
    })
  }
}

export const initAnecdotes = (anecdotes) => {
  return async (dispatch) => {
    const anecdotes = await getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer
