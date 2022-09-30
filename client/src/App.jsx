import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import PageNotFound from './pages/PageNotFound'
import React from 'react'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes path='/'>
          <Route index element={<Home />} />
          {
              !localStorage.getItem("access")
              ? <Route path='/login' element={<Login />} />
              : <Route path='/profile' element={<Profile />} />
          }
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
