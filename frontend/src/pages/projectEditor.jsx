import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { ProjectRepo } from './../api/projectRepo';


export class ProjectEditor extends React.Component {

  projectRepo = new ProjectRepo();

  state = {
    userID: this.props.match.params.userID,
    projectID: this.props.match.params.projectID,
    projectName: this.props.location.state.project.projectName,
    projectbudget: this.props.location.state.project.budget,
    projectcategory: this.props.location.state.project.category,
    projectdescription: this.props.location.state.project.description,
    projectphoto: this.props.location.state.project.photo,
    postCreatedSuccess: false
    
  };

  handlePosting() {
    this.errorChecking();
  }

  updateProject(){
    let projectData = {
      projectID: this.state.projectID,
      userID: this.state.userID,
      projectName: this.state.projectName,
      budget: this.state.projectbudget,
      description: this.state.projectdescription,
      category: this.state.projectcategory,
      photo: this.state.projectphoto,
      active: 1
    }
    this.projectRepo.updateProject(projectData);
    this.setState({postCreatedSuccess: true});
  }

  constructor(props) {
      super(props);
      this.setState({
        projectName: this.props.location.state.project.projectName,
        projectbudget: this.props.location.state.project.budget,
        projectcategory: this.props.location.state.project.category,
        projectdescription: this.props.location.state.project.description,
        projectphoto: this.props.location.state.project.photo
      });
      console.log("Line 36 projectEditor.jsx" + this.state.projectName);
  }

  render() {
    return (
      <form>
        <div className="container-sm border border-secondary">
          <h1>Edit your Project:</h1><br></br>
          <div id="username" className="mb-3">
            <label htmlFor="userName">Project Name:</label><br></br>
            <input
            type="text"
            name="password"
            className="form-control"
            id="password"
            placeholder=""
            value={this.state.projectName}
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
                value={this.state.projectbudget}
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
                value={this.state.projectphoto}
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
              value={this.state.projectdescription}
              onChange={(myEvent) => this.setState({ projectdescription: myEvent.target.value })}
            />
            </div>
          
          {/* add error checking to this.state */}
          <button
            type="button"
            onClick={ () => this.updateProject()}
            className="btn btn-primary mb-3"
          >
            Save Updates
          </button>
        </div>
        {this.state.postCreatedSuccess && <Redirect to={'/myprojects/' + this.props.match.params.userID}/>}
      </form>
    );
  }
}
