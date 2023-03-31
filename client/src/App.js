import Nav from './components/Nav'
import About from './pages/About'
import MainFeed from './pages/MainFeed'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import ProfilePage from './pages/ProfilePage'
import CreatePost from './pages/CreatePost'
import Home from './pages/Home'
import CommentView from './pages/CommentView'
import CreateComment from './pages/CreateComment'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './app.css'
import { CheckSession } from './services/Auth'
import { useEffect, useState } from 'react'
function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    localStorage.clear()
    navigate('/login')
  }
  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      checkToken()
    }
  }, [])


  return (
    <div>
      <div>
    <Nav user={user} handleLogout={handleLogout}/>
    
      </div>
      <div>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/feed/:id' element={<MainFeed user={user}/>} />
      <Route path='/feed' element={<MainFeed/>}/>
      <Route path='/login' element={<Login setUser={setUser}/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/profile/:id' element={<ProfilePage user={user}/>}/>
      <Route path='/create/:id' element={<CreatePost/>}/>
      <Route path='/comment/:user_id/:post_id' element={<CommentView/>}/>
      <Route path='/create-comment/:user_id/:post_id' element={<CreateComment/>}/>
    </Routes>
      </div>
    </div>
  );
}

export default App;
