import React from 'react'
import "./styles.css"
import {FcGoogle} from "react-icons/fc"
const login = () => {
  return (
    <div className='container-login'>
      <div className='registration-container'>
          <h2>Welcome back</h2>
          <h5>Welcome back, Please fill your details</h5>
          <div className='input-container'>
          <form action=''>
          <input className='input' type="email" name="email" placeholder="Your Email" required />
          <input className='input' type="password" name="password" placeholder="Your password" required />
          <div className='btns'>
          <a href='#' className='forgot'><small>Forgot?Password</small></a>
          <button type='submit' className='btn btn-primary login-btn'>Submit</button>
          <button type='submit' className='btn login-btn'><FcGoogle className='icon'/>login with google</button>
          </div>
        </form>
          </div>
        <small>Dont have an account?<a>Signup</a></small>
      </div>
      <div className='image-container'>
          
      </div>
    </div>
  )
}

export default login