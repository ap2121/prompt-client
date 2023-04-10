import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/Api'
import FeedPost from '../components/FeedPost'

const Explore = ({user}) => {
  const [allPosts, setAllPosts] = useState([])

  const getPosts = async () => {
    const res = await Client(`/api/post/posts`)
    console.log(res.data)
    setAllPosts(res.data) 
  }

  useEffect(() => {
    getPosts()
  }, [])

  const postView = allPosts.map((post) => (
    <FeedPost
    key={post.id}
    capRes={post.capRes}
    imgRes={post.imgRes}
    username={post.User?.username}
    userId={post.userId}
    id={post.id}
    currentId={user?.id}
    proPic={post.User?.proPic}
    />
  ))
  
    return (
    <div style={{marginTop: '20px'}}>
        {postView}
    </div>
  )
}

export default Explore