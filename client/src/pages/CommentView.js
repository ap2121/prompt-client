import React from 'react'
import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import Client from '../services/Api'
const CommentView = () => {
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const {post_id} = useParams()
  const {user_id} = useParams()

  const test = async () => {
    const selectedPost = await Client.get(`/api/post/posts/${post_id}`)
    console.log(selectedPost.data)
    setPost(selectedPost.data)
  }
  const getComments = async () => {
    const pComments = await Client.get(`/api/comment/post-comments/${post_id}`)
    console.log(pComments.data)
    setComments(pComments.data)
  }
  
  useEffect(() => {
    test()
    getComments()
  }, [post_id])
  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <p style={{color: 'white'}}>{post?.User?.username}</p>
      <img src={post?.imgRes}/>
      <p style={{color: 'white'}}>{post?.capRes}</p>
      {comments?.map((comment) => (
        <div key={comment.id}>
          <p>{comment?.User.username}</p>
          <p>{comment?.comRes}</p>

        </div>
      ))}
    

    </div>
  )
}

export default CommentView