import React from "react";
import "./index.css";

import AddNew from "../AddNew";
import Todo from "../Todo";

const todos = [
  {
    id: "001",
    owner: "brad@app.com",
    authReadUsers: [],
    authWriteUsers: [],
    title: "Read 'C# for the rest of us'",
    tasks: [
      {
        id: "001",
        description: "Finish Reading Ch 2",
        due: "2020-12-18-00:00:00",
        complete: true
      },
      {
        id: "002",
        description: "Ch 2 Exercise",
        due: "2020-12-18-00:00:00",
        complete: false
      }
    ]
  },
  {
    id: "002",
    owner: "andrew@app.com",
    authReadUsers: ["brad@app.com"],
    authWriteUsers: [],
    title: "Add Accessibility",
    tasks: [
      {
        id: "001",
        description: "Link Labels",
        due: "2020-11-06-17:00:00",
        complete: false
      }
    ]
  }
];

class List extends React.Component {
  constructor() {
    super();
    this.state = { todos };
  }
  NewTask() {
    //only the render() method should contain JSX, this should accept data and store it into state
    return (
      <div className="createTodo">
        <label htmlFor="Title">
          Title:
          <input name="Title" type="text"></input>
        </label>
        <label htmlFor="AuthorizedUsersRead">
          Any authorized users to read?
          <input name="AuthorizedUsersRead" type="text"></input>
        </label>
        <label htmlFor="AuthorizedUsersWrite">
          Any authorized users to write?
          <input name="AuthorizedUsersWrite" type="text"></input>
        </label>
      </div>
    );
  }

  render() {
    return (
      <section className="list">
        <h2>List of To-Dos:</h2>
        {this.state.todos.map((todo) => (
          <Todo
            title={todo.title}
            tasks={todo.tasks}
            key={todo.id}
            parentId={todo.id}
          />
        ))}
        {/* Shouldn't this be "Add A ToDo"? */}
        <button onClick={this.NewTask}>Add Todo</button>
      </section>
    );
  }
}
export default List;
