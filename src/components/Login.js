import React, { Component } from "react"
import axios from "axios"
import { setToken } from "../services/tokenService"
import { Link } from 'react-router-dom'


class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const res = await axios.post('/login', { email, password})
      const token = res.data.token
      setToken(token)

      this.props.getCurrentUser()
    } catch(e) {
      console.error(e)
    }
    // 1. POST to /auth/login, passing in the email and password in the body
    // 2. If we receive a successful response:
    //  - grab the token from the response
    //  - store it in local storage
    //  - call getCurrentUser
  };
  render() {
    return (
      <div className="login">
        <div>
        <form onSubmit={this.handleSubmit}>
        <h1>Welcome to Lets!</h1>
          <div>
            <div className="input-container">
              <label htmlFor="login-email">Email: </label>
              <input
                type="email"
                onChange={this.handleChange}
                name="email"
                id="login-email"
                placeholder="email"
              />
            </div>
          </div>
          <div>
            <div className="input-container">
              <label htmlFor="login-password">Password: </label>
              <input
                type="password"
                onChange={this.handleChange}
                name="password"
                id="login-password"
                placeholder="Enter your desired password"
              />
            </div>
          </div>
          <div>
            <input type="submit" value="Log In" />
          </div>
        </form>
      <p>New to 'Learn English Through Song?'</p>
      <Link to='/Signup' >Sign up here</Link>
      </div>
      </div>
    )
  }
}

export default Login
