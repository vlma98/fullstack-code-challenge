import React from 'react'
import { Redirect, Router } from '@reach/router'
import './app.less'
import { Auth, Dashboard, ProfilePage } from '../pages'
import { UserContextProvider } from '../../contexts/users'
import { RepoContextProvider } from '../../contexts/repos'
function App() {
  return (
    <div className='App'>
      <UserContextProvider>
        <RepoContextProvider>
          <Router>
            <Redirect noThrow from='/' to='/auth' />
            <Auth path='/auth' />
            <Dashboard path='/dashboard' />
            <ProfilePage path='/profile' />
          </Router>
        </RepoContextProvider>
      </UserContextProvider>
    </div>
  )
}

export default App
