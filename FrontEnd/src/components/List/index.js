import React from "react";
import "./index.css";
import AddNewTodo from "../AddNewTodo";
import Todo from "../Todo";
import { getFetch, postFetch, deleteFetch, putFetch } from "../../fetch";

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      todos: [],
      fetching: true,
      showNewTodoForm: false,
      showAddTaskButton: false,
      addTodoButtonTitle: "Add Todo",
      showNewTask: { id: "", show: false },
      msg: "",
      errMsg: ""
    };
    this.ToggleNewTodoForm = this.ToggleNewTodoForm.bind(this);
    this.AddToList = this.AddToList.bind(this);
    this.AddToTasks = this.AddToTasks.bind(this);
    this.ToggleNewTaskForm = this.ToggleNewTaskForm.bind(this);
    this.RetrieveTodos = this.RetrieveTodos.bind(this);
    this.DeleteTodo = this.DeleteTodo.bind(this);
    this.OnTaskCompleteChange = this.OnTaskCompleteChange.bind(this);
  }

  componentDidMount() {
    if (!this.props.currentUser) {
      this.setState({
        errMsg:
          "Something went wrong! " +
          "Most likely you tried refreshing the page or navigating directly to the list page. " +
          "Please try logging in again.",
        currentUser: { email: "fail" },
        fetching: false
      });
    } else {
      this.setState({ currentUser: this.props.currentUser }, () => {
        this.RetrieveTodos();
      });
    }
  }

  //gets a user's list of todos from the database and updates the state
  RetrieveTodos() {
    getFetch(
      `http://localhost:5000/api/list/${this.state.currentUser.email}`
    ).then((res) => {
      if (res.success) {
        if (res.todos.length === 0)
          this.setState({
            fetching: false,
            showAddTaskButton: true,
            msg: "You don't have any Todos! Try adding one :)",
            todos: res.todos
          });
        else
          this.setState({
            fetching: false,
            showAddTaskButton: true,
            todos: res.todos,
            msg: ""
          });
      } else {
        this.setState({ fetching: false, msg: res.msg });
      }
    });
  }

  DeleteTodo(todoId) {
    this.setState({ fetching: true });
    window.scrollTo(0, 0);
    deleteFetch("http://localhost:5000/api/todo", { todoId: todoId }).then(
      (res) => {
        console.log(res);
        this.RetrieveTodos();
      }
    );
  }

  ToggleNewTodoForm() {
    if (this.state.showNewTodoForm) {
      this.setState({ showNewTodoForm: false, addTodoButtonTitle: "Add Todo" });
    } else {
      this.setState({ showNewTodoForm: true, addTodoButtonTitle: "Cancel" });
    }
  }

  ToggleNewTaskForm(todoId) {
    if (this.state.showNewTask.show) {
      this.setState({
        showNewTask: { id: todoId, show: false }
      });
    } else {
      this.setState({
        showNewTask: { id: todoId, show: true }
      });
    }
  }

  //adds a todo to the user's list, also updates the database
  AddToList(newTodo) {
    newTodo.owner = this.props.currentUser.email;
    newTodo.tasks = [];

    this.setState({ fetching: true });
    postFetch("http://localhost:5000/api/todo/new", newTodo).then((res) => {
      console.log(res);
      if (res.success) {
        this.setState({
          todos: this.state.todos.concat(res.todo),
          fetching: false,
          msg: ""
        });
      } else {
        this.setState({ fetching: false, msg: res.msg });
      }
    });
    this.ToggleNewTodoForm();
  }

  //adds a new task to its todo, and updates the database
  AddToTasks(newTaskDetails) {
    const newMonth =
      newTaskDetails.due.getMonth() + 1 < 10
        ? "0" + (newTaskDetails.due.getMonth() + 1)
        : newTaskDetails.due.getMonth() + 1;
    const newDay =
      newTaskDetails.due.getDate() < 10
        ? "0" + newTaskDetails.due.getDate()
        : newTaskDetails.due.getDate();

    const newTask = {
      userEmail: this.state.currentUser.email,
      todoId: newTaskDetails.todoId,
      description: newTaskDetails.description,
      due: `${newTaskDetails.due.getFullYear()}-${newMonth}-${newDay}`
    };
    this.ToggleNewTaskForm();
    this.setState({ fetching: true });
    postFetch("http://localhost:5000/api/task/new", newTask).then((res) => {
      console.log(res);
      if (res.success) {
        const newTodos = [];
        this.state.todos.forEach((todo) => {
          if (todo.id === newTaskDetails.todoId) {
            newTodos.push(res.updatedTodo);
          } else newTodos.push(todo);
        });
        console.log(newTodos);
        this.setState({ todos: newTodos, fetching: false });
      } else {
        this.setState({ fetching: false, msg: res.msg });
      }
    });
  }

  //updates a task's complete status when it's checkbox is changes
  OnTaskCompleteChange(todoId, taskId, complete) {
    const todos = this.state.todos;
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    const taskIndex = todos[todoIndex].tasks.findIndex(
      (task) => task.id === taskId
    );
    const updatedTodos = [];
    this.state.todos.forEach((todo, index) => {
      if (index === todoIndex) {
        todo.tasks[taskIndex].complete = complete;
        updatedTodos.push(todo);
      } else {
        updatedTodos.push(todo);
      }
    });
    this.setState({ todos: updatedTodos }, () => {
      putFetch("http://localhost:5000/api/task", {
        userEmail: this.state.currentUser.email,
        todoId: todoId,
        taskId: taskId,
        complete: complete
      }).then((res) => console.log(res));
    });
  }

  render() {
    let message = this.state.msg;
    if (this.state.fetching) message = "Loading...";
    let welcomeMsg = "";
    if (this.state.currentUser)
      welcomeMsg = "Hello " + this.state.currentUser.fName;
    return (
      <div>
        <div className="greeting">{welcomeMsg}</div>
        <div className="list">
          <h2>List of To-Dos:</h2>
          <div>{message}</div>
          {this.state.todos.map((todo) => (
            <Todo
              title={todo.title}
              tasks={todo.tasks}
              key={todo.id}
              todoId={todo.id}
              AddToTasks={this.AddToTasks}
              ToggleNewTaskForm={this.ToggleNewTaskForm}
              showNewTask={this.state.showNewTask}
              DeleteTodo={this.DeleteTodo}
              currentUser={this.props.currentUser}
              OnTaskCompleteChange={this.OnTaskCompleteChange}
            />
          ))}
          <div>
            {this.state.showAddTaskButton && (
              <button onClick={this.ToggleNewTodoForm}>
                {this.state.addTodoButtonTitle}
              </button>
            )}
          </div>
          <div>
            {this.state.showNewTodoForm && (
              <AddNewTodo newToDo={this.AddToList} />
            )}
          </div>
          <div>{this.state.errMsg}</div>
        </div>
      </div>
    );
  }
}
export default List;
