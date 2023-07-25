import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute(){
    const[ok,setok] = useState(false);
    const[auth,setAuth] = useAuth();
    useEffect(()=>{
        const authcheck = async ()=>{
            const res = await axios.get('/api/v1/auth/user-auth');
            if(res.data.ok){
                setok(true)
            }
            else{
                setok(false)
            }
        }
        if(auth?.token) authcheck();
    },[auth?.token]);

    return ok ? <Outlet/> : <Spinner/>;
};