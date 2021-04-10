

module.exports = {
  host: "localhost",
  port: 27017,
  options: {
    poolSize: (process.env.NODE_ENV === 'development')? 5 : 20
  }
}
