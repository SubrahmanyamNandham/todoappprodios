import React from 'react'

import Login from '../Login'
import "./index.css"

const Home = () => {
  return (
    <div className='bgcontainer'>
      <nav>
        <h1 className='title'>Todos Application</h1>
       <div className='users'>
       
        <p className='text'>Register</p>
        
       
        <p className='text'>Login</p>
      
       </div>
      </nav>
   <Login/>
  
    </div>
  )
}

export default Home