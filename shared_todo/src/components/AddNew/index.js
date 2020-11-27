import React from "react";
import "./index.css";
import Task from "../Task"
import Todo from "../Todo"




class AddNew extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          showing : false
        }
    }


        render() {
          if(this.state.showing == false){
            return (
              <button onClick={() => this.setState({showing : true})}>Add A New Task!</button>
            );
          }
          else{
            return (
              <div className="createTodo">
                <label htmlFor="Title">
                    Title:
                <input name="Title" type="text"></input>
                </label>
                <label htmlFor="AuthorizedUsersRead">
                    Any authorized users to read?
                    <input name="AuthorizedUsersRead" type="text"></input>
                </label>
                <label htmlFor="AuthorizedUsersWrite">
                    Any authorized users to write?
                    <input name="AuthorizedUsersWrite" type="text"></input>
                </label>
  
              </div>
            );
          }
        }
        
    
    }

export default AddNew;



/*{ <form className="form">
          <label htmlFor="userName">
            User Name:&nbsp;
            <input
              name="userName"
              type="text"
              value={this.state.userName}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <label htmlFor="email">
            Email:&nbsp;
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <label htmlFor="fName">
            First Name:&nbsp;
            <input
              name="fName"
              type="text"
              value={this.state.fName}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <label htmlFor="lName">
            Last Name:&nbsp;
            <input
              name="lName"
              type="text"
              value={this.state.lName}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <label htmlFor="password">
            Password:&nbsp;
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <button onClick={this.handleSubmit}>Submit</button>
        </form> }*/