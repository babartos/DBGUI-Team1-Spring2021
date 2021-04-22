import React from "react";
import { MailRepo } from "../api/mailRepo";


export class MailSend extends React.Component {
    mailRepoServce = new MailRepo();

    state = {
      userID: 1,
      sendUsername: "",
      sendMessageBody: ""
    }
    
    
    render() {
      return (
        <div className="mt-2">
            <form className="border p-3 m-5">
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
                <button type="submit" className="btn btn-secondary" onClick={(event) => this.handleSignup(event)}>Send Message</button>
                </div>
            </div>
          </form>
        </div>
      );
    }  
  }