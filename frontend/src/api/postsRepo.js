import axios from 'axios';

export class PostsRepo {
    url = "18.216.125.210";   //put URL here

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