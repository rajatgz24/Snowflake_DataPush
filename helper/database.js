// database.js
import snowflake from 'snowflake-sdk';

import { insertTransactionData, insertTransactionLogData, closeConnection } from './transactionQueries.js'; // Make sure this file also uses ES modules.

//for creating a connection
const createSnowflakeConnection = () => {
  return snowflake.createConnection({
    account: process.env.SNOWFLAKE_ACCOUNT,
    username: process.env.SNOWFLAKE_USERNAME,
    password: process.env.SNOWFLAKE_PASSWORD,
    warehouse: process.env.SNOWFLAKE_WAREHOUSE,
    database: process.env.SNOWFLAKE_DATABASE,
    schema: process.env.SNOWFLAKE_SCHEMA,
  });
};


// for adding data to the snowflake database
export const dataPushToSnowflake = async (transactionData, transactionLogData) => {
  const connection = createSnowflakeConnection();

  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error('Connection to Snowflake was unsuccessful: ' + err.message);
        reject(err);
        return;
      }

      console.log('Connection to Snowflake was successful.');

      insertTransactionData(connection, transactionData)
        .then(() => insertTransactionLogData(connection, transactionLogData))
        .then(() => closeConnection(connection))
        .then(() => resolve("All operation Done Successfully"))
        .catch((error) => reject(error));
    });
  });
};
