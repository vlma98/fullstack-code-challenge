import React from 'react'
import { Redirect, Router } from '@reach/router'
import './app.less'
import { Auth, Dashboard } from '../pages'

function App() {
  return (
    <div className='App'>
      <Router>
        <Redirect noThrow from='/' to='/auth' />
        <Auth path='/auth' />
        <Dashboard path='/dashboard' />
      </Router>
    </div>
  )
}

export default App
