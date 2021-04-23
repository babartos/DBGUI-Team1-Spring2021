import React from "react";
import { MailRepo } from "../api/mailRepo";
import { Link, Redirect } from 'react-router-dom';

export class MailSend extends React.Component {
    mailRepoServce = new MailRepo();

    state = {
      userID: undefined,
      myusername: undefined,
      sendUsername: "",
      sendMessageBody: "",
      mailSendStatus: undefined
    
    }
    
    handleSendMessage = (event) => {
      event.preventDefault();
      this.mailRepoServce.sendMail(this.state).then(data => {
          if(data) {
            // console.log(this.state);
            // console.log(data);
            alert("Mail delivered successfully");
            this.setState({mailSendStatus: true});
          }
          else {
            alert("Error in Sending Mail");
          }
        })
    }

    render() {
      return (
        <div className="mt-2">
            <form className="border p-3 m-5">
            {console.log(this.state)}
            <header className="display-4 mb-4">Compose Message</header>
            <p>Username is case sensitive</p>
            <div className="form-group row">
                <label htmlFor="inputfirstName3" className="col-sm-2 col-form-label">Username</label>
                <div className="col-sm-10">
                    <input type="username" className="form-control" id="inputfirstName3" placeholder="Username" onChange={(myEvent) => this.setState({ sendUsername: myEvent.target.value })}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputAboutme3" className="col-sm-2 col-form-label">Message Content</label>
                <div className="col-sm-10">
                <textarea rows="6" type="aboutme" className="form-control" id="inputaboutme3" placeholder="write a message!" onChange={(myEvent) => this.setState({sendMessageBody: myEvent.target.value })}/>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-10">
                <button type="submit" className="btn btn-primary p-2" onClick={(event) => this.handleSendMessage(event)}>Send Message</button>
                </div>
            </div>
            {this.state.mailSendStatus && <Redirect to="/mail"/>}
          </form>
        </div>
      );
    }

    componentDidMount() {
      let id = this.props.id;
      this.setState({userID: id});
      this.setState({myusername: this.props.username})
    } 
  }