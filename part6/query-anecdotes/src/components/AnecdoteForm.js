import { useMutation } from 'react-query'
import anecdoteServices from '../services/anecdoteServices'
import queryClient from '../queries/queryClient'

const AnecdoteForm = () => {

  const newAnecdoteMutation = useMutation(anecdoteServices.create, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', [...anecdotes, newAnecdote])
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if(content.length < 5) return alert('too short anecdote, must have length 5 or more')
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
