// app.js
import dotenv from 'dotenv';
import { startCronJob } from './helper/cronJob.js';

//for using .env file
dotenv.config();

//choose your time
let chooseScheduleTime='0 10 * * *';

//starting of the cron task
startCronJob(chooseScheduleTime);