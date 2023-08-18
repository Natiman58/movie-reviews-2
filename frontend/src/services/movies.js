import axios from "axios";

const backend_url = "https://movie-review-app-backend-n0ij.onrender.com/api/v1/movies";
const localhost_url = "http://localhost:5001/api/v1/movies"

class MovieDataService{

    getAll(page=0){
        return axios.get(`${backend_url}?page=${page}`);
    };

    get(id){
        return axios.get(`${backend_url}/id/${id}`);
    };

    find(query, by="title", page = 0){
        return axios.get(`${backend_url}?${by}=${query}&page=${page}`);
    };

    createReview(data){
        return axios.post(`${backend_url}/review`, data);
    };

    updateReview(data){
        return axios.put(`${backend_url}/review`, data);
    };

    deleteReview(id, userId){
        return axios.delete(`${backend_url}/review`, {data: {review_id: id, user_id: userId}});
    };

    getRatings(){
        return axios.get(`${backend_url}/ratings`);
    };
};

export default new MovieDataService();