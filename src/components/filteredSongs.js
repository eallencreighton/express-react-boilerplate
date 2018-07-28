import React, { Component } from 'react'
import { Link } from 'react-router-dom'


import axios from 'axios'

class filteredSongs extends Component {
    state = {
        songs: []
    }

    searchForSong = async (props) => {

        const searchTitle = props.match.params.song_title
       
        const response = await axios.get(`/title/${searchTitle}`)

        this.setState({ songs: response.data })

    }

    componentDidMount () {
        this.searchForSong(this.props)
    }

    componentWillReceiveProps(newProps) {
        this.searchForSong(newProps);
    }

    render() {
        return (
            <ul>
                {this.state.songs.map(song => (
          <li>
              <Link key={song._id} to={`/songs/${song._id}`}>{song.title}</Link>
              <p>{song.title}</p>
                <p>
                {song.composer}</p>
                <p>
                {song.link}</p>
                <p>
                {JSON.stringify(song.comments)}</p>
              
            </li>
      ))}
                
                
            </ul>
        )
    }
}

export default filteredSongs