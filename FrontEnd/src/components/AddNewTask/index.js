import React from "react";
import "./index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddNewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoId: this.props.todoId,
      description: "",
      due: new Date()
    };
    this.DateChanged = this.DateChanged.bind(this);
    this.InputChanged = this.InputChanged.bind(this);
  }

  InputChanged(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  DateChanged(date) {
    this.setState({ due: date });
  }

  render() {
    return (
      <div className="task">
        <label htmlFor="Description">Description:</label>
        <br />
        <input
          name="description"
          type="text"
          onChange={this.InputChanged}
          value={this.state.description}
        ></input>
        <br />
        <label htmlFor="due">Due:</label>
        <br />
        <DatePicker selected={this.state.due} onChange={this.DateChanged} />
        <br />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            this.props.AddToTasks(this.state);
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default AddNewTask;
