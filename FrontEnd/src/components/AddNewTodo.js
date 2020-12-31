import React from "react";

class AddNewTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authUsers: "",
      title: ""
    };
    this.InputChanged = this.InputChanged.bind(this);
  }

  InputChanged(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="todo">
        <label htmlFor="Title">Title:</label>
        <br />
        <input name="title" type="text" onChange={this.InputChanged}></input>
        <br />
        <label htmlFor="authUsers">Share with: (user email)</label>
        <br />
        <input
          name="authUsers"
          type="text"
          onChange={this.InputChanged}
        ></input>
        <br />
        <button type="submit" onClick={() => this.props.newToDo(this.state)}>
          Submit
        </button>
      </div>
    );
  }
}

export default AddNewTodo;
