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
      <div>
        <h3>Add Comment</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} name="title" placeholder='Comment title' /><br />
          <textarea type="text" onChange={this.handleChange} name="body" placeholder='Comment description' /><br />
          <input type="submit" value="Add Comment" />
        </form>
      </div>
    )
  }
}

export default AddComment