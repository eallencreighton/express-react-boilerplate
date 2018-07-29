import React, { Component } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
const urlRoot = 'https://www.googleapis.com/drive/v3/files/'
const urlParams = '/export?mimeType=text/plain&key=AIzaSyBAhr2oTrgFowtilVYdFGwLcYTw_WzdJmI'


class Admin extends Component {
  state = {
    titleSearch: '',
    songFile: '',
    songComposer: '',
    songTitle: '',
    vocabString: '',
    users: []
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit = async e => {
   

  }
  songPost = async (e) => {
    e.preventDefault()
    const id = await this.state.songFile.split('/')[5]
    const docText = await axios.get(`${urlRoot}${id}${urlParams}`)
    //this.setState({vocabString: docText.data})

    await axios.post('/songs', {
      title: this.state.songTitle,
      composer: this.state.songComposer,
      link: this.state.songFile,
      vocabString: docText.data
    })
    .then(function (response) {

    })
    .catch(function (error) {
      console.log(error);
    })
    this.props.refresh()
  }
  scrollToSongs () {
    const el = document.querySelector('.songs')
    var rect = el.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
    window.scrollTo({
      top: rect.top,
      behavior: "smooth"
    });
  }

  async componentDidMount() {
    //get all posts from the database
    const response = await axios.get('/users')
    // store the posts in state
    this.setState({ users:response.data })
 }
  render() {
    return (
        <div className="admin">
            <form onSubmit={this.songPost} id="addSongForm">
                <h2>Enter songs here:</h2>
                <div className="input-container">
                <label htmlFor="songTitle">Title (required) </label>
                <input name="songTitle" type="text" id="songTitle" value={this.state.songTitle} onChange={this.handleChange}/>
                </div>
                <div className="input-container">
                <label htmlFor="songComposer">Composer (required) </label>
                <input name="songComposer" type="text" id="songComposer" value={this.state.songComposer} onChange={this.handleChange}/>
                </div>
                <div className="input-container">
                <label htmlFor="songFile">File (required) </label>
                {/* Figure out if pdf file is not a string */}
                <input name="songFile" type="text" id="songFile" value={this.state.songFile} onChange={this.handleChange}/>
                </div>
                <div className="input-container">
                <input onClick={this.scrollToSongs} id="submitSong" type="submit" value="Submit song" />
                </div>
            </form>
            <h2>Class participants</h2>
            {this.state.users.map(user => (
          <p>
              {user.firstName} {user.lastName}, {user.email}
              
            </p>
      ))}
        </div>
    )
  }
}

export default Admin;
