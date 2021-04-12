import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { AccountsRepo } from "../api/accountsRepo";

export class Login extends React.Component {
  accountRepo = new AccountsRepo();
  
  state = {
    username: "",
    password: "",
  };

  handleLogin() {
    let error = this.errorChecking();
    console.log(this.state);
    if(!error) { //if no error
      this.accountRepo.login(this.state.username, this.state.password).then(data => {
        console.log("successful login");
        alert("login successful");
      })
      .catch( e => {
        console.log(e);
        alert("Invalid username and password combination");
      });
    }
  }

  errorChecking() {
    if(this.state.username === "") {
      alert('please enter a username');
      return true;
    }
    else if(this.state.password === "") {
      alert('please enter a pasword');
      return true;
    }
    else {
      return false;
    }
  }

  render() {
    return (
      <form className="border container h-100 form-group d-block p-6 m-4" >
        <div className="form-group-lg justify-content-center bg-gradient-light">
          <header className="display-3 pb-2">Login</header>
          <p className="mt-1">Don't have an account? <Link to='/signup'>Signup</Link></p> 
          <div id="username">
            <label htmlFor="userName"></label>
            <input
              className="text-center rounded input-lg h-3 col-8 ml-3 mb-3" 
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
