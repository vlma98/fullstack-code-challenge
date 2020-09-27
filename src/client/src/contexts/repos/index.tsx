import React, { createContext, ReactNode, useState } from 'react'
import * as API from '../../api/repos'
import useError from '../../hooks/useError'
import useSuccess from '../../hooks/useSuccess'
import { IRepo } from '../../types'

interface IRepoContext {
  repos: IRepo[]
  isLoading: boolean
  getRepos: (...args: Parameters<typeof API.getRepos>) => Promise<void>
  createRepo: (...args: Parameters<typeof API.createRepo>) => Promise<void>
  updateRepo: (...args: Parameters<typeof API.updateRepo>) => Promise<void>
  deleteRepo: (...args: Parameters<typeof API.deleteRepo>) => Promise<void>
}

const RepoContext = createContext<IRepoContext>({
  repos: [],
  isLoading: false,
  getRepos: async (...args: Parameters<typeof API.getRepos>) => {},
  createRepo: async (...args: Parameters<typeof API.createRepo>) => {},
  updateRepo: async (...args: Parameters<typeof API.updateRepo>) => {},
  deleteRepo: async (...args: Parameters<typeof API.deleteRepo>) => {}
})

const RepoContextProvider = function (props: { children: ReactNode }) {
  const { children } = props
  const [repos, setRepos] = useState<IRepo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [, setError] = useError()
  const [, setSuccess] = useSuccess()

  const errorFallback = (error: Error) => {
    setIsLoading(false)
    console.error(error)
    setError('Error with server, try back later.')
  }

  const getRepos = async () => {
    setIsLoading(true)
    return API.getRepos()
      .then((response) => {
        setIsLoading(false)
        if (response.status === 200) {
          setRepos([...repos, ...response.data.repos])
        } else {
          setError(response.data.message)
        }
      })
      .catch(errorFallback)
  }
  const createRepo = async (repo: {
    owner: string
    name: string
    labels: string[]
  }) => {
    setIsLoading(true)
    return API.createRepo(repo)
      .then((response) => {
        setIsLoading(false)
        if (response.status === 200) {
          setRepos([...repos, response.data.repo])
        } else {
          setError(response.data.message)
        }
      })
      .catch(errorFallback)
  }
  const updateRepo = async (id: string, repo: Partial<IRepo>) => {
    setIsLoading(true)
    return API.updateRepo(id, repo)
      .then((response) => {
        setIsLoading(false)
        if (response.status === 200) {
          const { repo } = response.data
          setRepos(repos.map((r) => (r._id === repo._id ? repo : r)))
          setSuccess('Repository updated!')
        } else {
          setError(response.data.message)
        }
      })
      .catch(errorFallback)
  }
  const deleteRepo = async (id: string) => {
    setIsLoading(true)
    return API.deleteRepo(id)
      .then((response) => {
        setIsLoading(false)
        if (response.status === 200) {
          setRepos(repos.filter((r) => r._id !== id))
          setSuccess('Repository deleted!')
        } else {
          setError(response.data.message)
        }
      })
      .catch(errorFallback)
  }

  return (
    <RepoContext.Provider
      value={{
        repos,
        isLoading,
        getRepos,
        createRepo,
        updateRepo,
        deleteRepo
      }}
    >
      {children}
    </RepoContext.Provider>
  )
}

export { RepoContextProvider }
export default RepoContext
