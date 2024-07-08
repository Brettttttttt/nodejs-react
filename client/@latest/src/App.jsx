import React from 'react';
import './App.css'
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import Register from './Components/Register'

import{
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Login/></div>
  },

  {
    path: '/register',
    element: <div><Register/></div>
  },

  {
    path: '/dashboard',
    element: <div><Dashboard/></div>
  }

])

function App() {

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
