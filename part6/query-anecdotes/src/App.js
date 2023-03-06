import { useQuery } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import ErrorHandler from './components/ErrorHandler'
import Notification from './components/Notification'
import anecdoteServices from './services/anecdoteServices'

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const { data: anecdotes, isError } = useQuery(
    'anecdotes', anecdoteServices.getAll, {
      retry: 1,
      refetchOnWindowFocus: false
    }
  )

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
