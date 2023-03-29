import React from 'react'
import {TextField, Card, Typography, Button} from '@mui/material'
import { Link } from 'react-router-dom'
import {RegisterUser} from '../../services/Auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(formValues.email && formValues.username && formValues.password && formValues.confirmPassword && formValues.password === formValues.confirmPassword) {
      await RegisterUser({
        email: formValues.email,
        username: formValues.username,
        password: formValues.password
      })
      setFormValues({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      })
      navigate('/login')
    } else {
      return 
    }
  }
  return (
    <div>
       <section className='login-card-cnt'> 
      <Card variant='outlined' className='login-cnt' style={{background:  'rgb(8, 123, 155)', borderRadius: '20px', fontFamily: 'font-family: Nova Flat, cursive', height: '650px'}}>
        <Typography variant='h4'>Register</Typography>
        <img src='https://res.cloudinary.com/dntodeqe9/image/upload/v1680039380/xkcwmkddi1aez6i58tss.png' alt='an ai drawn picture of a big robot'/>
        <section className='input-cnt'>
        <form onSubmit={handleSubmit}>
        <TextField label="Email" variant='outlined' className='login-inpt' onChange={handleChange} name='email' value={formValues.email}/>
        <TextField label="Username" className='login-input' onChange={handleChange} name='username' value={formValues.username}/>
        <TextField label='Password'  type='password' variant='outlined' className='login-inpt' onChange={handleChange} name='password' value={formValues.password}/>
        <TextField label='Confirm Password' type='password' variant='outlined' className='login-input' onChange={handleChange} name='confirmPassword' value={formValues.confirmPassword}/>
        <Button variant='outline' onClick={handleSubmit}>Register</Button>
        </form>
        <Link to={'/login'}>
        <Typography variant='p' style={{fontSize: '15px', color: 'black'}}>Already have an account? Sign in here...</Typography>
        </Link>
        </section>
      </Card>
      </section>
    </div>
  )
}

export default Register