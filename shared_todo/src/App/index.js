import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./index.css";

//components
import Nav from "../components/Nav";
import Home from "../components/Home";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import List from "../components/List";

const users = [
  {
    id: "1",
    userName: "bkillins",
    password: "12345678",
    email: "brad@app.com",
    fName: "Brad",
    lName: "Killins"
  },
  {
    id: "2",
    userName: "amiller",
    password: "12345678",
    email: "andrew@app.com",
    fName: "Andrew",
    lName: "Miller"
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users };
    this.OnNewUser = this.OnNewUser.bind(this);
  }

  OnNewUser(user) {
    const newUsers = this.state.users;
    newUsers.push(user);
    this.setState({ users: newUsers });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login">
              <Login users={this.state.users} />
            </Route>
            <Route path="/signup">
              <SignUp users={this.state.users} OnNewUser={this.OnNewUser} />
            </Route>
            <Route path="/list">
              <List users={this.state.users} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
