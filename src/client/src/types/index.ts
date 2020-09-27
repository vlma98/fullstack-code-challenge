export interface IUser {
  _id: string
  email: string
  name: {
    first: string
    last: string
  }
  fullName?: string
  gender: 0 | 1 | 2
  active: boolean
}

export interface IIssue {
  title: string
  apiUrl: string
  url: string
  id: number
  node_id: number
  labels: { name: string; color: string }[]
  state: 'open' | 'closed' | string
  locked: boolean
  createdAt: string
  updatedAt: string
  body?: string
}

export interface IRepo {
  _id: string
  owner: string
  name: string
  labels: string[]
}
