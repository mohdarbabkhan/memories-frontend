import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

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
    // reducers:{
    //     setPosts(state,action){
    //         state.data = action.payload
    //     },
    //     setStatus(state,action){
    //         state.status = action.payload
    //     },
    //     createPosts(state,action){
    //         state.data.push(action.payload)
    //     },
    //     deletePost(state,action){
    //         state.data.filter((post)=> post._id =! action.payload)
    //     },
    //     updatePosts(state,action){
    //         state.data.map((post)=> post._id == action.payload._id ? action.payload : post)
    //     },
    //     likePosts(state,action){
    //         state.data.map((post)=> post._id == action.payload._id ? action.payload : post)
    //     }
    // }
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.pending,(state,action)=>{
            state.status = STATUSES.LOADING
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.data = action.payload
            state.status = STATUSES.IDLE
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.status = STATUSES.ERROR
        })

        .addCase(makePosts.pending,(state,action)=>{
            state.status = STATUSES.LOADING
        })
        .addCase(makePosts.fulfilled,(state,action) =>{
            state.data.push(action.payload)
            state.status = STATUSES.IDLE
        })
        .addCase(makePosts.rejected,(state,action)=>{
            state.status = STATUSES.ERROR
        })

        .addCase(removePost.pending,(state,action)=>{
            state.status = STATUSES.LOADING
        })
        .addCase(removePost.fulfilled,(state,action) => {
            state.data.filter((post) => post._id != action.payload)
            state.status = STATUSES.IDLE
        })
        .addCase(removePost.rejected,(state,action)=>{
            state.status = STATUSES.ERROR
        })

        .addCase(patchPost.pending,(state,action)=>{
            state.status = STATUSES.LOADING
        })
        .addCase(patchPost.fulfilled,(state,action) => {
            state.data.map((post) => post._id == action.payload._id ? action.payload : post)
            state.status = STATUSES.IDLE
        })
        .addCase(patchPost.rejected,(state,action)=>{
            state.status = STATUSES.ERROR
        })

        .addCase(likememory.pending,(state,action)=>{
            state.status = STATUSES.LOADING
        })
        .addCase(likememory.fulfilled,(state,action) => {
            state.data.map((post) => post._id == action.payload._id ? action.payload : post)
            state.status = STATUSES.IDLE
        })
        .addCase(likememory.rejected,(state,action)=>{
            state.status = STATUSES.ERROR
        })        
    },
})

export const {setPosts,setStatus,createPosts,deletePost,updatePosts,likePosts} = postSlice.actions;
export default postSlice.reducer;

// Thunks
export const fetchProducts = createAsyncThunk('posts/fetch',async () =>{
    try {
        const {data} = await fetchProduct();
        return data  
    } catch (error) {
        console.log(error);
    }
})

export const makePosts = createAsyncThunk('posts/post',async (post) =>{
    try {
        const res =  createPost(post)
        const data = (await res).data
        return data;
    } catch (error) {
        console.log(error);
    }
})

export const removePost = createAsyncThunk('posts/delete',async (id) =>{
    try {
        deletedPost(id)
        return id;
    } catch (error) {
        console.log(error);
    }
})

export const patchPost = createAsyncThunk('posts/update',async({currentId,postData}) =>{
     try {
        const res = updatePost(currentId,postData)
        const data = (await res).data
        return data
    } catch (error) {
        console.log(error.message);
    }
})

export const likememory = createAsyncThunk('posts/like',async (id) =>{
    try {
        const res = likePost(id)
        const data = (await res).data
        return data
    } catch (error) {
        console.log(error.message);
    }
})


// export const fetchProducts = () => async(dispatch,getState)=>{
//     dispatch(setStatus(STATUSES.LOADING));
//     try {
//         const {data} = await fetchProduct();
//         dispatch(setPosts(data))
//         dispatch(setStatus(STATUSES.IDLE));
//     } catch (error) {
//         console.log(error);
//         dispatch(setStatus(STATUSES.ERROR));
//     } 
// }

// export const makePosts = (post) => async(dispatch)=>{
//     dispatch(setStatus(STATUSES.LOADING));
//     try {
//         const res =  createPost(post)
//         const data = (await res).data
//         // console.log((await res).data);
//         dispatch(createPosts(data))
//         dispatch(setStatus(STATUSES.IDLE));
//     } catch (error) {
//         console.log(error);
//         dispatch(setStatus(STATUSES.ERROR));
//     }
// }

// export const removePost = (id) => async(dispatch)=>{
//     try {
//         deletedPost(id)
//         dispatch(deletePost(id))
//         dispatch(setStatus(STATUSES.IDLE));
//     } catch (error) {
//         console.log(error);
//         dispatch(setStatus(STATUSES.ERROR));
//     }
// }

// export const patchPost = (id,post) => async(dispatch) =>{
//     try {
//         const res = updatePost(id,post)
//         const data = (await res).data
//         dispatch(updatePosts(data))
//     } catch (error) {
//         dispatch(setStatus(STATUSES.ERROR));
//     }
// }

// export const likememory = (id) => async(dispatch) =>{
//     try {
//         const res = likePost(id)
//         const data = (await res).data
//         dispatch(likePosts(data))
//     } catch (error) {
//         dispatch(setStatus(STATUSES.ERROR));
//     }
// }

