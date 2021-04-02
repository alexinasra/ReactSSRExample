const DbTable = require('./DbTable');

class Accounts extends DbTable {
  constructor () {
    super();
  }

  activateAccount(id) {
    return this.update(id, { activated: true });
  }

  isAccountActivated (id) {
    return this.get(id)('activated').default(false);
  }
  getAccountAuthProvider(id) {
    return this.get(id)('provider');
  }
  //override
  insert (data) {
    //@todo: validate data.
    return super.insert(data);
  }
}

module.exports = Accounts;
