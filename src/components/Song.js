import React, { Component } from 'react'
import Comment from  './Comment'
import AddComment from  './AddComment'
import axios from 'axios'

class Song extends Component {
    state = {
        song: {},
        googleId: ''
    }
    refresh = () => {

    }

    getSong = async (props=this.props) => {
        
        const { song_id } = props.match.params
        const response = await axios.get(`/songs/${song_id}`)
        const googleId = await response.data.link.split('/')[5]
        console.log(googleId)
        this.setState({ song: response.data, googleId })
        
        
    }
    removeSong = () => {
        console.log(this, this.state.song._id)
        axios.delete(`/songs/${this.state.song._id}`)
        //.then(this.refresh);
      };

    componentWillMount () {
        this.getSong(this.props)
  
        
    }

    componentWillReceiveProps(newProps) {
        this.getSong(newProps);
    }

    render() {
        return (
            <div className="song">
                <div className="song-center">
                    <div className="title-container">
                        <h3>{this.state.song.title}</h3>
                        <p>
                        {this.state.song.composer}</p>
                    </div>
                    <div className="iframe-wrapper">
                        <div className="top"></div>
                        <iframe src={`https://docs.google.com/viewer?srcid=${this.state.googleId}&pid=explorer&efh=false&a=v&chrome=false&embedded=true`} width="100%" height="480px"></iframe>
                        <div className="side"></div>
                        <div className="bottom"></div>
                    </div>
                <div className="comments">
                {this.state.song.comments
                        ? this.state.song.comments.map(comment => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                    />
              
                        ))
                    : null}
                    <AddComment
                    songId={this.props.match.params.song_id}
                    user={this.props.user}
                    refresh={this.getSong}
                    />
                </div>
            
            </div>
           </div>
        )
    }
}

export default Song