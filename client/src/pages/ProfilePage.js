import React from 'react'
import Client from '../services/Api'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { TextField, Button, Typography } from '@mui/material'
const ProfilePage = () => {
  const [currentProfile, setCurrentProfile] = useState(null)
  const [formData, setFormData] = useState({
    imgPrompt: "",
    capPrompt: ""
  })
  const { id } = useParams()
  const navigate = useNavigate()
  const getUser = async () => {
    const userPro = await Client.get(`/api/user/users/${id}`)
    console.log(userPro.data)
    setCurrentProfile(userPro.data)

  }

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value
      }
    })
  }

  useEffect(() => {
    getUser()
  }, [id])
  
  return (
    <div>
      
      <img src={currentProfile?.proPic}/>
      <h3 style={{color: 'white'}}>{currentProfile?.bio}</h3>
      <Link to={`/create/${id}`}>
      <Typography style={{color: 'white'}}>Create New Post</Typography>
      </Link>
        
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