import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

class Songs extends Component {
    state = {
        songs: []
        //vocabString: this.props.vocabString
    }
    refresh = async () => {
      const res = await axios.get('/songs')

      //const response = await axios.get(`/content/${this.state.vocabString}`)
console.log(res.songs)
      this.setState({ songs: res })
  
    }
    removePost = async id => {
      await axios.delete(`/songs/${id}`)
      this.refresh()
    }
    async componentDidMount() {
       //get all posts from the database
       //const response = await axios.get('/songs')
       // store the posts in state
       //this.setState({ songs:response.data })

       //this.refresh()
       console.log(this.props.vocabString, this.props.songs)
    }
    componentWillReceiveProps(newProps) {
      console.log(newProps);
      this.setState({ songs: newProps.songs })
  
  }
  render () {
    //      const isAdmin = this.props.role === "Administrator";
    //     let button;

    // if (isAdmin) {
    //   button = <button onClick={this.removeSong}>Remove Song</button>
    // } else {
    //   button = ''
    // }
    return (
    <div>
      <h1>Songs</h1>
      <ul>
        {this.state.songs.map(song => (
          <li>
              <Link key={song._id} to={`/songs/${song._id}`}>{song.title}</Link>
              <p> - <a href='#' onClick={() => this.removePost(song._id)}>Delete Post</a></p>
            </li>
      ))}
      </ul>
      </div>
    )
  }
}

export default Songs
