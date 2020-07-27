const mockExecuteStatement = jest.fn();
const mockExecuteStatementPromise = jest.fn();

mockExecuteStatement.mockReturnValue({
  promise: mockExecuteStatementPromise
});

const mockBeginTransaction = jest.fn();
const mockBeginTransactionPromise = jest.fn();

mockBeginTransaction.mockReturnValue({
  promise: mockBeginTransactionPromise
});

const mockCommitTransaction = jest.fn();
const mockCommitTransactionPromise = jest.fn();

mockCommitTransaction.mockReturnValue({
  promise: mockCommitTransactionPromise
});

const mockRollbackTransaction = jest.fn();
const mockRollbackTransactionPromise = jest.fn();

mockRollbackTransaction.mockReturnValue({
  promise: mockRollbackTransactionPromise
});

const mock = jest.fn().mockImplementation(() => ({
  executeStatement: mockExecuteStatement,
  beginTransaction: mockBeginTransaction,
  commitTransaction: mockCommitTransaction,
  rollbackTransaction: mockRollbackTransaction
}));

module.exports = mock;
module.exports.mockExecuteStatement = mockExecuteStatement;
module.exports.mockExecuteStatementPromise = mockExecuteStatementPromise;
module.exports.mockBeginTransaction = mockBeginTransaction;
module.exports.mockBeginTransactionPromise = mockBeginTransactionPromise;
module.exports.mockCommitTransaction = mockCommitTransaction;
module.exports.mockCommitTransactionPromise = mockCommitTransactionPromise;
module.exports.mockRollbackTransaction = mockRollbackTransaction;
module.exports.mockRollbackTransactionPromise = mockRollbackTransactionPromise;