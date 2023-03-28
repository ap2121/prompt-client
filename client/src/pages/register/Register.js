import React from 'react'
import {TextField, Card, Typography} from '@mui/material'
import { Link } from 'react-router-dom'
const Register = () => {
  return (
    <div>
       <section className='login-card-cnt'> 
      <Card variant='outlined' className='login-cnt' style={{background:  'rgb(18,158,196', borderRadius: '20px', fontFamily: 'font-family: Nova Flat, cursive', height: '650px'}}>
        <Typography variant='h4'>Register</Typography>
        <img src='https://res.cloudinary.com/dntodeqe9/image/upload/v1680039380/xkcwmkddi1aez6i58tss.png' alt='an ai drawn picture of a big robot'/>
        <section className='input-cnt'>
        <TextField label="Email" variant='outlined' className='login-inpt'/>
        <TextField label="Username" className='login-input'/>
        <TextField label='Password' variant='outlined' className='login-inpt'/>
        <TextField label='Confirm Password' variant='outlined' className='login-input'/>
        <Link to={'/login'}>
        <Typography variant='p' style={{fontSize: '15px'}}>Already have an account? Sign in here...</Typography>
        </Link>
        </section>
      </Card>
      </section>
    </div>
  )
}

export default Register