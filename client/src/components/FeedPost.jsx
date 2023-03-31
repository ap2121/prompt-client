import React from 'react'
import {TextField, Card, Typography, Button} from '@mui/material'
import { Link } from 'react-router-dom'
import './feedPost.css'
const FeedPost = (props) => {
  return (
    <div style={{display: 'grid', justifyContent: 'center', alignItems: 'center', gridTemplateColumns: '400px', gap: '35px 35px'}}>
      <Card style={{width: '700px', height: '700px', marginBottom: '40px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center',  texAlign: 'center', gridTemplateColumns: '200px'}}>
        <Link to={`/profile/${props.userId}`} style={{alignSelf: 'flex-start', marginBottom: 'auto'}}>
        <Typography>{props.username}</Typography>
        </Link>
        <img src={props.imgRes} className='feed-img'/>
        <Typography style={{alignSelf: 'center', marginBottom:'10px'}}>{props.capRes}</Typography>
        <Link to={`/comment/${props.currentId}/${props.id}`}>
        <Typography>Comments</Typography>
        </Link>
      </Card>
    </div>
  )
}

export default FeedPost