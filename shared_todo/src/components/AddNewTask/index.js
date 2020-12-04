import React from "react";
import "./index.css";
import DatePicker from "../DatePicker";
import Example from "../DatePicker";


class AddNewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        id: "",
        description: "",
        due: "",
        complete: false
}
this.DateChanged = this.DateChanged.bind(this);
this.PassBackFunction = this.PassBackFunction.bind(this);
this.InputChanged = this.InputChanged.bind(this);
}
PassBackFunction(){
  console.log(DatePicker.selected);
  this.setState({due : DatePicker.value})
  //this.props.newTask(this.state);
  console.log(this.state);
}

InputChanged(e){
  const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
}
DateChanged(e){
  let valueOfInput = e.selected;
  console.log(valueOfInput);
  //this.setState({due : valueOfInput});
}
  render() {

    return (
      <div className="createTask">
        <label htmlFor="Description">
         Description:
          <input name="description" 
          type="text"
          onChange={this.InputChanged}></input>
        </label>
        <p></p>
        <label htmlFor="due">
          Due:
          <DatePicker onChange={this.DateChanged}/>
        </label>
        <p></p>
        <p></p>
        <button type="submit" onClick = {()=> this.PassBackFunction()}>Submit</button>
      </div>
    );
  }
}

export default AddNewTask;