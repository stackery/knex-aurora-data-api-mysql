/* eslint-env jest */
const { BeginTransactionCommand, CommitTransactionCommand, ExecuteStatementCommand, RDSDataClient, RollbackTransactionCommand } = require('@aws-sdk/client-rds-data');
const { NodeHttpHandler } = require('@smithy/node-http-handler');
const { mockClient } = require('aws-sdk-client-mock');
const client = require('../index');
const constants = require('./constants');
require('aws-sdk-client-mock-jest');

const RDSDataService = mockClient(RDSDataClient);

async function init (config) {
  // We need to call the client in order to grab hold of the constructor values
  const knex = require('knex')(config);

  RDSDataService.on(ExecuteStatementCommand).resolves(constants.ALL_QUERY_RESPONSE_DATA);

  await knex.select('*').from('foo');

  knex.destroy();
}

beforeEach(() => {
  RDSDataService.reset();
});

describe('SDK configuration tests', () => {
  test('Sets TCP Keep Alive when no sdkConfig set', async () => {
    await init({
      client,
      connection: {
        database: constants.DATABASE,
        resourceArn: constants.AURORA_CLUSTER_ARN,
        secretArn: constants.SECRET_ARN
      }
    });

    expect(RDSDataService.calls()).toHaveLength(1);
    expect(RDSDataService.call(0).thisValue.config).toEqual(
      expect.objectContaining({
        requestHandler: new NodeHttpHandler({
          httpAgent: {
            agent: expect.objectContaining({
              keepAlive: true
            })
          }
        })
      })
    );
  });

  test('Sets TCP Keep Alive when sdkConfig set', async () => {
    await init({
      client,
      connection: {
        database: constants.DATABASE,
        resourceArn: constants.AURORA_CLUSTER_ARN,
        secretArn: constants.SECRET_ARN,
        sdkConfig: {
          accessKeyId: 'foo',
          secretAccessKey: 'bar',
          sessionToken: 'baz'
        }
      }
    });

    expect(RDSDataService.calls()).toHaveLength(1);
    expect(RDSDataService.call(0).thisValue.config).toEqual(
      expect.objectContaining({
        requestHandler: new NodeHttpHandler({
          httpAgent: {
            agent: expect.objectContaining({
              keepAlive: true
            })
          }
        }),
        accessKeyId: 'foo',
        secretAccessKey: 'bar',
        sessionToken: 'baz'
      })
    );
  });

  test('Leaves HTTP options when provided in sdkConfig', async () => {
    await init({
      client,
      connection: {
        database: constants.DATABASE,
        resourceArn: constants.AURORA_CLUSTER_ARN,
        secretArn: constants.SECRET_ARN,
        sdkConfig: {
          requestHandler: new NodeHttpHandler({
            requestTimeout: 5000
          })
        }
      }
    });

    expect(RDSDataService.calls()).toHaveLength(1);
    expect(RDSDataService.call(0).thisValue.config).toEqual(
      expect.objectContaining({
        requestHandler: new NodeHttpHandler({
          requestHandler: new NodeHttpHandler({
            requestTimeout: 5000
          })
        })
      })
    );
  });

  test('Uses HTTP agent when called with an HTTP endpoint', async () => {
    await init({
      client,
      connection: {
        database: constants.DATABASE,
        resourceArn: constants.AURORA_CLUSTER_ARN,
        secretArn: constants.SECRET_ARN,
        sdkConfig: {
          endpoint: 'http://localhost:8080'
        }
      }
    });

    await expect(RDSDataService.call(0).thisValue.config.endpoint()).resolves.toEqual({
      hostname: 'localhost',
      path: '/',
      port: 8080,
      protocol: 'http:'
    });

    expect(RDSDataService.calls()).toHaveLength(1);
    expect(RDSDataService.call(0).thisValue.config).toEqual(
      expect.objectContaining({
        requestHandler: new NodeHttpHandler({
          httpAgent: {
            agent: expect.objectContaining({
              keepAlive: true
            })
          }
        })
      })
    );
  });
});

