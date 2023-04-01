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
    const res = await Client.post(`/api/post/create-post/${user_id}`, {...formData})
    if(res) {
     setCurrentPost(res.data)
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
    <img src={post?.imgRes}/>
    <p style={{color: 'white'}}>{post?.capRes}</p>
    <Link to={`/profile/${user_id}`}>
    <p style={{color: 'white'}}>Post to feed</p>
    </Link>
    
    <p style={{color: 'white'}} onClick={retryFacade}>Retry</p>
    
  </div>
)

let noPostView = (
  <div>
    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg' />
    <p style={{color: 'white'}}>...</p>
  </div>
)
  return (
    <div>
       { user?.id == user_id && <div>
       <form onSubmit={handleSubmit} style={{display: 'flex', justifyContent:'center'}}>
      <TextField variant='outlined' label='Image Prompt' name='imgPrompt' value={formData.imgPrompt} onChange={handleChange}/>
      <TextField variant='outlined' label='Caption Prompt' name='capPrompt' value={formData.capPrompt} onChange={handleChange}/>
      <button>Add post</button>
      </form>
      </div>}
      <div>
        {post?.id ? postView : noPostView}
      </div>

    </div>
  )
}

export default CreatePost