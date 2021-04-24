import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { ProjectRepo } from './../api/projectRepo';


export class ProjectCreator extends React.Component {

  projectRepo = new ProjectRepo();

  state = {
    userID: this.props.match.params.userID,
    projectName: "",
    projectbudget: 0.0,
    projectcategory: "",
    projectdescription: "",
    projectphoto: "",
    postCreatedSuccess: false
  };

  handlePosting() {
    this.errorChecking();
  }

  creatProject(){
    let projectData = {
      userID: this.state.userID,
      projectName: this.state.projectName,
      budget: this.state.budget,
      description: this.state.projectdescription,
      category: this.state.projectcategory,
      photo: this.state.projectphoto,
      active: 1
    }
    this.projectRepo.createProject(projectData);
    this.setState({postCreatedSuccess: true});
  }

  errorChecking() {
    if(this.state.projectName === "") {
        alert('please enter a name for your project');
    }
    if(this.state.projectbudget === "") {
        alert('please enter a budget for your project');
    }
    if(this.state.projectcategory === "") {
        alert('please enter a category for your project');
    }
    if(this.state.projectphoto === "") {
        alert('please enter a photo for your project');
    }
    if(this.state.projectdescription === "") {
      alert('please enter a description for your project');
  }
    
  }

  render() {
    return (
      <form>
        <div className="container-sm border border-secondary">
          <h1>Create a new Project:</h1> <br></br>
          <div id="username" className="mb-3">
            <label htmlFor="userName">Project Name:</label><br></br>
            <input
            type="text"
            name="password"
            className="form-control"
            id="password"
            placeholder=""
            onChange={(myEvent) => this.setState({ projectName: myEvent.target.value })}
          />
          </div>
          <div className="row align-items-center mb-3">
            <div id="budget" className="col-sm-2">
             <label htmlFor="budget">Budget:</label><br></br>
              <input
                type="number"
                className="form-control"
                name="budget"
                id="budget"
                onChange={(myEvent) => this.setState({ projectbudget: myEvent.target.value })}
              />
            </div>
            <div id="category" className="col-sm">
             <label htmlFor="budget">Project Type:</label><br></br>
             <select className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                      onChange={(myEvent) => this.setState({ projectcategory: myEvent.target.value})}>
                <option value="Landscaping">Landscaping</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Indoor/Renovation">Indoor/Renovation</option>
                <option value="Repairs">Repairs</option>
             </select>
            </div>
            <div id="photo" className="col-sm-8">
             <label htmlFor="photo">Photo URL:</label><br></br>
              <input
                type="text"
                className="form-control"
                name="photo"
                id="photo"
                onChange={(myEvent) => this.setState({ projectphoto: myEvent.target.value })}
              />
            </div>
          </div>
          
            
            
          <div id="description">
             <label htmlFor="description">Project Description:</label><br></br>
            <textarea
              type="text"
              name="description"
              id="description"
              className="form-control mb-3"
              rows="5"
              placeholder="What do you want proffessionals to know about your project?"
              onChange={(myEvent) => this.setState({ projectdescription: myEvent.target.value })}
            />
            </div>
          
          {/* add error checking to this.state */}
          <button
            type="button"
            onClick={ () => this.creatProject()}
            className="btn btn-primary mb-3"
          >
            Post Project
          </button>
        </div>
        {this.state.postCreatedSuccess && <Redirect to={'/myprojects/' + this.props.match.params.userID}/>}
      </form>
    );
  }
}
