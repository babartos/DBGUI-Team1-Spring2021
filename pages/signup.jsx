import React from "react";
import { Link, Redirect } from 'react-router-dom';

export class Signup extends React.Component {
    accountTypes = ['Average Joe','Professional','Admin'];

    state = {
      username: "",
      password: "",
      email: "",
      accountType: "",
      firstName: "",
      lastName: ""
    };

    render() {
        return (
        <form className="border p-3 m-4">
            <header className="display-3 pb-2">Signup</header>
            <p className="mt-1">Already have an account? <Link to='/login'>Login</Link></p> 

            <div class="form-group row">
                <label for="inputfirstName3" class="col-sm-2 col-form-label">First Name</label>
                <div class="col-sm-10">
                    <input type="username" class="form-control" id="inputfirstName3" placeholder="First Name" onChange={(myEvent) => this.setState({ firstName: myEvent.target.value })}/>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputLastName3" class="col-sm-2 col-form-label">Last Name</label>
                <div class="col-sm-10">
                    <input type="username" class="form-control" id="inputLastName3" placeholder="Last Name" onChange={(myEvent) => this.setState({ lastName: myEvent.target.value })}/>
                </div>
            </div>


            <div class="form-group row">
                <label for="inputUsername3" class="col-sm-2 col-form-label">Username</label>
                <div class="col-sm-10">
                    <input type="username" class="form-control" id="inputUsername3" placeholder="Username" onChange={(myEvent) => this.setState({ username: myEvent.target.value })}/>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                <input type="password" class="form-control" id="inputPassword3" placeholder="Password" onChange={(myEvent) => this.setState({ password: myEvent.target.value })}/>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                <input type="email" class="form-control" id="inputEmail3" placeholder="Email" onChange={(myEvent) => this.setState({ email: myEvent.target.value })}/>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputAboutme3" class="col-sm-2 col-form-label">About me description</label>
                <div class="col-sm-10">
                <textarea rows="6" type="aboutme" class="form-control" id="inputaboutme3" placeholder="About Me" onChange={(myEvent) => this.setState({ email: myEvent.target.value })}/>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputAccountType3" class="col-sm-2 col-form-label">Account Type </label>
                <div class="col-sm-10">
                    <select
                        id="accountType"
                        className="form-control"
                        value={this.state.accountType}
                        onChange={e => this.setState({ accountType: (e.target.value)})}>
                        <option></option>
                        {
                            this.accountTypes.map((x, i) => <option key={ i }>{ x }</option>)

                        }
                    </select>
                </div>    
            </div>
            <div class="form-group row">
                <div class="col-sm-10">
                <button type="submit" class="btn btn-primary">Create account</button>
                </div>
            </div>
        </form>
        );
    }
}
  