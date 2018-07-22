import React from "react"
import axios from "axios"
import { getToken } from "../services/tokenService"
import Logout from "./Logout"
import Songs from './Songs'
import Song from './Song'
import Admin from './Admin'
import filteredSongs from './filteredSongs'
import contentFilteredSongs from './contentFilteredSongs'
import { BrowserRouter as Router, Link, Route, Redirect, Switch } from 'react-router-dom'

class Dashboard extends React.Component {
  state = {
    titleSearch: '',
    songFile: '',
    songComposer: '',
    songTitle: '',
    vocabString: ''
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    
    // 1. Get the user's token
    // 2. Send a POST to /todo with
    //  a - the body containing the TODO we wish to post
    //  b - the Authorization Header Bearer <token>
  }

  



  componentDidMount() {
    // 1. When the dashboard loads, get the user's token
    
    
    console.log('from dashbaord',this.props.user)
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <h1>Welcome {this.props.user.firstName} !</h1>
        <Logout setUser={this.props.setUser}/>
        <p><Link to='/Admin' >ADMIN</Link></p>
        <Route 
         exact
         path="/Admin"

         render={() =>

        (this.props.user.role === "Administrator" ) ? <Admin  /> : <Redirect to="/"/>
         }
        />

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="titleSearch">Search by title</label>
          <input name="titleSearch" type="text" id="titleSearch" value={this.state.titleSearch} onChange={this.handleChange}/>
          <label htmlFor="vocabString">Search by Vocab Word</label>
          <input name="vocabString" type="text" id="vocabString" value={this.state.vocabString} onChange={this.handleChange}/>
          <label htmlFor="submit">Submit</label>
          <input id="submit" type="submit" value="Submit search" />
          <p>Your search is: {this.state.titleSearch}</p>
        </form>

        <p><Link to='/songs' >Click here to see all the songs!</Link></p>
        <Route path='/songs' component={Songs} removeSong={this.removeSong} user={this.props.user}/>
        <Route path='/songs/:song_id' removeSong={this.removeSong} component={Song} />
        {/* Write another endpoint that shows songs searched by title */}
        <p><Link to={`/title/${this.state.titleSearch}`} >Click here to see all the songs from your search</Link></p>
        <Route path={`/title/:song_title`} component={filteredSongs} />
        <p><Link to={`/content/${this.state.vocabString}`} >Click here to see all the songs from your VOCAB search</Link></p>
        <Route path={`/content/:vocabString`} component={contentFilteredSongs} />
        <Logout setUser={this.props.setUser}/>
      </div>
    );
  }
}

export default Dashboard;