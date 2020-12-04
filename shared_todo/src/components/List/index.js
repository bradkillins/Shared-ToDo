import React from "react";
import "./index.css";

import AddNew from "../AddNew";
import Todo from "../Todo";

const todos = [
  {
    id: "1",
    owner: "brad@app.com",
    authReadUsers: [],
    authWriteUsers: [],
    title: "Read 'C# for the rest of us'",
    tasks: [
      {
        id: "1",
        description: "Finish Reading Ch 2",
        due: "2020-12-18",
        complete: true
      },
      {
        id: "2",
        description: "Ch 2 Exercise",
        due: "2020-12-18",
        complete: false
      }
    ]
  },
  {
    id: "2",
    owner: "andrew@app.com",
    authReadUsers: ["brad@app.com"],
    authWriteUsers: [],
    title: "Add Accessibility",
    tasks: [
      {
        id: "1",
        description: "Link Labels",
        due: "2020-11-06",
        complete: false
      }
    ]
  }
];

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      todos,
      showForm: false,
      buttonTitle: "Add ToDo",
      showNewTask: { id: "", show: false }
    };
    this.HideComponent = this.HideComponent.bind(this);
    this.AddToList = this.AddToList.bind(this);
    this.AddToTasks = this.AddToTasks.bind(this);
    this.HandleNewTaskOnClick = this.HandleNewTaskOnClick.bind(this);
  }
  HideComponent() {
    if (this.state.showForm) {
      this.setState({ showForm: false, buttonTitle: "Add ToDo" });
    } else {
      this.setState({ showForm: true, buttonTitle: "Cancel" });
    }
  }

  HandleNewTaskOnClick(todoId) {
    if (this.state.showNewTask.show) {
      this.setState({
        showNewTask: { id: todoId, show: false }
      });
    } else {
      this.setState({
        showNewTask: { id: todoId, show: true }
      });
    }
  }

  AddToList(newToDo) {
    this.setState({
      todos: this.state.todos.concat(newToDo)
    });
    this.HideComponent();
  }

  AddToTasks(newTaskDetails) {
    //dates in JS suck
    const newMonth =
      newTaskDetails.due.getMonth() + 1 < 10
        ? "0" + (newTaskDetails.due.getMonth() + 1)
        : newTaskDetails.due.getMonth() + 1;
    const newDay =
      newTaskDetails.due.getDate() < 10
        ? "0" + newTaskDetails.due.getDate()
        : newTaskDetails.due.getDate();
    const newTodos = [];
    this.state.todos.forEach((todo) => {
      if (todo.id === newTaskDetails.todoId) {
        const newTask = {
          id: `${todo.tasks.length + 1}`,
          description: newTaskDetails.description,
          due: `${newTaskDetails.due.getFullYear()}-${newMonth}-${newDay}`,
          complete: false
        };
        todo.tasks.push(newTask);
      }
      newTodos.push(todo);
    });
    this.setState({ todos: newTodos });
    this.HandleNewTaskOnClick();
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
            AddToTasks={this.AddToTasks}
            HandleNewTaskOnClick={this.HandleNewTaskOnClick}
            showNewTask={this.state.showNewTask}
          />
        ))}
        <button onClick={this.HideComponent}>{this.state.buttonTitle}</button>
        <div>{this.state.showForm && <AddNew newToDo={this.AddToList} />}</div>
      </section>
    );
  }
}
export default List;
