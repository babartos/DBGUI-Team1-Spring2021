import axios from 'axios';

export class AccountsRepo {

    url = "18.216.125.210";   //put URL here

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
            axios.post(`${this.url}/registerUser`,  {
                "userName": passedState.userName,
                "password": passedState.password,
                "type": passedState.type,
                "firstName": passedState.firstName,
                "lastName": passedState.lastName,
                "email": passedState.email,
                "contactInfo": passedState.contactInfo,
                "aboutMe": passedState.aboutMe
            }, this.config)
            .then(x => resolve(x.data))
            .catch(error => {
                console.log("error");
                console.log(error);
            });
        });
    }

    deleteAccount(id){
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/users/${id}`, this.config)
            .then(x => resolve(x.data))
            .catch(error => {
                console.log("error");
                console.log(error);
            });
        });
    }

    getProAccounts(){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/professional`, this.config)
            .then(x => resolve(x.data))
            .catch(error => {
                console.log("error");
                console.log(error);
            });
        });
    }





    
}