import React from "react";
import { Redirect } from "react-router-dom";
import "./index.css";

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      inputLogin: "Enter User Name",
      inputPassword: "",
      errorMsg: "",
      redirect: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitOnClick = this.handleSubmitOnClick.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({ [name]: value });
  }

  handleSubmitOnClick(e) {
    e.preventDefault();
    //console.log(this.props.users);
    const users = this.props.users;
    const loginName = this.state.inputLogin;
    const loginPass = this.state.inputPassword;

    users.forEach((user) => {
      if (user.userName === loginName && user.password === loginPass) {
        this.setState({ redirect: "/list" });
      } else
        this.setState({
          errorMsg: "Sorry Username and Password not found. Try again!"
        });
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="login">
        <h1>Welcome!</h1>
        <h3>Please Login :)</h3>
        <form className="form">
          <label htmlFor="inputLogin">
            User Name:&nbsp;
            <input
              name="inputLogin"
              type="text"
              value={this.state.inputLogin}
              onChange={this.handleInputChange}
            />
          </label>
          <label htmlFor="inputPassword">
            Password:&nbsp;
            <input
              name="inputPassword"
              type="password"
              value={this.state.inputPassword}
              onChange={this.handleInputChange}
            />
          </label>
          <button onClick={this.handleSubmitOnClick}>Submit</button>
        </form>
        <div>
          <p>{this.state.errorMsg}</p>
          {this.setState.redirect}
        </div>
      </div>
    );
  }
}
export default Login;
