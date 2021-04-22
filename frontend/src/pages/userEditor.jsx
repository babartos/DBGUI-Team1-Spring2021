import React from 'react';
import { Redirect } from 'react-router-dom';
import { userRepository } from '../api';

export class userEditor extends React.Component {
    userRepository = new UserRepository();

    state = {
        id:'',
        userName:'',
        password:'',
        email:'',
        firstName: '',
        lastName: '',
        aboutMe: '',
        type: ''
    };


    onSave() {
        if (this.state.id) {
            this.userRepository.updateUser(this.state.id, this.state)
            .then(user => {
                this.setState({ redirect: '/' });
            });
        } else {
            this.userRepository.createUser(this.state)
            .then(user => {
                this.setState({ redirect: '/' });
            });
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={ this.state.redirect } />;
        }
        return <>
        <form className="container">
                <h1>User Editor</h1>
                <div className="form-group">
                    <label htmlFor="first name">First Name</label>
                    <input type="text"
                        id="firstName"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={ event => this.setState({ name: event.target.value }) }
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text"
                        id="lastName"
                        name="lastName"
                        value={this.state.firstName}
                        onChange={ event => this.setState({ name: event.target.value }) }
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="userName">Username</label>
                    <input type="text"
                        id="userName"
                        name="userName"
                        value={this.state.id}
                        onChange={ event => this.setState({ id: event.target.value }) }
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="text"
                        id="password"
                        name="passwod"
                        value={this.state.password}
                        onChange={ event => this.setState({ id: event.target.value }) }
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={ event => this.setState({ email: event.target.value }) }
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input type="text"
                        id="idNumber"
                        name="id"
                        value={this.state.id}
                        onChange={ event => this.setState({ id: event.target.value }) }
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <input type="text"
                        id="type"
                        name="type"
                        value={this.state.type}
                        onChange={ event => this.setState({ id: event.target.value }) }
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="aboutMe">About Me</label>
                    <input type="text"
                        id="aboutMe"
                        name="aboutMe"
                        value={this.state.aboutMe}
                        onChange={ event => this.setState({ id: event.target.value }) }
                        className="form-control" />
                </div>

                <div>
                    <button onClick={ () => this.onSave() }
                            className="btn btn-block btn-primary"
                            type="button">
                                Save
                    </button>
                </div>
            </form>
        </>;
    }

    componentDidMount() {
        let id = +this.props.match.params.id;
        if (id) {
            this.userRepository.getUser(id)
            .then(user => this.setState(user));
        }
    }
}