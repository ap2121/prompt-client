import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Client from '../services/Api'
import { TextField } from '@mui/material'
const CreateComment = () => {
const [formData, setFormData] = useState({
    comPrompt: ""
})
const [currentPost, setCurrentPost] = useState({})
const [comment, setCurrentComment] = useState({})
const {user_id} = useParams()
const {post_id} = useParams()
const navigate = useNavigate()

const getPost = async () => {
    try {
        const post = await Client.get(`/api/post/posts/${post_id}`)
        setCurrentPost(post.data)
    } catch(error) {
        throw error
    }
}

useEffect(() => {
    getPost()
}, [post_id])

const handleChange = (e) => {
    setFormData((prevFormData) => {
        return {
            ...prevFormData,
            [e.target.name]: e.target.value
          }
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
       try {
        const res = await Client.post(`api/comment/comments/${user_id}/${post_id}`, {...formData})
        if(res) {
          setCurrentComment(res.data)
          setFormData({
            comPrompt: ""
          })
          
        }
       } catch(error) {
        throw error
       }
      }
      const retryFacade = async () => {
        const deleted = await Client.delete(`/api/comment/comments/${post_id}`)
        if(deleted) {
            setCurrentComment({})
            setFormData({
                comPrompt: ""
            })
            navigate(`/create-comment/${user_id}/${post_id}`)
        } 
      }
     let withComment = (
        <div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <h3>{comment.comRes}</h3>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Link to={`/comment/${user_id}/${post_id}`}>
                <p>Post comment</p>
                </Link>
                <p onClick={retryFacade}>Retry</p>
            </div>
        </div>
     ) 
     let noComment = (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <h3 style={{color: 'white'}}>.....</h3>
        </div>
     )
    return (
    <div>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <img src={currentPost.imgRes}/>
            <p>{currentPost.capRes}</p>
        </div>
        <form onSubmit={handleSubmit} style={{display: 'flex', justifyContent: 'center'}}>
            <TextField label= 'Comment Prompt' variant='outlined' name='comPrompt' value={formData.comPrompt} onChange={handleChange}/>
        <button>Create Comment</button>
        </form>
        <div>
            {comment?.id ? withComment : noComment}
        </div>
    </div> 
  )
}

export default CreateComment