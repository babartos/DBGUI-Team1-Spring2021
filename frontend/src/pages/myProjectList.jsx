import React, {useState, useEffect} from 'react';
import { Project } from './models/Project';
import { ProjectCreator } from './projectCreator';
import { Link, Redirect } from 'react-router-dom';
import { ProjectRepo } from './../api/projectRepo';

export const MyProjectList = props => {

  const projectRepo = new ProjectRepo();
  const [projects, setProjects] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [userID, setID] = useState();

  useEffect(() => {
    if (!projects) {
        setID(props.match.params.userID);
        console.log("Line 18 userID: " + userID)
        projectRepo.getusersProjects(userID).then(x => {
          setProjects(x);
          console.log("X: " + x)
        })
        .catch((err) => {
            setError(err);
        })
        .finally(() => {
            setLoading(false);
        });
       
    }
  });

// handleDelete = itemId => {
//   const items = this.state.items.filter(item => item.id !== itemId);
//   this.setState({ items: items });
// };

let onProjectDelete = (projectID) => {
  if (window.confirm('Are you sure you want to delete this project?')) {
      projectRepo.deleteProject(projectID).then(() => {
          setProjects(projects.filter(x => x.projectID != projectID));
      })
  }
};

  if (loading) {
    return <p>Data is loading...</p>;
  }

  if (error || !Array.isArray(projects)) {
    return <p>There was an error loading your data!</p>;
  }

 
  return <>
      <div className="container-sm">
          <h1>My Projects:</h1>
                <Link type="button" to={'/creatPost/' + userID} className="btn btn-primary mb-3">Create new Post</Link>
          {
            projects.map(project =>
                        <div className="card mb-3 row" key={project.projectID}>
                            <div className="col">
                              <img src="https://i.pinimg.com/originals/a8/28/5e/a8285e3abdec766d7df375f3a007de28.jpg" className="w-50"></img>
                            </div>
                            <div className="col">
                              <h2>{project.projectName}</h2>
                              <p className="text-muted ">{project.category}</p>
                              <p>{project.description}</p>
                              <div className="">
                                  <button className="btn btn-secondary m-2">Edit</button>
                                  <button className="btn btn-danger" onClick={() => onProjectDelete(project.projectID)}>Delete</button>
                              </div>
                            </div>
                        </div>
            )
        }
      </div>
      
    
  </>;

  
}
export default MyProjectList;