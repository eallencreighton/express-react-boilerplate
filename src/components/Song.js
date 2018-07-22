import React, { Component } from 'react'


import axios from 'axios'

class Song extends Component {
    state = {
        song: {}
    }

    getSong = async (props) => {
        const { song_id } = props.match.params
        const response = await axios.get(`/songs/${song_id}`)
        this.setState({ song: response.data })
        
        
    }
    removeSong = () => {
        console.log(this, this.state.song._id)
        axios.delete(`/songs/${this.state.song._id}`)
        //.then(this.refresh);
      };

    componentDidMount () {
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
            <ul>
                <li>{this.state.song.title}</li>
                <li>
                {this.state.song.composer}</li>
                <li>
                {this.state.song.link}</li>
                <li>
                {JSON.stringify(this.state.song.comments)}</li>
                {/* <li>
                    <ul>
                    {Object.keys(this.state.song).map(key => (
                        <li key={key}>{this.state.song[key]}<li/>
                    ))}
                    </ul>
                <li>   */}
            </ul>
        )
    }
}

export default Song