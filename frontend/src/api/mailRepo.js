import axios from 'axios';

export class MailRepo {

    url = "http://localhost:8000";   //put URL here

    config = {
        headers: {
            Authorization: '*'
        }
    }

    //logging in 
    getMail(id){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/message/${id}`, this.config)
            .then(x => resolve(x.data))
            .catch(error => {
                console.log("error");
                console.log(error);
            });
        });
    }

    sendMail(passedState){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/message/username`,  {
                "content": passedState.content,
                "userID": passedState.userID
            }, this.config)
            .then(x => resolve(x.data))
            .catch(error => {
                console.log("error");
                console.log(error);
            });
        });
    }

    
}