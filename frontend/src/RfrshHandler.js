import React, { useEffect } from 'react'
import { replace, useLocation, useNavigate } from 'react-router-dom'

function RfrshHandler({setIsAuthenticated}) {
    const navigate =useNavigate()
    const location = useLocation()

    useEffect(()=>{

        if(localStorage.getItem('token')){
            setIsAuthenticated(true)
            if(location.pathname ==='/' || location.pathname === '/login' || location.pathname === '/signup'){
                 navigate('/home',{ replace:false})
    
            }
        }
    
    },[location,navigate,setIsAuthenticated])
 
  return (
    null
  )
}

export default RfrshHandler