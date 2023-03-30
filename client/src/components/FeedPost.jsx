import React from 'react'
import {TextField, Card, Typography, Button} from '@mui/material'
import './feedPost.css'
const FeedPost = (props) => {
  return (
    <div style={{display: 'grid', justifyContent: 'center', alignItems: 'center', gridTemplateColumns: '400px', gap: '35px 35px'}}>
      <Card style={{width: '700px', height: '700px', marginBottom: '40px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center',  texAlign: 'center', gridTemplateColumns: '200px'}}>
        <Typography style={{alignSelf: 'flex-start', marginBottom: 'auto'}}>{props.username}</Typography>
        <img src={props.imgRes} className='feed-img'/>
        <Typography style={{alignSelf: 'center', marginBottom:'10px'}}>{props.capRes}</Typography>
        
      </Card>
    </div>
  )
}

export default FeedPost