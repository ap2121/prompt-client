import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { TextField } from '@mui/material'
import Client from '../services/Api'
const EditProPic = () => {
  const [currentUser, setCurrentUser] = useState({})
  const [formData, setFormData] = useState({})
  const [newPic, setNewPic] = useState(null)
  const {user_id} = useParams()
  const navigate = useNavigate()

  const getUser = async () => {
    const profile = await Client.get(`/api/user/users/${user_id}`)
    
    setCurrentUser(profile.data)
  }

  const handleChange = (e) => {
    setFormData((prevFormData) => {
        return {
            ...prevFormData,
            [e.target.name]: e.target.value
        }
    })
  }

  const handleSubmit =  async (e) => {
    e.preventDefault() 
    const res = await Client.put(`/api/user/update-pic/${user_id}`, formData)
    if(res) {
        navigate(`/profile/${user_id}`)
    }
  }
  useEffect(() => {
    getUser()
  }, [user_id])

  useEffect(() => {
    setFormData(currentUser)
    
  }, [currentUser])

   
    return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <img src={currentUser?.proPic}/>
        <form onSubmit={handleSubmit}>
        <TextField  variant='outlined' name='proPicPrompt' value={formData.proPicPrompt} onChange={handleChange}/>
        <button>Confirm Update</button>
        </form>
        
    </div>
  )
}

export default EditProPic