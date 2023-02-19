import React from 'react'
import "./formStyle.css"
import FileBase from "react-file-base64"
import { useState,useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux"
import { makePosts,patchPost } from '../../store/postSlice'
const Form = ({currentId,setcurrentId}) => {
  const dispatch = useDispatch();
  const [postData, setpostData] = useState({creator:'',title:'',message:'',tags:'',selectedFile:''})

  const post = useSelector((state) => currentId && state.post.data.find((p) => p._id == currentId))
  useEffect(()=>{
   if(post) setpostData(post) 
  },[post])
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(currentId){
      dispatch(patchPost({currentId,postData}))
    }else{
      dispatch(makePosts(postData))
    }
    clear();
  }
  const clear = ()=>{
    setpostData({creator:'',title:'',message:'',tags:'',selectedFile:''});
    setcurrentId(null);
  }  
  const handleClick = (e)=>{
    e.preventDefault();
    clear();
  }
  
  return (
    <div className='form-container'>
        <h4>{currentId ? 'Editing' : 'Creating'}</h4>
          <form action='post' onSubmit={handleSubmit}>
          <input className='input-form' onChange={(e)=>setpostData({...postData,creator:e.target.value})} type="text"  name="creator" value={postData.creator} placeholder="Creator" required />
          <input className='input-form' onChange={(e)=>setpostData({...postData,title:e.target.value})} type="text"  name="title" value={postData.title} placeholder="Title" required />
          <textarea className='input-form' onChange={(e)=>setpostData({...postData,message:e.target.value})} type="text"  name="message" value={postData.message} placeholder="Message" required />
          <input className='input-form' onChange={(e)=>setpostData({...postData,tags:e.target.value.split(',')})} type="text"  name="tags" value={postData.tags} placeholder="Tags" required />
          <FileBase
            type="file"
            multiple={false}
            className='file-input'
            onDone={({base64})=>setpostData({...postData,selectedFile:base64})}
          />
          <div className='btns'>
          <button type='submit' className='btn btn-primary submit-btn'>Submit</button>
          <button type='submit' onClick={handleClick} className='btn submit-btn clear-btn'>Clear</button>
          </div>
        </form>
    </div>
  )
}

export default Form