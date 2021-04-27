import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { AccountsRepo } from "../api/accountsRepo";

export class AllAccounts extends React.Component {
    accountRepo = new AccountsRepo();

    state = {
        // messages: [{sender: "Matt", content:"message"},
        // {sender: "Richard", content:"message2"}]
        accounts: undefined
      }

    render() {
        return (
        <>
        <div className="mt-2 mb-4">
            <div className="w-100 mh-100"> 
            <h2 className="d-block m-4">All Accounts</h2>
            <p className="ml-4"> Looking for pro accounts? <Link to="/proffesionalAccounts">click here</Link></p>

            { this.state.accounts &&
              this.state.accounts.data.map((x, i) => <div className="border-dark card ml-5 mr-5 mt-3" key={ i }> 
                    <div className="card-header border-dark h3 p-3">{x.userName}</div>
                    <div className="card-body bg-light">
                        {console.log(x)}
                        <div className=""><span className="font-weight-bold">Name:</span> {x.firstName} {x.lastName}</div>
                        <div className=""><span className="font-weight-bold">Account Type:</span> {x.type}</div>
                        <div className=""><span className="font-weight-bold">Email:</span> {x.email}</div>
                        <div className=""><span className="font-weight-bold d-block">About Me:</span> <ul className=""><li>{x.aboutMe}</li></ul></div>
                    </div>
                </div>)
            }
            </div>
        </div>

            </>
        )
    }

    componentDidMount() {
        this.accountRepo.getAllAccounts()
        .then(data => this.setState({accounts: data}) );

    }
  

}
