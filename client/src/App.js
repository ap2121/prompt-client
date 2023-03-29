import Nav from './components/Nav'
import About from './pages/About'
import MainFeed from './pages/MainFeed'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import ProfilePage from './pages/ProfilePage'
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
    <Nav user={user}/>
    <button onClick={handleLogout}>logout</button>
      </div>
      <div>
    <Routes>
      <Route path='/feed' element={<MainFeed/>}/>
      <Route path='/login' element={<Login setUser={setUser}/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
    </Routes>
      </div>
    </div>
  );
}

export default App;
