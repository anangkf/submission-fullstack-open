import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS, ME } from '../queries/queries'

const tdStyle = {
  padding: '0px 12px'
}

const Recommend = () => {
  const { data } = useQuery(ALL_BOOKS)
  const { data: user } = useQuery(ME)

  const books = data?.results

  const booksToBePresented = books?.filter(({ genres }) => genres.includes(user?.me.favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{user?.me.favoriteGenre}</b></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToBePresented?.map((a) => (
            <tr key={a.title}>
              <td style={tdStyle} >{a.title}</td>
              <td style={tdStyle} >{a.author.name}</td>
              <td style={tdStyle} >{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend