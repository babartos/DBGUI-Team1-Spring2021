import axios from 'axios';

export class PostsRepo {
    
    url = "http://localhost:8000";
    //url = "http://18.216.125.210:8000";   //put URL here

    config = {
        headers: {
            Authorization: '*'
        }
    }

    getPostbyid(id){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/post/${id}`, this.config)
            .then(x => resolve(x.data))
            .catch(error => {
                console.log("error");
                console.log(error);
            });
        });
    }

    getAllPosts(){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/post`, this.config)
            .then(x => resolve(x.data))
            .catch(error => {
                console.log("error");
                console.log(error);
            });
        });
    }

}