test('Destroy functionality', async () => {
  const knex = require('knex')({
    client,
    connection: {
      database: constants.DATABASE,
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN
    }
  });

  RDSDataService.on(ExecuteStatementCommand).resolves(constants.ALL_QUERY_RESPONSE_DATA);

  await knex.select('*').from('foo');

  expect(RDSDataService).toHaveReceivedCommandTimes(ExecuteStatementCommand, 1);

  knex.destroy();

  await expect(knex.select('*').from('foo')).rejects.toThrow();
});

describe('Query statement tests', () => {
  const knex = require('knex')({
    client,
    connection: {
      database: constants.DATABASE,
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN
    }
  });

  test('Hydrates all response data types', async () => {
    RDSDataService.on(ExecuteStatementCommand).resolves(constants.ALL_QUERY_RESPONSE_DATA);

    const rows = await knex.select('*').from('foo');

    expect(RDSDataService).toHaveReceivedCommandTimes(ExecuteStatementCommand, 1);
    expect(RDSDataService).toHaveReceivedCommandWith(ExecuteStatementCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE,
      sql: 'select * from `foo`',
      parameters: [],
      includeResultMetadata: true
    });

    expect(rows).toEqual(constants.ALL_QUERY_RESPONSE_ROWS);
  });

  test('Prepares bindings', async () => {
    RDSDataService.on(ExecuteStatementCommand).resolves(constants.ALL_QUERY_RESPONSE_DATA);

    await knex.select('*').from('foo').where({
      boolean: true,
      int: 5,
      float: 5.5,
      text: 'foobar',
      null: null,
      binary: Buffer.from([1, 2, 3]),
      date: new Date('2020-01-01')
    }).whereRaw('null2 = ?', [null]);

    expect(RDSDataService).toHaveReceivedCommandTimes(ExecuteStatementCommand, 1);
    expect(RDSDataService).toHaveReceivedCommandWith(ExecuteStatementCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE,
      sql: 'select * from `foo` where `boolean` = :0 and `int` = :1 and `float` = :2 and `text` = :3 and `null` is null and `binary` = :4 and `date` = :5 and null2 = :6',
      parameters: [
        {
          name: '0',
          value: {
            booleanValue: true
          }
        },
        {
          name: '1',
          value: {
            longValue: 5
          }
        },
        {
          name: '2',
          typeHint: 'DECIMAL',
          value: {
            stringValue: '5.5'
          }
        },
        {
          name: '3',
          value: {
            stringValue: 'foobar'
          }
        },
        {
          name: '4',
          value: {
            blobValue: 'AQID' // base64
          }
        },
        {
          name: '5',
          typeHint: 'TIMESTAMP',
          value: {
            stringValue: '2020-01-01 00:00:00.000'
          }
        },
        {
          name: '6',
          value: {
            isNull: true
          }
        }
      ],
      includeResultMetadata: true
    });
  });

  test('Errors on undefined bindings', async () => {
    await expect(knex.select('*').from('foo').where({
      value: undefined
    })).rejects.toThrow();

    expect(RDSDataService).toHaveReceivedCommandTimes(ExecuteStatementCommand, 0);
  });

  test('Errors on unknown bindings', async () => {
    await expect(knex.select('*').from('foo').where({
      value: Symbol() // eslint-disable-line symbol-description
    })).rejects.toThrow("Unknown binding value type 'symbol' for value at index 0");

    expect(RDSDataService).toHaveReceivedCommandTimes(ExecuteStatementCommand, 0);
  });

  test('Errors on unknown object bindings', async () => {
    await expect(
      knex.select('*').from('foo').where({
        value: new Set()
      })
    ).rejects.toThrow("Unknown binding value object of class 'Set' for value at index 0");

    expect(RDSDataService).toHaveReceivedCommandTimes(ExecuteStatementCommand, 0);
  });

  test('Errors when attempting to stream results', async () => {
    await expect(
      new Promise((resolve, reject) => {
        knex.select('*').from('foo').stream(stream => stream
          .on('end', resolve)
          .on('error', reject)
          .pipe(process.stdout)
        );
      })
    ).rejects.toThrow('Streams are not supported by the aurora-data-mysql dialect');
  });

  test('.columnInfo() works', async () => {
    RDSDataService.on(ExecuteStatementCommand).resolves(constants.COLUMN_INFO_RESPONSE_DATA);

    const columnInfo = await knex('test').columnInfo();

    expect(RDSDataService).toHaveReceivedCommandTimes(ExecuteStatementCommand, 1);
    expect(RDSDataService).toHaveReceivedCommandWith(ExecuteStatementCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE,
      sql: 'select * from information_schema.columns where table_name = :0 and table_schema = :1',
      parameters: [
        {
          name: '0',
          value: {
            stringValue: 'test'
          }
        },
        {
          name: '1',
          value: {
            stringValue: 'foo'
          }
        }
      ],
      includeResultMetadata: true
    });

    expect(columnInfo).toEqual(constants.COLUMN_INFO_RESPONSE_ROWS);
  });

  test('.first() works', async () => {
    RDSDataService.on(ExecuteStatementCommand).resolves(constants.FIRST_RESPONSE_DATA);

    const rows = await knex.first('id').from('foo');

    expect(RDSDataService).toHaveReceivedCommandTimes(ExecuteStatementCommand, 1);
    expect(RDSDataService).toHaveReceivedCommandWith(ExecuteStatementCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE,
      sql: 'select `id` from `foo` limit :0',
      parameters: [
        {
          name: '0',
          value: {
            longValue: 1
          }
        }
      ],
      includeResultMetadata: true
    });

    expect(rows).toEqual(constants.FIRST_RESPONSE_ROWS);
  });

  test('.pluck() works', async () => {
    RDSDataService.on(ExecuteStatementCommand).resolves(constants.PLUCK_RESPONSE_DATA);

    const rows = await knex.pluck('id').from('foo');

    expect(RDSDataService).toHaveReceivedCommandTimes(ExecuteStatementCommand, 1);
    expect(RDSDataService).toHaveReceivedCommandWith(ExecuteStatementCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE,
      sql: 'select `id` from `foo`',
      parameters: [],
      includeResultMetadata: true
    });

    expect(rows).toEqual(constants.PLUCK_RESPONSE_ROWS);
  });

  test('.del() works', async () => {
    RDSDataService.on(ExecuteStatementCommand).resolves(constants.DEL_RESPONSE_DATA);

    const rows = await knex('test').del();

    expect(RDSDataService).toHaveReceivedCommandTimes(ExecuteStatementCommand, 1);
    expect(RDSDataService).toHaveReceivedCommandWith(ExecuteStatementCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE,
      sql: 'delete from `test`',
      parameters: [],
      includeResultMetadata: true
    });

    expect(rows).toEqual(constants.DEL_RESPONSE_ROWS);
  });

  test("Insert returns first row's primary ID", async () => {
    RDSDataService.on(ExecuteStatementCommand).resolves(constants.INSERT_RESPONSE_DATA);

    const inserted = await knex('test').insert([
      { int: 33 },
      { int: 34 }
    ]);

    expect(RDSDataService).toHaveReceivedCommandTimes(ExecuteStatementCommand, 1);
    expect(RDSDataService).toHaveReceivedCommandWith(ExecuteStatementCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE,
      sql: 'insert into `test` (`int`) values (:0), (:1)',
      parameters: [
        {
          name: '0',
          value: {
            longValue: 33
          }
        },
        {
          name: '1',
          value: {
            longValue: 34
          }
        }
      ],
      includeResultMetadata: true
    });

    expect(inserted).toEqual(constants.INSERT_RESPONSE_ROWS);
  });

  test('Insert returns undefined primary ID when not generated', async () => {
    RDSDataService.on(ExecuteStatementCommand).resolves(constants.INSERT_RESPONSE_WITHOUT_LAST_ID_DATA);

    const inserted = await knex('test').insert([
      { int: 33 },
      { int: 34 }
    ]);

    expect(RDSDataService).toHaveReceivedCommandTimes(ExecuteStatementCommand, 1);
    expect(RDSDataService).toHaveReceivedCommandWith(ExecuteStatementCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE,
      sql: 'insert into `test` (`int`) values (:0), (:1)',
      parameters: [
        {
          name: '0',
          value: {
            longValue: 33
          }
        },
        {
          name: '1',
          value: {
            longValue: 34
          }
        }
      ],
      includeResultMetadata: true
    });

    expect(inserted).toEqual(constants.INSERT_RESPONSE_WITHOUT_LAST_ID_ROWS);
  });

  test('Update returns number of rows updated', async () => {
    RDSDataService.on(ExecuteStatementCommand).resolves(constants.UPDATE_RESPONSE_DATA);

    const inserted = await knex('test').update({ int: 5 }).where({ text: 'foo' });

    expect(RDSDataService).toHaveReceivedCommandTimes(ExecuteStatementCommand, 1);
    expect(RDSDataService).toHaveReceivedCommandWith(ExecuteStatementCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE,
      sql: 'update `test` set `int` = :0 where `text` = :1',
      parameters: [
        {
          name: '0',
          value: {
            longValue: 5
          }
        },
        {
          name: '1',
          value: {
            stringValue: 'foo'
          }
        }
      ],
      includeResultMetadata: true
    });

    expect(inserted).toEqual(constants.UPDATE_RESPONSE_ROWS);
  });

  test("Insert returns first row's primary ID", async () => {
    RDSDataService.on(ExecuteStatementCommand).resolves(constants.INSERT_RESPONSE_DATA);

    const inserted = await knex('test').insert([
      { int: 33 },
      { int: 34 }
    ]);

    expect(RDSDataService).toHaveReceivedCommandTimes(ExecuteStatementCommand, 1);
    expect(RDSDataService).toHaveReceivedCommandWith(ExecuteStatementCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE,
      sql: 'insert into `test` (`int`) values (:0), (:1)',
      parameters: [
        {
          name: '0',
          value: {
            longValue: 33
          }
        },
        {
          name: '1',
          value: {
            longValue: 34
          }
        }
      ],
      includeResultMetadata: true
    });

    expect(inserted).toEqual(constants.INSERT_RESPONSE_ROWS);
  });

  test('Raw query returns rows and fields', async () => {
    RDSDataService.on(ExecuteStatementCommand).resolves(constants.FIRST_RESPONSE_DATA);

    const response = await knex.raw('select `id` from `foo` limit ?', [1]);

    expect(RDSDataService).toHaveReceivedCommandTimes(ExecuteStatementCommand, 1);
    expect(RDSDataService).toHaveReceivedCommandWith(ExecuteStatementCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE,
      sql: 'select `id` from `foo` limit :0',
      parameters: [
        {
          name: '0',
          value: {
            longValue: 1
          }
        }
      ],
      includeResultMetadata: true
    });

    expect(response).toEqual({
      fields: constants.FIRST_RESPONSE_DATA.columnMetadata,
      rows: [constants.FIRST_RESPONSE_ROWS]
    });
  });

  test('Query in transaction', async () => {
    RDSDataService.on(BeginTransactionCommand).resolves(constants.BEGIN_TRANSACTION_DATA);
    RDSDataService.on(ExecuteStatementCommand).resolves(constants.ALL_QUERY_RESPONSE_DATA);
    RDSDataService.on(CommitTransactionCommand).resolves(constants.COMMIT_TRANSACTION_DATA);

    const rows = await knex.transaction(trx => trx.select('*').from('foo'));

    expect(RDSDataService).toHaveReceivedCommandTimes(BeginTransactionCommand, 1);
    expect(RDSDataService).toHaveReceivedCommandWith(ExecuteStatementCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE
    });

    expect(RDSDataService).toHaveReceivedCommandTimes(ExecuteStatementCommand, 1);
    expect(RDSDataService).toHaveReceivedCommandWith(ExecuteStatementCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE,
      transactionId: constants.BEGIN_TRANSACTION_DATA.transactionId,
      sql: 'select * from `foo`',
      parameters: [],
      includeResultMetadata: true
    });

    expect(RDSDataService).toHaveReceivedCommandTimes(CommitTransactionCommand, 1);
    expect(RDSDataService).toHaveReceivedCommandWith(CommitTransactionCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      transactionId: constants.BEGIN_TRANSACTION_DATA.transactionId
    });

    expect(RDSDataService).toHaveReceivedCommandTimes(RollbackTransactionCommand, 0);

    expect(rows).toEqual(constants.ALL_QUERY_RESPONSE_ROWS);
  });

  test('Nested transactions throw error', async () => {
    RDSDataService.on(BeginTransactionCommand).resolves(constants.BEGIN_TRANSACTION_DATA);
    RDSDataService.on(RollbackTransactionCommand).resolves(constants.ROLLBACK_TRANSACTION_DATA);

    await expect(
      knex.transaction(trx => trx.transaction(trx2 => trx2.select('*').from('foo')))
    ).rejects.toThrow('Nested transactions are not supported by the Aurora Data API');

    expect(RDSDataService).toHaveReceivedCommandTimes(BeginTransactionCommand, 1);
    expect(RDSDataService).toHaveReceivedCommandWith(BeginTransactionCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE
    });

    expect(RDSDataService).toHaveReceivedCommandTimes(RollbackTransactionCommand, 1);
    expect(RDSDataService).toHaveReceivedCommandWith(RollbackTransactionCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      transactionId: constants.BEGIN_TRANSACTION_DATA.transactionId
    });

    expect(RDSDataService).toHaveReceivedCommandTimes(ExecuteStatementCommand, 0);
    expect(RDSDataService).toHaveReceivedCommandTimes(CommitTransactionCommand, 0);
  });

  test('Manual transaction rollbacks', async () => {
    RDSDataService.on(BeginTransactionCommand).resolves(constants.BEGIN_TRANSACTION_DATA);
    RDSDataService.on(RollbackTransactionCommand).resolves(constants.ROLLBACK_TRANSACTION_DATA);

    await expect(
      knex.transaction(trx => trx.rollback(), { doNotRejectOnRollback: false })
    ).rejects.toThrow('Transaction rejected with non-error: undefined');

    expect(RDSDataService).toHaveReceivedCommandTimes(BeginTransactionCommand, 1);
    expect(RDSDataService).toHaveReceivedCommandWith(BeginTransactionCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE
    });

    expect(RDSDataService).toHaveReceivedCommandTimes(RollbackTransactionCommand, 1);
    expect(RDSDataService).toHaveReceivedCommandWith(RollbackTransactionCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      transactionId: constants.BEGIN_TRANSACTION_DATA.transactionId
    });

    expect(RDSDataService).toHaveReceivedCommandTimes(ExecuteStatementCommand, 0);
    expect(RDSDataService).toHaveReceivedCommandTimes(CommitTransactionCommand, 0);
  });

  test('Manual transaction rollbacks without error', async () => {
    RDSDataService.on(BeginTransactionCommand).resolves(constants.BEGIN_TRANSACTION_DATA);
    RDSDataService.on(RollbackTransactionCommand).resolves(constants.ROLLBACK_TRANSACTION_DATA);

    const knexNoReject = require('knex')({
      client,
      connection: {
        database: constants.DATABASE,
        resourceArn: constants.AURORA_CLUSTER_ARN,
        secretArn: constants.SECRET_ARN
      }
    });

    await knexNoReject.transaction(trx => trx.rollback(), { doNotRejectOnRollback: true });

    expect(RDSDataService).toHaveReceivedCommandTimes(BeginTransactionCommand, 1);
    expect(RDSDataService).toHaveReceivedCommandWith(BeginTransactionCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE
    });

    expect(RDSDataService).toHaveReceivedCommandTimes(RollbackTransactionCommand, 1);
    expect(RDSDataService).toHaveReceivedCommandWith(RollbackTransactionCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      transactionId: constants.BEGIN_TRANSACTION_DATA.transactionId
    });

    expect(RDSDataService).toHaveReceivedCommandTimes(ExecuteStatementCommand, 0);
    expect(RDSDataService).toHaveReceivedCommandTimes(CommitTransactionCommand, 0);
  });

  test('Two transactions in parallel', async () => {
    RDSDataService.on(BeginTransactionCommand).resolvesOnce(constants.BEGIN_TRANSACTION_DATA).resolvesOnce(constants.BEGIN_TRANSACTION_DATA_2);
    RDSDataService.on(ExecuteStatementCommand).resolves(constants.ALL_QUERY_RESPONSE_DATA);
    RDSDataService.on(CommitTransactionCommand).resolves(constants.COMMIT_TRANSACTION_DATA);

    let firstTrxInProgress = false;

    const [rows, rows2] = await Promise.all([
      knex.transaction(async trx => {
        firstTrxInProgress = true;
        await new Promise(resolve => setTimeout(resolve, 100));
        const rows = trx.select('*').from('foo');
        firstTrxInProgress = false;
        return rows;
      }),
      knex.transaction(async trx => {
        if (!firstTrxInProgress) {
          throw new Error('First transaction not concurrently in progress');
        }
        await new Promise(resolve => setTimeout(resolve, 100));
        return trx.select('*').from('foo');
      })
    ]);

    expect(RDSDataService).toHaveReceivedCommandTimes(BeginTransactionCommand, 2);
    expect(RDSDataService).toHaveReceivedNthSpecificCommandWith(1, BeginTransactionCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE
    });
    expect(RDSDataService).toHaveReceivedNthSpecificCommandWith(2, BeginTransactionCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE
    });

    expect(RDSDataService).toHaveReceivedCommandTimes(ExecuteStatementCommand, 2);
    expect(RDSDataService).toHaveReceivedNthSpecificCommandWith(1, ExecuteStatementCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE,
      transactionId: constants.BEGIN_TRANSACTION_DATA.transactionId,
      sql: 'select * from `foo`',
      parameters: [],
      includeResultMetadata: true
    });
    expect(RDSDataService).toHaveReceivedNthSpecificCommandWith(2, ExecuteStatementCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE,
      transactionId: constants.BEGIN_TRANSACTION_DATA_2.transactionId,
      sql: 'select * from `foo`',
      parameters: [],
      includeResultMetadata: true
    });

    expect(RDSDataService).toHaveReceivedCommandTimes(CommitTransactionCommand, 2);
    expect(RDSDataService).toHaveReceivedNthSpecificCommandWith(1, CommitTransactionCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      transactionId: constants.BEGIN_TRANSACTION_DATA.transactionId
    });
    expect(RDSDataService).toHaveReceivedNthSpecificCommandWith(2, CommitTransactionCommand, {
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      transactionId: constants.BEGIN_TRANSACTION_DATA_2.transactionId
    });

    expect(RDSDataService).toHaveReceivedCommandTimes(RollbackTransactionCommand, 0);

    expect(rows).toEqual(constants.ALL_QUERY_RESPONSE_ROWS);
    expect(rows2).toEqual(constants.ALL_QUERY_RESPONSE_ROWS);
  });
});
