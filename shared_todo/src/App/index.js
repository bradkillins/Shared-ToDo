import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";

//components
import Nav from "../components/Nav";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import List from "../components/List";

class App extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/list" component={List} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
