import React, { Component } from 'react'
import axios from 'axios'

class AddComment extends Component {
  state = {
    title: '',
    body: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { title, body } = this.state
    const { user } = this.props
    // post the comment title, post, as well as user _id
    try {
      // if successful, refresh comments
      await axios.post(`/songs/${this.props.songId}/comment`, {
        title: this.state.title,
        body: this.state.body,
        user: this.props.user._id
      })
      this.props.refresh()
    } catch (e) {
      // if failure, log the error
      console.error(e)
    }
  }
  componentWillMount = () => {

  }

  render() {
    return (
      <div className='comment-form'>
        <h3>Add Comment</h3>
        <form onSubmit={this.handleSubmit}>

          <div className="input-container">
          <p><label for="commentTitle" >Give your comment a title:</label></p>
          <input id="commentTitle" type="text" onChange={this.handleChange} name="title" placeholder='Comment title' /><br />
          </div>
          <div className="input-container">
          <p><label for="commentText" >What are you thinking?</label></p>
          <textarea id="commentText" type="text" onChange={this.handleChange} name="body" placeholder='Comment description' /><br />
          <input type="submit" value="Add Comment" />
          </div>
        </form>
      </div>
    )
  }
}

export default AddComment