/* eslint-env jest */

const constants = require('./constants');

const RDSDataService = require('aws-sdk/clients/rdsdataservice');

const {
  mockExecuteStatement,
  mockExecuteStatementPromise,
  mockBeginTransaction,
  mockBeginTransactionPromise,
  mockCommitTransaction,
  mockCommitTransactionPromise,
  mockRollbackTransaction,
  mockRollbackTransactionPromise
} = RDSDataService;

jest.mock('aws-sdk/clients/rdsdataservice');

beforeEach(() => {
  RDSDataService.mockClear();
  mockExecuteStatement.mockClear();
  mockExecuteStatementPromise.mockReset();
  mockBeginTransaction.mockClear();
  mockBeginTransactionPromise.mockReset();
  mockCommitTransaction.mockClear();
  mockCommitTransactionPromise.mockReset();
  mockRollbackTransaction.mockClear();
  mockRollbackTransactionPromise.mockReset();
});

describe('SDK configuration tests', () => {
  test('Sets TCP Keep Alive when no sdkConfig set', () => {
    require('knex')({
      client: require('..'),
      connection: {
        database: constants.DATABASE,
        resourceArn: constants.AURORA_CLUSTER_ARN,
        secretArn: constants.SECRET_ARN
      }
    });

    expect(RDSDataService).toHaveBeenCalledTimes(1);
    expect(RDSDataService).toHaveBeenCalledWith({
      httpOptions: {
        agent: expect.objectContaining({
          keepAlive: true
        })
      }
    });
  });

  test('Sets TCP Keep Alive when sdkConfig set', () => {
    require('knex')({
      client: require('..'),
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

    expect(RDSDataService).toHaveBeenCalledTimes(1);
    expect(RDSDataService).toHaveBeenCalledWith({
      httpOptions: {
        agent: expect.objectContaining({
          keepAlive: true
        })
      },
      accessKeyId: 'foo',
      secretAccessKey: 'bar',
      sessionToken: 'baz'
    });
  });

  test('Leaves HTTP options when provided in sdkConfig', () => {
    require('knex')({
      client: require('..'),
      connection: {
        database: constants.DATABASE,
        resourceArn: constants.AURORA_CLUSTER_ARN,
        secretArn: constants.SECRET_ARN,
        sdkConfig: {
          httpOptions: {
            timeout: 5000
          }
        }
      }
    });

    expect(RDSDataService).toHaveBeenCalledTimes(1);
    expect(RDSDataService).toHaveBeenCalledWith({
      httpOptions: {
        agent: undefined,
        timeout: 5000
      }
    });
  });
});

test('Destroy functionality', async () => {
  const knex = require('knex')({
    client: require('..'),
    connection: {
      database: constants.DATABASE,
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN
    }
  });

  mockExecuteStatementPromise.mockResolvedValue(constants.ALL_QUERY_RESPONSE_DATA);

  await knex.select('*').from('foo');

  expect(mockExecuteStatement).toHaveBeenCalledTimes(1);

  knex.destroy();

  await expect(knex.select('*').from('foo')).rejects.toThrow();
});

describe('Query statement tests', () => {
  const knex = require('knex')({
    client: require('..'),
    connection: {
      database: constants.DATABASE,
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN
    }
  });

  test('Hydrates all response data types', async () => {
    mockExecuteStatementPromise.mockResolvedValue(constants.ALL_QUERY_RESPONSE_DATA);

    const rows = await knex.select('*').from('foo');

    expect(mockExecuteStatement).toHaveBeenCalledTimes(1);
    expect(mockExecuteStatement).toHaveBeenCalledWith({
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
    mockExecuteStatementPromise.mockResolvedValue(constants.ALL_QUERY_RESPONSE_DATA);

    await knex.select('*').from('foo').where({
      boolean: true,
      int: 5,
      float: 5.5,
      text: 'foobar',
      null: null,
      binary: Buffer.from([1, 2, 3]),
      date: new Date('2020-01-01')
    }).whereRaw('null2 = ?', [null]);

    expect(mockExecuteStatement).toHaveBeenCalledTimes(1);
    expect(mockExecuteStatement).toHaveBeenCalledWith({
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

    expect(mockExecuteStatement).toHaveBeenCalledTimes(0);
  });

  test('Errors on unknown bindings', async () => {
    await expect(knex.select('*').from('foo').where({
      value: Symbol() // eslint-disable-line symbol-description
    })).rejects.toThrow("Unknown binding value type 'symbol' for value at index 0");

    expect(mockExecuteStatement).toHaveBeenCalledTimes(0);
  });

  test('Errors on unknown object bindings', async () => {
    await expect(
      knex.select('*').from('foo').where({
        value: new Set()
      })
    ).rejects.toThrow("Unknown binding value object of class 'Set' for value at index 0");

    expect(mockExecuteStatement).toHaveBeenCalledTimes(0);
  });

  test('Errors when attempting to stream results', async () => {
    await expect(
      knex.select('*').from('foo').stream(stream => stream.pipe(process.stdout))
    ).rejects.toThrow('Streams are not supported by the aurora-data-mysql dialect');
  });

  test('.columnInfo() works', async () => {
    mockExecuteStatementPromise.mockResolvedValue(constants.COLUMN_INFO_RESPONSE_DATA);

    const columnInfo = await knex('test').columnInfo();

    expect(mockExecuteStatement).toHaveBeenCalledTimes(1);
    expect(mockExecuteStatement).toHaveBeenCalledWith({
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
    mockExecuteStatementPromise.mockResolvedValue(constants.FIRST_RESPONSE_DATA);

    const rows = await knex.first('id').from('foo');

    expect(mockExecuteStatement).toHaveBeenCalledTimes(1);
    expect(mockExecuteStatement).toHaveBeenCalledWith({
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
    mockExecuteStatementPromise.mockResolvedValue(constants.PLUCK_RESPONSE_DATA);

    const rows = await knex.pluck('id').from('foo');

    expect(mockExecuteStatement).toHaveBeenCalledTimes(1);
    expect(mockExecuteStatement).toHaveBeenCalledWith({
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
    mockExecuteStatementPromise.mockResolvedValue(constants.DEL_RESPONSE_DATA);

    const rows = await knex('test').del();

    expect(mockExecuteStatement).toHaveBeenCalledTimes(1);
    expect(mockExecuteStatement).toHaveBeenCalledWith({
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
    mockExecuteStatementPromise.mockResolvedValue(constants.INSERT_RESPONSE_DATA);

    const inserted = await knex('test').insert([
      { int: 33 },
      { int: 34 }
    ]);

    expect(mockExecuteStatement).toHaveBeenCalledTimes(1);
    expect(mockExecuteStatement).toHaveBeenCalledWith({
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
    mockExecuteStatementPromise.mockResolvedValue(constants.INSERT_RESPONSE_WITHOUT_LAST_ID_DATA);

    const inserted = await knex('test').insert([
      { int: 33 },
      { int: 34 }
    ]);

    expect(mockExecuteStatement).toHaveBeenCalledTimes(1);
    expect(mockExecuteStatement).toHaveBeenCalledWith({
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
    mockExecuteStatementPromise.mockResolvedValue(constants.UPDATE_RESPONSE_DATA);

    const inserted = await knex('test').update({ int: 5 }).where({ text: 'foo' });

    expect(mockExecuteStatement).toHaveBeenCalledTimes(1);
    expect(mockExecuteStatement).toHaveBeenCalledWith({
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
    mockExecuteStatementPromise.mockResolvedValue(constants.INSERT_RESPONSE_DATA);

    const inserted = await knex('test').insert([
      { int: 33 },
      { int: 34 }
    ]);

    expect(mockExecuteStatement).toHaveBeenCalledTimes(1);
    expect(mockExecuteStatement).toHaveBeenCalledWith({
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
    mockExecuteStatementPromise.mockResolvedValue(constants.FIRST_RESPONSE_DATA);

    const response = await knex.raw('select `id` from `foo` limit ?', [1]);

    expect(mockExecuteStatement).toHaveBeenCalledTimes(1);
    expect(mockExecuteStatement).toHaveBeenCalledWith({
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
    mockBeginTransactionPromise.mockResolvedValue(constants.BEGIN_TRANSACTION_DATA);
    mockExecuteStatementPromise.mockResolvedValue(constants.ALL_QUERY_RESPONSE_DATA);
    mockCommitTransactionPromise.mockResolvedValue(constants.COMMIT_TRANSACTION_DATA);

    const rows = await knex.transaction(trx => trx.select('*').from('foo'));

    expect(mockBeginTransaction).toHaveBeenCalledTimes(1);
    expect(mockBeginTransaction).toHaveBeenCalledWith({
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE
    });

    expect(mockExecuteStatement).toHaveBeenCalledTimes(1);
    expect(mockExecuteStatement).toHaveBeenCalledWith({
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE,
      transactionId: constants.BEGIN_TRANSACTION_DATA.transactionId,
      sql: 'select * from `foo`',
      parameters: [],
      includeResultMetadata: true
    });

    expect(mockCommitTransaction).toHaveBeenCalledTimes(1);
    expect(mockCommitTransaction).toHaveBeenCalledWith({
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      transactionId: constants.BEGIN_TRANSACTION_DATA.transactionId
    });

    expect(mockRollbackTransaction).toHaveBeenCalledTimes(0);

    expect(rows).toEqual(constants.ALL_QUERY_RESPONSE_ROWS);
  });

  test('Nested transactions throw error', async () => {
    mockBeginTransactionPromise.mockResolvedValue(constants.BEGIN_TRANSACTION_DATA);
    mockRollbackTransactionPromise.mockResolvedValue(constants.ROLLBACK_TRANSACTION_DATA);

    await expect(
      knex.transaction(trx => trx.transaction(trx2 => trx2.select('*').from('foo')))
    ).rejects.toThrow('Nested transactions are not supported by the Aurora Data API');

    expect(mockBeginTransaction).toHaveBeenCalledTimes(1);
    expect(mockBeginTransaction).toHaveBeenCalledWith({
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE
    });

    expect(mockRollbackTransaction).toHaveBeenCalledTimes(1);
    expect(mockRollbackTransaction).toHaveBeenCalledWith({
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      transactionId: constants.BEGIN_TRANSACTION_DATA.transactionId
    });

    expect(mockExecuteStatement).toHaveBeenCalledTimes(0);
    expect(mockCommitTransaction).toHaveBeenCalledTimes(0);
  });

  test('Manual transaction rollbacks', async () => {
    mockBeginTransactionPromise.mockResolvedValue(constants.BEGIN_TRANSACTION_DATA);
    mockRollbackTransactionPromise.mockResolvedValue(constants.ROLLBACK_TRANSACTION_DATA);

    await expect(
      knex.transaction(trx => trx.rollback())
    ).rejects.toThrow('Transaction rejected with non-error: undefined');

    expect(mockBeginTransaction).toHaveBeenCalledTimes(1);
    expect(mockBeginTransaction).toHaveBeenCalledWith({
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE
    });

    expect(mockRollbackTransaction).toHaveBeenCalledTimes(1);
    expect(mockRollbackTransaction).toHaveBeenCalledWith({
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      transactionId: constants.BEGIN_TRANSACTION_DATA.transactionId
    });

    expect(mockExecuteStatement).toHaveBeenCalledTimes(0);
    expect(mockCommitTransaction).toHaveBeenCalledTimes(0);
  });

  test('Manual transaction rollbacks without error', async () => {
    mockBeginTransactionPromise.mockResolvedValue(constants.BEGIN_TRANSACTION_DATA);
    mockRollbackTransactionPromise.mockResolvedValue(constants.ROLLBACK_TRANSACTION_DATA);

    const knexNoReject = require('knex')({
      client: require('..'),
      connection: {
        database: constants.DATABASE,
        resourceArn: constants.AURORA_CLUSTER_ARN,
        secretArn: constants.SECRET_ARN
      }
    });

    await knexNoReject.transaction(trx => trx.rollback(), { doNotRejectOnRollback: true });

    expect(mockBeginTransaction).toHaveBeenCalledTimes(1);
    expect(mockBeginTransaction).toHaveBeenCalledWith({
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      database: constants.DATABASE
    });

    expect(mockRollbackTransaction).toHaveBeenCalledTimes(1);
    expect(mockRollbackTransaction).toHaveBeenCalledWith({
      resourceArn: constants.AURORA_CLUSTER_ARN,
      secretArn: constants.SECRET_ARN,
      transactionId: constants.BEGIN_TRANSACTION_DATA.transactionId
    });

    expect(mockExecuteStatement).toHaveBeenCalledTimes(0);
    expect(mockCommitTransaction).toHaveBeenCalledTimes(0);
  });
});
