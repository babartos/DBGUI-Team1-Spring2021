import React from "react";

export class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleLogin() {
    this.errorChecking();
  }

  errorChecking() {
    if(this.state.username === "") {
      alert('please enter a username');
    }
    else if(this.state.password === "") {
      alert('please enter a pasword');
    }
    else {
      console.log(this.state.username);
      console.log(this.state.password);
      alert('login');
    }
  }

  render() {
    return (
      <form className="container h-100 form-group d-block p-6 m-4" >
        <div className="form-group-lg justify-content-center bg-gradient-light">
          <header className="display-3">Login</header> <br></br>
          <div id="username">
            <label htmlFor="userName"></label>
            <input
              className="text-center rounded input-lg h-3 col-8 m-3" 
              type="text"
              name="username"
              id="myUserName"
              placeholder="Username"
              onChange={(myEvent) => this.setState({ username: myEvent.target.value })}
            />
          </div>
          <label className="my-label" htmlFor="password"></label>
          <input
            className="text-center rounded input-lg h-3 col-8 m-3"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(myEvent) => this.setState({ password: myEvent.target.value })}
          />
          {/* add error checking to this.state */}
          <button
            className="btn btn-primary btn-rounded d-block h-3 col-8 ml-3 mt-3 col-4"
            onClick={ () => this.handleLogin()}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}
