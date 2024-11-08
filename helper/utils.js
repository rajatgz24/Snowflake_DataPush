// utils.js

// Helper function to execute the insert
export const executeInsert = (connection, sql, data) => {
  console.log("Pushing data to table...");

  // Prepare an array of bind values for batch insert

  return new Promise((resolve, reject) => {
    connection.execute({
      sqlText: sql,
      binds: data,
      complete: (err) => {
        if (err) {
          console.log("Failed to insert into table: " + err.message);
          reject(err);
        } else {
          console.log(`Data inserted successfully: ${data.length} rows`);
          resolve();
        }
      },
    });
  });
};
