import React from "react";
import { CommentsRepo } from "../api/commentsRepo";
import { UserRepository } from "../api/userRepository";
import { Link, Redirect } from 'react-router-dom';

export class CreateComment extends React.Component {
    constructor(props) {
        super(props);
    }
    commentRepo = new CommentsRepo();

    state = {
        commentContent: ""
        
    }

    handleComment = (event) => {
        const myUserID = this.props.passedID;
        const myProjectID = this.props.myprojectID;
        console.log(this.state);
        console.log(myUserID);
        console.log(myProjectID);

        this.commentRepo.createComment(myProjectID, myUserID, this.state.commentContent).then(data => {
            console.log(data);
            alert("Comment posted!");
          })
          .catch( e => {
            console.log(e);
            alert("Invalid data");
          });
    }

    render() {
        return (
            <>
                <form>
                <div className="form-group row">
                    <label htmlFor="inputAboutme3" className="col-sm-2 col-form-label">Write a comment</label>
                    <div className="col-sm-10">
                        <textarea rows="6" type="aboutme" className="form-control" id="inputaboutme3" placeholder="Add a Comment" onChange={(myEvent) => this.setState({commentContent: myEvent.target.value })}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <Link to="/allProjects" type="button" className="btn btn-primary" onClick={(event) => this.handleComment(event)}>Post Comment</Link>
                    </div>
                </div>
                </form>
            </>
        );
    }
}
