import React from "react";
import { Login } from "./login";
import { Signup } from "./signup";
import { Home } from "./home";
import { Mail } from "./mail";
import { ProAccounts } from "./proAccounts";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavHeader from './navheader'
import { MyProjectList } from './myProjectList';
import { ProjectCreator } from './projectCreator';
import { UserEditor } from './userEditor';
import { MailSend } from './mailSend';

export class App extends React.Component {
  state = {
    loggedIn: false,
    currentId: undefined,
    currentUsername: undefined
  }

  logger = (id, passedUsername) => {
    //console.log(id);
    this.setState({loggedIn: true});
    this.setState({currentId: id});
    this.setState({currentUsername: passedUsername})
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
              <Route path="/myprojects/:userID" component={MyProjectList}/>
              <Route path="/creatPost/:userID" component={ProjectCreator}/>
              <Route path="/account" component={Home}/>
              <Route path="/mail" component={Mail}/>
              <Route path="/proffesionalAccounts" component={ProAccounts}/>
              <Route exact path="/login"  render={() => <Login loginFunction={this.logger}/>}/>
              <Route exact path="/signup" component={Signup}/> 
              <Route exact path="/mail" render={() => <Mail username={this.state.currentUsername} id={this.state.currentId}/>}/>
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
