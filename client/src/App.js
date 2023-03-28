import Nav from './components/Nav'
import About from './pages/About'
import MainFeed from './pages/MainFeed'
import Login from './pages/login/Login'
import Register from './pages/Register'
import ProfilePage from './pages/ProfilePage'
import { Route, Routes } from 'react-router-dom'
import './app.css'
function App() {
  return (
    <div>
      <div>
    <Nav/>
      </div>
      <div>
    <Routes>
      <Route path='/feed' element={<MainFeed/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
    </Routes>
      </div>
    </div>
  );
}

export default App;
