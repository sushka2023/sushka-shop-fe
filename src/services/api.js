import axios from 'axios';

const API_URL = 'https://www.test-store.shop';

class ApplicationApi {
    constructor() {
        this.API_URL = API_URL;
        this.api = axios.create({
            baseURL: API_URL,
        });

        this.api.interceptors.request.use(config => {
            const token = localStorage.getItem('userToken') || '';
            config.headers.Authorization = token;

            // if(config.method === 'post') {
            //     delete config.headers['Content-Type'];
            // } else {
            //     config.headers['Content-Type'] = 'application/json';
            // }

            return config;
        });

        this.api.interceptors.response.use(function (response) {
            return response;
          }, function (error) {
            if (error.response.status === 401) {
                localStorage.setItem('userToken', '') 
                window.location.href = '/'
            }
            return Promise.reject(error);
          });
    }

    async registration(data) {
        const response = await this.api.post('/api/auth/signup', data);
        return response.data;
    }

    async login(data) {
        const response = await this.api.post('/api/auth/login', data);
        return response.data;
    }
}

const applicationApi = new ApplicationApi();
export default applicationApi;