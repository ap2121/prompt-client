import React from 'react'
import Client from '../services/Api'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { TextField, Button, Typography } from '@mui/material'
const ProfilePage = ({user}) => {
  const [currentProfile, setCurrentProfile] = useState(false)
  const [followers, setFollowers] = useState([])

  const [following, setFollowing] = useState(false)  
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
  // const getUserFollowing = async () => {
  //   const currentFollowers = await Client.get(`/api/user/following/${user?.id}`)
  //   console.log(currentFollowers)
  //   setFollowers(currentFollowers)
    
  // }
  
  // const followUser = async () => {
  //   await Client.post(`/api/user/follow/${user?.id}/${id}`)
  //   setFollowing(true)
  // }

  // const unfolloweUser = async () => {
  //   await Client.post(`/api/user/unfollow/${user?.id}/${id}`)
  //   setFollowing(false)
  // }

  


  useEffect(() => {
    getUser()
    // getUserFollowing()    
  }, [user_id])
  

  return (
    <div>
      <button onClick={test}>Test</button>
      <img src={currentProfile?.proPic}/>
      <h3 style={{color: 'white'}}>{currentProfile?.bio}</h3>
      {/* {user?.id !== currentProfile?.id && <button onClick={following ? unfolloweUser : followUser}>{following ? 'Unfollow': 'Follow'}</button>} */}
      <Link to={`/create/${user_id}`}>
      { user?.id === currentProfile?.id && <Typography style={{color: 'white'}}>Create New Post</Typography>}
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