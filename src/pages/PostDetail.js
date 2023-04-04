import React from 'react'
import {useState, useEffect} from 'react'
import { useParams, useNavigate, Link} from 'react-router-dom'
import Client from '../services/Api'
const PostDetail = ({user}) => {
  const [currentPost, setCurrentPost] = useState({})
  const {post_id} = useParams()
  const navigate = useNavigate()
  const getPost = async () => {
    const post = await Client.get(`/api/post/posts/${post_id}`)
    
    setCurrentPost(post.data)
  }

  

  useEffect(() => {
    getPost()
  }, [post_id])
  
  
  return (
  <div>
    <div className='detail-cnt'>
      <img src={currentPost?.imgRes} className='detail-img'/>
    </div>
    <div className='detail-cnt'>
      <p className='detail-bio'>{currentPost?.capRes}</p>
    </div>
    <div className='detail-cnt'>
      <button className='detail-btn'>Delete Post</button>
    </div>
  </div>
  )
}

export default PostDetail