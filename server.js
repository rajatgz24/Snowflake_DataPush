// app.js
import dotenv from 'dotenv';
import { startCronJob } from './helper/cronJob.js';

//for using .env file
dotenv.config();

//choose your time default 12:30 pm
let chooseScheduleTime='30 12 * * *';

//starting of the cron task
startCronJob(chooseScheduleTime);