import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { AccountsRepo } from "../api/accountsRepo";

export class ProAccounts extends React.Component {
    accountRepo = new AccountsRepo();

    state = {
        userID: 1,
        // messages: [{sender: "Matt", content:"message"},
        // {sender: "Richard", content:"message2"}]
        accounts: []
      }

    render() {
        return (
        <>
        <div className="mt-2">
            <div className="w-100 mh-100"> 
            <h2 className="d-block m-4">Pro Accounts</h2>
            { this.state.accounts &&
              this.state.accounts.map((x, i) => <div className="card ml-5 mr-5 mt-3" key={ i }> 
                    <div className="card-header h3 p-3">{x.userName}</div>
                    <div className="card-body bg-light">
                        <div className="">{x.firstName} {x.lastName}</div>
                        <div className="">{x.type}</div>
                        <div className="">{x.email}</div>
                        <div className="">{x.aboutMe}</div>
                    </div>
                </div>)
            }
            </div>
        </div>

            </>
        )
    }

    componentDidMount() {
        let id = this.props.id;
        this.setState({userID: id});
        if (id) {
            this.accountRepo.getProAccounts()
            .then(data => this.setState({accounts: data}));
        }
        console.log("pro accoutns state:", this.state)
      }
  

}
