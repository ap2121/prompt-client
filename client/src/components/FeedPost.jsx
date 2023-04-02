import React from 'react'
import {TextField, Card, Typography, Button} from '@mui/material'
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

import { Link } from 'react-router-dom'
import './feedPost.css'

const FeedPost = (props) => {
  return (
    
    <div style={{display: 'grid', justifyContent: 'center', alignItems: 'center', gridTemplateColumns: '400px', gap: '35px 35px'}}>
      <Card style={{width: '520px', height: '720px', marginBottom: '30px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center',  texAlign: 'center', gridTemplateColumns: '200px', background:  'rgba(9,9,118,1)', borderRadius: '15px'}}>
        <Link to={`/profile-2/${props.currentId}/${props.userId}`} style={{alignSelf: 'flex-start', color: 'black', textDecoration: 'none'}}>
        <div style={{display: 'flex', margin: 'auto',  justifyContent: 'center', alignItems: 'center'}}>
        <img src={props.proPic} style={{height: '50px', width: '50px', borderRadius: '50%', marginRight: '10px', marginTop: '15px', marginLeft: '10px'}}/>
        <p style={{alignSelf: 'center', color: 'white', fontSize: '16px', marginTop: '15px'}}>@{props.username}</p>
        </div>
        </Link>
        <img src={props.imgRes} className='feed-img'/>
        <div style={{display: 'flex', marginTop: '5px'}}>
        <p style={{color: 'white', fontSize: '18px', marginBottom: 'auto'}}>{props.capRes}</p>
        </div>
        <div style={{display: 'flex', marginTop: 'auto', marginLeft: 'auto', marginRight: '30px', marginBottom: 'auto'}}>
        <Link to={`/comment/${props.currentId}/${props.id}`}>
        
        <ModeCommentOutlinedIcon style={{height: '50px', width: '50px', marginTop: 'auto', marginBottom: 'auto', color: 'white'}}/>
        
     
        
        </Link>
        </div>
        
      </Card>
    </div>
  )
}

export default FeedPost