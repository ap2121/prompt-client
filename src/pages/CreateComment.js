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
            <h3 className='crte-cmt-cmt'>{comment.comRes}</h3>
            </div>
            { comment?.id && <div className='cmt-btn-cnt'>
               
                <button onClick={() => {navigate(`/comment/${user_id}/${post_id}`)}} className='cmt-btn'>Post </button>
                
                <button Click={retryFacade} className='cmt-btn'>Retry</button>
            </div>}
        </div>
     ) 
    
     
    return (
    <div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <form onSubmit={handleSubmit} style={{display: 'grid',  gridTemplateColumns: '200px',justifyContent: 'center'}}>
            <TextField label= 'Comment Prompt' variant='outlined' name='comPrompt' value={formData.comPrompt} onChange={handleChange} style={{marginTop: '20px'}} sx={{input: {color: 'white', height: '50px'}}} required/>
        <button style={{marginTop: '20px', padding: '20px', borderRadius: '35px', width: '200px', textAlign: 'center',  color: 'white',  background: 'rgb(9,9,118,1)'}}>Preview Comment</button>
        </form>
        </div>
        <div className='crte-cmt-img-cnt'>
            <img src={currentPost.imgRes} className='crte-cmt-img'/>
            </div>
            <div className='crte-cmt-p-cnt'>
            <p className='crte-cmt-p'>{currentPost.capRes}</p>
            </div>
        
        <div>
            { withComment }
        </div>
    </div> 
  )
}

export default CreateComment