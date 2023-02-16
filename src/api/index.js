import axios from "axios"

const url = "https://memories-backend-uwtg.onrender.com/posts";

export const fetchProduct = () => axios.get(url);
export const createPost = (newPost) => axios.post(url,newPost);
export const deletedPost = (id) => axios.delete(`${url}/${id}`);
export const updatePost = (id,updatedpost) => axios.patch(`${url}/${id}`,updatedpost);
export const likePost = (id) =>  axios.patch(`${url}/${id}/likepost`);