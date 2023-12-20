# [knex.js](https://knexjs.org) driver for MySQL [AWS Aurora Data API](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/data-api.html)

**Tired of dealing with the challenges of managing MySQL servers?**

* Scaling up or down requires manual intervention or complex autoscaling policies and can require downtime
* Managing a pool of connections is tedious and can exhaust server resources with idle connections
* Development database instances are wasted when developers aren't actively using them
* Patching with minor and patch versions is time consuming and tedious
* Credentials must be stored in a confidential and encrypted location and retrieved at runtime
* Primary and replicas must be maintained for high-availability utilizing complex DNS resolution failover
* File system utilization must be monitored and disk space added when needed

**[AWS Aurora Serverless](https://aws.amazon.com/rds/aurora/serverless/) to the rescue!**

Aurora Serverless abstracts away the challenges of maintaining MySQL database servers. The service scales database clusters up and down (including all the way to 0) depending on connection load. Minor and patch versions are applied automatically without downtime. Fault-tolerant, multi-region clusters are provisioned for you, with automated storage management built-in.

Further, the [AWS Aurora Data API](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/data-api.html) makes it easy to perform queries on Aurora Serverless clusters using HTTP connections and standard [AWS IAM](https://aws.amazon.com/iam/) temporary credentials. The Data API allows for connection multiplexing across processes making it easier to operate at lower, cheaper scale than request pooling may require.

This Node.js module provides a driver for [knex.js](https://knexjs.org) to utilize the AWS Aurora Data API to achieve these benefits using standard Knex.js semantics.

## Usage

First, create an Aurora Serverless Database. Make sure you can execute queries against it as shown in the [AWS docs](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/data-api.html#data-api.calling.cli.execute-statment).

Next install the module:

```bash
$ npm install --save knex knex-aurora-data-api-mysql
```

Then simply provide this module as the client, supply the database name, and specify the AWS resource identifiers and credentials to connect to your Aurora Serverless cluster:

```js
const knex = require('knex')({
  client: require('knex-aurora-data-api-mysql'),
  connection: {
    database: '<Database Name>', // e.g. 'project'
    resourceArn: '<Aurora Serverless Cluster ARN>', // e.g. 'arn:aws:rds:us-west-2:012345678901:cluster:mydbcluster'
    secretArn: '<AWS Secrets Manager Credentials ARN>', // e.g. 'arn:aws:secretsmanager:us-west-2:012345678901:secret:rds-db-credentials/mydbcluster/user',
    
    // Optional AWS SDK configuration if not available through process environment variables like AWS_PROFILE and AWS_REGION
    sdkConfig: {
      region: '<AWS Region>',
      accessKeyId: '<AWS Access Key ID>',
      secretAccessKey: '<AWS Secret Access Key>'
    }
  }
});

console.log(await knex('accounts').columnInfo());
```

## Limitations

* While transactions are supported, nested transactions are not. The AWS Aurora Data API does not support savepoints. This means you can't do something like:

```js
let id = 231;
let name = 'Barb';
let role = 'Admin';

knex.transaction(async trx => {
  trx('users').update({ name }).where({ id });
  trx('roles').update({ role }).where({ id });

  try {
    // Creating a nested transaction will always fail
    await trx.transaction(async trx2 => {
      await trx2('events').insert({ event: 'User Update', id });
    });
  } catch (err) {
    console.log(`Tried to insert event for updating user ${id} but failed: ${err}`;
  }
});
```

## Breaking Changes
### Version 2 to 3
Version 3 uses version 3 of the AWS SDK. This SDK is included automatically in the `nodejs18.x` AWS Lambda runtime and above.

`@aws-sdk/client-rds-data` and `@smithy/node-http-handler` are only included as dev dependencies. You will need to make sure those two packages are available in some form in your project.

### Version 1 to 2
Version 1 depended on aws-sdk, which at the time of the change was 71 MB in size. This package may be used in contexts where package size is important and the SDK may already be available, such as AWS Lambda Functions.

Version 2 drops aws-sdk from a dependency to a dev dependency. This means you need to make sure the aws-sdk package is available in some form in your project. This can be accomplished by adding aws-sdk to your project's dependencies, or by allowing the package to be implicitly provided like it is in AWS Lambda Functions.