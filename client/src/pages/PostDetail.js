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
      <Link to={`/profile/${user?.id}`}>
      <h4>Back to profile</h4>
      </Link>
      <p style={{color: 'white'}}>{currentPost?.User?.username}</p>
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