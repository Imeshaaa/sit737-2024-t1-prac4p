//import express and winston modules
const express = require("express");
const winston = require('winston');
//assign express framework
const app = express();
//define port number
const port = 3050;

//configure winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
    new winston.transports.Console({
    format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level:
   'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
   });

// Function to log a common message for each operation
const logOperation = (operation, num1, num2) => {
    logger.log({
      level: 'info',
      message: `New ${operation} operation requested: ${num1} ${operation} ${num2}`
    });
  };

// Function to perform and return the calculation result
const calculate = (operation, num1, num2) => {
    try {
        if (isNaN(num1) || isNaN(num2)) {
          throw new Error('Invalid input. Please provide valid numbers.');
        }
    
        const operations = {
          add: num1 + num2,
          subtract: num1 - num2,
          multiply: num1 * num2,
          divide: num2 === 0 ? { error: 'Division by zero is not allowed.' } : num1 / num2,
        };
    
        return operations[operation] || { error: 'Invalid operation specified.' };
      } catch (error) {
        logger.error(error.message); // Log error to error file
        console.error(error.message); // Log error to console
        return { error: error.message }; // Return error message in response
      }
  };

 // Define API endpoints with logging using logOperation function
//Add
app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
  
logOperation('add', num1, num2);

  try {
    const response = calculate('add', num1, num2);
    res.status(200).json({statuscocde:200, data: response });
  } catch (error) {
    res.status(400).json({ statuscocde:400, error: error.message });
  }
    
  });
  
//Subtract
app.get('/subtract', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
  
logOperation('subtract', num1, num2);
  
    const response = calculate('subtract', num1, num2);
    res.status(200).json({statuscocde:200, data: response });
  });

//Multiply
app.get('/multiply', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
  
logOperation('multiply', num1, num2);
  
    const response = calculate('multiply', num1, num2);
    res.status(200).json({statuscocde:200, data: response });
  });

//Divide
app.get('/divide', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
  
logOperation('divide', num1, num2);
  
    const response = calculate('divide', num1, num2);
    res.status(200).json({statuscocde:200, data: response });
  });

  // Error handling
app.use((err, req, res, next) => {
    // Handle any errors that occur during request processing
    console.error(err.stack); // Log the error for debugging
    res.status(500).json({ error: 'Internal server error' }); // Send generic error response
  });

//start the server and listen to port 3000
app.listen(port,()=> {
    console.log("Hello! I'm listening to port "+port);
})