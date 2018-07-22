import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

class Songs extends Component {
    state = {
        songs: []
    }
    async componentDidMount() {
       //get all posts from the database
       const response = await axios.get('/songs')
       // store the posts in state
       this.setState({ songs:response.data })
       console.log('role from songs', this.props)
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
        {this.state.songs.map(song => (
          <p>
              <Link key={song._id} to={`/songs/${song._id}`}>{song.title}</Link>
              {/* {button} */}
            </p>
      ))}
      </div>
    )
  }
}

export default Songs
