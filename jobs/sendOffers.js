const cron = require("node-cron");

// This function will be executed every minute
function myTask() {
  console.log("Task executed every minute:", new Date());
}

// Schedule the job to run every minute
const sendingEmailjob = cron.schedule("* * * * *", myTask, {
  scheduled: false,
});

// To start the job manually

// To stop the job manually
// job.stop();

module.exports = { sendingEmailjob };
