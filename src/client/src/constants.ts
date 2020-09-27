const production = process.env.NODE_ENV === 'production'

const ctes = {
  apiUrl: production ? '' : 'http://localhost:8080',
  githubUrl: 'https://github.com',
  githubApiUrl: 'https://api.github.com'
}

export default ctes
