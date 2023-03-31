import React from 'react'
import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import Client from '../services/Api'
const CommentView = () => {
  const [post, setPost] = useState({})
  
  const {post_id} = useParams()
  const {user_id} = useParams()

  const test = async () => {
    const selectedPost = await Client.get(`/api/post/posts/${post_id}`)
    console.log(selectedPost.data)
    setPost(selectedPost.data)
  }

  useEffect(() => {
    test()
  }, [])

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <img src={post.imgRes}/>
      <p style={{color: 'white'}}>{post.capRes}</p>

    </div>
  )
}

export default CommentView