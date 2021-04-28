import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { AccountsRepo } from "../api/accountsRepo";

export class ProfilePage extends React.Component {
    accountRepo = new AccountsRepo();

    state = {
        account: undefined
      }

    render() {
        return (
        <>
            <div>
            { this.state.account && 
            <div className="text-center">
                {console.log(this.state.account)}
                <img className="m-3" src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"></img>
                <h1 className= "cover-heading">{this.state.account.userName}</h1>
            </div>
            }
            <hr></hr>
            { this.state.account && <ul className="text-center lead list-unstyled">
                <li><div className=""><span className="font-weight-bold">Name:</span> {this.state.account.firstName} {this.state.account.lastName}</div></li>
                <li><div className=""><span className="font-weight-bold">Account Type:</span> {this.state.account.type}</div></li>
                <li><div className=""><span className="font-weight-bold">Email:</span> {this.state.account.email}</div></li>
                <li><div className=""><span className="font-weight-bold">About Me:</span> {this.state.account.aboutMe}</div></li>
            </ul>
            }            
            </div>
        </>
        )
    }

    componentDidMount() {
        this.accountRepo.getUser(this.props.id)
        .then(obj => this.setState({account: obj.data[0]}) );

    }
  

}
