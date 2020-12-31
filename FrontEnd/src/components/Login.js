import React from "react";
import { Redirect } from "react-router-dom";
import { postFetch } from "../fetch";
//import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// const useStyles = makeStyles({
//   root: {
//     margin: "1em",
//     backgroundColor: "rgba(100,100,100,0.8)"
//   }
// });

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
    const name = e.target.name;
    const value = e.target.value;
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
        <h3>Please Login</h3>
        <form className="loginForm">
          <TextField
            // className={classes.root}
            name="inputLogin"
            type="text"
            label="Email"
            variant="outlined"
            value={this.state.inputLogin}
            onChange={this.handleInputChange}
          />
          <br />
          <TextField
            name="inputPassword"
            label="Password"
            variant="outlined"
            type="password"
            value={this.state.inputPassword}
            onChange={this.handleInputChange}
          ></TextField>
          <br />
          <Button
            className="formLine"
            onClick={this.handleSubmitOnClick}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
        <div>
          <p>{this.state.errorMsg}</p>
          {this.state.redirect}
        </div>
      </div>
    );
  }
}
export default Login;
