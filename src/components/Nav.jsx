import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

export default function Nav({user, handleLogout}) {
  const navigate = useNavigate()
  
  

  let userOptions = (
    <AppBar position="static">
      <Toolbar>
        
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          {/* <MenuIcon /> */}
        </IconButton>
     
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => {navigate(`/feed/${user?.id}`)}} className='nav-hvr'>
          Feed
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => {navigate(`/profile/${user?.id}`)}} className='nav-hvr'>
          Welcome: {user?.username}
        </Typography>
       <Typography variant='h6' component='div' sx={{flexGrow: 1}}>Explore</Typography>
        <Button color="inherit" onClick={ handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  )
  
  let publicOptions = (
    <AppBar position="static">
      <Toolbar>
        
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => {navigate('/')}}>
          Logo
        </Typography>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          About
        </Typography>
        <Button color="inherit" onClick={()=> {navigate('/login')}}>Login</Button>
      </Toolbar>
    </AppBar>
  )
  return (
    <Box sx={{ flexGrow: 1 }}>
    {user ? userOptions : publicOptions}
  </Box> 
  ); 
}
