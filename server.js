// app.js
import dotenv from 'dotenv';
import { startCronJob,pushDataOnce } from './helper/cronJob.js';
import { CHOOSE_SCHEDULE_TIME } from './helper/config.js'; 

//for using .env file
dotenv.config();


//starting of the cron task
//startCronJob(CHOOSE_SCHEDULE_TIME);
pushDataOnce();