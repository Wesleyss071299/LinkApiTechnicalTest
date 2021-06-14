  require('dotenv').config({
    path: ".env"
  })

  const cron = require("node-cron");
  const scheduler = require("./app/utils/scheduler");

  const express = require("express");
  const monggose = require("mongoose");
  const cors = require("cors");
  const morgan = require("morgan");
  const bodyParser = require('body-parser');
  const serverPort = process.env.PORT || 3000;
  
  const http = require("http");
  const app = express();  
  const server = http.Server(app);

  
  const routes = require("./router");

  
  monggose.connect(
    process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      poolSize: 10
    }
  ).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => console.error('Connection error: ', err));
  
  
  app.use(cors({
    origin: "*",
    credentials: true
  }));
  
  app.use(express.urlencoded({ limit: '20mb', extended: true }));
  
  app.use(express.json({ limit: '20mb' }));
  
  app.use(express.json({ type: 'application/vnd.api+json' }));
  
  app.use(morgan("dev"));

  
  app.use(process.env.PATH_URL, routes); 
  
  
  app.get('*', function (req, res) {
    res.status(404).json({ msg: 'page not found', http: 404 });
  });
  
  
  cron.schedule("0 * * * * *", () =>{
    scheduler.searchOrdersPipedrive();
  });

  
  server.listen(serverPort, () => {
    console.log(`API running on port${serverPort}`);
  });
  