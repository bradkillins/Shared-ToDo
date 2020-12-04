import React from "react";
import "./index.css";
// import DatePicker from "../DatePicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import Example from "../DatePicker";

class AddNewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoId: this.props.todoId,
      description: "",
      due: new Date()
    };
    this.DateChanged = this.DateChanged.bind(this);
    this.PassBackFunction = this.PassBackFunction.bind(this);
    this.InputChanged = this.InputChanged.bind(this);
  }
  PassBackFunction(e) {
    e.preventDefault();
    //console.log(DatePicker.selected);
    //this.setState({ due: DatePicker.value });
    //this.props.newTask(this.state);
    this.props.AddToTasks(this.state);
  }

  InputChanged(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }
  DateChanged(date) {
    //let valueOfInput = e.selected;
    //this.setState({due : valueOfInput});
    this.setState({ due: date });
  }
  render() {
    return (
      <div className="createTask">
        <label htmlFor="Description">
          Description:&nbsp;
          <input
            name="description"
            type="text"
            onChange={this.InputChanged}
            value={this.state.description}
          ></input>
        </label>
        <p></p>
        <label htmlFor="due">
          Due:&nbsp;
          <DatePicker selected={this.state.due} onChange={this.DateChanged} />
        </label>
        <br />
        <button type="submit" onClick={this.PassBackFunction}>
          Submit
        </button>
      </div>
    );
  }
}

export default AddNewTask;
