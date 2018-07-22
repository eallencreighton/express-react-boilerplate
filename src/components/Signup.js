import React, { Component } from "react";
import axios from 'axios'
import { BrowserRouter as Link } from 'react-router-dom'


class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    role: "Member",
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
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
  };
  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            onChange={this.handleChange}
            name="firstName"
            id="firstName"
            placeholder="Enter your first Name"
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            onChange={this.handleChange}
            name="lastName"
            id="lastName"
            placeholder="Enter your last Name"
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            onChange={this.handleChange}
            name="email"
            id="email"
            placeholder="email"
          />
        </div>
        <div>
          <label htmlFor="email">Password: </label>
          <input
            type="password"
            onChange={this.handleChange}
            name="password"
            id="password"
            placeholder="Enter your desired password"
          />
        </div>
        <div>
          <input type="submit" value="Signup" />
        </div>
      </form>
      <p>Already a user?</p>
      <Link to='/Login' >Login here</Link>
      </div>
    )
  }
}

export default Signup;
