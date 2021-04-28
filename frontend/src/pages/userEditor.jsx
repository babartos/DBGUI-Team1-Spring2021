import React from 'react';
import { Redirect, Link,useParams } from 'react-router-dom';
import { UserRepository } from '../api/userRepository';

export class UserEditor extends React.Component {
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
                        placeholder= {this.state.firstName}
                        value={this.state.firstName}
                        onChange={ event => this.setState({ firstName: event.target.value }) }
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text"
                        id="lastName"
                        name="lastName"
                        value={this.state.lastName}
                        placeholder= {this.state.lastName}
                        onChange={ event => this.setState({ lastName: event.target.value }) }
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="userName">Username</label>
                    <input type="text"
                        id="userName"
                        name="userName"
                        value={this.state.userName}
                        placeholder= {this.state.userName}
                        onChange={ event => this.setState({ userName: event.target.value }) }
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="text"
                        id="password"
                        name="password"
                        value={this.state.password}
                        placeholder= {this.state.password}
                        onChange={ event => this.setState({ password: event.target.value }) }
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text"
                        id="email"
                        name="email"
                        value={this.state.email}
                        placeholder= {this.state.email}
                        onChange={ event => this.setState({ email: event.target.value }) }
                        className="form-control" />
                </div>
            
                
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <input type="text"
                        id="type"
                        name="type"
                        value={this.state.type}
                        placeholder= {this.state.type}
                        onChange={ event => this.setState({ type: event.target.value }) }
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="aboutMe">About Me</label>
                    <input type="text"
                        id="aboutMe"
                        name="aboutMe"
                        value={this.state.aboutMe}
                        placeholder= {this.state.aboutMe}
                        onChange={ event => this.setState({ aboutMe: event.target.value }) }
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
      
        console.log("component mounted");
        let id = this.props.match.params.id;
        
        if (id) {
            this.userRepository.getUser(id)
            .then(user => {this.setState(user.data[0])});
        }

    }
}