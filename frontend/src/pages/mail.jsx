import React from "react";

export class Mail extends React.Component {
    state = {
      userID: 1,
      messages: undefined
    }  

    render() {
      return (
        <div>
            <div className="w-100 mh-100 m-3"> 
            { !this.state.messages && <h2>No mail</h2>
            }
            { this.state.messages && <h2> My Mail </h2>}
            </div>

        </div>
      );
    }  
  }