import React from "react";
import { CommentsRepo } from "../api/commentsRepo";
import { UserRepository } from "../api/userRepository";

export class Comment extends React.Component {
    constructor(props) {
        super(props);
    }
    commentRepo = new CommentsRepo();

    state = {
        comments: undefined
    }

    render() {
        return (
            <>
                {this.state.comments && this.state.comments.length == 0 && <p> No comments </p>}
                {this.state.comments && this.state.comments.length != 0 && <p> Comments: </p> }
                {this.state.comments && this.state.comments.length != 0 && <ul>
                    {this.state.comments.map((x, i) => <li className="" key={ i }> 
                    <span className="font-weight-bold">{x.userName}: </span>
                    <span>{x.content}</span>
                    </li>)}                 
                 </ul>
                }
            </>
        );
    }

    componentDidMount() {
        //console.log(this.props.myprojectID);
        this.commentRepo.getComments(this.props.myprojectID) 
        .then(arr => this.setState({comments: arr.data}));       
    }
}
