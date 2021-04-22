import React from "react";
import { MailRepo } from "../api/mailRepo";
import { Link, Redirect } from 'react-router-dom';

export class Mail extends React.Component {
    mailRepo = new MailRepo();

    state = {
      userID: 1,
      // messages: [{sender: "Matt", content:"message"},
      // {sender: "Richard", content:"message2"}]
      messages: []
    }
    
    
    render() {
      return (
        <div className="mt-2">
          <div className="w-100 mh-100"> 
            { !this.state.messages && <h2 className="d-block m-4">No Mail</h2> }
            { this.state.messages &&  <h2 className="d-block m-4">My Mail</h2> }
            <Link type="button" to="/sendmail" className="btn btn-primary ml-5 mb-3">Compose Message</Link>
            { this.state.messages &&
              this.state.messages.map((x, i) => <div className="card ml-5 mr-5 mt-3" key={ i }> 
                    <div className="card-header h3 p-3">{x.sender}</div>
                    <div className="card-body bg-light">
                        <div className="">{x.content}</div>
                    </div>
                </div>)
            }
            </div>
        </div>
      );
    }
    
    componentDidMount() {
      let id = this.props.id;
      this.setState({userID: id});
      if (id) {
          this.mailRepo.getMail(1)
          .then(mail => this.setState({messages: mail}));
      }
      console.log(this.state)
    }
  }