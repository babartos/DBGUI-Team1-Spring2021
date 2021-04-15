import React from 'react';
import { Redirect } from 'react-router-dom';
import { userRepository } from '../api';

export class userEditor extends React.Component {
    userRepository = new UserRepository();

    state = {
        name: '',
        email: '',
        isEmployee: false,
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
                    <label htmlFor="name">Name</label>
                    <input type="text"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={ event => this.setState({ name: event.target.value }) }
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
                    <label htmlFor="isEmployee">
                        <input type="checkbox"
                            id="isEmployee"
                            name="isEmployee"
                            checked={this.state.isEmployee}
                            onChange={ event => this.setState({ isEmployee: event.target.checked }) }
                            />
                        Is Employee
                    </label>
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