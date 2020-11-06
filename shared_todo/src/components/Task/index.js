import React from "react";
import "./index.css";

class Task extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const task = this.props.task 
    return (
      <div className="task">
        <div className="taskItem">{task.description}</div>
        <div>Due: {task.due}</div>
        
        <label htmlFor={task.id + "due"}>
          <input type="checkbox" id={task.id + "due"} name={task.id + "due"} />
          Complete
        </label>
      </div>
    );
  }
}
export default Task;
