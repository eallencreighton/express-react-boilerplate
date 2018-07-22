import React, { Component } from 'react'
import { Link } from 'react-router-dom'


import axios from 'axios'

class contentFilteredSongs extends Component {
    state = {
        songs: []
    }

    searchForSong = async (props) => {
        console.log(props)
        const vocabString = props.match.params.vocabString
        console.log('searchTitle', vocabString)
        
        
        const response = await axios.get(`/content/${vocabString}`)

        this.setState({ songs: response.data })
        console.log(this.state.songs)
    }

    componentDidMount () {
        console.log('props',this.props)
        this.searchForSong(this.props)
    }

    componentWillReceiveProps(newProps) {
        this.searchForSong(newProps);
    }

    render() {
        return (
            
            <ul>
                <h1>test</h1>
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

export default contentFilteredSongs