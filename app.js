import express from 'express';
import cors from 'cors';
import dataRoute from './routes/data.js';

const app = express();

// Configure CORS middleware
const corsOptions = {
  origin: 'http://localhost:3030', // Replace with your allowed origin(s)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // enable set cookie with CORS
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use('/data', dataRoute);


// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});