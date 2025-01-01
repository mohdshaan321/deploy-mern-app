import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import {ToastContainer} from "react-toastify"



function Home() {
  const [loggedinUser,setLoggedInUser] = useState('');
  const [products,setProducts] = useState('');
  const navigate = useNavigate()

  useEffect(()=>{
     setLoggedInUser(localStorage.getItem("loggedInUser"));
  },[])


    const handleLogout = ()=>{
     localStorage.removeItem("token")
     localStorage.removeItem("loggedInUser")
     handleSuccess("User logout")
     setTimeout(() => {
       navigate("/login")
     }, 1000);

   }
     
   const fetchProducts = async()=>{
    const url = "https://deploy-mern-app-api-tawny.vercel.app/products" ;
    const token = localStorage.getItem('token')
    

    if (!token) {
     console.log("No token found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(url)
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error fetching products:', response.status, errorMessage);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json()
      console.log(result)
      setProducts(result)

      } catch (error) {
          console.log("Failed to fetch products: " + error.message);}
    
  }

   useEffect(()=>{
    fetchProducts()
   },[])

  //  [] this means the function is run only once 
  


  return (
    <div>
    <h1> Welcome {loggedinUser}</h1>

    <div> 
         {
          products && products.map((item)=>(
            <ul>
              <span>
                {item.name} : {item.price}
              </span>
            </ul>
          ))
         }
            
    </div>
   
    <button onClick={handleLogout}>Logout</button>
    <ToastContainer/>
    </div>
  )

}
export default Home
