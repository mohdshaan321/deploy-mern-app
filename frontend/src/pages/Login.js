
import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import { handleError, handleSuccess } from '../utils'

function Login() {
    const [loginInfo, setLoginInfo] = useState({
      email : '',
      password : ''
        
    })

    const navigate = useNavigate()

   const handleChange = (e)=>{

    const {name,value} = e.target
    // console.log(name,value)
    const copyloginInfo = {...loginInfo}
    copyloginInfo[name]= value
    setLoginInfo(copyloginInfo)

   }


   const handlelogin = async (e)=>{
     e.preventDefault()

    const {email, password} = loginInfo;
  

     if(!email || !password){
      return handleError("email or password are required")
     }
     try {
      const url = 'http://localhost:8085/auth/login';

      const response = await fetch(url,{
        method: 'POST',
        headers : {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo)
        
      })

    
        const result = await response.json();
        console.log(result);
       
       

      

      // console.log(result)

      const {message,success,validationError,jwtToken, name} = result
  
      if(success){

        handleSuccess(message)
        localStorage.setItem('token', jwtToken)
        localStorage.setItem("loggedInUser", name)

       setTimeout(() => {
        navigate('/home') 
       }, 1000);

      } else if (validationError){
        const details = validationError?.details[0].message
        handleError(details)
      }

      else if(!success){
        handleError(message)
      }

     } catch (error) {
       handleError(error)
     }
     
   }
  

  return (
    <div className='container'> 
      <h1>Login</h1>
         <form onSubmit={handlelogin}>

          <div>
            <label htmlFor='email'>Email</label>
            <input
             onChange={handleChange}
              type='email'
              name='email'
              autoFocus
              placeholder='Enter your email...'
              value = {loginInfo.email}

             
            />
          </div>

          <div>
            <label htmlFor='Name'>Password</label>
            <input 
             onChange={handleChange}
             type='password'
             name='password'
             placeholder='Enter your password...'
             value = {loginInfo.password}

          
            />
          </div>
          <button type='submit'>Login</button>
          <span>Don't have an account?
           <Link to = "/signup">Signup</Link>
          </span>

         </form>
         <ToastContainer/>

    </div>


  )
}

export default Login