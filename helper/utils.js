// utils.js

// Helper function to execute the insert with delay
export const executeInsertWithDelay = async (connection, sql, data, delayMs) => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  
    for (let values of data) {
      try {
        await delay(delayMs); // Wait for the specified delay
        await new Promise((resolve, reject) => {
          connection.execute({
            sqlText: sql,
            binds: values,
            complete: (err) => {
              if (err) {
                console.log(`Failed to insert: ${err.message}`);
                reject(err);
              } else {
                console.log(`Data inserted successfully`);
                resolve();
              }
            },
          });
        });
      } catch (error) {
        console.error('Error during insert: ', error);
      }
    }
  };
  