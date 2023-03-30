import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_BOOKS, ME } from '../queries/queries'

const tdStyle = {
  padding: '0px 12px'
}

const Recommend = () => {
  const [favoriteGenre, setFavoriteGenre] = useState('')
  const { data: user, loading: userLoading } = useQuery(ME, {
    onCompleted: (res) => {
      setFavoriteGenre(res.me.favoriteGenre)
    }
  })
  const { data, loading: booksLoading } = useQuery(ALL_BOOKS, { variables: { genre: favoriteGenre } })

  const loading = userLoading || booksLoading
  const books = data?.results

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{user?.me.favoriteGenre}</b></p>

      {loading
        ? <p>Loading...</p>
        : <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books?.map((a) => (
              <tr key={a.title}>
                <td style={tdStyle} >{a.title}</td>
                <td style={tdStyle} >{a.author.name}</td>
                <td style={tdStyle} >{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  )
}

export default Recommend