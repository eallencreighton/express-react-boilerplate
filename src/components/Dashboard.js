import React from "react"
//import axios from "axios"
//import { getToken } from "../services/tokenService"
import Logout from "./Logout"
import Songs from './Songs'
import Song from './Song'
import Admin from './Admin'
import filteredSongs from './filteredSongs'
import contentFilteredSongs from './contentFilteredSongs'
import { Link, Route, Redirect } from 'react-router-dom'
import axios from 'axios'

class Dashboard extends React.Component {
  state = {
    titleSearch: '',
    songFile: '',
    songComposer: '',
    songTitle: '',
    vocabString: '',
    songs: [],
    isHidden: true,
    lastFetch: () => {}
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = async e => {
    e.preventDefault();
   
    let res = await axios.get(`/content/${this.state.vocabString}`)
    console.log(res)
    //} else {let res = await axios.get('/songs')}
    
    this.setState({ songs: res.data, lastFetch: this.handleSubmit})
    // 1. Get the user's token
    // 2. Send a POST to /todo with
    //  a - the body containing the TODO we wish to post
    //  b - the Authorization Header Bearer <token>
    
  }
  titleSubmit = async e => {
    e.preventDefault();
   
    let res = await axios.get(`/title/${this.state.titleSearch}`)
    console.log(res)
    //} else {let res = await axios.get('/songs')}
    
    this.setState({ songs: res.data, lastFetch: this.titleSubmit })
    // 1. Get the user's token
    // 2. Send a POST to /todo with
    //  a - the body containing the TODO we wish to post
    //  b - the Authorization Header Bearer <token>
    
  }

  filteredRefresh = () => {

  }

  refresh = async () => {
    //if (this.vocabString) {
      let res = await axios.get(`/songs`)
    console.log('res from refresh',res)
    //} else {let res = await axios.get('/songs')}
    
    this.setState({ songs: res.data, lastFetch: this.refresh })

  }
  // removePost = async id => {
  //   await axios.delete(`/songs/${id}`)
  //   this.refresh()
  // }
  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }
  



  async componentDidMount() {
    // 1. When the dashboard loads, get the user's token
    
    let res = await axios.get('/songs')
    this.setState({ songs: res.data, lastFetch: this.refresh })
    console.log('from dashbaord',this.props.user)
  }

  render() {
    return (
      <div>
        <h1>Lets*</h1>
        <p>* Learn English Through Song. Welcome {this.props.user.firstName}!</p>
        <Logout setUser={this.props.setUser}/>
         <p><Link to='/Admin' >ADMIN </Link></p><p><Link to='/' > DASHBOARD</Link></p> 
        {/* <button onClick={this.toggleHidden.bind(this)} >
          toggle admin<p><Link to='/Admin' >ADMIN</Link></p>
        </button> */}

         <Route 
         exact
         path="/Admin"
         
         render={() =>

        (this.props.user.role === "Administrator" ) ? 
        <Admin refresh={this.refresh} />
        : <Redirect to="/"/>
         }
         
        /> 
        <form onSubmit={this.titleSubmit}>
          <label htmlFor="titleSearch">Search by title</label>
          <input name="titleSearch" type="text" id="titleSearch" value={this.state.titleSearch} onChange={this.handleChange}/>
          <input id="submit" type="submit" value="Submit search" />
        </form>

        <form onSubmit={this.handleSubmit}>
          <p><label htmlFor="vocabString">Search by Vocab Word</label>
          <input name="vocabString" type="text" id="vocabString" value={this.state.vocabString} onChange={this.handleChange}/>
          <input id="submit" type="submit" value="Submit search" /></p>
        </form>

        <p><button onClick={this.refresh}>Clear Filter</button></p>
        <Songs songs={this.state.songs} refresh={this.state.lastFetch} user={this.props.user}/>
        {/* <p><Link to='/songs' >Click here to see all the songs!</Link></p> */}
        {/* <Route path='/songs' component={Songs} vocabString={this.vocabString} removeSong={this.removeSong} user={this.props.user}/> */}
        <Route path='/songs/:song_id'  render={(props) => <Song {...props} user={this.props.user} removeSong={this.removeSong} />} />
     
        <Logout setUser={this.props.setUser}/>
      </div>
    );
  }
}

export default Dashboard;