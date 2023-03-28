import React from 'react'
import {TextField, Card, Typography} from '@mui/material'
import './login.css'
const Login = () => {
  
  
  return (
    <div>
      <section className='login-card-cnt'> 
      <Card variant='outlined' className='login-cnt' style={{background:  'rgb(18,158,196', borderRadius: '20px', fontFamily: 'font-family: Nova Flat, cursive'}}>
        <Typography variant='h4'>Login</Typography>
        <img src='https://res.cloudinary.com/dntodeqe9/image/upload/v1680036226/zqljylr7svhkphvn5a8y.png' alt='an ai drawn picture of a login page'/>
        <section className='input-cnt'>
        <TextField label="email" variant='outlined' className='login-inpt'/>
        <TextField label='password' variant='outlined' className='login-inpt'/>
        <Typography variant='p' style={{fontSize: '15px'}}>Come with me if you want to make a new account..</Typography>
        </section>
      </Card>
      </section>
    </div>
  )
}

export default Login