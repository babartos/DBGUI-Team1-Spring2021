import React from "react";
import { CommentsRepo } from "../api/commentsRepo";
import { UserRepository } from "../api/userRepository";
import { Link, Redirect } from 'react-router-dom';
import { AccountsRepo } from './../api/accountsRepo';

export class CreateComment extends React.Component {
    constructor(props) {
        super(props);
    }
    commentRepo = new CommentsRepo();
    accountRepo = new AccountsRepo();

    state = {
        commentContent: "",
        user: "",
        loading: true
    }

    componentDidMount(){
        this.accountRepo.getUser(this.props.passedID).then(obj => {
            this.setState({user: obj.data[0]})
            this.setState({loading: false})
        });
    }

    onAddComment(){
        const myUserID = this.props.passedID;
        const myProjectID = this.props.myprojectID;
        this.commentRepo.createComment(myProjectID, myUserID, this.state.commentContent).then(data => {
            console.log(data);
            alert("Comment posted!");
          })
          .catch( e => {
            console.log(e);
            alert("Invalid data");
          });

        this.props.onAddComment({
            userName: this.state.user.userName,
            content: this.state.commentContent,
            userID: myUserID
        })
        this.setState({commentContent: ""})
    }

    

    render() {
        if(this.state.loading){
            return <h2>Data is loading..</h2>
        }
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
                        <button type="reset" className="btn btn-primary" onClick={() => this.onAddComment()}>Post Comment</button>
                    </div>
                </div>
                </form>
            </>
        );
    }
}
