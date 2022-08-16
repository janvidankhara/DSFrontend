import axios from 'axios'
import React, {useEffect, useState} from 'react'
import "./Home.css"
import InfoCard from './InfoCard';

const Home = () => {

    const [users, setUsers] = useState()

    useEffect(()=>{
        axios.get('http://localhost:8000/users/read')
        .then(res => {
            setUsers(res.data)
        })
    },[])


    console.log(users)

    return (
        <div>
            <div className="container">
                {users && users.map(user => (
                    <InfoCard type="card" key={user._id}
                    user={user} allusers={users} 
                    setUsers={setUsers}/>
                ))}
                
                <InfoCard type="add" setUsers={setUsers}/>
            </div>
        </div>
    )
}

export default Home
