import React from 'react'
import {useState, useEffect} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import Client from '../services/Api'
const PostDetail = () => {
  const [currentPost, setCurrentPost] = useState({})
  const {post_id} = useParams()

  const getPost = async () => {
    const post = await Client.get(`/api/post/posts/${post_id}`)
    console.log(post.data)
    setCurrentPost(post.data)
  }

  useEffect(() => {
    getPost()
  }, [post_id])
  
  
  return (
    <div>
      <h1 style={{color: 'white'}}>Hello</h1>
    </div>
  )
}

export default PostDetail