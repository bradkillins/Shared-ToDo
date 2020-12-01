import React from "react";
import "./index.css";

import AddNew from "../AddNew";
import Todo from "../Todo";



const todos = [
  {
    id: "001",
    owner: "brad@app.com",
    authReadUsers: [],
    authWriteUsers: [],
    title: "Read 'C# for the rest of us'",
    tasks: [
      {
        id: "001",
        description: "Finish Reading Ch 2",
        due: "2020-12-18-00:00:00",
        complete: true
      },
      {
        id: "002",
        description: "Ch 2 Exercise",
        due: "2020-12-18-00:00:00",
        complete: false
      }
    ]
  },
  {
    id: "002",
    owner: "andrew@app.com",
    authReadUsers: ["brad@app.com"],
    authWriteUsers: [],
    title: "Add Accessibility",
    tasks: [
      {
        id: "001",
        description: "Link Labels",
        due: "2020-11-06-17:00:00",
        complete: false
      }
    ]
  }
];

class List extends React.Component {
  constructor() {
    super();
    this.state = { todos , showForm : false, buttontitle : "Add ToDo"};
    this.HideComponent = this.HideComponent.bind(this);
    this.AddToList = this.AddToList.bind(this);
  }
  HideComponent(){
    if(this.state.showForm){
      this.setState({showForm : false, buttontitle : "Add ToDo"});
    }
    else{
      this.setState({showForm : true, buttontitle : "Cancel"});
    }
  }
  AddToList(newToDo){
    this.setState({
      todos : this.state.todos.concat(newToDo)});
      return todos;
  };


  render() {

    return (
      <section className="list">
        <h2>List of To-Dos:</h2>
        {this.state.todos.map((todo) => (
          <Todo
            title={todo.title}
            tasks={todo.tasks}
            key={todo.id}
            parentId={todo.id}
          />
        ))}
        <button onClick={this.HideComponent}>{this.state.buttontitle}</button>
        <div>
          {this.state.showForm && <AddNew newToDo = {this.AddToList}/>}
        </div>
        
        
      </section>
      
    );
  }
}
export default List;
