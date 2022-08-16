import React, { useState, useEffect } from 'react'
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios'
import io from 'socket.io-client'

const socket = io('http://localhost:8000/');
const Form = ({user, setUsers, setCardUser,setPopup }) => {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        created: '',
        designation: '',
        workLocation: '',
        phoneNumber: ''
    });

    useEffect(() => {
        if(user) setData(user);
    }, [])

    const date = new Date();
    const storeDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`


    const addUser = () => {
        
        const uData = {
            firstName: data.firstName,
            lastName: data.lastName,
            created: storeDate,
            designation: data.designation,
            workLocation: data.workLocation,
            phoneNumber: data.phoneNumber,
        }
        axios.post("http://localhost:8000/users/create", uData)
        socket.once('user-added', newData => {
            console.log(newData)
            setUsers((user) => ([...user, newData]))
        })
        setPopup(false)
    }
    const updateUser = () => {
        const uData = {
            firstName: data.firstName,
            lastName: data.lastName,
            created: storeDate,
            designation: data.designation,
            workLocation: data.workLocation,
            phoneNumber: data.phoneNumber,
            _id: data._id

        }
        axios.put("http://localhost:8000/users/update",uData)
        socket.once('user-updated', (updatedData) => {
            setCardUser(updatedData)
        })
        setPopup(false)
    }
    return (
        <div className="infoCard">
            <div className="inputBox">
                <CancelIcon onClick={() => setPopup(false)} className="crossButton" />
                <h3>Enter user details:</h3>
                <label for="fname">First name</label>

                <input type="text"
                    id="fname"
                    value={data.firstName}
                    onChange={(e) => setData( prevstate => ({
                        ...prevstate,
                        firstName: e.target.value
                    }))}
                /><br></br>
                <label for="lname">Last name</label>
                <input type="text"
                    id="lname"
                    value={data.lastName}
                    onChange={(e) => setData( prevstate => ({
                        ...prevstate,
                        lastName: e.target.value
                    }))}
                />
                <label for="desg">Designation</label>
                <input type="text"
                    id="desg"
                    value={data.designation}
                    onChange={(e) => setData(prevstate => ({
                        ...prevstate,
                        designation: e.target.value
                    }))}
                />
                <label for="loc">Work Location</label>
                <input type="text"
                    id="loc"
                    value={data.workLocation}
                    onChange={(e) => setData(prevstate => ({
                        ...prevstate,
                        workLocation: e.target.value
                    }))}
                />
                <label for="phone">Contact Number</label>
                <input type="tel"
                    id="phone"
                    value={data.phoneNumber}
                    onChange={(e) => setData(prevstate => ({
                        ...prevstate,
                        phoneNumber: e.target.value
                    }))}
                />
                {!user ? (
                    <button onClick={addUser}>
                        Add User
                    </button>
                ): (
                        <button onClick={updateUser}>
                            Update User
                        </button>
                )}
                
            </div>
        </div>
    )
}
export default Form
