import React from 'react'
import {useState, useEffect} from 'react'
import {useParams, useNavigate, Link} from 'react-router-dom'
import { TextField, Card } from '@mui/material'
import Client from '../services/Api'
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
const CommentView = ({user}) => {
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])

  


  const {post_id} = useParams()
  const {user_id} = useParams()
  const navigate = useNavigate()
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
    <div>
     
     <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
      
     
      <div>
     
     
      
      </div>
      {/* <img src={post?.imgRes} style={{height: '300px', width: '300px', marginTop: '20px', borderRadius: '35px', marginBottom: '20px', marginTop: '40px'}}/> */}
      <div>
      <div  style={{display: 'flex', justifyContent: 'center', textDecoration: 'none'}}>
      
      </div>
     <div style={{ height: '400px', width: '900px', overflow: 'scroll', }}>
     <Link to={`/create-comment/${user_id}/${post_id}`}>
      <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '5px'}}>
      <AddCommentOutlinedIcon style={{height: '50px', width: '50px', color: 'rgba(9,9,118,1)'}}/>
      </div>
      </Link>
     <Card style={{margin: '30px', padding: '20px', background:  'rgba(9,9,118,1)', color: 'white'}}>
     <p style={{marginRight: '10px'}}>@{post?.User?.username}</p>
     
     <p>{post?.capRes}</p>
     
     </Card>
      { comments?.map((comment) => (
        <div key={comment.id}>
          <Card style={{margin: '30px', padding: '20px', background:  'rgba(9,9,118,1)'}}>
          <div style={{display: 'flex', alignItems: 'center', color: 'white'}}>
          <Link to={user?.id == comment?.userId ? `/profile/${user_id}` : `/profile-2/${user_id}/${comment?.userId}`} className='link'>
         
          <p style={{marginRight: '20px', color: 'white'}}>@{comment?.User?.username}</p>
          </Link>
          <p>{comment?.comRes}</p>
          </div>
          
          </Card>
          
          </div>
       
          
          
      )) }
    
    </div>
      
      </div>
      
      </div>
      
      </div>
     
      
    
  )
}

export default CommentView