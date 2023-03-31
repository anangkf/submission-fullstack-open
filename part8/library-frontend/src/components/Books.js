import { useApolloClient, useLazyQuery, useQuery, useSubscription } from "@apollo/client"
import { useState } from "react"
import { ALL_BOOKS, BOOK_SUBSCRIPTION } from "../queries/queries"

const Books = () => {
  const [ filter, setFilter ] = useState(false)
  const { data, loading } = useQuery(ALL_BOOKS)
  const [ filterBooks, { data: filteredBooks, loading: filterLoading } ] = useLazyQuery(ALL_BOOKS)
  const client = useApolloClient()
  const loadingState = loading || filterLoading

  useSubscription(BOOK_SUBSCRIPTION, {
    onData: ({ data }) => {
      const { bookAdded } = data.data
      alert(`a new book, '${bookAdded.title}' is added!`)

      const uniqById = (arr) => {
        let seen = new Set()
        return arr.filter((item) => {
          let identifier = item.id
          return seen.has(identifier) ? false : seen.add(identifier)
        })
      }

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ results }) => {
        return {
          results: uniqById(results.concat(bookAdded)),
        };
      });
    },
  });

  const books = data?.results

  const booksToBePresented = filter
    ? filteredBooks?.results
    : books

  let genres = books?.map((book) => book.genres)
  genres = new Set(genres?.flat())

  const handleFilter = (genre) => {
    setFilter(true)
    filterBooks({ variables: { genre } })
  }

  return (
    <div>
      <h2>books</h2>
      { loadingState
        ? <p>Loading...</p>
        : <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {booksToBePresented?.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
      <div>
        {
          [...genres].map((genre, idx) => {
            return (
              <button key={idx} onClick={() => handleFilter(genre)} >{genre}</button>
            )
          })
        }
        <button onClick={() => setFilter(false)} >all genres</button>
      </div>
    </div>
  )
}

export default Books
