import { executeInsert } from './utils.js'; // Importing the function from utils.js

// Insert transaction data
export const insertTransactionData = async (connection, transactionData) => {
  const transactionSql = `
    INSERT INTO TRANSACTIONS (transactionid, transaction_time, customerid, product, quantity, price) 
    VALUES(?, ?, ?, ?, ?, ?)
  `;

  const transactionValues = transactionData.map(data => [
    data.transactionid,
    data.transaction_time,
    data.customerid,
    // data.date,
    data.product,
    data.quantity,
    data.price,
  ]);
  await executeInsert(connection, transactionSql, transactionValues);
  
};

// Insert transaction log data
export const insertTransactionLogData = async (connection, logData) => {
  const logSql = `
    INSERT INTO TRANSACTION_LOG (log_id, transactionid, status, log_timestamp, action) 
    VALUES(?, ?, ?, ?, ?)
  `;

  const logValues = logData.map(data => [
    data.log_id,          
    data.transactionid,   
    data.status,          
    // data.logdate, 
    data.log_timestamp,      
    data.action, 
  ]);

  await executeInsert(connection, logSql, logValues);
};



export const closeConnection = (connection) => {
  return new Promise((resolve, reject) => {
    connection.destroy((err) => {
      if (err) {
        console.log('Failed to close connection: ' + err.message);
        reject(err);
      } else {
        console.log('Connection closed successfully.');
        resolve();
      }
    });
  });
};
