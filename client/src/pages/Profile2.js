import React from 'react'
import Client from '../services/Api'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Card } from '@mui/material'
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

const Profile2 = ({user}) => {
  const [currentProfile, setCurrentProfile] = useState({})
  const [following, setFollowing] = useState(false)
  const [userPosts, setUserPosts] = useState([])
    const {profile_id} = useParams()
    const {user_id} = useParams()
    const navigate  = useNavigate()
  const getPro = async () => {
    const profile = await Client.get(`/api/user/users/${profile_id}`)
    
    setCurrentProfile(profile.data)
  }

  const getPosts = async () => {
    const res = await Client.get(`api/post/user-posts/${profile_id}`)
    console.log(res.data)
    setUserPosts(res.data)
  }
  
  const checkFollowing = async () => {
    const res = await Client.get(`/api/user/follow-check/${profile_id}/${user_id}`)
    if(res.status === 200) {
        setFollowing(true)
    } else if(res.status === 202) {
        setFollowing(false)
    }
 }
  
  const followUser = async () => {
    await Client.post(`/api/user/follow/${user_id}/${profile_id}`)
    setFollowing(true)
  }

  const unfollowUser = async () => {
    await Client.post(`/api/user/unfollow/${user_id}/${profile_id}`)
    setFollowing(false)
  }

  useEffect(() => {
    getPro()
    getPosts()
    checkFollowing()
    
    
  }, [user_id, profile_id])
    
  
  return (
    <div>
        <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '30px'}}>
     
     <div style={{height: '300px', width: '150px' ,display: 'flex', flexDirection: 'column', border: '5px solid rgba(9,9,118,1)', borderRadius: '35px', overflow: 'scroll'}}>
     <h3 style={{textAlign: 'center', fontSize: '20px', color: 'white', marginBottom: '20px', marginTop: '10px'}}>Followers</h3>
     {currentProfile?.Followers?.map((f) => (
      <div key={f.id}>
        <Link to={user?.id == f?.id ? `/profile/${user_id}` : `/profile-2/${user_id}/${f?.id}`} style={{textDecoration: 'none'}}>
        <div style={{display: 'flex', alignItems: 'center', fontSize: '20px'}}>
        <img src={f?.proPic} style={{height: '20px', width: '20px', borderRadius: '50%', marginRight: '10px', margin: '5px'}}/>
        
        <p style={{color: 'white'}}>{f?.username}</p>
        
      </div>
      </Link>
      </div>

     ))}
     </div>
     <img src={currentProfile?.proPic} style={{height: '400px', width: '400px', borderRadius: '50%'}}/>

      <div style={{height: '300px', width: '150px' ,display: 'flex', flexDirection: 'column', border: '5px solid rgba(9,9,118,1)', borderRadius: '35px', overflow: 'scroll'}}>
      <h3 style={{textAlign: 'center', fontSize: '20px', color: 'white', marginBottom: '20px', marginTop: '10px'}}>Following</h3>
      {currentProfile?.Following?.map((f) => (
        <div key={f.id}> 
        <Link to={user?.id == f?.id ? `/profile/${user_id}` : `/profile-2/${user_id}/${f?.id}`} style={{textDecoration: 'none'}}>
        <div style={{display: 'flex', alignItems: 'center', fontSize: '20px'}}>
        <img src={f?.proPic} style={{height: '20px', width: '20px', borderRadius: '50%', margin: '5px'}}/>
        <p style={{color: 'white'}}>{f?.username}</p>
        </div>
        </Link>
        </div>
      ))}
      </div>
     </div>
     
   
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '25px'}}>
      <h3 style={{color: 'white', fontSize: '50px'}}>@{currentProfile?.username}</h3>
    </div>
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}> 
     <button onClick={following ? unfollowUser : followUser} style={{width: '250px', padding: '20px', fontSize: '20px', color: 'white', background: 'rgba(9,9,118,1)', borderRadius: '35px'}}>{following ? 'Unfollow' : 'Follow'}</button>
     </div>
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
      
      <div style={{border: '5px solid rgba(9,9,118,1)', padding: '50px', borderRadius: '35px'}}>
      <p style={{color: 'white'}}>{currentProfile?.bio}</p>
      
      </div>
      
      
    </div>
    <div style={{display: 'grid',  justifyContent: 'center',gridTemplateColumns: '325px 325px 325px 325px', gridGap: '25px', marginTop: '20px', marginBottom: '20px'}}>
      {userPosts?.map((p) => (
        <div key={p?.id}>
        <Card style={{height: '400px', width: '325px', display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center', background: 'rgba(9,9,118,1)', borderRadius: '35px',}}>
        <img src={p?.imgRes} style={{height: '325px', width: '325px', marginBottom: 'auto'}}/>
        <p style={{color: 'white', fontSize: '15px', textAlign: 'center', marginBottom: 'auto'}}>{p?.capRes}</p>
        <ModeCommentOutlinedIcon style={{color: 'white', marginLeft: 'auto', marginRight: '17px', marginBottom: '10px'}}/>
        </Card>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Profile2