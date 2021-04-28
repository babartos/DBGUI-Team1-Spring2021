import axios from 'axios';

export class ProjectRepo {

    // url = "http://localhost:8000";
    url = "http://18.216.125.210:8000";   //put URL here

    config = {
        headers: {
            Authorization: '*'
        }
    }

    createProject(project){
        console.log("Line 42")
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/project/add`, {
                "projectID": project.projectID, 
                "userID": project.userID, 
                "projectName": project.projectName, 
                "budget": project.budget, 
                "description": project.description,
                "active": project.active, 
                "category": project.category, 
                "photo": project.photo 
            }, this.config)
            .then(x => resolve(x.data))
            .catch(error => {
                console.log("error");
                console.log(error);
            });
        });
    }

    getusersProjects(userID){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/projects/${userID}`, this.config)
            .then(x => {
                console.log("X: " + JSON.stringify(x.data["data"]));
                resolve(x.data["data"]);
                
            })
            .catch(error => {
                alert(error);
                reject(error);
            });
        });
    }

    deleteProject(projectID){
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/projects/${projectID}`, this.config)
            .then(x => resolve(x.data))
            .catch(error => {
                console.log("error");
                console.log(error);
            });
        });
    }


    getAllProjects(){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/projects`, this.config)
            .then(x => resolve(x.data["data"]))
            .catch(error => {
                console.log("error");
                console.log(error);
            });
        });
    }
    
    updateProject(project){
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/project/edit`, {
                "projectID": project.projectID, 
                "userID": project.userID, 
                "projectName": project.projectName, 
                "budget": project.budget, 
                "description": project.description,
                "active": project.active, 
                "category": project.category, 
                "photo": project.photo 
            }, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
        });
    }

    getLikes(projectID){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/project/getlikes/${projectID}`, this.config)
            .then(x => {
                resolve(x.data["data"]["likes"])
                })
            .catch(error => {
                console.log("error");
                console.log(error);
            });
        });
    }

    getDislikes(projectID){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/project/getdislikes/${projectID}`, this.config)
            .then(x => {
                console.log("x.data for dislikes: "+ x.data["data"])
                resolve(x.data["data"]["dislikes"])
                })
            .catch(error => {
                console.log("error");
                console.log(error);
            });
        });
    }

    incrementLikes(projectID){
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/project/like/increase/${projectID}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
        });
    }

    decrementLikes(projectID){
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/project/like/decrease/${projectID}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
        });
    }

    incrementDislikes(projectID){
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/project/dislike/increase/${projectID}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
        });
    }

    decrementDislikes(projectID){
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/project/dislike/decrease/${projectID}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
        });
    }

}