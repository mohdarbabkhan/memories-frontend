import React, { useState } from 'react'
import "./styles.css"
import Navbar from '../components/navbar/Navbar'
import Form from '../components/form/Form.js'
import Post from '../components/post/Post.js'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { fetchProducts } from '../store/postSlice'

const Home = () => {
  const [currentId,setcurrentId] = useState(null)
    const dispatch = useDispatch();
    const {data} = useSelector((state) => state.post)
    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch,currentId,data])
  return (
    <div>
    <Navbar/>
    <div className='container-home '>
      <div className='container-post order-post'>
          {data.map((post,index) =>(
              <Post setcurrentId={setcurrentId} key={post._id + '-' + index} post={post}/>
          ))}
      </div>
      <div className='container-form order-form'>
          <Form currentId={currentId} setcurrentId={setcurrentId}/>
      </div>
    </div>
    </div>
  )
}

export default Home