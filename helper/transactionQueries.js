import { executeInsertWithDelay } from './utils.js'; // Importing the function from utils.js

// Insert transaction data
export const insertTransactionData = async (connection, transactionData) => {
  const transactionSql = `
    INSERT INTO TRANSACTIONS (transactionid, transaction_time, customerid, date, product, quantity, price) 
    VALUES(?, ?, ?, ?, ?, ?, ?)
  `;

  const transactionValues = transactionData.map(data => [
    data.transactionid,
    data.transaction_time,
    data.customerid,
    data.date,
    data.product,
    data.quantity,
    data.price,
  ]);

  // Execute the insert with a 1-second delay between each
  await executeInsertWithDelay(connection, transactionSql, transactionValues, 1000);
};

// Insert transaction log data
export const insertTransactionLogData = async (connection, logData) => {
  const logSql = `
    INSERT INTO TRANSACTION_LOG (log_id, transactionid, status, logdate, logtime, action) 
    VALUES(?, ?, ?, ?, ?, ?)
  `;

  const logValues = logData.map(data => [
    data.log_id,          
    data.transactionid,   
    data.status,          
    data.logdate, 
    data.logtime,      
    data.action, 
  ]);

  // Execute the insert with a 1-second delay between each
  await executeInsertWithDelay(connection, logSql, logValues, 1000);
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
