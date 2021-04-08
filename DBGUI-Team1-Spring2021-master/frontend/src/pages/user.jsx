import React from "react";
import axios from 'axios';

export class User extends React.Component {
    constructor(props) {
      super(props);
      this.handleUserNameChange = this.handleUserNameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
      this.handleLastNameChange = this.handleLastNameChange.bind(this);
      this.handleContactInfoChange = this.handleContactInfoChange.bind(this);
      this.handleAboutMeChange = this.handleAboutMeChange.bind(this);
      this.handleTypeChange = this.handleTypeChange.bind(this);

      this.updateUser = this.updateUser.bind(this);
      this.getUser = this.getUser.bind(this);
    }
      state = {
      id:'',
      userName:'',
      password:'',
      email:'',
      firstName: '',
      lastName: '',
      contactInfo: '',
      aboutMe: '',
      type: ''
    };

    componentDidMount(){
      document.getElementById('addHyperLink').className = "";
      document.getElementById('homeHyperlink').className = "";
      document.getElementById('userHyperlink').className = "active";
      this.getUser();
    }
    updateUser(){
      var self = this;
      axios.post('/updateUser', {
        id: this.state.id,
        userName: this.state.userName,
        password: this.state.password,
        email:this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        contactInfo: this.state.contactInfo,
        aboutMe: this.state.aboutMe,
        type: this.state.type
      })
      .then(function (response) {
        if(response){
          hashHistory.push('/')  
        }
      })
      .catch(function (error) {
        console.log('error is ',error);
      });
    }
 
    getUser(){
      var self = this;
      axios.post('/getUser', {
      })
      .then(function (response) {
        if(response){
          self.setState({id:response.data.id});
          self.setState({userName:response.data.userName});
          self.setState({email:response.data.email});
          self.setState({password:response.data.password});
          self.setState({firstName:response.data.firstName});
          self.setState({lastName:response.data.lastName});
          self.setState({contactInfo:response.data.contactInfo});
          self.setState({aboutMe:response.data.aboutMe});
          self.setState({type:response.data.type});  
        }
      })
      .catch(function (error) {
        console.log('error is ',error);
      });
    }

    handleUserNameChange(e){
      this.setState({userName:e.target.value})
    }
    handlePasswordChange(e){
      this.setState({password:e.target.value})
    }
    handleFirstNameChange(e){
      this.setState({firstName:e.target.value})
    }
    handleLastNameChange(e){
      this.setState({lastName:e.target.value})
    }
    handleEmailChange(e){
      this.setState({email:e.target.value})
    }
    handleContactInfoChange(e){
      this.setState({contactInfo:e.target.value})
    }
    handleAboutMeChange(e){
      this.setState({aboutMe:e.target.value})
    }
    handleTypeChange(e){
      this.setState({type:e.target.value})
    }
     
    render() {
      return (
        <div className="col-md-5">
          <div className="form-area">  
              <form role="form">
                <br styles="clear:both" />
                <div className="form-group">
                  <input value={this.state.userName} type="text" onChange={this.handleUserNameChange} className="form-control" placeholder="userName" required />
                </div>
                <div className="form-group">
                  <input value={this.state.password} type="password" onChange={this.handlePasswordChange} className="form-control" placeholder="Password" required />
                </div>
                <div className="form-group">
                  <input value={this.state.firstName} type="firstName" onChange={this.handleFirstNameChange} className="form-control" placeholder="firstName" required />
                </div>
                <div className="form-group">
                  <input value={this.state.lastName} type="lastName" onChange={this.handleLastNameChange} className="form-control" placeholder="lastName" required />
                </div>
                <div className="form-group">
                  <input value={this.state.email} type="email" onChange={this.handleEmailChange} className="form-control" placeholder="Email" required />
                </div>
                <div className="form-group">
                  <input value={this.state.contactInfo} type="contactInfo" onChange={this.handleContactInfoChange} className="form-control" placeholder="contactInfo" required />
                </div>
                <div className="form-group">
                  <input value={this.state.aboutMe} type="aboutMe" onChange={this.handleAboutMeChange} className="form-control" placeholder="aboutMe" required />
                </div>
                <div className="form-group">
                  <input value={this.state.type} type="type" onChange={this.handleTypeChange} className="form-control" placeholder="type" required />
                </div>
                
                <button type="button" onClick={this.updateUser} id="submit" name="submit" className="submitButton">Update</button>
              </form>
          </div>
        </div>
      )
    }
}