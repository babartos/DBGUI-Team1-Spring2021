import axios from 'axios';

export class CommentsRepo {

    url = "http://localhost:8000";   //put URL here

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

    createComment(postID, userID, content) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/comment`,  {
                "postID": postID,
                "userID": userID,
                "content": content
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