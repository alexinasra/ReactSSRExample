const genericPool = require("generic-pool");
const r = require("rethinkdb");

function ConnectionFactory(connectionOptions) {
  return {
    create() {
      return r.connect(connectionOptions);
    },
    destroy(client) {
      client.close();
    },
  };
}

class ConnectionPool {
  constructor({ poolSize, ...connectionOptions }) {
    this.connectionPool = genericPool.createPool(
      ConnectionFactory(connectionOptions),
      {
        min: 1,
        max: poolSize && poolSize > 0 ? poolSize : 10,
      }
    );
    this.getConnection = this.getConnection.bind(this);
    this.attachToRequest = this.attachToRequest.bind(this);
  }

  attachToRequest({ dbVarname } = { dbVarname: "dbConn" }) {
    return (req, res, next) => {
      req.connectionPool = this;
      next();
      // this.getConnection().then((conn) => {
      //   // console.log("acquire rethinkdb connection");
      //   req[dbVarname] = conn;
      //   const release = () => conn.release();
      //   res.on("finish", () => {
      //     release();
      //     // console.log("release rethinkdb connection");
      //   });
      //
      //   next();
      // });
    };
  }

  getConnection() {
    return this.connectionPool.acquire().then((conn) => {
      if (!conn.release) {
        conn.release = () => this.releaseConnection(conn);
      }
      return conn;
    });
  }

  releaseConnection(conn) {
    return this.connectionPool.release(conn);
  }

  close() {
    return this.connectionPool.drain().then(() => this.connectionPool.clear());
  }
}

module.exports = ConnectionPool;
