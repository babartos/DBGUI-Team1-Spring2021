import React from "react";
import { MailRepo } from "../api/mailRepo";


export class Mail extends React.Component {
    mailRepoServce = new MailRepo();

    state = {
      userID: 1,
      messages: [{sender: "Matt", content:"message"},
      {sender: "Richard", content:"message2"}],
      sendUsername: "",
      sendMessageBody: ""
    }
    
    
    render() {
      return (
        <div className="mt-2">
          <div className="w-100 mh-100"> 
            { !this.state.messages && <h2 className="d-inline m-4">No Mail</h2> }
            { this.state.messages &&  <h2 className="d-inline m-4">My Mail</h2> }
            { this.state.messages &&
              this.state.messages.map((x, i) => <div className="card ml-5 mr-5 mt-3" key={ i }> 
                    <div className="card-header h3 p-3">{x.sender}</div>
                    <div className="card-body bg-light">
                        <div className="">{x.content}</div>
                    </div>
                </div>)
            }
            </div>

            <form className="border p-3 m-5">
            <header className="display-4 mb-4">Compose a message</header>
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