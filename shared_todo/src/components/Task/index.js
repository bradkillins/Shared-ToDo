import React from "react";
import "./index.css";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { completeClass: "" };
  }

  render() {
    const task = this.props.task;
    return (
      <div className="task">
        <div className={"taskItem" + this.state.completeClass}>
          {task.description}
        </div>
        <div>Due: {task.due}</div>

        <label htmlFor={task.id + "due"}>
          <input
            type="checkbox"
            id={task.id + "due"}
            name={task.id + "due"}
            onChange={() => {
              this.state.completeClass == ""
                ? this.setState({ completeClass: " completed" })
                : this.setState({ completeClass: "" });
            }}
          />
          Complete
        </label>
      </div>
    );
  }
}
export default Task;
