import React from "react";
import "./index.css";

const Task = (props) => {
  const task = props.task;
  return (
    <div className="task">
      <div className={task.complete ? "taskItem completed" : "taskItem"}>
        {task.description}
      </div>
      <div>Due: {task.due}</div>

      <label htmlFor={task.id + "due"}>
        <input
          type="checkbox"
          id={task.id + "due"}
          name={task.id + "due"}
          onChange={() => {
            props.OnTaskCompleteChange(props.todoId, task.id, !task.complete);
          }}
          checked={task.complete}
        />
        &nbsp;Complete
      </label>
    </div>
  );
};

export default Task;
