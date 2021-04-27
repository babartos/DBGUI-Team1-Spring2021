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
          <h1 className="cover-heading">MyConstruction</h1>
          <p className="mt-3 lead">MyConstruction is a tool for all users, from Average Joe's to Professionals. Post DIY styled construction projects and ask professionals to provide insight on your projects</p>
          <Link to="/proffesionalAccounts"  className="text-center btn btn-lg btn-dark mt-3 mr-5">Discover Professionals</Link>
          <Link to="/allProjects"  className="btn btn-lg btn-dark mt-3">See DIY Projects</Link>
        </div>
      </div>
    </div>
    );
    }  
  }