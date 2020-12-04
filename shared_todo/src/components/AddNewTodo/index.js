import React from "react";
import "./index.css";
import Task from "../Task";
import Todo from "../Todo";
import List from "../List";

class AddNewTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      owner: "",
      authReadUsers: [],
      authWriteUsers: [],
      title: "",
      tasks: []
    };

    this.PassBackFunction = this.PassBackFunction.bind(this);
    this.InputChanged = this.InputChanged.bind(this);
  }
  PassBackFunction() {
    this.props.newToDo(this.state);
    console.log(this.state);
  }

  InputChanged(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="createTodo">
        <label htmlFor="Title">
          Title:
          <input name="title" type="text" onChange={this.InputChanged}></input>
        </label>
        <p></p>
        <label htmlFor="AuthorizedUsersRead">
          Any authorized users to read?
          <input name="AuthorizedUsersRead" type="text"></input>
        </label>
        <p></p>
        <label htmlFor="AuthorizedUsersWrite">
          Any authorized users to write?
          <input name="AuthorizedUsersWrite" type="text"></input>
        </label>
        <p></p>
        <button type="submit" onClick={() => this.PassBackFunction()}>
          Submit
        </button>
      </div>
    );
  }
}

export default AddNewTodo;
