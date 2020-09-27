import { IUser } from '../types'
import axios from './axios'

export const signUp = (
  email: string,
  password: string,
  gender: 0 | 1 | 2,
  name: { first: string; last: string }
) => axios.post('/users', { email, password, name, gender })

export const login = (email: string, password: string) =>
  axios.post('/auth', { email, password })

export const updateMe = (user: Partial<IUser>) => axios.put('/users/me', user)

export const deleteMe = () => axios.delete('/users/me')

export const getMe = () => axios.get('/users/me')
