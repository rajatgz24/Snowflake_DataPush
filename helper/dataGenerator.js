// dataGenerator.js
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { format, addDays, setHours, setMinutes, setSeconds } from 'date-fns';
import { getRandomAction, getRandomStatus } from './helperFunctions.js';

// const getRandomDate = () => {
  
//   const startDate = new Date(2010, 0, 1); // January 1, 2010
//   const endDate = new Date(2023, 11, 31); // December 31, 2023
  
//   const daysRange = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
  
//   const randomDays = Math.floor(Math.random() * daysRange);

//   return addDays(startDate, randomDays);
// };

//following function will generate random time 
const getRandomTime = (date) => {

  const randomHours = Math.floor(Math.random() * 24);
  const randomMinutes = Math.floor(Math.random() * 60);
  const randomSeconds = Math.floor(Math.random() * 60);

  date = setHours(date, randomHours);
  date = setMinutes(date, randomMinutes);
  date = setSeconds(date, randomSeconds);

  return date;
};

const formatTime = () => {
 // const randomDate = getRandomDate(); //  random date between 2010 and 2023 for pushing the 
 //we can select if we want random time or not
  const wantRandomTime=true;
  if(wantRandomTime==true){
    const randomTime = getRandomTime(new Date()); // Add random time to current date
    return format(randomTime, "yyyy-MM-dd HH:mm:ss"); // 
  }else{
    return format(new Date(), "yyyy-MM-dd HH:mm:ss");
  }
};

console.log(formatTime()); //logging the formatted time

//for generating dynamic data
const generateData = () => {
  const transactionData = [];
  const transactionLogData = [];

  for (let i = 0; i < 5; i++) {
    const department = faker.commerce.department();
    const custID = Math.floor(Math.random() * 1000) + 1;
    const quantity = Math.floor(Math.random() * 10) + 1;
    const price = quantity * ((Math.floor(Math.random() * 10) + 1) * 10);
    const transactionID = uuidv4();
    const logID = uuidv4();

    transactionData.push({
      transactionid: transactionID,
      transaction_time:formatTime(),
      customerid: `CUST${custID}`,
      product: department,
      quantity: quantity,
      price: price
    });

    transactionLogData.push({
      log_id: logID,
      transactionid: transactionID,
      status: getRandomStatus(),
      log_timestamp: formatTime(),
      action: getRandomAction()
    });
  }
  //for logging the data to be pushed into snowflake tables
  console.log(transactionData,transactionLogData)

  return { transactionData, transactionLogData };
};

export { generateData };
