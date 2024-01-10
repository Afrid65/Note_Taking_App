import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import DeleteIcon from "@material-ui/icons/Delete";

import "./Home.css";

export default function Home() {

    const [noteList, setNotes] = useState([]);

    const callFn = () => {
        const token = localStorage.getItem("token");

        axios.get(`${process.env.REACT_APP_NOTESAPP_BACKEND}/notes/get`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setNotes(res.data)
        }).catch((e) => {
            console.log(e);
        });
    };

    useEffect(() => {
        callFn()
    }, [])

    useEffect(() => {
        callFn()
    }, [setNotes]);


    return (
        <div className='Home'>
            <h1 className='HomeNotes'>Notes</h1>

            <Link to="/create">
                <button className='AddBtn'>+</button>
            </Link>

            {!noteList || (noteList.length == 0 && (
                <h2 className="NoNotesFound">No Notes Found</h2>
            ))}
            <div className="NoteList">


                {noteList && (
                    <div>
                        {noteList &&
                            noteList.map((note) => (
                                <div className="Note">
                                    <div className="NoteContent">
                                        {note.content}
                                    </div>
                                    <Link to={`/delete/${note._id}`}>
                                        <span className="DelIcon"><DeleteIcon></DeleteIcon></span>
                                    </Link>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    )
}
