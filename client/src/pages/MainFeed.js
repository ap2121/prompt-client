import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom' 
const MainFeed = ({user}) => {
  const {id} = useParams()
  return (
    <div>MainFeed</div>
  )
}

export default MainFeed