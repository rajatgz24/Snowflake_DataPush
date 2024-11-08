// helper/cronJob.js
import cron from 'node-cron';
import { dataPushToSnowflake } from './database.js';
import { generateData } from './dataGenerator.js';

// Function to start the cron job
export const startCronJob = (scheduleTime) => {
  //console.log("hello")
  cron.schedule(scheduleTime, async () => {
    //following console is just for testing purpose
    console.log("Cron Task is running");

    const { transactionData, transactionLogData } = generateData();

    try {
      const result = await dataPushToSnowflake(transactionData, transactionLogData);
      console.log('Resolved:', result);
    } catch (error) {
      console.log('Error:', error);
    }
  });
};
