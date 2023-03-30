import { useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_BOOKS } from "../queries/queries"

const Books = () => {
  const [ filter, setFilter ] = useState(null)
  const { data } = useQuery(ALL_BOOKS)

  const books = data?.results

  const booksToBePresented = filter
    ? books.filter((book) => book.genres.includes(filter))
    : books

  let genres = books?.map((book) => book.genres)
  genres = new Set(genres?.flat())

  const handleFilter = (genre) => {
    setFilter(genre)
  }

  return (
    <div>
      <h2>books</h2>

      <table>
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
      <div>
        {
          [...genres].map((genre, idx) => {
            return (
              <button key={idx} onClick={() => handleFilter(genre)} >{genre}</button>
            )
          })
        }
        <button onClick={() => handleFilter(null)} >all genres</button>
      </div>
    </div>
  )
}

export default Books
