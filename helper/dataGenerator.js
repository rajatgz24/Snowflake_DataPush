import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { format, setHours, setMinutes, setSeconds } from 'date-fns';
import { getRandomAction, getRandomStatus } from './helperFunctions.js';
import { START_HOUR, START_MINUTE, END_HOUR, END_MINUTE, ROW_COUNT } from './config.js';


const getRandomTime = (date, startHour, startMinute, endHour, endMinute) => {
  if (
    startHour < 1 || startHour > 24 || endHour < 1 || endHour > 24 ||
    startMinute < 0 || startMinute > 59 || endMinute < 0 || endMinute > 59 ||
    startHour > endHour || (startHour === endHour && startMinute >= endMinute)
  ) {
    console.log("Invalid range. Ensure valid hours (1-24), minutes (0-59), and that the start time is less than the end time.");
    return;
  }

  const randomHours = Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;

  let randomMinutes = 0;
  let randomSeconds = Math.floor(Math.random() * 60);

  if (randomHours === startHour) {
    randomMinutes = Math.floor(Math.random() * (60 - startMinute)) + startMinute;
  } else if (randomHours === endHour) {
    randomMinutes = Math.floor(Math.random() * (endMinute + 1));
  } else {
    randomMinutes = Math.floor(Math.random() * 60);
  }  

  if(randomHours==endHour&&randomMinutes==endMinute){
    randomSeconds=0;
  }

  date = setHours(date, randomHours);
  date = setMinutes(date, randomMinutes);
  date = setSeconds(date, randomSeconds);

  return date;
};

const formatTime = () => {
  const wantRandomTime = true;
  if (wantRandomTime) {
    const randomTime = getRandomTime(new Date(), START_HOUR, START_MINUTE, END_HOUR, END_MINUTE);
    return format(randomTime, "yyyy-MM-dd HH:mm:ss");
  } else {
    return format(new Date(), "yyyy-MM-dd HH:mm:ss");
  }
};

console.log(formatTime()); // Logging the formatted time

// Function for generating dynamic data
const generateData = () => {
  const transactionData = [];
  const transactionLogData = [];

  for (let i = 0; i < ROW_COUNT; i++) {
    const department = faker.commerce.department();
    const custID = Math.floor(Math.random() * 1000) + 1;
    const quantity = Math.floor(Math.random() * 10) + 1;
    const price = quantity * ((Math.floor(Math.random() * 10) + 1) * 10);
    const transactionID = uuidv4();
    const logID = uuidv4();

    transactionData.push({
      transactionid: transactionID,
      transaction_time: formatTime(),
      customerid: `CUST${custID}`,
      product: department,
      quantity: quantity,
      price: price,
    });

    transactionLogData.push({
      log_id: logID,
      transactionid: transactionID,
      status: getRandomStatus(),
      log_timestamp: formatTime(),
      action: getRandomAction(),
    });
  }

  return { transactionData, transactionLogData };
};

export { generateData };
