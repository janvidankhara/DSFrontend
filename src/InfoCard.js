import React, { useState, useEffect } from 'react'
import axios from 'axios';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Form from './Form';
import io from 'socket.io-client'
const socket = io('http://localhost:8000/');


const InfoCard = ({ type, user, setUsers, allusers }) => {

    const [popup, setPopup] = useState(false);

    const [cardUser, setCardUser] = useState(user);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/users/delete/${id}`)
        socket.on('user-deleted', (id) => {
            const newUsers = allusers.filter(user => {
                return user._id !== id
            })
            setUsers(newUsers)
            console.log(newUsers)
            console.log(id)
        })
    }

    

    return (
        <div>
            {
                popup && <Form setPopup={setPopup}
                user={cardUser} setUsers={setUsers} 
                setCardUser={setCardUser}/>
            }
            {(type === 'card') ? (
                <div className="infoCards">
                    <div className="showCards">
                        <div className="contentOfCards">
                            <strong>{cardUser.firstName}</strong>
                            <strong>{cardUser.lastName}</strong>
                            <p>Added on: {cardUser.created}</p>
                            <p className="about">{cardUser.designation}</p>
                            <p className="about">{cardUser.workLocation}</p>
                            <p className="phoneNumber">{cardUser.phoneNumber}</p>
                        </div>

                    </div>
                    <div className="btn-container">
                        <div onClick={() => setPopup(true)}>
                            <CreateIcon />
                        </div>
                        <div onClick={() => handleDelete(user._id)}>
                            <DeleteIcon />
                        </div>
                    </div>
                </div>
            ) : (
                    <div className="addCards"
                        onClick={() => setPopup(true)}>
                        <AddCircleOutlineIcon />
                    </div>
                )}


        </div>

    )
}

export default InfoCard
