import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { AccountsRepo } from "../api/accountsRepo";


export class Login extends React.Component {
  accountRepo = new AccountsRepo();
  
  state = {
    username: "",
    password: "",
    successfulLogin: false
  };

  handleLogin = (event) => {
    event.preventDefault();
    let error = this.errorChecking();
    if(!error) { //if no error
      this.accountRepo.login(this.state.username, this.state.password).then(data => {
        if(data) {
          this.props.loginFunction(data);
          this.setState({successfulLogin: true});
        }
        else {
          alert("Incorrect Username/Password Combination");
        }
      })
      .catch( e => {
        console.log(e);
        alert("Error");
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
      <form className="container form-group d-block p-6 m-4" >
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
            onClick={ (event) => this.handleLogin(event)}
          >
            Submit
          </button>
          {this.state.successfulLogin && <Redirect to="/"/>}
        </div>
      </form>
    );
  }
}
