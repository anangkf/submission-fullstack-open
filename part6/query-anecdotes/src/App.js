import { useMutation, useQuery } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import ErrorHandler from './components/ErrorHandler'
import Notification from './components/Notification'
import queryClient from './queries/queryClient'
import anecdoteServices from './services/anecdoteServices'

const App = () => {  
  const { data: anecdotes, isError } = useQuery(
    'anecdotes', anecdoteServices.getAll, {
      retry: 1,
      refetchOnWindowFocus: false
    }
    )
    
  const updateAnecdoteMutation = useMutation(anecdoteServices.vote, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('anecdotes')
      // queryClient.setQueryData(['anecdotes', {id: variables.id}], data)
    }
  })
  
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  if(isError) return <ErrorHandler service='anecdote' />

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes?.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
