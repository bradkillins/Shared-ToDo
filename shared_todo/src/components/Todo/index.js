import React from "react";
import Task from "../Task";
import "./index.css";

//import Todo from "../Todo";

class Todo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="todo">
        <h3>{this.props.title}</h3>
        {this.props.tasks.map((task) => (
          <Task task={task} key={this.props.parentId + "-" + task.id} />
        ))}
      </div>
    );
  }
}
export default Todo;
