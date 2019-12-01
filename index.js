const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth"); //Import Routes
const postRoute=require('./routes/posts');

dotenv.config();

//connect to DB
mongoose.connect(
  process.env.DB_CONNECT, // .env'deki variable
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to db!");
  }
);

//Middleware
app.use(express.json());
//Route Middlewares
app.use("/api/user", authRoute); //  /api/user'a gelen istekte çalıştır
app.use('/api/posts',postRoute);

app.listen(3000, () => console.log("server is up and running"));
