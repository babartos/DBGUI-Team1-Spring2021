import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { ProjectRepo } from './../api/projectRepo';


export class Ratings extends React.Component {

  projectRepo = new ProjectRepo();

  state = {
    likes: 0,
    likePressed: false,
    dislikes: 0,
    dislikesPressed: false
  };

  incrementLikes(){
    if(!this.state.likePressed){
        this.setState({likes: this.state.likes+1});
        this.setState({likePressed: true});
        this.projectRepo.incrementLikes(this.props.projectID);
    }
    else{
        this.setState({likes: this.state.likes-1});
        this.setState({likePressed: false});
        this.projectRepo.decrementLikes(this.props.projectID);
    }
  }

  incrementDislikes(){
    if(!this.state.dislikesPressed){
        this.setState({dislikes: this.state.dislikes+1});
        this.setState({dislikesPressed: true});
        this.projectRepo.incrementDislikes(this.props.projectID);
    }
    else{
        this.setState({dislikes: this.state.dislikes-1});
        this.setState({dislikesPressed: false});
        this.projectRepo.decrementDislikes(this.props.projectID);
    }
  }

  componentDidMount() {
    this.projectRepo.getLikes(this.props.projectID)
    .then(data => this.setState({likes: data}) );

    this.projectRepo.getDislikes(this.props.projectID)
    .then(data => this.setState({dislikes: data}) );
    }

  render() {
    return (
      <div>
          <h3>Ratings</h3>
          <p> {this.state.likes}</p>
          <button type="button" onClick={() => this.incrementLikes()}><img src="https://img.icons8.com/material-sharp/24/000000/thumb-up.png"/></button>
          <p>{this.state.dislikes}</p>
          <button type="button" onClick={() => this.incrementDislikes()}><img src="https://img.icons8.com/material/24/000000/thumbs-down--v1.png"/></button>
      </div>
    );
  }
}
