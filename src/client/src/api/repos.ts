import { IRepo } from '../types'
import axios from './axios'

export const createRepo = (repo: IRepo) => axios.post('users/me/repos', repo)

export const updateRepo = (id: string, repo: Partial<IRepo>) =>
  axios.put(`users/me/repos/${id}`, repo)

export const getRepos = () => axios.get('users/me/repos')

export const deleteRepo = (id: string) => axios.delete(`users/me/repos/${id}`)
