import axios from './axios'
import qs from 'querystring'

export const getIssues = (owner: string, name: string, labels: string[]) =>
  axios.get(
    `github/${owner}/${name}/issues?${qs.stringify({
      labels: labels.join(',')
    })}`
  )
