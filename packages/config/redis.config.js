module.exports = {
  host: 'localhost',
  port: 6379,
  db: 0,
  retryStrategy: times => {
    // reconnect after
    return Math.min(times * 50, 2000);
  }
}
