import React,{useState,useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = ({path="login"}) => {
    const[count,setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((pre)=> --pre)
        },1000);
        count === 0 && navigate(`/${path}`,{
            state: location.pathname
        });
        return () => clearInterval(interval);
    },[count,navigate,location, path]);
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{height:"100vh"}}>
      <div className="spinner-border">
            <span className="visually-hidden">Loading...</span>
        </div>
        <div classname="text-center" >
            <h1>Redirecting to you in {count} second</h1>
        </div>
        </div>

    </>
  )
}

export default Spinner;
