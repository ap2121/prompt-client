import React from 'react'
import {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TextField, Typography } from '@mui/material'
import Client from '../services/Api'
const CreatePost = () => {
  const [generatingPost, setGeneratingPost] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    imgPrompt: "",
    capPrompt: "",
   
  })
  const [post, setCurrentPost] = useState({})
  
  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value
      }
    })
  }
const { id } = useParams()
const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const res = await Client.post(`/api/post/create-post/${id}`, {...formData})
    if(res) {
      navigate(`/profile/${id}`)
    }
    
  } catch(error) {
    throw error
  }
  
  
}

  return (
    <div>
      <form onSubmit={handleSubmit} style={{display: 'flex', justifyContent:'center'}}>
      <TextField variant='outlined' label='Image Prompt' name='imgPrompt' value={formData.imgPrompt} onChange={handleChange}/>
      <TextField variant='outlined' label='Caption Prompt' name='capPrompt' value={formData.capPrompt} onChange={handleChange}/>
      <button>Add post</button>
      </form>
    </div>
  )
}

export default CreatePost