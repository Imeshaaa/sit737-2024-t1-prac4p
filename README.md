# Calculator

This is a node.js application that uses express framework to perform basic calculations of two numbers.

## How to use

Prerequistes:

1.  Install Node.js in your device
2.  Install Node Package Manager (npm) in your device

Steps

1. Download the repository to your local machine.
2. Navigate to the project directory on in your terminal.
3. Then run `npm install` to install express and other required dependencies.
4. To run the server, run `node server.js`.
5. By default this server listens to port 3000.
6. To make a GET request to substract two numbers using the API type the following link on your browser `http://localhost:3000/add?num1=20&num2=10`. You can replace the 'add' operation with 'subtract', 'multiply' and 'divide' and number values with your preferences. In this example, num1 is 20 and num2 is 10.

Response

When the GET request is successful, the server will respond with the JSON object

```
{ "statusCode": 200, "data": 30 }
```

Logs
Under logs folder, there are two files created.

1. Combined log - This file captures all the operations performed including any errors
2. Error log - This file captures erronious entries by the user. As an example, if the user enters a letter instead of a number value for num1 or num2, an error message will be generated and logged in this file.
