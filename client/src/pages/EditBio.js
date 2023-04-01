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
        <form onSubmit={handleSubmit}> 
            <TextField variant='outlined' name='bioPrompt' value={formData?.bioPrompt} onChange={handleChange} sx={{input: {color: 'white', width: '200px', height: '50px'}}}/>
        <button>Confirm Bio Edit</button>
        </form>
        <h4 style={{color: 'white'}}>{currentUser?.bio}</h4>
    </div>
  )
}

export default EditBio