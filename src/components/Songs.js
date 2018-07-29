import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import { userInfo } from 'os';

class Songs extends Component {
    state = {
        songs: []
        //vocabString: this.props.vocabString
    }

    // do I need three different types of refresh?
    // refresh = async () => {
    //   const res = await axios.get('/songs')
    //   this.setState({ posts: res.data })
  
    // }
    removePost = async id => {
      await axios.delete(`/songs/${id}`)
      this.props.refresh()
    }
    async componentDidMount() {
       //get all posts from the database
       //const response = await axios.get('/songs')
       // store the posts in state
       //this.setState({ songs:response.data })

       //this.refresh()

    }
    componentWillReceiveProps(newProps) {

      this.setState({ songs: newProps.songs })
  
  }

  // adminOnlyDeleteLine = () => {
  //   if(something) {
  //     return (
  //       <p>Im an admin!</p>
  //     )
  //   }
  // }
  render () {
    //      const isAdmin = this.props.role === "Administrator";
    //     let button;

    // if (isAdmin) {
    //   button = <button onClick={this.removeSong}>Remove Song</button>
    // } else {
    //   button = ''
    // }
    return (
    <div className="songs-listing">
      <h2>Songs</h2>
      <ul>
        {this.state.songs.map(song => (
          <li key={song._id}>
              <Link  to={`/songs/${song._id}`}>{song.title}</Link>
              {this.props.user.role==="Administrator" ? <p> - <a href='#' onClick={() => this.removePost(song._id) }>Delete Song</a></p>: null}
            </li>
      ))}
      </ul>
      </div>
    )
  }
}

export default Songs
