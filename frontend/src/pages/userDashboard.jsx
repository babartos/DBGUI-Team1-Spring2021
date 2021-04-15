import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userRepository } from '../api';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export const UserDashboard = props => {
    const [ users, setUsers ] = useState(undefined);

    const userRepository = new UserRepository();

    useEffect(() => {
        if (!user) {
            userRepository.getUsers().then(x => {
                setUsers(x);
            });
        }
    });

    let onUserDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this account?')) {
            userRepository.deleteUser(id).then(() => {
                setUsers(users.filter(x => x.id != id));
            })
        }
    };

    let onSearch = (params) => {
        userRepository.getUsers(params)
            .then(users => setUsers(users));
    };

    return <>
        <div className="container">
            <Link to="/create" className="btn btn-sm btn-success float-right mt-3">Add User</Link>
            <h1>User List</h1>
            <div className="clearfix"></div>
            <Router>
                <Route path="/" exact render={ props => <Link to="/search">Search...</Link> } />
                <Route path="/search" render={ props => <UserSearch onSearch={ params => onSearch(params) } { ...props } /> } />
            </Router>                
            <UsersList users={users || []}
                        onUserDelete={ id => onUserDelete(id) } />
        </div>
    </>;
}