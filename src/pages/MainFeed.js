import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom' 
import Client from '../services/Api'
import FeedPost from '../components/FeedPost'
import { Typography } from '@mui/material'
const MainFeed = ({user}) => {
  const [posts, setPosts] = useState([])
  const {id} = useParams()
  


  const getPosts = async () => {
    const feedPosts = await Client.get(`/api/user/feed/${id}`)
    console.log(feedPosts.data)
    setPosts(feedPosts?.data)
    
  }

  const userFeed = posts.map((post) => (
   <FeedPost
   key={post.id}
   capRes={post.capRes}
   imgRes={post.imgRes}
   username={post.User.username}
   userId={post.userId}
   id={post.id}
   currentId={user?.id}
   proPic={post.User.proPic}
   />
      
      

    
  ))

  useEffect(() => {
    getPosts()
  }, [id])


  return (
    <div>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between',  marginLeft: '200px'}}>
      <h1 style={{color: 'white', fontSize: '50px'}}>Synapse</h1>
      
      </div>
      
      {userFeed}
      
    </div>
  )
}

export default MainFeed