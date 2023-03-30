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
    <div>Hello</div>
  )
}

export default ProfilePage