import React from "react";
import Task from "./Task";
import AddNewTask from "./AddNewTask";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDelButton: false };
  }

  render() {
    let newTask = null;
    let buttonVal = "Add Task";
    if (
      this.props.showNewTask.show &&
      this.props.showNewTask.id === this.props.todoId
    ) {
      newTask = (
        <AddNewTask
          AddToTasks={this.props.AddToTasks}
          todoId={this.props.todoId}
        />
      );
      buttonVal = "Cancel";
    }
    let allTasksComplete = true;
    this.props.tasks.forEach((task) => {
      if (!task.complete) allTasksComplete = false;
    });

    return (
      <div className="todo">
        <h3>{this.props.title}</h3>
        {this.props.tasks.map((task) => (
          <Task
            task={task}
            todoId={this.props.todoId}
            key={task.id}
            OnTaskCompleteChange={this.props.OnTaskCompleteChange}
          />
        ))}
        <div className="todoButtons">
          <button
            onClick={() => this.props.ToggleNewTaskForm(this.props.todoId)}
          >
            {buttonVal}
          </button>
          {allTasksComplete && (
            <button
              className="delButton"
              onClick={() => {
                this.setState({ showDelButton: false });
                this.props.DeleteTodo(this.props.todoId);
              }}
            >
              Delete
            </button>
          )}
        </div>
        {newTask}
      </div>
    );
  }
}
export default Todo;
