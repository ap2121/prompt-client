import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom' 
import Client from '../services/Api'
const MainFeed = ({user}) => {
  const [posts, setPosts] = useState({})
  const {id} = useParams()
  const getPosts = async () => {
    const posts = await Client.get(`/api/user/feed/${id}`)
    console.log(posts.data)
    setPosts(posts?.data)
    
  }

  useEffect(() => {
    getPosts()
  }, [])


  return (
    <div>MainFeed</div>
  )
}

export default MainFeed