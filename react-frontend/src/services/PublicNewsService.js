import axios from 'axios';

const NEWS_API_BASE_URL2 = "http://localhost:8080/api/v1/public-news";

class PublicNewService {
    getAllPublicNews(){
        return axios.get(NEWS_API_BASE_URL2);
    }
}

export default new PublicNewService();
