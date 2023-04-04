import React from 'react'
import {useState, useEffect} from 'react'
import Client from '../services/Api'
const Home = () => {
const [allPosts, setAllPosts] = useState([])

const getPosts = async () => {
  const res = await Client.get(`/api/post/posts`)
  console.log(res.data)
  setAllPosts(res.data)
}

useEffect(() => {
  getPosts()
}, [])

const homePosts = allPosts.map((p) => (
  <div className='home-img-cnt2'>
  
    <img src={p?.imgRes} className='home-img'/>
  
  
  </div>
))
  return (
    <div>
     
     <div className='home-title-cnt'>
      <h1 className='home-title'>Welcome To Synapse</h1>
     </div>
     <div>
      
     </div>
     <div className='home-img-cnt'>
     {homePosts}
     </div>
      
    </div>
      
      
  
    
  )
}

export default Home