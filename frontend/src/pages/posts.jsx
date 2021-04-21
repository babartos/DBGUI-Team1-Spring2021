import React from "react";

export class Posts extends React.Component {
  state = {
    projectName: "",
    budget: "",
    category: "",
    description: ""

  };

  handlePosting() {
    this.errorChecking();
  }

  errorChecking() {
    if(this.state.projectName === "") {
        alert('please enter a name for your project');
    }
    if(this.state.budget === "") {
        alert('please enter a budget for your project');
    }
    if(this.state.category === "") {
        alert('please enter a category for your project');
    }
    if(this.state.budget === "") {
        alert('please enter a description for your project');
    }
    
  }

  render() {
    return (
      <form>
        <div className="container-sm border border-secondary">
          <h1>Create a new Post</h1> <br></br>
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
          <div id="category" className="col-sm">
             <label htmlFor="budget">Project Type:</label><br></br>
             <select className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                      onChange={(myEvent) => this.setState({ category: myEvent.target.value})}>
                <option value="Landscaping">Landscaping</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Indoor/Renovation">Indoor/Renovation</option>
                <option value="Repairs">Repairs</option>
             </select>
            </div>
            <div id="budget" className="col-sm-10">
             <label htmlFor="budget">Budget:</label><br></br>
              <input
                type="number"
                className="form-control"
                name="budget"
                id="budget"
                onChange={(myEvent) => this.setState({ budget: myEvent.target.value })}
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
              onChange={(myEvent) => this.setState({ budget: myEvent.target.value })}
            />
            </div>
          
          {/* add error checking to this.state */}
          <button
            onClick={ () => this.handlePosting()}
            className="btn btn-primary mb-3"
          >
            Post Project
          </button>
        </div>
      </form>
    );
  }
}
