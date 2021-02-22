const BASE_URL = 'http://127.0.0.1:8000';
const TOKEN_KEY = 'token';

export default {
    post: async function (url, data, json=true) {
        return await this.request('POST', url, data, json)
    },
    
    delete: async function (url) {
        return await this.request('DELETE', url, {})
    },

    put: async function (url, data, json=true) {
        return await this.request('PUT', url, data, json)
    },

    request: async function (method, url, data, json=true) {
        const config = {
            method: method,
            headers: {},
            body: null
        };

        if (json){
            config.headers['Content-Type'] = 'application/json';
            config.body = JSON.stringify(data);
        }else{
            config.body = data;
        }

        const token = await this.getToken();
        if (token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, config)
        const dataR = await response.json();
        if (response.ok){
            return dataR;
        } else {
            throw new Error(dataR.message || JSON.stringify(dataR));
        }
    },

    registerUser: async function (user)  {
        const url = `${BASE_URL}/auth/register`
        return await this.post(url, user)
    },

    login: async function (user) {
        const url = `${BASE_URL}/auth/login`
        return await this.post(url, user)
    },

    saveToken: async function(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    deleteToken: async function(token) {
        localStorage.removeItem(TOKEN_KEY);
    },

    getToken: async function() {
        return localStorage.getItem(TOKEN_KEY);
    },

    isUserLogged: async function(){
        const token = localStorage.getItem(TOKEN_KEY);
        return token !== null;
    },

    getUser: async function() {
        try {
            const token = await this.getToken();
            const tokenParts = token.split('.');
            if (tokenParts.length !== 3) {
                return null
            } else {
                const payload = tokenParts[1];
                const jsonStr = atob(payload);
                const {userId, username} = JSON.parse(jsonStr);
                return {userId, username};
            }
        }
        catch{
            return null
        }
    },

    getCommercials: async function() {
        const currentUser = await this.getUser();
        const url = `${BASE_URL}/api/messages?_expand=user&_sort=id&_order=desc`
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.map(commercial => {
                const user = commercial.user || {}

                return {
                    id: commercial.id,
                    articulo: commercial.articulo.replace(/(<([^>]+)>)/gi, ""),
                    price: commercial.price,
                    owner: user.username || 'desconocido',
                    sale : commercial.sale,
                    image: commercial.image || null
                }   
            });
        } else {
            throw new Error(`HTTP Error: ${response.status}`)
        }
    },

    getCommercial: async function() {
        const currentUser = await this.getUser();
        const url = `${BASE_URL}/api/messages/${commercial.id}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.map(commercial => {
                const user = commercial.user || {}

                return {
                    id: commercial.id,
                    articulo: commercial.articulo.replace(/(<([^>]+)>)/gi, ""),
                    price: commercial.price.replace(/(<([^>]+)>)/gi, ""),
                    owner: user.username || 'desconocido',
                    sale : commercial.sale,
                    image: commercial.image || null,
                    description: commercial.description.replace(/(<([^>]+)>)/gi, ""),
                    canBeDeleted: currentUser ? currentUser.userId === commercial.userId : false
                }   
            });
        } else {
            throw new Error(`HTTP Error: ${response.status}`)
        }
    },

    saveCommercial: async function(commercial) {
        const url = `${BASE_URL}/api/messages`
        if (commercial.image) {
            const imageURL = await this.uploadImage(commercial.image)
            commercial.image = imageURL
        }
        return await this.post(url, commercial);
    },

    uploadImage : async function(image) {
        const form = new FormData();
        form.append('file', image);

        const url = `${BASE_URL}/upload`;
        const response = await this.post(url, form, false);
        return response.path||null;
    },

    
    deleteCommercial: async function(commercial){
        const url = `${BASE_URL}/api/messages/${commercial.id}`;
        return await this.delete(url);
    }
};