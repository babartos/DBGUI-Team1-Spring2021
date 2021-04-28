import axios from 'axios';

export class MailRepo {

    url = "18.216.125.210:8000";   //put URL here

    config = {
        headers: {
            Authorization: '*'
        }
    }

    //logging in 
    getMail(username){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/message/${username}`, this.config)
            .then(x => resolve(x.data))
            .catch(error => {
                console.log("error");
                console.log(error);
            });
        });
    }

    sendMail(passedState){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/message/send`,  {
                "userName": passedState.sendUsername,
                "senderUserName": passedState.myusername,
                "content": passedState.sendMessageBody
            }, this.config)
            .then(x => resolve(x.data))
            .catch(error => {
                console.log("error");
                console.log(error);
            });
        });
    }

    
}