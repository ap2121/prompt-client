import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom' 
import Client from '../services/Api'
const MainFeed = ({user}) => {
  const [posts, setPosts] = useState([])
  const {id} = useParams()
  const getPosts = async () => {
    const feedPosts = await Client.get(`/api/user/feed/${id}`)
    console.log(feedPosts.data)
    setPosts(feedPosts?.data)
    
  }

  const userFeed = posts.map((post) => (
    <div key={post.id}>
      <p>{post.capRes}</p>

    </div>
  ))

  useEffect(() => {
    getPosts()
  }, [id])


  return (
    <div>
      {userFeed}
    </div>
  )
}

export default MainFeed