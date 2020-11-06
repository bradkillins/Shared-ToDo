import React from "react";
import "./index.css";

class SignUp extends React.Component {
  constructor(props) {
    super();
    this.state = {
      userName: "Enter User Name",
      email: "Enter Email",
      fName: "First Name",
      lName: "Last Name",
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
      id: this.props.users.Length + 1,
      userName: this.state.userName,
      password: this.state.password,
      email: this.state.email,
      fName: this.state.fName,
      lName: this.state.lName
    };
    this.props.OnNewUser(newUser);
    this.setState({ msg: "New User registered! Please try logging in!" });
  }

  render() {
    return (
      <div className="signup">
        <h1>Thanks for Joining!</h1>
        <h3>Enter all the details:</h3>
        <form className="form">
          <label htmlFor="userName">
            User Name:&nbsp;
            <input
              name="userName"
              type="text"
              value={this.state.userName}
              onChange={this.handleInputChange}
            />
          </label>
          <label htmlFor="email">
            Email:&nbsp;
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </label>
          <label htmlFor="fName">
            First Name:&nbsp;
            <input
              name="fName"
              type="text"
              value={this.state.fName}
              onChange={this.handleInputChange}
            />
          </label>
          <label htmlFor="lName">
            Last Name:&nbsp;
            <input
              name="lName"
              type="text"
              value={this.state.lName}
              onChange={this.handleInputChange}
            />
          </label>
          <label htmlFor="password">
            Password:&nbsp;
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
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
