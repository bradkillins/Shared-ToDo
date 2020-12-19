import React from "react";
import "./index.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.props.SetUserOnLogin(null);
  }

  render() {
    return (
      <div className="home">
        <h1>Welcome to Shared To-Dos!</h1>
        <p>A demonstration Todo app!</p>
        <br />
        <p>Create, edit, and delete Todos that support multiple tasks each.</p>
        <p>
          When a Todo is created you can set the user you'd like to share it
          with!
        </p>
      </div>
    );
  }
}

export default Home;
