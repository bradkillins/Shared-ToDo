import React from "react";
import Task from "../Task";
import AddNew from "../AddNew";
import "./index.css";

//import Todo from "../Todo";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewTask: false,
      buttonVal: "Add Task"
    };
    this.handleNewTaskOnClick = this.handleNewTaskOnClick.bind(this);
  }

  handleNewTaskOnClick() {
    if (this.state.showNewTask) {
      this.setState({ showNewTask: false });
      this.state.buttonVal = "Add Task";
    } else {
      this.setState({ showNewTask: true });
      this.state.buttonVal = "Cancel";
    }
  }

  render() {
    let newTask = null;
    if (this.state.showNewTask) newTask = <AddNew />;
    return (
      <div className="todo">
        <h3>{this.props.title}</h3>
        {this.props.tasks.map((task) => (
          <Task task={task} key={this.props.parentId + "-" + task.id} />
        ))}
        <button onClick={this.handleNewTaskOnClick}>
          {this.state.buttonVal}
        </button>
        {newTask}
      </div>
    );
  }
}
export default Todo;
