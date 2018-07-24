import React, { Component } from 'react'


import axios from 'axios'

class Song extends Component {
    state = {
        song: {},
        googleId: ''
    }

    getSong = async (props) => {
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
        //console.log(JSON.stringify(this.state.song.comments))
        //const { comments } = JSON.stringify(this.state.song.comments)
    //     var json = JSON.stringify(this.state.song.comments)
    // var arr = [];
    // Object.keys(json).forEach(function(key) {
    //   arr.push(json[key]);
    // });
    // var arr = [];
    //   Object.keys(this.state.song.comments).forEach((comment, index) => {
    //           this.state.song.comments[comment].forEach((obj, idx) => {
    //               arr.push(obj.body)
    //           })
    //       })
          
     //arr = arr.filter((x, i, a) => a.indexOf(x) == i) // remove duplicate entries

     //Questions
//console.log(arr);
        return (
            <div>
                <p>{this.state.song.title}</p>
                <p>
                {this.state.song.composer}</p>
               
                <iframe src={`https://docs.google.com/viewer?srcid=${this.state.googleId}&pid=explorer&efh=false&a=v&chrome=false&embedded=true`} width="580px" height="480px"></iframe>
                <li>
                {JSON.stringify(this.state.song.comments)}</li>
                {/* <li>
                    <ul>
                    {Object.keys(this.state.song).map(key => (
                        <li key={key}>{this.state.song[key]}<li/>
                    ))}
                    </ul>
                <li>   */}
            </div>
           
        )
    }
}

export default Song