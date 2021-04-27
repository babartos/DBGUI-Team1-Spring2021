import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { AccountsRepo } from "../api/accountsRepo";

export class ProfilePage extends React.Component {
    accountRepo = new AccountsRepo();

    state = {
        // messages: [{sender: "Matt", content:"message"},
        // {sender: "Richard", content:"message2"}]
        accounts: undefined
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
        .then(data => this.setState({accounts: data}) );

    }
  

}
