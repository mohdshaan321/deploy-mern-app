
import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import { handleError, handleSuccess } from '../utils'

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
      name : '',
      email : '',
      password : ''
        
    })

    const navigate = useNavigate()

   const handleChange = (e)=>{

    const {name,value} = e.target
    // console.log(name,value)
    const copySignupInfo = {...signupInfo}
    copySignupInfo[name]= value
    setSignupInfo(copySignupInfo)

   }


   const handleSignup = async (e)=>{
     e.preventDefault()

    const {name, email, password} = signupInfo;

     if(!name || !email || !password){
      return handleError("name,email or password are required")
     }
     try {
      const url = 'https://deploy-mern-app-api-tawny.vercel.app/auth/signup';

      const response = await fetch(url,{
        method: 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(signupInfo)
        
      })

      const result = await response.json()
      console.log(result)

      const {message,success,validationError} = result
      if(success){

        handleSuccess(message)
        setTimeout(() => {
          navigate('/login')
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
      <h1>Signup</h1>
         <form onSubmit={handleSignup}>
          <div>
            <label htmlFor='name'>Name</label>
            <input
            onChange={handleChange}
            type='text'
            name='name'
            autoFocus
            placeholder='Enter your name...'
            value = {signupInfo.name}
         
            />
          
          </div>

          <div>
            <label htmlFor='email'>Email</label>
            <input
             onChange={handleChange}
              type='email'
              name='email'
              autoFocus
              placeholder='Enter your email...'
              value = {signupInfo.email}

             
            />
          </div>

          <div>
            <label htmlFor='Name'>Password</label>
            <input 
             onChange={handleChange}
             type='password'
             name='password'
             placeholder='Enter your password...'
             value = {signupInfo.password}

          
            />
          </div>
          <button type='submit'>Signup</button>
          <span>Already have an account?
           <Link to = "/login">Login</Link>
          </span>

         </form>
         <ToastContainer/>

    </div>


  )
}

export default Signup
