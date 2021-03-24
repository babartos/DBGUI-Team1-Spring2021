import React from "react";
import "./styles.css";

export class Login extends React.Component {
  state = {
    username: "username",
    password: "password"
  };

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <label htmlFor="userName">Username</label>
        <input
          className="form-login"
          type="text"
          name="username"
          id="email"
          onChange={(myEvent) => this.setState({ username: myEvent.target.value })}
        />
        <label htmlFor="password">Password</label>
        <input
          className="form-login"
          type="password"
          name="password"
          id="password"
          value={this.state.password}
          onChange={(myEvent) => this.setState({ password: myEvent.target.value })}
        />
        {/* add error checking to this.state */}
        <button
          className="login-button"
          onClick={console.log('attempted login ', this.state.username)}
        >
          Login
        </button>
      </div>
    );
  }
}
