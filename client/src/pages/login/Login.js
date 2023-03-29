import React from 'react'
import {TextField, Card, Typography, Button} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import {useState} from 'react'
import { SignInUser } from '../../services/Auth'
import './login.css'

const Login = ({setUser, user}) => {
  const  [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormValues({
        ...formValues,
        [e.target.name]: e.target.value
        })
    }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues({
      email: '',
      password: ''
    })
    setUser(payload)
    
    
    navigate(`/feed/${payload?.id}`)
  }
  
  
  return (
    <div>
      <section className='login-card-cnt'> 
      <Card variant='outlined' className='login-cnt' style={{ background:  'rgb(8, 123, 155)', borderRadius: '20px', fontFamily: 'font-family: Nova Flat, cursive', height: '600px'}}>
        <Typography variant='h4'>Login</Typography>
        <img src='https://res.cloudinary.com/dntodeqe9/image/upload/v1680036226/zqljylr7svhkphvn5a8y.png' alt='an ai drawn picture of a big robot'/>
        <section className='input-cnt'>
        <form onSubmit={handleSubmit}>
        <TextField label="email" variant='outlined' className='login-inpt' onChange={handleChange} name='email' value={formValues.email
        }/>
        <TextField label='password' type='password' variant='outlined' className='login-inpt' onChange={handleChange} name='password' value={formValues.password} />
        <Button variant='outline' type='submit'>Login</Button>
        </form>
        <Link to={'/register'}>
        <Typography variant='p' style={{fontSize: '15px', color: 'black'}}>Come with me if you want to make a new account..</Typography>
        </Link>
        </section>
      </Card>
      </section>
    </div>
  )
  }
export default Login