const { CommitTransactionCommand, BeginTransactionCommand, RollbackTransactionCommand } = require('@aws-sdk/client-rds-data');
const Transaction = require('knex/lib/execution/transaction');
const debug = require('debug')('knex:tx');

class Transaction_AuroraDataMySQL extends Transaction { // eslint-disable-line camelcase
  constructor (client) {
    if (client.transacting) {
      throw new Error(
        'Nested transactions are not supported by the Aurora Data API'
      );
    }

    super(...arguments);
  }

  async begin (conn) {
    /* istanbul ignore next */
    if (conn.__knexTxId in conn.transactions) {
      throw new Error(
        `Attempted to begin a new transaction for connection ${conn.__knexUid} transaction ${conn.__knexTxId} with existing Aurora Data API transaction ID ${conn.transactions[conn.__knexTxId]}`
      );
    }

    const command = new BeginTransactionCommand({
      ...conn.parameters
    });

    const { transactionId } = await conn.client.send(command);

    debug(`Transaction begun with id ${transactionId}`);

    conn.transactions[conn.__knexTxId] = transactionId;
  }

  async commit (conn, value) {
    // When a transaction is explicitly rolled back this method is still called
    // at the end of the transaction block after the transaction no longer
    // exists.
    if (conn.__knexTxId in conn.transactions) {
      const params = {
        ...conn.parameters,
        transactionId: conn.transactions[conn.__knexTxId]
      };
      delete params.database;

      const command = new CommitTransactionCommand(params);

      const { transactionStatus } = await conn.client.send(command);

      debug(
        `Transaction ${conn.transactions[conn.__knexTxId]} commit status: ${transactionStatus}`
      );

      delete conn.transactions[conn.__knexTxId];
    }

    this._resolver(value);
  }

  async rollback (conn, error) {
    /* istanbul ignore next */
    if (!(conn.__knexTxId in conn.transactions)) {
      throw new Error(
        'Attempted to rollback a transaction when one is not in progress'
      );
    }

    const params = {
      ...conn.parameters,
      transactionId: conn.transactions[conn.__knexTxId]
    };
    delete params.database;

    const command = new RollbackTransactionCommand(params);

    const { transactionStatus } = await conn.client.send(command);

    debug(
      `Transaction ${conn.transactions[conn.__knexTxId]} rollback status: ${transactionStatus}`
    );

    delete conn.transactions[conn.__knexTxId];

    if (error === undefined) {
      if (this.doNotRejectOnRollback) {
        this._resolver();
      } else {
        this._rejecter(
          new Error(`Transaction rejected with non-error: ${error}`)
        );
      }
    } else {
      this._rejecter(error);
    }
  }

  /* istanbul ignore next */
  savepoint (conn) {
    throw new Error('Savepoints are not supported by the Aurora Data API');
  }

  /* istanbul ignore next */
  release (conn, value) {
    throw new Error('Savepoints are not supported by the Aurora Data API');
  }

  /* istanbul ignore next */
  rollbackTo (conn, value) {
    throw new Error('Savepoints are not supported by the Aurora Data API');
  }
}

module.exports = Transaction_AuroraDataMySQL; // eslint-disable-line camelcase
