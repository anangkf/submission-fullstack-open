import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries/queries"

const Books = (props) => {
  const { data } = useQuery(ALL_BOOKS)
  
  if (!props.show) {
    return null
  }

  const books = data?.results

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
          {books?.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
