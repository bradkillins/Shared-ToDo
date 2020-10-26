import React from "react";
import "./index.css";

class SignUp extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <section>
        <h1>Thanks for Joining!</h1>
        <h3>Enter all the details:</h3>
        <label htmlFor="userName">
          User Name:
          <input id="userName" type="text" />
        </label>
      </section>
    );
  }
}
export default SignUp;
