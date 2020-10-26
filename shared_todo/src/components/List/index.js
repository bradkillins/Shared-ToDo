import React from "react";
import "./index.css";

//import Todo from "../Todo";

// const dummyData = {
//   todos: [
//     {
//       id: "001",
//       owner: "brad@app.com",
//       authReadUsers: [],
//       authWriteUsers: [],
//       title: "",
//       tasks: [
//         {
//           id: "01",
//           description: "Finish Reading Ch 2",
//           due: "2020-12-18-00:00:00",
//           complete: false
//         }
//       ]
//     }
//   ],
//   users: [
//     {
//       id: "001",
//       userName: "killbrad",
//       password: "12345678",
//       email: "brad@app.com",
//       fName: "Brad",
//       lName: "Killins"
//     }
//   ]
// };

class List extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <section className="list">
        <h2>List of To-Dos:</h2>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
        {/* foreach Todo in Todos */}
        {/* <Todo /> pass props into Todo*/}
      </section>
    );
  }
}
export default List;
