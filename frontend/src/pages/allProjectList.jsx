import React, {useState, useEffect} from 'react';
import { Project } from './models/Project';
import { ProjectCreator } from './projectCreator';
import { Link, Redirect } from 'react-router-dom';
import { ProjectRepo } from './../api/projectRepo';

export const AllProjectList = props => {

  const projectRepo = new ProjectRepo();
  const [projects, setProjects] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [userID, setID] = useState();

  useEffect(() => {
    if (!projects) {
        projectRepo.getAllProjects().then(x => {
          console.log("X:" + x.data)
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
          <h1>All Projects:</h1>
          {
            projects.map(project =>
                        <div className="card mb-3" key={project.projectID}>
                            <h2>{project.projectName}</h2>
                            <img src={project.photo} className="w-50"></img>
                            <p className="text-muted ">{project.category}</p>
                            <p>{project.description}</p>
                            
                        </div>
            )
        }
      </div>
      
    
  </>;

  
}
export default AllProjectList;