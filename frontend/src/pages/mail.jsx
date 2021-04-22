import React from "react";
import { MailRepo } from "../api/mailRepo";
import { Link, Redirect } from 'react-router-dom';

export class Mail extends React.Component {
    mailRepo = new MailRepo();

    state = {
      userID: undefined,
      myusername: undefined,
      // messages: [{sender: "Matt", content:"message"},
      // {sender: "Richard", content:"message2"}]
      messages: undefined
    }
    
    
    render() {
      return (
        <div className="mt-2">
          <div className="w-100 mh-100"> 
            { !this.state.messages && <h2 className="d-block m-4">No Mail</h2> }
            { this.state.messages &&  <h2 className="d-block m-4">My Mail</h2> }
            <Link type="button" to="/sendmail" className="btn btn-primary ml-5 mb-3">Compose Message</Link>
            { this.state.messages && 
              this.state.messages.data.map((x, i) => <div className="border-dark card ml-5 mr-5 mt-3" key={ i }> 
                    {console.log(x)}
                    <div className="card-header border-dark h4 p-3">From: {x.senderID}</div>
                    <div className="card-body border-dark p-2 bg-light"> {x.content} </div>
                </div>)
            }
            </div>
        </div>
      );
    }
    
    componentDidMount() {
      let id = this.props.id;
      this.setState({userID: id});
      this.setState({myusername: this.props.username})
      if (id) {
          this.mailRepo.getMail(this.props.username)
          .then(mail => this.setState({messages: mail}));
      }
    }
  }