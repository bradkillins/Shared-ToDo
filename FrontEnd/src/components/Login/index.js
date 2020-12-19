import React from "react";
import { Redirect } from "react-router-dom";
import "./index.css";
import { postFetch } from "../../fetch";

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      inputLogin: "",
      inputPassword: "",
      errorMsg: "",
      redirect: null,
      fetching: false
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

    this.setState({ errorMsg: "Loading..." });
    const loginName = this.state.inputLogin;
    const loginPass = this.state.inputPassword;
    const postBody = {
      email: loginName,
      password: loginPass
    };

    postFetch("http://localhost:5000/api/login", postBody).then((res) => {
      console.log(res);
      if (res.success) {
        this.props.SetUserOnLogin(res.user);
        this.setState({ redirect: "/list" });
      } else {
        if (res.msg.message === "Failed to fetch")
          this.setState({
            errorMsg:
              "Error communicating with server - Is the backend running?"
          });
        else {
          this.setState({ errorMsg: res.msg });
        }
      }
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
        <form className="loginForm">
          <label htmlFor="inputLogin">User Name:</label>
          <br />
          <input
            name="inputLogin"
            type="text"
            value={this.state.inputLogin}
            onChange={this.handleInputChange}
            placeholder="enter email"
          />
          <br />
          <label htmlFor="inputPassword">Password:</label>
          <br />
          <input
            name="inputPassword"
            type="password"
            value={this.state.inputPassword}
            onChange={this.handleInputChange}
          />
          <br />
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
