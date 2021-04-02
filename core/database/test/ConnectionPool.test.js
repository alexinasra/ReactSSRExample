const assert = require('chai').assert;
const ConnectionPool = require('../ConnectionPool');
const connectionOptions = require('./connectionOptions');


describe('Testing ConnectionPool', function () {
  let connectionPool;
  let conn;
  it('initialize connection ConnectionPool', function () {
    connectionPool = new ConnectionPool(connectionOptions);
    assert.isObject(connectionPool);
  });
  it('get connection', function (done) {
    connectionPool.getConnection().then(c => {
      conn = c;
      done();
    }).catch(err => done(err));
  });
  it('release connection', function (done) {
    if(!conn) return done(false);
    conn.release().then(() => done()).catch(err => done(err));
  });
  it('close connection pool', function (done){
    connectionPool.close().then(() => done()).catch(err => done(err));
  })
})
