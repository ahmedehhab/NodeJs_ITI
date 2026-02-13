const process = require('node:process');
const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes');

mongoose.connect('mongodb://127.0.0.1:27017/inv_management');
const app = express();
app.use(express.json());
app.use(route);
app.use((er, req, res, next) => {
  res.status(er.statusCode || 500).json(er.message);
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`server is up and runnig http://127.0.0.1:${PORT}`);
});
