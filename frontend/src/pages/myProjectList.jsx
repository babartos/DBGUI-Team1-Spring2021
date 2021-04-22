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
  

  useEffect(() => {
    if (!projects) {
        projectRepo.getusersProjects(3).then(x => {
          setProjects(x);
        })
        .catch((err) => {
            setError(err);
        })
        .finally(() => {
            setLoading(false);
        });
       
    }
  });



  if (loading) {
    return <p>Data is loading...</p>;
  }

  if (error || !Array.isArray(projects)) {
    return <p>There was an error loading your data!</p>;
  }

 
  return <>
      <div className="container-sm">
          <h1>My Projects:</h1>
                <Link type="button" to="/creatPost" className="btn btn-primary mb-3">Create new Post</Link>
          {
            projects.map(project =>
                        <div className="card mb-3" key={project.projectID}>
                            <h2>{project.projectName}</h2>
                            <p className="text-muted ">{project.category}</p>
                            <p>{project.description}</p>
                            <div>
                                <button className="btn btn-secondary m-2">Edit</button>
                                {/* <button className="btn btn-danger" onClick={() => projectRepo.deleteProject(project.projectID)}>Delete</button> */}
                            </div>
                            
                        </div>
            )
        }
      </div>
      
    
  </>;

  
}
export default MyProjectList;