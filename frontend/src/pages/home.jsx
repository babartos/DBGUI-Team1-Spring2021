import React from "react";
import { Link, Redirect } from 'react-router-dom';

export class Home extends React.Component {
    state = {
      loggedIn: true
    }  
    render() {
      return (
    <div className="mt-3">
      <div className="container">
        <div className="margin-left-auto margin-right-auto  ">
          <h1 className="cover-heading text-center">MyConstruction</h1>
          <p className="mt-3 lead text-center">MyConstruction is a tool for all users, from Average Joe's to Professionals. Post DIY styled construction projects and ask professionals to provide insight on your projects</p>
          <div className="text-center">
            <Link to="/proffesionalAccounts"  className="btn btn-dark btn-lg mt-2 ml-3">Discover Professionals</Link>
            <Link to="/allProjects"  className="btn btn-dark btn-lg mt-2 ml-3">See DIY Projects</Link>
          </div>
        </div>
      </div>
    </div>
    );
    }  
  }