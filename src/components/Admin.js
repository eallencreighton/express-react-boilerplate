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
    e.preventDefault();
    // Grab email and password out of state
    const { email, password, firstName, lastName, role } = this.state
    try {
      const res = await axios.post("/signup", { email, password, firstName, lastName, role})
      this.props.setUser(res.data)
    } catch (e) {
      console.error(e)
    }
    console.log("submitted!")
  }
  songPost = async (e) => {
    e.preventDefault()
    const id = await this.state.songFile.split('/')[5]
    const docText = await axios.get(`${urlRoot}${id}${urlParams}`)
    //this.setState({vocabString: docText.data})
    console.log(docText.data)
    await axios.post('/songs', {
      title: this.state.songTitle,
      composer: this.state.songComposer,
      link: this.state.songFile,
      vocabString: docText.data
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  async componentDidMount() {
    //get all posts from the database
    const response = await axios.get('/users')
    // store the posts in state
    this.setState({ users:response.data })
 }
  render() {
    return (
        <div>
            <form onSubmit={this.songPost} id="addSongForm">
                <h2>Enter your song here</h2>
                <label htmlFor="songTitle">Title (required)</label>
                <input name="songTitle" type="text" id="songTitle" value={this.state.songTitle} onChange={this.handleChange}/>
                <label htmlFor="songComposer">Composer (required)</label>
                <input name="songComposer" type="text" id="songComposer" value={this.state.songComposer} onChange={this.handleChange}/>
                <label htmlFor="songFile">File (required)</label>
                {/* Figure out if pdf file is not a string */}
                <input name="songFile" type="text" id="songFile" value={this.state.songFile} onChange={this.handleChange}/>
                <input id="submitSong" type="submit" value="Submit song" />
                <p>Your song is: {this.state.songTitle}</p>
            </form>
            <h3>Class participants</h3>
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
