import { faker } from '@faker-js/faker';
import fs from 'fs';

//this file is for genrating csv file for datasets with limit defined by the user having columns more than 20

function generateLargeDatasets(rowCount, filePath) {
    const writeStream = fs.createWriteStream(filePath);
    writeStream.write('ID,FirstName,LastName,Gender,Age,DateOfBirth,Email,PhoneNumber,Address,City,State,Country,PostalCode,ProductName,Category,Price,Quantity,TransactionID,PurchaseDate,PaymentMethod,AccountBalance,IPAddress,SubscriptionPlan,LastLogin,IsActive\n');

    for (let i = 0; i < rowCount; i++) {
        const row = [
            `"${faker.string.uuid()}"`,
            `"${faker.person.firstName()}"`,
            `"${faker.person.lastName()}"`,
            `"${faker.helpers.arrayElement(['Male', 'Female', 'Other'])}"`,
            faker.number.int({ min: 18, max: 90 }),
            `"${faker.date.birthdate({ min: 18, max: 90, mode: 'age' }).toISOString().split('T')[0]}"`,
            `"${faker.internet.email()}"`,
            `"${faker.phone.number()}"`,
            `"${faker.location.streetAddress()}"`,
            `"${faker.location.city()}"`,
            `"${faker.location.state()}"`,
            `"${faker.location.country()}"`,
            faker.number.int({ min: 10000, max: 99999 }),
            `"${faker.commerce.productName()}"`,
            `"${faker.commerce.department()}"`,
            faker.commerce.price(),
            faker.number.int({ min: 1, max: 100 }),
            `"${faker.string.uuid()}"`,
            `"${faker.date.past().toISOString().split('T')[0]}"`,
            `"${faker.finance.creditCardIssuer()}"`,
            faker.finance.amount(),
            `"${faker.internet.ip()}"`,
            `"${faker.helpers.arrayElement(['Free', 'Pro', 'Premium'])}"`,
            `"${faker.date.recent().toISOString().split('T')[0]}"`,
            faker.datatype.boolean()
        ].join(',');

        writeStream.write(`${row}\n`);
    }

    writeStream.end();
}

generateLargeDatasets(1000, 'dataset.csv');
console.log('CSV generation complete!');
