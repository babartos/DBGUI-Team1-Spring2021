import React from "react";
import { Login } from "./login";
import { Signup } from "./signup";
import { Home } from "./home";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavHeader from './navheader'

export class App extends React.Component {
  state = {
    loggedIn: true
  }  
  render() {
    return (
      <div>
      <Router>
          <NavHeader status={this.state.loggedIn}/>
          <Switch>
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/account" component={Home}/>
              <Route path="/" component={Home}/>
          </Switch>
      </Router>
      </div>
    );
  }  
}