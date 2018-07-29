import React from 'react'

const Comment = ({ comment }) => (
  <div className='comment-form'>
    <h3>{comment.title}</h3>
    <p>{comment.body}</p>
    <p><em>by {comment.user.firstName} {comment.user.lastName}</em> on {comment.date}</p>
  </div>
)

export default Comment
