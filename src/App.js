import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
//import Admin from "./components/Admin"
//import Songs from './components/Songs'
//import Song from './components/Song'
//import filteredSongs from './components/filteredSongs'
//import contentFilteredSongs from './components/contentFilteredSongs'
import { getToken } from './services/tokenService';
const urlRoot = 'https://www.googleapis.com/drive/v3/files/'
const urlParams = '/export?mimeType=text/plain&key=AIzaSyBAhr2oTrgFowtilVYdFGwLcYTw_WzdJmI'

class App extends Component {
  state = {
    user: null,
    loading: false
  }

  login = async () => {
    const res = await axios.get('/users')
    return res.data[0]
    
  }

  handleChange = (e) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
        [name]: value
    })
  }

  setUser = user => {
      this.setState({ user })
  }

  getCurrentUser = async () => {
      // Try and retrieve the user's token
      const token = getToken()
      if (token) {
          try {
              const res = await axios.get('/users/current', {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              })
              const user = res.data
              this.setState({ user })
              console.log('got the user', this.state.user.role)
          } catch (e) {
              console.error(e)
          }
      }
      
      
  }

  seedAdmin = async () => {
    //const { email, password, firstName, lastName, role } = this.state
    try {
      const res = await axios.post("/signup", { email:"eallencreighton@gmail.com", password:"1234", firstName: "Esme", lastName: "Allen-Creighton", role: "Administrator"})
      console.log(res.data)
    } catch (e) {
      console.error(e)
    }

  }


  async componentDidMount() {
    //this.setState({ loading: true})
    //const user = await this.login()
    //this.setState({ user , loading: false})
    this.seedAdmin()
    this.getCurrentUser()
    console.log('getcurrent ran')
  }

  render() {
    // const { user, loading } = this.state
    // if (loading) return (<h1>Loading</h1>)
    // if (!user) return (<h1>Not logged in.</h1>)
    
    return (
      <Router>
        <div>
          <Switch>
            {/* if you hit the login, don't render any subsequent routes */}
            <Route exact path="/login" render={() => this.state.user ? <Redirect to="/" /> : <Login getCurrentUser={this.getCurrentUser} />} />
            <Route 
                exact
                path='/signup'
                render={() => this.state.user ? <Redirect to="/" /> : <Signup setUser={this.setUser} />}
            />
            {/* otherwise, if the user is logged in show them the dashboard */}
            <Route 
                path="/" 
                render={() => 
                // if there is a user set in state
                this.state.user ? <Dashboard setUser={this.setUser} user={this.state.user}/>
                // otherwise
                :
                // Redirect the user to the login screen
                <Redirect to="/login" />
                }
            />
            {/* hitting /login will lead you to the login screen */}
            <Route
                exact
                path="/login"
                render={() =>
                this.state.user ? <Redirect to="/" /> : <Login  />
                }
            />      
          </Switch>
        </div>
      </Router>
    )
  }
}
//Upload link, at that time, fetch the text content, store it in Mongo
// create content search with mongo
// delete link 
// Ad role only for CRUD
// Have google doc displayer
//add pdfs, create cread functionality on them too.
//fix UI to show when upload is complete


export default App