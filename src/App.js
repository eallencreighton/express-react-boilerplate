import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  // componentDidMount () {
  //   axios
  //     .get('/healthcheck')
  //     .then(response => {
  //       console.log(response.data)
  //     })
  // .catch(error => {
  //   this.setState({error: error})
  // })
  // }
  // THIS IS CALLED A TRY CHECK WITH ASYNC AWAIT< REPLACES PROMISE
  async componentDidMount () {
    try {
      const response = await axios.get('/healthcheck')
      console.log('hello')
      //  won't run until promise is complete!
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  render () {
    // if (this.state.error) return <div>Somtheing went wrong!</div>
    // This is what you would have to do.... if no try catch
    return (
      <div>Hello there,</div>
    )
  }
}

export default App
