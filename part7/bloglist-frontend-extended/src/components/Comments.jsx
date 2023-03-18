import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../store/features/blogSlice'

const Comments = ({blog}) => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setContent(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addComment({id: blog.id, content}))
    setContent('')
  }

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" value={content} onChange={handleChange} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id} >{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments