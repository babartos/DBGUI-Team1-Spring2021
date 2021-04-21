import React from "react";
import { Login } from "./login";
import { Signup } from "./signup";
import { Home } from "./home";
import { Mail } from "./mail";
import { ProAccounts } from "./proAccounts";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavHeader from './navheader'
import { PostList } from './postList';

export class App extends React.Component {
  state = {
    loggedIn: false
  }

  logger = (id) => {
    this.setState({loggedIn: true})
  }

  logoutFunction = () => {
    this.setState({loggedIn: false})
  }

  render() {
    return (
      <div>
      <Router>
          <NavHeader status={this.state.loggedIn} logout={this.logoutFunction}/>
          <Switch>
              <Route path="/login" render={() => <Login loginFunction={this.logger}/>}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/myprojects" component={PostList}/>
              <Route path="/account" component={Home}/>
              <Route path="/mail" component={Mail}/>
              <Route path="/proffesionalAccounts" component={ProAccounts}/>
              <Route path="/" component={Home}/>
              
          </Switch>
      </Router>
      </div>
    );
  }  
}