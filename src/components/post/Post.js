import React from 'react'
import "./postStyles.css"
import img1 from "../../assets/img1.jpg"
import {AiFillLike} from "react-icons/ai"
import {AiFillDelete} from "react-icons/ai"
import {BsThreeDots} from "react-icons/bs"
import { useDispatch} from 'react-redux'
import { removePost,likememory } from '../../store/postSlice'
import moment from 'moment'

const Post = ({post,setcurrentId}) => {
  const dispatch = useDispatch()
  const handleDelete =(e)=>{
    e.preventDefault();
    dispatch(removePost(post._id))
  }

  const handleUpdate =(e)=>{
    e.preventDefault();
    setcurrentId(post._id)
  }

  return (
   <div className='posts-container'>
      <div className='img-container'>
       { post.selectedFile ? <img src={post.selectedFile} alt="image"/> : <img src={img1} alt="image"/>}
      </div>
      <div className='overlay-content'>
        <div className='creator'>
            <h6>{post.creator}</h6>
            <small>{moment((post.createdAt)).fromNow()}</small>
        </div>
        <div className='update-btn'>
          <button onClick={handleUpdate}><BsThreeDots/></button>
        </div>
      </div>
      <div className='post-tags'>
        <small>{post.tags.map((tag)=>`#${tag} `)}</small>
      </div>
      <div className='post-title'>
        <h5>{post.title}</h5>
      </div>
      <div className='post-message'>
        <p>{post.message}</p>
      </div>
      <div className='post-btns'>
        <button onClick={()=> dispatch(likememory(post._id))}><AiFillLike/> Like{post.likeCount}</button>
        <button onClick={handleDelete}><AiFillDelete/> Delete</button>
      </div>
   </div>
  )
}

export default Post