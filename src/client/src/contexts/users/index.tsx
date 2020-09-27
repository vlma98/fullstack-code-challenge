import React, { createContext, useState, ReactNode } from 'react'
import { signUp, login, updateMe, deleteMe } from '../../api/users'
import { IUser } from '../../types'

interface IUserContext {
  user: IUser | null
  isLoading: boolean
  signUp: (...args: Parameters<typeof signUp>) => Promise<void>
  login: (...args: Parameters<typeof login>) => Promise<void>
  updateMe: (...args: Parameters<typeof updateMe>) => Promise<void>
  deleteMe: (...args: Parameters<typeof deleteMe>) => Promise<void>
}

const UserContext = createContext<IUserContext>({
  user: null,
  isLoading: false,
  signUp: async (...args: Parameters<typeof signUp>) => {},
  login: async (...args: Parameters<typeof login>) => {},
  updateMe: async (...args: Parameters<typeof updateMe>) => {},
  deleteMe: async (...args: Parameters<typeof deleteMe>) => {}
})

const UserContextProvider = function (props: { children: ReactNode }) {
  const { children } = props
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const signUp = async (
    email: string,
    password: string,
    gender: 0 | 1 | 2,
    name: { first: string; last: string }
  ) => {}
  const login = async (email: string, password: string) => {}
  const updateMe = async (user: Partial<IUser>) => {}
  const deleteMe = async () => {}

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        signUp,
        login,
        updateMe,
        deleteMe
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContextProvider }

export default UserContext
