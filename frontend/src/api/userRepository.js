import axios from 'axios';

export class UserRepository {

    url = 'http://localhost:8000';

    config = {
        headers: {
            Authorization: '*'
        }
    };

    getUsers(params) {
        if (params) {
            let config = this.config;
            config.params = params;
        }
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
        });
    }

    getUser(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/users/${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
        });
    }

    createUser(user) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}`, user, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
        });
    }

    updateUser(id, user) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/${id}`, user, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
        });
    }

    deleteUser(id) {
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
        });
    }
}