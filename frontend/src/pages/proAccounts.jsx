import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { AccountsRepo } from "../api/accountsRepo";

export class ProAccounts extends React.Component {
    accountRepo = new AccountsRepo();

    render() {
        return (
            <>
                <p>pro accounts route have been written, once backend has it implemented I can complete it </p>
            </>
        )
    }

}
