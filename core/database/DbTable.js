const r = require('rethinkdb');
const camelToSnake = require('@foodle/utils').text.camelToSnake;
class DbTable {
  constructor({ tableName }) {
    this._tableName = tableName;
  }

  static get r() {
    return r;
  }
  getDefaultValues() {
    return {};
  }
  get tableName() {
    return this._tableName;
  }
  get table () {
    return r.table(this._tableName);
  }
  createTable() {
    return r.tableCreate(this._tableName);
  }

  dropTable() {
    return r.tableDrop(this.tableName);
  }

  getList(key, value) {
    return r.table(this.tableName).filter(r.row(key).eq(value));
  }

  filter(filter) {
    return r.table(this.tableName).filter(filter);
  }
  getAll() {
    return r.table(this.tableName)
  }
  getFisrtResult(filter) {
    return this.filter(filter).nth(0);
  }
  get(id) {
    return r.table(this.tableName).get(id);
  }

  insert (data) {
    return r.table(this.tableName).insert(data);
  }
  replace (data) {
    return r.table(this.tableName).replace(data);
  }
  update (id, data) {
    return r.table(this.tableName).get(id).update(data);
  }
  updateCollection (filter, data) {
    return r.table(this.tableName).filter(filter).update(data);
  }
  delete (id) {
    return r.table(this.tableName).get(id).delete();
  }
}

module.exports = DbTable;
