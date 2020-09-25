import request from 'request'
import constants from '../../constants'
import qs from 'querystring'
const { githubApiURL } = constants

export const getRepository = async (owner: string, name: string) => {
  request.get(`${githubApiURL}/repos/${owner}/${name}`)
}
export const getLabels = async (owner: string, name: string) => {
  request.get(`${githubApiURL}/repos/${owner}/${name}/labels`)
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
  request.get(
    `${githubApiURL}/repos/${owner}/${name}/issues?${qs.stringify(query)}`
  )
}
