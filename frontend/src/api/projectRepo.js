import axios from 'axios';

export class ProjectRepo {

    url = "http://localhost:8000";   //put URL here

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
            axios.get(`${this.url}/professional`, this.config)
            .then(x => resolve(x.data))
            .catch(error => {
                console.log("error");
                console.log(error);
            });
        });
    }
    
}