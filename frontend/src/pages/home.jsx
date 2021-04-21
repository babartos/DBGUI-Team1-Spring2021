import React from "react";


export class Home extends React.Component {
    state = {
      loggedIn: true
    }  
    render() {
      return (
        <div>
            <h2>My construction</h2>
            <p>A tool for average Joe's to be able to post DIY styled construction projects and for professionals to provide insight on those projects. These professionals would be able to provide ideas and tools they think are best suited for the project at mind.</p>
        </div>
      );
    }  
  }