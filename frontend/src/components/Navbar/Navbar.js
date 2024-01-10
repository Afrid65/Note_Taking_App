import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';

import "./Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const handleSignOut = () =>{
        const token = localStorage.getItem("token");

        axios({
            url: `${process.env.REACT_APP_NOTESAPP_BACKEND}/user/logout`,
            method:"POST",
            Headers:{
                Authorization:`Bearer $(token)`, 
            },
        }).then(async(res)=>{
            const isTokenExists = localStorage.getItem("token");
            if(isTokenExists) {
                localStorage.removeItem("token");
                navigate("/");
            }
        });
    };

    const handleDeleteAcc = () => {
        const token = localStorage.getItem("token");

        axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_NOTESAPP_BACKEND}/users/delete`,
            headers:{
                Authorization: `Bearer $(token)`,
            },
        }).then((res) =>{
            console.log("User Account Deleted");
            localStorage.removeItem("token");
            navigate("/");
        });
    };

    return (
        <div className="Navbar">
            <div className="NavTitle">
                <Link className='NavTitle' to="/dashboard">
                    <h1 className='Titletext'>Notes</h1>
                </Link>
            </div>
            <div className="NavRouters">
                <Link className="NavRouters routes" to="/dashboard">
                    <span className="routes">
                        Dashboard
                    </span>
                </Link>
            </div>
            <div className="NavBtns">
                <button className="CreateNote" onClick={handleSignOut}>
                    Sign Out
                </button>
                <button className="CreateNote DelAccountBtn" onClick={handleDeleteAcc}>
                    Delete Account
                </button>
            </div>
        </div>
    )
}

export default Navbar