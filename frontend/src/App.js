
import {Routes, Route, Navigate} from "react-router-dom"
import Home from "./pages/Home";
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useState } from "react";
import RfrshHandler from './RfrshHandler'



function App() {
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const PrivateRoute = ({element})=>{
          return isAuthenticated ? element : <Navigate to={'/login'}/>
      }

  return (
    <div className="App">
      <RfrshHandler setIsAuthenticated={setIsAuthenticated}/>
   <Routes>
    <Route path="/" element ={<Navigate to = "/login"/>}/>;
    <Route path="/home" element ={<PrivateRoute element ={<Home/>}/>}/>;
    <Route path = "/login" element = {<Login/>}/>
    <Route path = "/signup" element = {<Signup/>}/>
   </Routes>
    </div>
  );
}

export default App;
