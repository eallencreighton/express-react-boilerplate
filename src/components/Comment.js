import React from 'react'

const Comment = ({ comment }) => (
  <div>
    <h3>{comment.title}</h3>
    <p>{comment.body}</p>
    <em>by {comment.user.firstName} {comment.user.lastName}</em>
  </div>
)

export default Comment
