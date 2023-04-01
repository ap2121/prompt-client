import React from 'react'
import {useState, useEffect} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import Client from '../services/Api'
const PostDetail = ({user}) => {
  const [currentPost, setCurrentPost] = useState({})
  const {post_id} = useParams()
  const navigate = useNavigate()
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
      <p>{currentPost?.User?.user}</p>
      <img src={currentPost?.imgRes}/>
      <p style={{color: 'white'}}>{currentPost?.capRes}</p>
      <button onClick={async () => {
        const deleted = await Client.delete(`/api/post/posts/${post_id}`)
        if(deleted) {
          navigate(`/profile/${user?.id}`)
        }
      }}>Delete Post</button>

    </div>
  )
}

export default PostDetail