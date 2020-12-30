// AWS Aurora MySQL Data API Client
// -------
const map = require('lodash.map');
const Client_MySQL = require('knex/lib/dialects/mysql'); // eslint-disable-line camelcase
const Transaction = require('./transaction');

function getAuroraDataValue (value) {
  if ('blobValue' in value) {
    return Buffer.from(value.blobValue, 'base64');
  } else if ('doubleValue' in value) {
    return value.doubleValue;
  } else if ('isNull' in value) {
    return null;
  } else if ('longValue' in value) {
    return value.longValue;
  } else if ('stringValue' in value) {
    return value.stringValue;
  } else /* istanbul ignore else */ if ('booleanValue' in value) {
    return value.booleanValue;
  } else {
    const type = Object.keys(value)[0];
    throw new Error(`Unknown value type '${type}' from row`);
  }
}

function hydrateRecord (record, fields) {
  return record.reduce((row, value, index) => {
    const field = fields[index];

    value = getAuroraDataValue(value);

    if (value !== null) {
      switch (field.typeName) {
        case 'DECIMAL':
          value = Number(value);
          break;

        case 'DATE':
        case 'DATETIME':
        case 'TIMESTAMP':
        case 'YEAR':
          value = new Date(value + 'Z');
          break;

        default:
          break;
      }
    }

    row[field.label] = value;

    return row;
  }, {});
}

class Client_AuroraDataMySQL extends Client_MySQL { // eslint-disable-line camelcase
  transaction () {
    return new Transaction(this, ...arguments);
  }

  _driver () {
    let RDSDataService;
    try {
      RDSDataService = require('aws-sdk/clients/rdsdataservice');
    } catch (err) { /* istanbul ignore next */
      throw new Error(`Failed to load aws-sdk rdsdataservice client, did you forget to install it as a dependency? (${err.message})`);
    }

    const https = require('https');

    const agent = new https.Agent({
      keepAlive: true
    });

    const config = {
      httpOptions: {
        agent
      },
      ...(this.config.connection.sdkConfig || {})
    };

    return new RDSDataService(config);
  }

  initializePool() {
    /* istanbul ignore if */
    if (this.pool) {
      this.logger.warn('The pool has already been initialized');
      return;
    }

    this.knexUid = 0;

    // common parameters for Data API requests
    const parameters = {
      database: this.config.connection.database,
      resourceArn: this.config.connection.resourceArn,
      secretArn: this.config.connection.secretArn
    };

    this.pool = {
      acquire: () => ({
        promise: Promise.resolve({
          client: this.driver,
          parameters,
          __knexUid: this.knexUid++
        })
      }),
      release: () => true,
      destroy: () => true
    };
  }

  prepBindings (bindings) {
    return bindings.map((value, index) => {
      const name = index.toString();

      switch (typeof value) {
        case 'boolean':
          return {
            name,
            value: {
              booleanValue: value
            }
          };

        case 'number':
          if (Number.isInteger(value)) {
            return {
              name,
              value: {
                longValue: value
              }
            };
          } else {
            return {
              name,
              typeHint: 'DECIMAL',
              value: {
                stringValue: value.toString()
              }
            };
          }

        case 'string':
          return {
            name,
            value: {
              stringValue: value
            }
          };

        case 'object':
          break;

        default:
          throw new Error(
            `Unknown binding value type '${typeof value}' for value at index ${index}`
          );
      }

      if (Buffer.isBuffer(value) || ArrayBuffer.isView(value)) {
        return {
          name,
          value: {
            blobValue: value.toString('base64')
          }
        };
      }

      if (value instanceof Date) {
        return {
          name,
          typeHint: 'TIMESTAMP',
          value: {
            stringValue: value.toISOString().replace('T', ' ').replace('Z', '')
          }
        };
      }

      throw new Error(
        `Unknown binding value object of class '${value.constructor.name}' for value at index ${index}`
      );
    });
  }

  positionBindings (sql) {
    let questionCount = 0;
    return sql.replace(/\?/g, function () {
      return `:${questionCount++}`;
    });
  }

  _stream (connection, obj, stream, options) {
    throw new Error(
      'Streams are not supported by the aurora-data-mysql dialect'
    );
  }

  async _query (connection, obj) {
    obj.data = await connection.client
      .executeStatement({
        ...connection.parameters,
        includeResultMetadata: true,
        sql: obj.sql,
        parameters: obj.bindings
      })
      .promise();

    return obj;
  }

  processResponse (resp, runner) {
    const { method, data } = resp;
    const {
      columnMetadata: fields,
      generatedFields,
      numberOfRecordsUpdated,
      records
    } = data;

    const rows = records
      ? records.map((record) => hydrateRecord(record, fields))
      : [];

    if (resp.output) {
      return resp.output.call(runner, rows, fields);
    }

    switch (method) {
      case 'select':
      case 'pluck':
      case 'first': {
        if (method === 'pluck') {
          return map(rows, resp.pluck);
        }
        return method === 'first' ? rows[0] : rows;
      }
      case 'insert':
        return [getAuroraDataValue(generatedFields[0])];
      case 'del':
      case 'update':
      case 'counter':
        return numberOfRecordsUpdated;
      default:
        return { rows, fields };
    }
  }
}

Client_AuroraDataMySQL.prototype.driverName = 'aurora-data-mysql';

module.exports = Client_AuroraDataMySQL; // eslint-disable-line camelcase
