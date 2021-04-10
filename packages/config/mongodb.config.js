

module.exports = {
  host: "localhost",
  port: 27017,
  db: "react-ssrex",
  options: {
    poolSize: (process.env.NODE_ENV === 'development')? 5 : 20
  }
}
