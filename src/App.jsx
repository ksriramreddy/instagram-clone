import { useState } from 'react'
import{Button} from '@chakra-ui/react'
import './App.css'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import PageLayout from './Layouts/PageLayout'
import ProfilePage from './Pages/ProfilePage'
import { useSelector } from 'react-redux'

function App() {
  let user = useSelector(state=>state.user)
  // user = JSON.parse(user)
  return (
    <>
    <PageLayout>
      <Routes>
        <Route path='/' element={user? <HomePage/> : <Navigate to={'/login'}/>}/>
        <Route path='/login' element={!user? < LoginPage/> :<Navigate to={'/'}/>}/>
        <Route path='/:username' element={<ProfilePage/>}/>
      </Routes>
    </PageLayout>
    </>
  )
}

export default App
