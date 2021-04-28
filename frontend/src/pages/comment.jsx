import React from "react";
import { CommentsRepo } from "../api/commentsRepo";
import { UserRepository } from "../api/userRepository";
import { CreateComment } from './createComment';

export class Comment extends React.Component {
    constructor(props) {
        super(props);
    }
    commentRepo = new CommentsRepo();

    state = {
        comments: undefined
    }

    addComment(comment){
        var comments = this.state.comments;
        comments.push(comment);
        this.setState({ comments })
    }

    render() {
        return (
            <>
                {this.state.comments && this.state.comments.length == 0 && <p> No comments </p>}
                {this.state.comments && this.state.comments.length != 0 && <p> Comments: </p> }
                {this.state.comments && this.state.comments.length != 0 && <ul>
                    {this.state.comments.map((x, i) => <li className="" key={ i }> 
                    {
                        this.props.projectUser==x.userID && <span className="font-weight-bold">{x.userName}: </span>
                    }
                    {
                        this.props.projectUser!=x.userID &&<span>{x.userName}: </span>
                    } 
                    <span>{x.content}</span>
                    </li>)}                 
                 </ul>
                }
                {this.props.userID /* if logged in*/ && <CreateComment onAddComment = { comment => this.addComment(comment)} passedID={this.props.userID} myprojectID={this.props.myprojectID}/> }
            </>
        );
    }

    componentDidMount() {
        //console.log(this.props.myprojectID);
        this.commentRepo.getComments(this.props.myprojectID) 
        .then(arr => {this.setState({comments: arr.data})});
    }
}
