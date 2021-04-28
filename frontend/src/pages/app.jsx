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
import { AllProjectList } from './allProjectList';
import { ProjectEditor } from './projectEditor';
import { AllAccounts } from './allAccounts';
import { ProfilePage } from './profilePage';
import { DeleteAccount } from './deleteAccount';

export class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
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
          <NavHeader status={this.state.loggedIn} userID={this.state.currentId} logout={this.logoutFunction}/>
          <Switch>
              <Route exact path="/login" render={() => <Login loginFunction={this.logger}/>}/>
              <Route exact path="/signup" component={Signup}/>
              <Route exact path="/account" component={Home}/>
              <Route exact path="/mail"> <Mail username={this.state.currentUsername}/> </Route>
              <Route exact path="/sendmail" render={() => <MailSend username={this.state.currentUsername} id={this.state.currentId}/>}/>
              <Route exact path="/proffesionalAccounts" component={ProAccounts}/>
              <Route exact path="/profile/:id" render={() => <UserEditor id={this.state.currentId}/>}/>
              <Route exact path="/myprojects/:userID" component={MyProjectList}/>
              <Route exact path="/createProject/:userID" component={ProjectCreator}/>
              <Route exact path="/editProject/:userID/:projectID" component={ProjectEditor}/>
              <Route exact path="/allProjects" render={() => <AllProjectList id={this.state.currentId}/>}/>
              <Route exact path="/profilePage" render={() => <ProfilePage id={this.state.currentId}/>}/>
              <Route exact path="/allAccounts" component={AllAccounts}/>
              <Route exact path="/userdashboard/:userID" component={UserEditor}/>
              <Route exact path="/deleteAccount" render={() => <DeleteAccount userID={this.state.currentId} logout={this.logoutFunction}/>}/>
              <Route path="/" component={Home}/>
              {console.log("main compontent:" , this.state)}
          </Switch>
      </Router>
      </div>
    );
  }  
}
