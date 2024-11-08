# Snowflake Data Push Automation

## Installation

1. **Clone the repository**

2. **Install all required packages**

3. **Create the `.env` file:**

   Add a `.env` file in the project root directory with the following contents:

   ```plaintext
   SNOWFLAKE_ACCOUNT=<your_snowflake_account>
   SNOWFLAKE_USERNAME=<your_snowflake_username>
   SNOWFLAKE_PASSWORD=<your_snowflake_password>
   SNOWFLAKE_WAREHOUSE=<your_snowflake_warehouse>
   SNOWFLAKE_DATABASE=<your_snowflake_database>
   SNOWFLAKE_SCHEMA=<your_snowflake_schema>
   ```

   Replace `<...>` with your actual Snowflake credentials.

## Configuration

1. **Verify Snowflake Credentials:**

   Ensure your Snowflake credentials are correct in the `.env` file. These will be used to establish a connection.

2. **Configure the Time for Data Push:**

   The data push is configured to run daily at **10 a.m.** by default. You can modify this in `server.js` by adjusting the cron schedule.
