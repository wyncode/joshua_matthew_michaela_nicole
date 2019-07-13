import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Search from '../components/Search'

const Home = () => {
  return( 
    <div>
        <h1>Hello I am the Home page</h1>
        <h2>If this was my real midterm I would make it look great!</h2>
        <Search/>
    </div>
  )
}

export default Home
