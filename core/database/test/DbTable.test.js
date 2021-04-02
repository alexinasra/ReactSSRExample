const assert = require('chai').assert;
const DbTable = require('../DbTable');
const ConnectionPool = require('../ConnectionPool');
const connectionOptions = require('./connectionOptions');

class TestDbTable extends DbTable {}

describe('Testing DbTable', function () {
  let connectionPool;
  let dbTable = new TestDbTable();
  before(function () {
    connectionPool = new ConnectionPool(connectionOptions);
  });

  after(function (done){
    connectionPool.close().then(() => done()).catch(err => done(err));
  });

  it('create table', function (done) {
    connectionPool.getConnection().then(c => {
      dbTable.createTable().run(c)
        .then(result => {
          if(result['tables_created']) {
            return done();
          }
          done(true);
        }).catch(err => done(err)).finally(() => c.release());
    }).catch(err => done(err));
  }).timeout(5000);

  it('inserts data', function (done) {
    connectionPool.getConnection().then(c => {
      dbTable.insert([
        { id: 1, text: "Object 1"},
        { id: 2, text: "Object 2"},
        { id: 3, text: "Object 3"},
        { id: 4, text: "Object 4"},
      ]).run(c)
        .then(result => {
          if(result.inserted === 4) {
            return done();
          }
          done(true);
        }).catch(err => done(err)).finally(() => c.release());
    }).catch(err => done(err));
  })

  it('replace data', function (done) {
    connectionPool.getConnection().then(c => {
      dbTable.replace(
        { id: 3, text: "New Object 3"},
      ).run(c)
        .then(result => {
          if(result.replaced === 1) {
            return done();
          }
          done(true);
        }).catch(err => done(err)).finally(() => c.release());
    }).catch(err => done(err));
  })

  it('update row', function (done) {
    connectionPool.getConnection().then(c => {
      dbTable.update(2,
        { isOk: true },
      ).run(c)
        .then(result => {
          if(result.replaced === 1) {
            return done();
          }
          done(true);
        }).catch(err => done(err)).finally(() => c.release());
    }).catch(err => done(err));
  })

  it('update collection', function (done) {
    connectionPool.getConnection().then(c => {
      dbTable.updateCollection((row) => {
        return row('id').eq(1)
          .or(row('id').eq(3))
          .or(row('id').eq(4))
        },
        { isOk: false },
      ).run(c)
        .then(result => {
          if(result.replaced === 3) {
            return done();
          }
          done(true);
        }).catch(err => done(err)).finally(() => c.release());
    }).catch(err => done(err));
  })

  it('drop table', function (done) {
    connectionPool.getConnection().then(c => {
      dbTable.dropTable().run(c)
        .then(result => {
          if(result['tables_dropped']) {
            return done();
          }
          done(true);
        }).catch(err => done(err)).finally(() => c.release());
    }).catch(err => done(err));
  });
})
