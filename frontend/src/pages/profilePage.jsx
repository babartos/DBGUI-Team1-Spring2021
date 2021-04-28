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
            {console.log(this.state.accounts)}
            <p>Profile Page</p>
        </>
        )
    }

    componentDidMount() {
        this.accountRepo.getUser(this.props.id)
        .then(data => this.setState({account: data}) );

    }
  

}
