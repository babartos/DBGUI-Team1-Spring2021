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
                <div className="w-200">
                    {this.state.comments && this.state.comments.length == 0 && <h3> No comments </h3>}
                    {this.state.comments && this.state.comments.length != 0 && <h3> Comments: </h3> }
                    {this.state.comments && this.state.comments.length != 0 && <ul>
                    <table className="w-300">
                        {this.state.comments.map((x, i) => <tr className="p-4" key={ i }> 
                        
                            {
                            this.props.projectUser==x.userID && <span className="font-weight-bold">{x.userName}: </span>
                            }
                            {
                                this.props.projectUser!=x.userID &&<span className="text-muted">{x.userName}: </span> 
                            } 
                            <span>{x.content}</span>
                    
                        </tr>)}  
                    </table>                
                    </ul>
                    }
                    {this.props.userID /* if logged in*/ && <CreateComment onAddComment = { comment => this.addComment(comment)} passedID={this.props.userID} myprojectID={this.props.myprojectID}/> }
                </div>
                
            </>
        );
    }

    componentDidMount() {
        //console.log(this.props.myprojectID);
        this.commentRepo.getComments(this.props.myprojectID) 
        .then(arr => {this.setState({comments: arr.data})});
    }
}
