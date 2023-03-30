import React from 'react'
import Client from '../services/Api'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
const ProfilePage = () => {
  const [currentProfile, setCurrentProfile] = useState(null)

  const { id } = useParams()

  const getUser = async () => {
    const userPro = await Client.get(`/api/user/users/${id}`)
    console.log(userPro.data)
    setCurrentProfile(userPro.data)

  }

  useEffect(() => {
    getUser()
  }, [id])
  
  return (
    <div>
      <h1 style={{color: 'white'}}>{currentProfile?.bio}</h1>
      <img src={currentProfile?.proPic}/>
      {currentProfile?.Posts?.map((p) => (
        <div key={p.id}>
          
          <img src={p.imgRes}/>
          <p style={{color: 'white'}}> {p.capRes} </p>
        </div>
      ))}
       <p style={{color: 'white'}}>Followers:</p><br></br>
       {currentProfile?.Followers?.map((f) => (
        <div key={f.id}>
        <Link to={`/profile/${f.id}`}>
        <p style={{color: 'white'}}>{f.username}</p>
        </Link>
        </div>
      ))}
      <br></br>
      <p style={{color: 'white'}}>Following:</p><br></br>
      {currentProfile?.Following?.map((f) => (
        <div key={f.id}> 
        <Link to={`/profile/${f.id}`}>
        <p style={{color: 'white'}}>{f.username}</p>
        </Link>
        </div>
      ))}
      </div>

  )
}

export default ProfilePage