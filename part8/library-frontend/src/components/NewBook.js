import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ADD_BOOK } from '../queries/mutations'
import { ALL_AUTHORS, ALL_BOOKS } from '../queries/queries'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ addBook ] = useMutation(ADD_BOOK, {
    // refetchQueries: [{query: ALL_BOOKS}, {query: ALL_AUTHORS}],
    onError: (error) => {
      alert(error?.graphQLErrors[0].message)
    },
    onCompleted: (res) => {
      alert(`${res.addBook.title} added to the list`)
    },
    update: (cache, res) => {
      cache.updateQuery({ query: ALL_BOOKS }, ({ results }) => {
        return {
          results: [ ...results, res.data.addBook ]
        }
      })
      cache.updateQuery({ query: ALL_AUTHORS }, ({ results }) => {
        const isAuthorExist = results.find((author) => author.name === res.data.addBook.author.name)
        if (!isAuthorExist) {
          return {
            results: [ ...results, res.data.addBook.author ]
          }
        }
      })
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    addBook({ variables: { title, author, published, genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook