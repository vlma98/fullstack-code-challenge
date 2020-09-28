const production = process.env.NODE_ENV === 'production'

const constants = {
  githubURL: 'https://github.com',
  githubApiURL: 'https://api.github.com',
  PORT: 8080,
  mongoURI: 'mongodb://localhost/gh-issues-tracker',
  clientUrl: production ? '' : 'http://localhost:3000'
}

export default constants
