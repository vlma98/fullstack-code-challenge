import axios from 'axios'
import constants from '../../constants'
import qs from 'querystring'
const { githubApiURL } = constants

export const getRepository = async (owner: string, name: string) => {
  // request.get(`${githubApiURL}/repos/${owner}/${name}`)
}
export const getLabels = async (owner: string, name: string) => {
  // request.get(`${githubApiURL}/repos/${owner}/${name}/labels`)
}
export const getIssues = async (
  owner: string,
  name: string,
  labels: string[] = [],
  state: 'open' | 'closed' | 'all ' = 'open'
) => {
  const query = {
    labels: labels.join(','),
    state
  }
  return axios
    .get(`${githubApiURL}/repos/${owner}/${name}/issues?${qs.stringify(query)}`)
    .then((response) => {
      const { status } = response
      console.log(response.data)
      return response.data
    })
    .catch((err) => {
      throw err
    })
}
