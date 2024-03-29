import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './CreateNote.css'

function CreateNote() {

    const [content, setContent] = useState();

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleSubmit =(e) => {
        e.preventDefault();

        const note = {content};

        axios({
            method: "POST",
            url:`${process.env.REACT_APP_NOTESAPP_BACKEND}/notes/create`,
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`,
            },
            data: note,
        }).then((res)=>{
            console.log("New NOte Added");
            navigate("/dashboard");
        })
    }

    return (
        <div className='CreateForm'>
            <div className='FormContent'>
                <form onSubmit={handleSubmit}>
                    <div className='NOteForm'>
                        <h3 className='TextHead'>Note</h3>
                        <textarea className='NoteText' required value={content} onchange={(e) => setContent(e.target.value)} />
                    </div>
                    <button className="CreateNoteBtn" onClick={handleSubmit}>Create Note</button>
                </form>
            </div>
        </div>
    )
}

export default CreateNote