import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { AccountsRepo } from "../api/accountsRepo";

export class Signup extends React.Component {
    accountRepo = new AccountsRepo();
    accountTypes = ['Average Joe','Professional','Admin'];

    state = {
      userName: "",
      password: "",
      email: "",
      type: "",
      firstName: "",
      lastName: "",
      aboutMe: "",
      successSignUp: false
    };

    handleSignup = (event) => {
        event.preventDefault();
        console.log(this.state);
        //let error = this.errorCheck();
        let error = false;
        if(! error) {
            this.accountRepo.registerAccount(this.state).then(data => {
                console.log(data);
                this.setState({successSignUp: true});
              })
              .catch( e => {
                console.log(e);
                alert("Invalid data");
              });
        }

    }

    errorCheck() {
        if (this.state.ujserName == "" || this.state.password == "" || this.state.email == "" || this.state.accountType == ""
        || this.state.firstName == "" || this.state.lastName =="") { return true;}
        else {
            return false;
        }
    }

    render() {
        return (
        <form className="p-3 m-4">
            <header className="display-3 pb-2">Signup</header>
            <p className="mt-1">Already have an account? <Link to='/login'>Login</Link></p> 

            <div className="form-group row">
                <label htmlFor="inputfirstName3" className="col-sm-2 col-form-label">First Name</label>
                <div className="col-sm-10">
                    <input type="username" className="form-control" id="inputfirstName3" placeholder="First Name" onChange={(myEvent) => this.setState({ firstName: myEvent.target.value })}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputLastName3" className="col-sm-2 col-form-label">Last Name</label>
                <div className="col-sm-10">
                    <input type="username" className="form-control" id="inputLastName3" placeholder="Last Name" onChange={(myEvent) => this.setState({ lastName: myEvent.target.value })}/>
                </div>
            </div>


            <div className="form-group row">
                <label htmlFor="inputUsername3" className="col-sm-2 col-form-label">Username</label>
                <div className="col-sm-10">
                    <input type="username" className="form-control" id="inputUsername3" placeholder="Username" onChange={(myEvent) => this.setState({ userName: myEvent.target.value })}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                <input type="password" className="form-control" id="inputPassword3" placeholder="Password" onChange={(myEvent) => this.setState({ password: myEvent.target.value })}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                <input type="email" className="form-control" id="inputEmail3" placeholder="Email" onChange={(myEvent) => this.setState({ email: myEvent.target.value })}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputAboutme3" className="col-sm-2 col-form-label">About me description</label>
                <div className="col-sm-10">
                <textarea rows="6" type="aboutme" className="form-control" id="inputaboutme3" placeholder="About Me" onChange={(myEvent) => this.setState({aboutMe: myEvent.target.value })}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputAccountType3" className="col-sm-2 col-form-label">Account Type </label>
                <div className="col-sm-10">
                    <select
                        id="accountType"
                        className="form-control"
                        value={this.state.type}
                        onChange={e => this.setState({ type: (e.target.value)})}>
                        <option></option>
                        {
                            this.accountTypes.map((x, i) => <option key={ i }>{ x }</option>)

                        }
                    </select>
                </div>    
            </div>
            <div className="form-group row">
                <div className="col-sm-10">
                <button type="submit" className="btn btn-primary" onClick={(event) => this.handleSignup(event)}>Create account</button>
                </div>
            </div>
            {this.state.successSignUp && <Redirect to="/login"/>}
        </form>
        );
    }
}
  