import React from 'react'
import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Client from '../services/Api'
import { TextField } from '@mui/material'
const EditBio = ({user}) => {
    const [currentUser, setCurrentUser] = useState({})
    const [formData, setFormData] = useState()
    const {user_id} = useParams()
    const navigate = useNavigate()
  

    const getUser = async () => {
        const profile = await Client.get(`/api/user/users/${user_id}`)
        console.log(profile.data)
        setCurrentUser(profile.data)
    }

    const handleChange = (e) => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await Client.put(`/api/user/update-bio/${user_id}`, formData)
        if(res) {
            navigate(`/profile/${user_id}`)
        }
    }

    useEffect(() => {
        getUser()
    }, [user_id])

    useEffect(() => {
        setFormData(currentUser)
    }, [currentUser])


    return (
    <div>
        <div className='edit-hdr-cnt'>
            <p>New Bio Prompt</p>
        </div>
        <div >
        <form onSubmit={handleSubmit} className='edit-cnt'> 
            <TextField variant='outlined' name='bioPrompt' value={formData?.bioPrompt} onChange={handleChange} sx={{input: {color: 'white', height: '100px', textAlign: 'center'}}} style={{width: '250px', color: 'white'}}/>
        <button className='edit-btn'>Confirm Bio Edit</button>
        </form>
        </div>
        <div className='edit-res-cnt'>
        <h4 style={{color: 'white'}}>{currentUser?.bio}</h4>
        </div>
    </div>
  )
}

export default EditBio