import React from 'react'
import Client from '../services/Api'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { TextField, Button, Typography } from '@mui/material'

const Profile2 = ({user}) => {
  const [currentProfile, setCurrentProfile] = useState({})
    const {profile_id} = useParams()
  const getPro = async () => {
    const profile = await Client.get(`/api/user/users/${profile_id}`)
    console.log(profile.data)
    setCurrentProfile(profile.data)
  }

  useEffect(() => {
    getPro()
  }, [profile_id])
    return (
    <div>
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