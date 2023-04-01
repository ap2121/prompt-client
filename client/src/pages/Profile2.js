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
    const navigate  = useNavigate()
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
    
    
  }, [user_id, profile_id])
    
  
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
        <h3 style={{color: 'white'}}>Followers: </h3>{currentProfile?.Followers?.map((f) =>(
            <div key={f.id}>
                <Link to={`/profile-2/${user?.id}/${f.id}`}>
                <p style={{color: 'white'}}>{f.username}</p>
                </Link>
            </div>
        ))}
       <h3 style={{color: 'white'}}>Following</h3>{currentProfile?.Following?.map((f) => (
            <div key={f.id}>
                <p style={{color: 'white'}}>{f.username}</p>
            </div>
        ))}
    </div>
  )
}

export default Profile2