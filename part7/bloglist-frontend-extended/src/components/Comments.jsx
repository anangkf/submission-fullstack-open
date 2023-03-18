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
      <h3 className='text-lg font-bold'>comments</h3>
      <form onSubmit={handleSubmit} className='flex gap-2 items-center'>
        <input className="border-2 border-gray-700 rounded-md px-1" type="text" value={content} onChange={handleChange} />
        <button className="bg-blue-400 hover:bg-blue-500 px-2 rounded-sm my-2" type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id} className='px-2 bg-gray-200 my-2 rounded-sm w-max'>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments