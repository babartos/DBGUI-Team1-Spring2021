import axios from 'axios';

export class CommentsRepo {

    url = "http://localhost:8000";
    //url = "http://18.216.125.210:8000";   //put URL here

    config = {
        headers: {
            Authorization: '*'
        }
    }

    //logging in 
    getComments(postID){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/comment/${postID}`, this.config)
            .then(x => resolve(x.data))
            .catch(error => {
                console.log("error");
                console.log(error);
            });
        });
    }

    createComment(projectID, userID, content) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/comment`,  {
                "userID": userID,
                "content": content,
                "projectID": projectID
            }, this.config)
            .then(x => resolve(x.data))
            .catch(error => {
                alert("you must be logged in to comment");
                console.log("error");
                console.log(error);
            });
        });
    }
    
}