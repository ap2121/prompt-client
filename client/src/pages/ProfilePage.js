import React from 'react'
import Client from '../services/Api'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { TextField, Button, Typography } from '@mui/material'
const ProfilePage = ({user}) => {
  const [currentProfile, setCurrentProfile] = useState(false)
  const [updating, setUpdating] = useState(false) 

  
  const { user_id } = useParams()
  const navigate = useNavigate()
    
    const test = () => {
      console.log(user)
    }
    const getUser = async () => {
    const userPro = await Client.get(`/api/user/users/${user_id}`)
    console.log(userPro.data)
    
    setCurrentProfile(userPro?.data)

  }
  
  const toggleEdit = () => {
    setUpdating(!updating)
  }
  


  


  useEffect(() => {
    getUser()
     
  }, [user_id])
  

  return (
    <div>
      <button onClick={test}>Test</button>
      { user?.id == user_id && <div>
      
      <img src={currentProfile?.proPic}/>
      {updating && <button onClick={() => {navigate(`/edit-propic/${user_id}`)}}>Update Profile Pic</button>}
      { updating && <button onClick={() => {navigate(`/edit-bio/${user_id}`)}}>Update Bio</button>}
      <h3 style={{color: 'white'}}>{currentProfile?.bio}</h3>
      
      <button onClick={toggleEdit}>Update Profile</button>
      </div>}
      {user?.id == user_id && <Link to={`/create/${user_id}`}>
      <Typography style={{color: 'white'}}>Create New Post</Typography>
      </Link>}
        
      {currentProfile?.Posts?.map((p) => (
        <div key={p.id}>
           {user?.id == user_id && <Link to={`/user-post/${p.id}`}>
          <img src={p.imgRes}/>
          <p style={{color: 'white'}}> {p.capRes} </p>
          </Link>}
          
        </div>
      ))}
       <p style={{color: 'white'}}>Followers:</p><br></br>
       {currentProfile?.Followers?.map((f) => (
        <div key={f.id}>
        { user?.id == user_id && <Link to={`/profile-2/${user?.id}/${f.id}`}>
        <p style={{color: 'white'}}>{f.username}</p>
        </Link>}
        </div>
      ))}
      <br></br>
      <p style={{color: 'white'}}>Following:</p><br></br>
      {currentProfile?.Following?.map((f) => (
        <div key={f.id}> 
        { user?.id == user_id && <Link to={`/profile/${f.id}`}>
        <p style={{color: 'white'}}>{f.username}</p>
        </Link>}
        </div>
      ))} 
      </div>

  )
}

export default ProfilePage