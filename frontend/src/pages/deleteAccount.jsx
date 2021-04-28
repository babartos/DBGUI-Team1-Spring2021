import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { AccountsRepo } from "../api/accountsRepo";


export class DeleteAccount extends React.Component {
  accountRepo = new AccountsRepo();
  
  state = {
    username: "",
    password: "",
    userID: this.props.userID,
    successfulLogin: false
  };

  handleLogin = (event) => {
    //event.preventDefault();
    let error = this.errorChecking();
    if(!error) { //if no error
      this.accountRepo.delete(this.state.userID, this.state.username, this.state.password).then(data => {
        if(data) {
          console.log(data);
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
      <form className="container form-group d-block p-3 m-4" >
      {console.log(this.state)}
        <header className="display-3 pb-2">Delete Account</header>
        <div className="form-group-lg justify-content-center bg-gradient-light">
          <p className="mt-1">WARNING: this action cannot be undone</p> 
          <div id="username" className="">
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
            type="submit"
            className="form-control btn btn-danger btn-rounded d-block h-3 col-8 ml-3 mt-3 col-4"
            onClick={ (event) => this.handleLogin(event)}
          >
            Delete My Account
          </button>
          {this.state.successfulLogin && <Redirect to="/"/>}
        </div>
      </form>
    );
  }

}
