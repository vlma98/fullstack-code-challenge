import { navigate } from '@reach/router'
import React, { createContext, useState, ReactNode } from 'react'
import * as API from '../../api/users'
import useError from '../../hooks/useError'
import useSuccess from '../../hooks/useSuccess'
import { IUser } from '../../types'

interface IUserContext {
  user: IUser | null
  isLoading: boolean
  signUp: (...args: Parameters<typeof API.signUp>) => Promise<void>
  login: (...args: Parameters<typeof API.login>) => Promise<void>
  updateMe: (...args: Parameters<typeof API.updateMe>) => Promise<void>
  deleteMe: (...args: Parameters<typeof API.deleteMe>) => Promise<void>
  logout: () => Promise<void>
  changePassword: (
    ...args: Parameters<typeof API.updatePassword>
  ) => Promise<void>
}

const UserContext = createContext<IUserContext>({
  user: null,
  isLoading: false,
  signUp: async (...args: Parameters<typeof API.signUp>) => {},
  login: async (...args: Parameters<typeof API.login>) => {},
  updateMe: async (...args: Parameters<typeof API.updateMe>) => {},
  deleteMe: async (...args: Parameters<typeof API.deleteMe>) => {},
  logout: async () => {},
  changePassword: async (...args: Parameters<typeof API.updatePassword>) => {}
})

const UserContextProvider: React.FC = function (props: {
  children?: ReactNode
}) {
  const { children } = props
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [, setError] = useError()
  const [, setSuccess] = useSuccess()

  const errorFallback = (error: Error) => {
    console.error(error)
    setIsLoading(false)
    setError('Error with server, try back later.')
  }

  const signUp = async (
    email: string,
    password: string,
    gender: 0 | 1 | 2,
    name: { first: string; last: string }
  ): Promise<void> => {
    setIsLoading(true)
    return API.signUp(email, password, gender, name)
      .then((response) => {
        setIsLoading(false)
        if (response.status === 200) {
          const { user, token } = response.data
          setUser(user)
          localStorage.setItem('token', token)
          navigate('/dashboard')
        } else {
          const { message } = response.data
          setError(message)
        }
      })
      .catch(errorFallback)
  }
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true)
    return API.login(email, password)
      .then((response) => {
        setIsLoading(false)
        if (response.status === 200) {
          const { user, token } = response.data
          setUser(user)
          localStorage.setItem('token', token)
          navigate('/auth')
        } else {
          const { message } = response.data
          setError(message)
        }
      })
      .catch(errorFallback)
  }
  const updateMe = async (user: Partial<IUser>) => {
    setIsLoading(true)
    return API.updateMe(user)
      .then((response) => {
        setIsLoading(false)
        if (response.status === 200) {
          const { user } = response.data
          setUser(user)
          setSuccess('User updated successfully.')
        } else {
          const { message } = response.data
          setError(message)
        }
      })
      .catch(errorFallback)
  }
  const deleteMe = async () => {
    setIsLoading(true)
    return API.deleteMe()
      .then((response) => {
        setIsLoading(false)
        if (response.status === 200) {
          localStorage.removeItem('token')
          setSuccess('Account deleted successfully.')
          navigate('/auth')
        } else {
          const { message } = response.data
          setError(message)
        }
      })
      .catch(errorFallback)
  }

  if (!user && !isLoading && localStorage.getItem('token')) {
    setIsLoading(true)
    API.getMe()
      .then((response) => {
        setIsLoading(false)
        if (response.status === 200) {
          setUser(response.data.user)
        }
      })
      .catch(() => {
        setIsLoading(false)
        localStorage.removeItem('token')
        setError("Seens like you're not authed")
        navigate('/auth')
      })
  }

  const logout = async () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/auth')
  }

  const changePassword = async (password: string, newPassword: string) => {
    API.updatePassword(password, newPassword)
      .then((response) => {
        const { message } = response.data
        if (response.status === 200) {
          setSuccess('Password changed!')
        } else {
          setError(message)
        }
      })
      .catch(errorFallback)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        signUp,
        login,
        updateMe,
        deleteMe,
        logout,
        changePassword
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContextProvider }

export default UserContext
