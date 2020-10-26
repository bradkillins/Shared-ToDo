import React from "react";
import "./index.css";

class Login extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <section>
        <h1>Welcome!</h1>
        <h3>Please Login :)</h3>
        <div className="form">
          <label htmlFor="userName">
            User Name:
            <input id="userName" type="text" />
          </label>
          <label htmlFor="userName">
            User Name:
            <input id="userName" type="password" />
          </label>
          <button>Submit</button> {/*onClick=updateState*/}
        </div>
      </section>
    );
  }
}
export default Login;
