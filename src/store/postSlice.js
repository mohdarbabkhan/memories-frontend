import {createSlice} from "@reduxjs/toolkit"
import { fetchProduct,createPost, deletedPost, updatePost, likePost} from "../api/index.js";

export const STATUSES = Object.freeze({
    IDLE:"idle",
    ERROR:'error',
    LOADING:'loading'
});

const postSlice = createSlice({
    name:'post',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
    reducers:{
        setPosts(state,action){
            state.data = action.payload
        },
        setStatus(state,action){
            state.status = action.payload
        },
        createPosts(state,action){
            state.data.push(action.payload)
        },
        deletePost(state,action){
            state.data.filter((post)=> post._id =! action.payload)
        },
        updatePosts(state,action){
            state.data.map((post)=> post._id == action.payload._id ? action.payload : post)
        },
        likePosts(state,action){
            state.data.map((post)=> post._id == action.payload._id ? action.payload : post)
        }
    }
})

export const {setPosts,setStatus,createPosts,deletePost,updatePosts,likePosts} = postSlice.actions;
export default postSlice.reducer;

// Thunks

export const fetchProducts = () => async(dispatch,getState)=>{
    dispatch(setStatus(STATUSES.LOADING));
    try {
        const {data} = await fetchProduct();
        dispatch(setPosts(data))
        dispatch(setStatus(STATUSES.IDLE));
    } catch (error) {
        console.log(error);
        dispatch(setStatus(STATUSES.ERROR));
    } 
}

export const makePosts = (post) => async(dispatch)=>{
    dispatch(setStatus(STATUSES.LOADING));
    try {
        const res =  createPost(post)
        const data = (await res).data
        // console.log((await res).data);
        dispatch(createPosts(data))
        dispatch(setStatus(STATUSES.IDLE));
    } catch (error) {
        console.log(error);
        dispatch(setStatus(STATUSES.ERROR));
    }
}

export const removePost = (id) => async(dispatch)=>{
    dispatch(setStatus(STATUSES.LOADING));
    try {
        deletedPost(id)
        dispatch(deletePost(id))
        dispatch(setStatus(STATUSES.IDLE));
    } catch (error) {
        console.log(error);
        dispatch(setStatus(STATUSES.ERROR));
    }
}

export const patchPost = (id,post) => async(dispatch) =>{
    try {
        const res = updatePost(id,post)
        const data = (await res).data
        dispatch(updatePosts(data))
    } catch (error) {
        dispatch(setStatus(STATUSES.ERROR));
    }
}

export const likememory = (id) => async(dispatch) =>{
    try {
        const res = likePost(id)
        const data = (await res).data
        dispatch(likePosts(data))
    } catch (error) {
        dispatch(setStatus(STATUSES.ERROR));
    }
}

