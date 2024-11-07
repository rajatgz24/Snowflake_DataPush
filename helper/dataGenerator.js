// dataGenerator.js
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import { getRandomAction, getRandomStatus } from './helperFunctions.js';

//for formatting time
const formatTime = (date) => {
  return format(date, 'HH:mm:ss.SSS');
};

//for generating dynamic dat
const generateData = () => {
  const transactionData = [];
  const transactionLogData = [];

  for (let i = 0; i < 5; i++) {
    const department = faker.commerce.department();
    const currentDate = new Date().toISOString().split('T')[0];
    const custID = Math.floor(Math.random() * 1000) + 1;
    const quantity = Math.floor(Math.random() * 10) + 1;
    const price = quantity * ((Math.floor(Math.random() * 10) + 1) * 10);
    const transactionID = uuidv4();
    const logID = uuidv4();

    transactionData.push({
      transactionid: transactionID,
      transaction_time:formatTime(new Date()),
      customerid: `CUST${custID}`,
      date: currentDate,
      product: department,
      quantity: quantity,
      price: price
    });

    transactionLogData.push({
      log_id: logID,
      transactionid: transactionID,
      status: getRandomStatus(),
      logdate:currentDate,
      logtime: formatTime(new Date()),
      action: getRandomAction()
    });
  }

  return { transactionData, transactionLogData };
};

export { generateData };
