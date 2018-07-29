import React from "react"
//import axios from "axios"
//import { getToken } from "../services/tokenService"
import Logout from "./Logout"
import Songs from './Songs'
import Song from './Song'
import Admin from './Admin'
import { Link, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import letsImage from './lets-image.png' 

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

  scrollToSongs () {
    const el = document.querySelector('.songs')
    var rect = el.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
    window.scrollTo({
      top: rect.top,
      behavior: "smooth"
    });
  }

  scrollToTop() {
    console.log('clicked')
    window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
  }

  removeHash () { 
    // window.history.replaceState({}, "", "");
    if (window.history.pushState) {
      var newurl = '';
      window.history.pushState({path:newurl},'',newurl);
  }
}



  
   handleClearFilter = () => {
     this.scrollToTop()
     this.refresh()
     this.removeHash()
   }
  




  async componentDidMount() {
    // 1. When the dashboard loads, get the user's token
    
    let res = await axios.get('/songs')
    this.setState({ songs: res.data, lastFetch: this.refresh })

  }

  render() {
    return (
      <div>
      <main className="wrapper">
        <div className="filters">
        <h1>Lets*</h1>
        <p>* Learn English Through Song. Welcome {this.props.user.firstName}!</p>
        {/* <Logout setUser={this.props.setUser}/> */}
         <div class="nav-links"><Link to='/Admin' >Admin </Link><Link to='/' > Dashboard</Link><Logout setUser={this.props.setUser}/></div> 


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
       
        {/* <p>Search for any song we've worked on in class by title or vocabulary word.  Please leave any questions as comments under each song. Happy learning!</p>  */}
        <h2>Search for songs:</h2>
          <div className="input-container">
            <label htmlFor="titleSearch">by title: </label>
            <input name="titleSearch" type="text" id="titleSearch" value={this.state.titleSearch} onChange={this.handleChange}/>
          </div>
          <div className="input-container">
            <div className="button-container">
              <input id="submit" type="submit" value="Get Songs" onClick={this.scrollToSongs}/>
            </div>
          </div>
        </form>

        <form onSubmit={this.handleSubmit}>
          <div className="input-container">
            <label htmlFor="vocabString">by vocabulary word: </label>
            <input name="vocabString" type="text" id="vocabString" value={this.state.vocabString} onChange={this.handleChange}/>
          </div>
          <div className="input-container">
            <div className="button-container">
              <input id="submit" type="submit" value="Get Songs" onClick={this.scrollToSongs}/>
            </div>
          </div>
        </form>

        
        </div>
         <div class="image">
          <img src={letsImage} alt="woman with imaginary music notes coming out of her head"/>
         </div>
        
      </main>
      <div className="songs">
      <div className=" center ">
         <div>
        <Songs songs={this.state.songs} refresh={this.state.lastFetch} user={this.props.user}/>
        {/* <p><Link to='/songs' >Click here to see all the songs!</Link></p> */}
        {/* <Route path='/songs' component={Songs} vocabString={this.vocabString} removeSong={this.removeSong} user={this.props.user}/> */}
        <Route path='/songs/:song_id'  render={(props) => <Song {...props} user={this.props.user} removeSong={this.removeSong} />} />
        
      </div>
      </div>
      
      <Link to="/">
      <p className="clear-filter"><button onClick={this.handleClearFilter}>Clear filter and search again</button></p></Link>
      </div>
      </div>
    );
  }
}

export default Dashboard;