// helper/cronJob.js
import cron from 'node-cron';
import fs from 'fs';
import { dataPushToSnowflake } from './database.js';
import { generateData } from './dataGenerator.js';

// Function to start the cron job
export const startCronJob = (scheduleTime) => {
  cron.schedule(scheduleTime, async () => {
    //following console is just for testing purpose
    console.log("Cron Task is running");

    const { transactionData, transactionLogData } = generateData();
    // creating txt file to see the data
    // const writeDataToFile = (data, filename) => {
    //   const formattedData = JSON.stringify(data, null, 2);
    //   fs.writeFileSync(filename, formattedData, 'utf8');
    // };
    // writeDataToFile(transactionData, 'transactionData.txt');
    // writeDataToFile(transactionLogData, 'transactionLogData.txt');

    try {
      const result = await dataPushToSnowflake(transactionData, transactionLogData);
      console.log('Resolved:', result);
    } catch (error) {
      console.log('Error:', error);
    }
  });
};

export const pushDataOnce=async()=>{
  const { transactionData, transactionLogData } = generateData();

  // const writeDataToFile = (data, filename) => {
  //   const formattedData = JSON.stringify(data, null, 2);
  //   fs.writeFileSync(filename, formattedData, 'utf8');
  // };
  // writeDataToFile(transactionData, 'transactionData.txt');
  // writeDataToFile(transactionLogData, 'transactionLogData.txt');
  try {
      const result = await dataPushToSnowflake(transactionData, transactionLogData);
      console.log('Resolved:', result);
    } catch (error) {
      console.log('Error:', error);
    }
}