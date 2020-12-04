import React from "react";
import Task from "../Task";
import AddNewTask from "../AddNewTask";
import "./index.css";

class Todo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let newTask = null;
    let buttonVal = "Add Task";
    if (
      this.props.showNewTask.show &&
      this.props.showNewTask.id === this.props.parentId
    ) {
      newTask = (
        <AddNewTask
          AddToTasks={this.props.AddToTasks}
          todoId={this.props.parentId}
        />
      );
      buttonVal = "Cancel";
    }

    return (
      <div className="todo">
        <h3>{this.props.title}</h3>
        {this.props.tasks.map((task) => (
          <Task task={task} key={this.props.parentId + "-" + task.id} />
        ))}
        <button
          onClick={() => this.props.HandleNewTaskOnClick(this.props.parentId)}
        >
          {buttonVal}
        </button>
        {newTask}
      </div>
    );
  }
}
export default Todo;
