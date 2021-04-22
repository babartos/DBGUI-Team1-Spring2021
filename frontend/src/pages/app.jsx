import React from "react";
import { Login } from "./login";
import { Signup } from "./signup";
import { Home } from "./home";
import { Mail } from "./mail";
import { ProAccounts } from "./proAccounts";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavHeader from './navheader'
import { PostList } from './postList';
import { PostCreator } from './postcreator';
import { UserEditor } from './userEditor';
import { MailSend } from './mailSend';

export class App extends React.Component {
  state = {
    loggedIn: false,
    currentId: undefined
  }

  logger = (id) => {
    //console.log(id);
    this.setState({loggedIn: true});
    this.setState({currentId: id});
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
              <Route exact path="/login"  render={() => <Login loginFunction={this.logger}/>}/>
              <Route exact path="/signup" component={Signup}/> 
              <Route exact path="/myprojects" render={() => <PostList id={this.state.currentId}/>}/>
              <Route exact path="/createProject" render={() => <PostCreator id={this.state.currentId}/>}/>
              <Route exact path="/mail" render={() => <Mail id={this.state.currentId}/>}/>
              <Route exact path="/sendmail" render={() => <MailSend id={this.state.currentId}/>}/>
              <Route exact path="/proffesionalAccounts" component={ProAccounts}/>
              <Route exact path="/profile" render={() => <UserEditor id={this.state.currentId}/>}/>
              <Route path="/" component={Home}/>
              {console.log(this.state)}
          </Switch>
      </Router>
      </div>
    );
  }  
}