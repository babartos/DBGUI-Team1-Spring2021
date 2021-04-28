import React, {useState, useEffect} from 'react';
import { Project } from './models/Project';
import { ProjectCreator } from './projectCreator';
import { Link, Redirect } from 'react-router-dom';
import { ProjectRepo } from './../api/projectRepo';
import { Comment } from './comment';
import { Ratings } from './ratings';

export const AllProjectList = props => {

  const projectRepo = new ProjectRepo();
  const [projects, setProjects] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [userID, setID] = useState();

  let temp = 0;

  useEffect(() => {
    if (!projects) {
      console.log(props.id);
      setID(props.id);
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
    return <p>Data is loading...</p>;
  }

 
  return <>
      <div className="container-sm">
          <h1>All Projects:</h1>
          {
            projects.map(project =>
                        <div className="card mb-3" key={project.projectID}>
                          <div>
                            <div>
                               <h2>{project.projectName}</h2>
                                <p className="text-muted ">{project.category}</p>
                                <p>{project.description}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <Ratings projectID={project.projectID} />
                            </div>
                            <div className="col">
                              <img src={project.photo} className="w-50"></img>
                            </div>
                            <div className="col">
                            <Comment projectUser={project.userID} myprojectID={project.projectID} userID={userID}/>
                            </div>
                          </div>  
                            
                            
                            

                        </div>
            )
        }
      </div>
      
    
  </>;

  
}
export default AllProjectList;