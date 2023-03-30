import React from 'react'
import Client from '../services/Api'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState(null)

  const { id } = useParams()

  const getUser = async () => {
    const userPro = await Client.get(`/api/user/users/${id}`)
    console.log(userPro.data)
    setCurrentUser(userPro.data)

  }

  useEffect(() => {
    getUser()
  }, [id])
  
  return (
    <div>
      <h1 style={{color: 'white'}}>{currentUser?.bio}</h1>
      <img src={currentUser?.proPic}/>
      {currentUser?.Posts?.map((p) => (
        <div key={p.id}>
          
          <img src={p.imgRes}/>
          <p style={{color: 'white'}}> {p.capRes} </p>
        </div>
      ))}
       <p style={{color: 'white'}}>Followers:</p><br></br>
       {currentUser?.Followers?.map((f) => (
        <div key={f.id}>
        <p style={{color: 'white'}}>{f.username}</p>
        </div>
      ))}
      <br></br>
      <p style={{color: 'white'}}>Following:</p><br></br>
      {currentUser?.Following?.map((f) => (
        <div key={f.id}> 
        <p style={{color: 'white'}}>{f.username}</p>
        </div>
      ))}
      </div>

  )
}

export default ProfilePage