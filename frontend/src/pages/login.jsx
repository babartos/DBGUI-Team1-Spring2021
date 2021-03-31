import React from "react";
import "./login.css";

export class Login extends React.Component {
  state = {
    username: "username",
    password: "password"
  };

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <label className="my-label" htmlFor="userName"></label>
        <input
          className="form-login"
          type="text"
          name="username"
          id="email"
          placeholder="Username"
          align="center"
          onChange={(myEvent) => this.setState({ username: myEvent.target.value })}
        />
        <label className="my-label" htmlFor="password"></label>
        <input
          className="form-login"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(myEvent) => this.setState({ password: myEvent.target.value })}
        />
        {/* add error checking to this.state */}
        <button
          className="login-button"
          onClick={console.log('attempted login ', this.state.username)}
        >
          Submit
        </button>
      </div>
    );
  }
}
