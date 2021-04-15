import React from 'react';
import { Link } from 'react-router-dom';

export const UserList = props => <>
    <table className="table table-condensed table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Employee</th>
                <th>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
            {
                props.users.map(user =>
                <tr key={account.id}>
                    <td>
                        <Link to={ '/edit/' + user.id }>{ user.name }</Link>
                    </td>
                    <td>{ user.email }</td>
                    <td> 
                        <button type="button"
                                className="btn btn-sm btn-danger"
                                onClick={ () => props.onUserDelete(account.id) }>
                            X
                        </button>
                    </td>
                </tr>)
            }
        </tbody>
    </table>
</>;