import React from 'react'
import {useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { TextField, Typography } from '@mui/material'

import Client from '../services/Api'
const CreatePost = ({user}) => {

  
  const [formData, setFormData] = useState({
    imgPrompt: "",
    capPrompt: "",
   
  })
  const [post, setCurrentPost] = useState({})
  
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value
      }
    })
  }
const { user_id } = useParams()
const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    setLoading(true)
    console.log(loading)
    const res = await Client.post(`/api/post/create-post/${user_id}`, {...formData})
    
    
    if(res) {
     setCurrentPost(res.data)
     setLoading(false)
     console.log(loading)
     setFormData({
      imgPrompt: "",
      capPrompt: ""
     })
     
    }
    
  } catch(error) {
    throw error
  }
  
  
}
const retryFacade = () => {
  
  const deleted = Client.delete(`api/post/posts/${post?.id}`)
  if(deleted) {
    navigate(`/create/${user_id}`)
  }
  setFormData({imgPrompt: "",
  capPrompt: "",})
  setCurrentPost({})
  
  
}

let postView = (
  <div>
    <div className='prvw-pic-cnt'>
    <img src={post?.imgRes} className='detail-img'/>
    </div>
    <div className='prvw-cap-cnt'>
    <p className='prvw-cap'>{post?.capRes}</p>
    </div>
    { post?.id && <div className=' flex post-btn-cnt'>
    
    <button className='post-btn' onClick={() => {navigate(`/profile/${user_id}`)}}>Post</button>
    
    
    <button onClick={retryFacade} className='post-btn'>Retry</button>
    </div>}
  </div>
)


  if(loading) {
    return (
      <div>
         <div className=' flex header-container'>
          <p className='crte-hdr'>New Post Prompt</p>
         </div>
         { user?.id == user_id && <div>
         <form onSubmit={handleSubmit}>
        <div className='input-cnt'>
        <TextField className='input' variant='outlined' label='Image Prompt' name='imgPrompt' value={formData.imgPrompt} onChange={handleChange} sx={{borderRadius: '35px'}} required/>
        <TextField className='input' variant='outlined' label='Caption Prompt' name='capPrompt' value={formData.capPrompt} onChange={handleChange} required/>
        </div>
        <div className='btn-cnt'>
        <button className='input-btn'>Review Post</button>
        </div>
        </form>
        </div>}
        
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <img src='https://i.imgur.com/UbwTRC5.gif' style={{border: '3px solid rgba(9,9,118,1)', borderRadius: '35px', marginTop: '15px'}}/>
        </div>
  
      </div> 
      )
  }
  return (
    <div>
       <div className=' flex header-container'>
        <p className='crte-hdr'>New Post Prompt</p>
       </div>
       { user?.id == user_id && <div>
       <form onSubmit={handleSubmit}>
      <div className='input-cnt'>
      <TextField className='input' variant='outlined' label='Image Prompt' name='imgPrompt' value={formData.imgPrompt} onChange={handleChange} sx={{borderRadius: '35px'}} required/>
      <TextField className='input' variant='outlined' label='Caption Prompt' name='capPrompt' value={formData.capPrompt} onChange={handleChange} required/>
      </div>
      <div className='btn-cnt'>
      <button className='input-btn'>Review Post</button>
      </div>
      </form>
      </div>}
      
      <div>
        {post?.id && postView}
      </div>

    </div>
  )
}

export default CreatePost