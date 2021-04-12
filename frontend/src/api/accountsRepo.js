import axios from 'axios';

export class AccountsRepo {

    url = "empty";   //put URL here

    config = {
        headers: {
            Authorization: '*'
        }
    }

    //logging in 
    login(userName, password){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/loginUser`, {userName: userName, password: password}, this.config)
            .then(x => resolve(x.data))
            .catch(error => {
                console.log("error");
                console.log(error);
            });
        });
    }

    registerAccount(passedState){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/createUser`, passedState, this.config)
            .then(x => resolve(x.data))
            .catch(error => {
                console.log("error");
                console.log(error);
            });
        });
    }

    
}