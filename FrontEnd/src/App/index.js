import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";

//components
import Nav from "../components/Nav";
import Home from "../components/Home";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import List from "../components/List";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null };
    this.SetUserOnLogin = this.SetUserOnLogin.bind(this);
  }

  SetUserOnLogin(user) {
    this.setState({ currentUser: user });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Nav
            currentUser={this.state.currentUser}
            SetUserOnLogin={this.SetUserOnLogin}
          />
          <Switch>
            <Route path="/" exact>
              <Home SetUserOnLogin={this.SetUserOnLogin} />
            </Route>
            <Route path="/login">
              <Login SetUserOnLogin={this.SetUserOnLogin} />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/list">
              <List currentUser={this.state.currentUser} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
