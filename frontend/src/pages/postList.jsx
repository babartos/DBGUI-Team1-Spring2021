import React from "react";
import { Project } from './models/Project';
import { Posts } from './posts';

export class PostList extends React.Component {
  state = {
    project: [ new Project (
        "Building wood deck",
        "Outdoor",
        2000,
        "I have the lumber to build the deck, I am unsure what kind of screws and drills I need. Help!"
        ),
        new Project (
            "Tiling Backsplash in Kitchen",
            "Indoor",
            5000,
            "I need to cut corner pieces but don't what tools to use to cut tile properly, without chipping it. "
        )],
    posts: "",
  };

  newPost(){
        this.state.posts = <Posts />;
        
  }

 
  render() {
    return (
      <div className="container-sm">
          <h1>My Projects:</h1>
          <button className="btn btn-primary mb-3"
                onClick={this.newPost}>Create new Post</button>
                {this.state.posts}
          {
          this.state.project.map(project =>
                        <div className="card mb-3">
                            <h2>{project.name}</h2>
                            <p className="text-muted ">{project.type}</p>
                            <p>{project.description}</p>
                            <div>
                                <button className="btn btn-secondary m-2">Edit</button>
                                <button className="btn btn-danger" >Delete</button>
                            </div>
                            
                        </div>
            )
        }
      </div>
      
    );
  }
}
export default PostList;