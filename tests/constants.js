module.exports = {
  DATABASE: 'foo',
  AURORA_CLUSTER_ARN: 'arn:aws:rds:us-west-2:012345678901:cluster:test',
  SECRET_ARN: 'arn:aws:secretsmanager:us-west-2:012345678901:secret:rds-db-credentials/cluster-test/admin',

  ALL_QUERY_RESPONSE_DATA: {
    columnMetadata: [
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: true,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: true,
        label: 'id',
        name: 'id',
        nullable: 0,
        precision: 20,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: -5,
        typeName: 'BIGINT'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: true,
        isCurrency: false,
        isSigned: true,
        label: 'decimal',
        name: 'decimal',
        nullable: 1,
        precision: 10,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: 3,
        typeName: 'DECIMAL'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: true,
        label: 'float',
        name: 'float',
        nullable: 1,
        precision: 12,
        scale: 31,
        schemaName: '',
        tableName: 'foo',
        type: 7,
        typeName: 'FLOAT'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: true,
        label: 'int',
        name: 'int',
        nullable: 1,
        precision: 11,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: 4,
        typeName: 'INT'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'date',
        name: 'date',
        nullable: 1,
        precision: 10,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: 91,
        typeName: 'DATE'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'datetime',
        name: 'datetime',
        nullable: 1,
        precision: 19,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: 93,
        typeName: 'DATETIME'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'timestamp',
        name: 'timestamp',
        nullable: 1,
        precision: 19,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: 93,
        typeName: 'TIMESTAMP'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'time',
        name: 'time',
        nullable: 1,
        precision: 10,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: 92,
        typeName: 'TIME'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'year',
        name: 'year',
        nullable: 1,
        precision: 4,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: 91,
        typeName: 'YEAR'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'datetime3',
        name: 'datetime3',
        nullable: 1,
        precision: 23,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: 93,
        typeName: 'DATETIME'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'timestamp3',
        name: 'timestamp3',
        nullable: 1,
        precision: 23,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: 93,
        typeName: 'TIMESTAMP'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'time3',
        name: 'time3',
        nullable: 1,
        precision: 14,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: 92,
        typeName: 'TIME'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'timestamp_null',
        name: 'timestamp_null',
        nullable: 1,
        precision: 19,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: 93,
        typeName: 'TIMESTAMP'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'varchar',
        name: 'varchar',
        nullable: 1,
        precision: 256,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: 12,
        typeName: 'VARCHAR'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: true,
        isCurrency: false,
        isSigned: false,
        label: 'varbinary',
        name: 'varbinary',
        nullable: 1,
        precision: 256,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: -3,
        typeName: 'VARBINARY'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: true,
        isCurrency: false,
        isSigned: false,
        label: 'blob',
        name: 'blob',
        nullable: 1,
        precision: 65535,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: -4,
        typeName: 'BLOB'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'text',
        name: 'text',
        nullable: 1,
        precision: 65535,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: -1,
        typeName: 'TEXT'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'enum',
        name: 'enum',
        nullable: 1,
        precision: 5,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: 1,
        typeName: 'CHAR'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'set',
        name: 'set',
        nullable: 1,
        precision: 13,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: 1,
        typeName: 'CHAR'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: true,
        label: 'null',
        name: 'null',
        nullable: 1,
        precision: 11,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: 4,
        typeName: 'INT'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'bool',
        name: 'bool',
        nullable: 0,
        precision: 1,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: -7,
        typeName: 'BIT'
      }
    ],
    numberOfRecordsUpdated: 0,
    records: [
      [
        {
          longValue: 1
        },
        {
          stringValue: '745'
        },
        {
          doubleValue: 837.484
        },
        {
          longValue: 4
        },
        {
          stringValue: '2020-05-16'
        },
        {
          stringValue: '2020-05-16 23:43:35'
        },
        {
          stringValue: '2020-05-16 23:43:35'
        },
        {
          stringValue: '16:31:56'
        },
        {
          stringValue: '2020-01-01'
        },
        {
          stringValue: '2020-04-16 15:36:54.384'
        },
        {
          stringValue: '2020-04-16 03:21:45.938'
        },
        {
          stringValue: '04:31:56.734'
        },
        {
          isNull: true
        },
        {
          stringValue: 'foo'
        },
        {
          blobValue: {
            type: 'Buffer',
            data: [
              98,
              97,
              114
            ]
          }
        },
        {
          blobValue: {
            type: 'Buffer',
            data: [
              98,
              108,
              111,
              103
            ]
          }
        },
        {
          stringValue: 'test'
        },
        {
          stringValue: 'one'
        },
        {
          stringValue: 'one,two'
        },
        {
          isNull: true
        },
        {
          booleanValue: true
        }
      ]
    ]
  },
  ALL_QUERY_RESPONSE_ROWS: [
    {
      id: 1,
      decimal: 745,
      float: 837.484,
      int: 4,
      date: new Date('2020-05-16T00:00:00.000Z'),
      datetime: new Date('2020-05-16T23:43:35.000Z'),
      timestamp: new Date('2020-05-16T23:43:35.000Z'),
      time: '16:31:56',
      year: new Date('2020-01-01T00:00:00.000Z'),
      datetime3: new Date('2020-04-16T15:36:54.384Z'),
      timestamp3: new Date('2020-04-16T03:21:45.938Z'),
      time3: '04:31:56.734',
      timestamp_null: null,
      varchar: 'foo',
      varbinary: Buffer.from([98, 97, 114]),
      blob: Buffer.from([98, 108, 111, 103]),
      text: 'test',
      enum: 'one',
      set: 'one,two',
      null: null,
      bool: true
    }
  ],

  COLUMN_INFO_RESPONSE_DATA: {
    columnMetadata: [
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'TABLE_CATALOG',
        name: 'TABLE_CATALOG',
        nullable: 0,
        precision: 512,
        scale: 0,
        schemaName: '',
        tableName: 'COLUMNS',
        type: 12,
        typeName: 'VARCHAR'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'TABLE_SCHEMA',
        name: 'TABLE_SCHEMA',
        nullable: 0,
        precision: 64,
        scale: 0,
        schemaName: '',
        tableName: 'COLUMNS',
        type: 12,
        typeName: 'VARCHAR'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'TABLE_NAME',
        name: 'TABLE_NAME',
        nullable: 0,
        precision: 64,
        scale: 0,
        schemaName: '',
        tableName: 'COLUMNS',
        type: 12,
        typeName: 'VARCHAR'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'COLUMN_NAME',
        name: 'COLUMN_NAME',
        nullable: 0,
        precision: 64,
        scale: 0,
        schemaName: '',
        tableName: 'COLUMNS',
        type: 12,
        typeName: 'VARCHAR'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'ORDINAL_POSITION',
        name: 'ORDINAL_POSITION',
        nullable: 0,
        precision: 21,
        scale: 0,
        schemaName: '',
        tableName: 'COLUMNS',
        type: -5,
        typeName: 'BIGINT UNSIGNED'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'COLUMN_DEFAULT',
        name: 'COLUMN_DEFAULT',
        nullable: 1,
        precision: 65535,
        scale: 0,
        schemaName: '',
        tableName: 'COLUMNS',
        type: -1,
        typeName: 'MEDIUMTEXT'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'IS_NULLABLE',
        name: 'IS_NULLABLE',
        nullable: 0,
        precision: 3,
        scale: 0,
        schemaName: '',
        tableName: 'COLUMNS',
        type: 12,
        typeName: 'VARCHAR'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'DATA_TYPE',
        name: 'DATA_TYPE',
        nullable: 0,
        precision: 64,
        scale: 0,
        schemaName: '',
        tableName: 'COLUMNS',
        type: 12,
        typeName: 'VARCHAR'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'CHARACTER_MAXIMUM_LENGTH',
        name: 'CHARACTER_MAXIMUM_LENGTH',
        nullable: 1,
        precision: 21,
        scale: 0,
        schemaName: '',
        tableName: 'COLUMNS',
        type: -5,
        typeName: 'BIGINT UNSIGNED'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'CHARACTER_OCTET_LENGTH',
        name: 'CHARACTER_OCTET_LENGTH',
        nullable: 1,
        precision: 21,
        scale: 0,
        schemaName: '',
        tableName: 'COLUMNS',
        type: -5,
        typeName: 'BIGINT UNSIGNED'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'NUMERIC_PRECISION',
        name: 'NUMERIC_PRECISION',
        nullable: 1,
        precision: 21,
        scale: 0,
        schemaName: '',
        tableName: 'COLUMNS',
        type: -5,
        typeName: 'BIGINT UNSIGNED'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'NUMERIC_SCALE',
        name: 'NUMERIC_SCALE',
        nullable: 1,
        precision: 21,
        scale: 0,
        schemaName: '',
        tableName: 'COLUMNS',
        type: -5,
        typeName: 'BIGINT UNSIGNED'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'DATETIME_PRECISION',
        name: 'DATETIME_PRECISION',
        nullable: 1,
        precision: 21,
        scale: 0,
        schemaName: '',
        tableName: 'COLUMNS',
        type: -5,
        typeName: 'BIGINT UNSIGNED'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'CHARACTER_SET_NAME',
        name: 'CHARACTER_SET_NAME',
        nullable: 1,
        precision: 32,
        scale: 0,
        schemaName: '',
        tableName: 'COLUMNS',
        type: 12,
        typeName: 'VARCHAR'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'COLLATION_NAME',
        name: 'COLLATION_NAME',
        nullable: 1,
        precision: 32,
        scale: 0,
        schemaName: '',
        tableName: 'COLUMNS',
        type: 12,
        typeName: 'VARCHAR'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'COLUMN_TYPE',
        name: 'COLUMN_TYPE',
        nullable: 0,
        precision: 65535,
        scale: 0,
        schemaName: '',
        tableName: 'COLUMNS',
        type: -1,
        typeName: 'MEDIUMTEXT'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'COLUMN_KEY',
        name: 'COLUMN_KEY',
        nullable: 0,
        precision: 3,
        scale: 0,
        schemaName: '',
        tableName: 'COLUMNS',
        type: 12,
        typeName: 'VARCHAR'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'EXTRA',
        name: 'EXTRA',
        nullable: 0,
        precision: 30,
        scale: 0,
        schemaName: '',
        tableName: 'COLUMNS',
        type: 12,
        typeName: 'VARCHAR'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'PRIVILEGES',
        name: 'PRIVILEGES',
        nullable: 0,
        precision: 80,
        scale: 0,
        schemaName: '',
        tableName: 'COLUMNS',
        type: 12,
        typeName: 'VARCHAR'
      },
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: false,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: false,
        label: 'COLUMN_COMMENT',
        name: 'COLUMN_COMMENT',
        nullable: 0,
        precision: 1024,
        scale: 0,
        schemaName: '',
        tableName: 'COLUMNS',
        type: 12,
        typeName: 'VARCHAR'
      }
    ],
    numberOfRecordsUpdated: 0,
    records: [
      [
        {
          stringValue: 'def'
        },
        {
          stringValue: 'test'
        },
        {
          stringValue: 'foo'
        },
        {
          stringValue: 'id'
        },
        {
          longValue: 1
        },
        {
          isNull: true
        },
        {
          stringValue: 'NO'
        },
        {
          stringValue: 'bigint'
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          longValue: 19
        },
        {
          longValue: 0
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          stringValue: 'bigint(20)'
        },
        {
          stringValue: 'PRI'
        },
        {
          stringValue: 'auto_increment'
        },
        {
          stringValue: 'select,insert,update,references'
        },
        {
          stringValue: ''
        }
      ],
      [
        {
          stringValue: 'def'
        },
        {
          stringValue: 'test'
        },
        {
          stringValue: 'foo'
        },
        {
          stringValue: 'decimal'
        },
        {
          longValue: 2
        },
        {
          stringValue: '745'
        },
        {
          stringValue: 'YES'
        },
        {
          stringValue: 'decimal'
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          longValue: 10
        },
        {
          longValue: 0
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          stringValue: 'decimal(10,0)'
        },
        {
          stringValue: ''
        },
        {
          stringValue: ''
        },
        {
          stringValue: 'select,insert,update,references'
        },
        {
          stringValue: ''
        }
      ],
      [
        {
          stringValue: 'def'
        },
        {
          stringValue: 'test'
        },
        {
          stringValue: 'foo'
        },
        {
          stringValue: 'float'
        },
        {
          longValue: 3
        },
        {
          stringValue: '837.484'
        },
        {
          stringValue: 'YES'
        },
        {
          stringValue: 'float'
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          longValue: 12
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          stringValue: 'float'
        },
        {
          stringValue: ''
        },
        {
          stringValue: ''
        },
        {
          stringValue: 'select,insert,update,references'
        },
        {
          stringValue: ''
        }
      ],
      [
        {
          stringValue: 'def'
        },
        {
          stringValue: 'test'
        },
        {
          stringValue: 'foo'
        },
        {
          stringValue: 'int'
        },
        {
          longValue: 4
        },
        {
          stringValue: '4'
        },
        {
          stringValue: 'YES'
        },
        {
          stringValue: 'int'
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          longValue: 10
        },
        {
          longValue: 0
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          stringValue: 'int(11)'
        },
        {
          stringValue: ''
        },
        {
          stringValue: ''
        },
        {
          stringValue: 'select,insert,update,references'
        },
        {
          stringValue: ''
        }
      ],
      [
        {
          stringValue: 'def'
        },
        {
          stringValue: 'test'
        },
        {
          stringValue: 'foo'
        },
        {
          stringValue: 'date'
        },
        {
          longValue: 5
        },
        {
          stringValue: '2020-05-16'
        },
        {
          stringValue: 'YES'
        },
        {
          stringValue: 'date'
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          stringValue: 'date'
        },
        {
          stringValue: ''
        },
        {
          stringValue: ''
        },
        {
          stringValue: 'select,insert,update,references'
        },
        {
          stringValue: ''
        }
      ],
      [
        {
          stringValue: 'def'
        },
        {
          stringValue: 'test'
        },
        {
          stringValue: 'foo'
        },
        {
          stringValue: 'datetime'
        },
        {
          longValue: 6
        },
        {
          stringValue: 'CURRENT_TIMESTAMP'
        },
        {
          stringValue: 'YES'
        },
        {
          stringValue: 'datetime'
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          longValue: 0
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          stringValue: 'datetime'
        },
        {
          stringValue: ''
        },
        {
          stringValue: ''
        },
        {
          stringValue: 'select,insert,update,references'
        },
        {
          stringValue: ''
        }
      ],
      [
        {
          stringValue: 'def'
        },
        {
          stringValue: 'test'
        },
        {
          stringValue: 'foo'
        },
        {
          stringValue: 'timestamp'
        },
        {
          longValue: 7
        },
        {
          stringValue: 'CURRENT_TIMESTAMP'
        },
        {
          stringValue: 'YES'
        },
        {
          stringValue: 'timestamp'
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          longValue: 0
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          stringValue: 'timestamp'
        },
        {
          stringValue: ''
        },
        {
          stringValue: ''
        },
        {
          stringValue: 'select,insert,update,references'
        },
        {
          stringValue: ''
        }
      ],
      [
        {
          stringValue: 'def'
        },
        {
          stringValue: 'test'
        },
        {
          stringValue: 'foo'
        },
        {
          stringValue: 'time'
        },
        {
          longValue: 8
        },
        {
          stringValue: '16:31:56'
        },
        {
          stringValue: 'YES'
        },
        {
          stringValue: 'time'
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          longValue: 0
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          stringValue: 'time'
        },
        {
          stringValue: ''
        },
        {
          stringValue: ''
        },
        {
          stringValue: 'select,insert,update,references'
        },
        {
          stringValue: ''
        }
      ],
      [
        {
          stringValue: 'def'
        },
        {
          stringValue: 'test'
        },
        {
          stringValue: 'foo'
        },
        {
          stringValue: 'year'
        },
        {
          longValue: 9
        },
        {
          stringValue: '2020'
        },
        {
          stringValue: 'YES'
        },
        {
          stringValue: 'year'
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          stringValue: 'year(4)'
        },
        {
          stringValue: ''
        },
        {
          stringValue: ''
        },
        {
          stringValue: 'select,insert,update,references'
        },
        {
          stringValue: ''
        }
      ],
      [
        {
          stringValue: 'def'
        },
        {
          stringValue: 'test'
        },
        {
          stringValue: 'foo'
        },
        {
          stringValue: 'datetime3'
        },
        {
          longValue: 10
        },
        {
          stringValue: '2020-04-16 15:36:54.384'
        },
        {
          stringValue: 'YES'
        },
        {
          stringValue: 'datetime'
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          longValue: 3
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          stringValue: 'datetime(3)'
        },
        {
          stringValue: ''
        },
        {
          stringValue: ''
        },
        {
          stringValue: 'select,insert,update,references'
        },
        {
          stringValue: ''
        }
      ],
      [
        {
          stringValue: 'def'
        },
        {
          stringValue: 'test'
        },
        {
          stringValue: 'foo'
        },
        {
          stringValue: 'timestamp3'
        },
        {
          longValue: 11
        },
        {
          stringValue: '2020-04-16 03:21:45.938'
        },
        {
          stringValue: 'YES'
        },
        {
          stringValue: 'timestamp'
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          longValue: 3
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          stringValue: 'timestamp(3)'
        },
        {
          stringValue: ''
        },
        {
          stringValue: ''
        },
        {
          stringValue: 'select,insert,update,references'
        },
        {
          stringValue: ''
        }
      ],
      [
        {
          stringValue: 'def'
        },
        {
          stringValue: 'test'
        },
        {
          stringValue: 'foo'
        },
        {
          stringValue: 'time3'
        },
        {
          longValue: 12
        },
        {
          stringValue: '04:31:56.734'
        },
        {
          stringValue: 'YES'
        },
        {
          stringValue: 'time'
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          longValue: 3
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          stringValue: 'time(3)'
        },
        {
          stringValue: ''
        },
        {
          stringValue: ''
        },
        {
          stringValue: 'select,insert,update,references'
        },
        {
          stringValue: ''
        }
      ],
      [
        {
          stringValue: 'def'
        },
        {
          stringValue: 'test'
        },
        {
          stringValue: 'foo'
        },
        {
          stringValue: 'varchar'
        },
        {
          longValue: 13
        },
        {
          stringValue: 'foo'
        },
        {
          stringValue: 'YES'
        },
        {
          stringValue: 'varchar'
        },
        {
          longValue: 256
        },
        {
          longValue: 256
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          stringValue: 'latin1'
        },
        {
          stringValue: 'latin1_swedish_ci'
        },
        {
          stringValue: 'varchar(256)'
        },
        {
          stringValue: ''
        },
        {
          stringValue: ''
        },
        {
          stringValue: 'select,insert,update,references'
        },
        {
          stringValue: ''
        }
      ],
      [
        {
          stringValue: 'def'
        },
        {
          stringValue: 'test'
        },
        {
          stringValue: 'foo'
        },
        {
          stringValue: 'varbinary'
        },
        {
          longValue: 14
        },
        {
          stringValue: 'bar'
        },
        {
          stringValue: 'YES'
        },
        {
          stringValue: 'varbinary'
        },
        {
          longValue: 256
        },
        {
          longValue: 256
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          stringValue: 'varbinary(256)'
        },
        {
          stringValue: ''
        },
        {
          stringValue: ''
        },
        {
          stringValue: 'select,insert,update,references'
        },
        {
          stringValue: ''
        }
      ],
      [
        {
          stringValue: 'def'
        },
        {
          stringValue: 'test'
        },
        {
          stringValue: 'foo'
        },
        {
          stringValue: 'blob'
        },
        {
          longValue: 15
        },
        {
          isNull: true
        },
        {
          stringValue: 'YES'
        },
        {
          stringValue: 'blob'
        },
        {
          longValue: 65535
        },
        {
          longValue: 65535
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          stringValue: 'blob'
        },
        {
          stringValue: ''
        },
        {
          stringValue: ''
        },
        {
          stringValue: 'select,insert,update,references'
        },
        {
          stringValue: ''
        }
      ],
      [
        {
          stringValue: 'def'
        },
        {
          stringValue: 'test'
        },
        {
          stringValue: 'foo'
        },
        {
          stringValue: 'text'
        },
        {
          longValue: 16
        },
        {
          isNull: true
        },
        {
          stringValue: 'YES'
        },
        {
          stringValue: 'text'
        },
        {
          longValue: 65535
        },
        {
          longValue: 65535
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          stringValue: 'latin1'
        },
        {
          stringValue: 'latin1_swedish_ci'
        },
        {
          stringValue: 'text'
        },
        {
          stringValue: ''
        },
        {
          stringValue: ''
        },
        {
          stringValue: 'select,insert,update,references'
        },
        {
          stringValue: ''
        }
      ],
      [
        {
          stringValue: 'def'
        },
        {
          stringValue: 'test'
        },
        {
          stringValue: 'foo'
        },
        {
          stringValue: 'enum'
        },
        {
          longValue: 17
        },
        {
          stringValue: 'one'
        },
        {
          stringValue: 'YES'
        },
        {
          stringValue: 'enum'
        },
        {
          longValue: 5
        },
        {
          longValue: 5
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          stringValue: 'latin1'
        },
        {
          stringValue: 'latin1_swedish_ci'
        },
        {
          stringValue: "enum('one','two','three')"
        },
        {
          stringValue: ''
        },
        {
          stringValue: ''
        },
        {
          stringValue: 'select,insert,update,references'
        },
        {
          stringValue: ''
        }
      ],
      [
        {
          stringValue: 'def'
        },
        {
          stringValue: 'test'
        },
        {
          stringValue: 'foo'
        },
        {
          stringValue: 'set'
        },
        {
          longValue: 18
        },
        {
          stringValue: 'one,two'
        },
        {
          stringValue: 'YES'
        },
        {
          stringValue: 'set'
        },
        {
          longValue: 13
        },
        {
          longValue: 13
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          stringValue: 'latin1'
        },
        {
          stringValue: 'latin1_swedish_ci'
        },
        {
          stringValue: "set('one','two','three')"
        },
        {
          stringValue: ''
        },
        {
          stringValue: ''
        },
        {
          stringValue: 'select,insert,update,references'
        },
        {
          stringValue: ''
        }
      ],
      [
        {
          stringValue: 'def'
        },
        {
          stringValue: 'test'
        },
        {
          stringValue: 'foo'
        },
        {
          stringValue: 'bool'
        },
        {
          longValue: 22
        },
        {
          stringValue: '0'
        },
        {
          stringValue: 'NO'
        },
        {
          stringValue: 'tinyint'
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          longValue: 3
        },
        {
          longValue: 0
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          isNull: true
        },
        {
          stringValue: 'tinyint(1)'
        },
        {
          stringValue: ''
        },
        {
          stringValue: ''
        },
        {
          stringValue: 'select,insert'
        },
        {
          stringValue: ''
        }
      ]
    ]
  },

  COLUMN_INFO_RESPONSE_ROWS: {
    id: {
      defaultValue: null,
      type: 'bigint',
      maxLength: null,
      nullable: false
    },
    decimal: {
      defaultValue: '745',
      type: 'decimal',
      maxLength: null,
      nullable: true
    },
    float: {
      defaultValue: '837.484',
      type: 'float',
      maxLength: null,
      nullable: true
    },
    int: {
      defaultValue: '4',
      type: 'int',
      maxLength: null,
      nullable: true
    },
    date: {
      defaultValue: '2020-05-16',
      type: 'date',
      maxLength: null,
      nullable: true
    },
    datetime: {
      defaultValue: 'CURRENT_TIMESTAMP',
      type: 'datetime',
      maxLength: null,
      nullable: true
    },
    timestamp: {
      defaultValue: 'CURRENT_TIMESTAMP',
      type: 'timestamp',
      maxLength: null,
      nullable: true
    },
    time: {
      defaultValue: '16:31:56',
      type: 'time',
      maxLength: null,
      nullable: true
    },
    year: {
      defaultValue: '2020',
      type: 'year',
      maxLength: null,
      nullable: true
    },
    datetime3: {
      defaultValue: '2020-04-16 15:36:54.384',
      type: 'datetime',
      maxLength: null,
      nullable: true
    },
    timestamp3: {
      defaultValue: '2020-04-16 03:21:45.938',
      type: 'timestamp',
      maxLength: null,
      nullable: true
    },
    time3: {
      defaultValue: '04:31:56.734',
      type: 'time',
      maxLength: null,
      nullable: true
    },
    varchar: {
      defaultValue: 'foo',
      type: 'varchar',
      maxLength: 256,
      nullable: true
    },
    varbinary: {
      defaultValue: 'bar',
      type: 'varbinary',
      maxLength: 256,
      nullable: true
    },
    blob: {
      defaultValue: null,
      type: 'blob',
      maxLength: 65535,
      nullable: true
    },
    text: {
      defaultValue: null,
      type: 'text',
      maxLength: 65535,
      nullable: true
    },
    enum: {
      defaultValue: 'one',
      type: 'enum',
      maxLength: 5,
      nullable: true
    },
    set: {
      defaultValue: 'one,two',
      type: 'set',
      maxLength: 13,
      nullable: true
    },
    bool: {
      defaultValue: '0',
      type: 'tinyint',
      maxLength: null,
      nullable: false
    }
  },

  FIRST_RESPONSE_DATA: {
    columnMetadata: [
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: true,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: true,
        label: 'id',
        name: 'id',
        nullable: 0,
        precision: 20,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: -5,
        typeName: 'BIGINT'
      }
    ],
    numberOfRecordsUpdated: 0,
    records: [
      [
        {
          longValue: 1
        }
      ]
    ]
  },
  FIRST_RESPONSE_ROWS: {
    id: 1
  },

  PLUCK_RESPONSE_DATA: {
    columnMetadata: [
      {
        arrayBaseColumnType: 0,
        isAutoIncrement: true,
        isCaseSensitive: false,
        isCurrency: false,
        isSigned: true,
        label: 'id',
        name: 'id',
        nullable: 0,
        precision: 20,
        scale: 0,
        schemaName: '',
        tableName: 'foo',
        type: -5,
        typeName: 'BIGINT'
      }
    ],
    numberOfRecordsUpdated: 0,
    records: [
      [
        {
          longValue: 1
        }
      ],
      [
        {
          longValue: 2
        }
      ]
    ]
  },
  PLUCK_RESPONSE_ROWS: [1, 2],

  DEL_RESPONSE_DATA: {
    generatedFields: [],
    numberOfRecordsUpdated: 7
  },
  DEL_RESPONSE_ROWS: 7,

  INSERT_RESPONSE_DATA: {
    generatedFields: [
      {
        longValue: 33
      }
    ],
    numberOfRecordsUpdated: 2
  },
  INSERT_RESPONSE_ROWS: [33],

  UPDATE_RESPONSE_DATA: {
    generatedFields: [],
    numberOfRecordsUpdated: 3
  },
  UPDATE_RESPONSE_ROWS: 3,

  BEGIN_TRANSACTION_DATA: {
    transactionId: 'lksdjfojf'
  },
  COMMIT_TRANSACTION_DATA: {
    transactionStatus: 'Transaction Committed'
  },
  ROLLBACK_TRANSACTION_DATA: {
    transactionStatus: 'Rollback Complete'
  }
};
