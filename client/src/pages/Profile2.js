import React from 'react'
import Client from '../services/Api'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { TextField, Button, Typography } from '@mui/material'

const Profile2 = ({user}) => {
  const [currentProfile, setCurrentProfile] = useState({})
  const [following, setFollowing] = useState(false)
    const {profile_id} = useParams()
    const {user_id} = useParams()
  const getPro = async () => {
    const profile = await Client.get(`/api/user/users/${profile_id}`)
    
    setCurrentProfile(profile.data)
  }
 const checkFollowing = async () => {
    const res = await Client.get(`/api/user/follow-check/${profile_id}/${user_id}`)
    if(res.status === 200) {
        setFollowing(true)
    } else if(res.status === 202) {
        setFollowing(false)
    }
 }
  
  const followUser = async () => {
    await Client.post(`/api/user/follow/${user_id}/${profile_id}`)
    setFollowing(true)
  }

  const unfollowUser = async () => {
    await Client.post(`/api/user/unfollow/${user_id}/${profile_id}`)
    setFollowing(false)
  }

  useEffect(() => {
    getPro()
    checkFollowing()
    
    
  }, [])
    
  
  return (
    <div>
         <div>
        
    <button onClick={following ? unfollowUser : followUser}>{following ? 'Unfollow' : 'Follow'}</button>        
    </div>
        <img src={currentProfile?.proPic}/>
        <p>{currentProfile?.bio}</p>
        {currentProfile?.Posts?.map((post) => (
            <div key={post.id}>
            <img src={post.imgRes}/>
            <p>{post.capRes}</p>
            </div>
        ))}
   
    </div>
  )
}

export default Profile2