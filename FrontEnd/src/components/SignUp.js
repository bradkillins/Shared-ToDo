import React from "react";
import { postFetch } from "../fetch";

class SignUp extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      fName: "",
      lName: "",
      password: "",
      msg: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let newUser = {
      email: this.state.email,
      password: this.state.password,
      fName: this.state.fName,
      lName: this.state.lName
    };
    this.setState({ msg: "Loading..." });
    postFetch("http://localhost:5000/api/user/new", newUser).then((res) => {
      this.setState({ msg: `${res.msg}` });
    });
  }

  render() {
    return (
      <div className="login">
        <h1>Thanks for Joining!</h1>
        <br />
        <h3>Enter all your details:</h3>
        <form className="loginForm">
          <label htmlFor="email">Email:</label>
          <br />
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          <br />
          <label htmlFor="fName">First Name:</label>
          <br />
          <input
            name="fName"
            type="text"
            value={this.state.fName}
            onChange={this.handleInputChange}
            required
          />
          <br />
          <label htmlFor="lName">Last Name:</label>
          <br />
          <input
            name="lName"
            type="text"
            value={this.state.lName}
            onChange={this.handleInputChange}
            required
          />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
          <br />
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
        <div>
          <p>{this.state.msg}</p>
        </div>
      </div>
    );
  }
}
export default SignUp;
