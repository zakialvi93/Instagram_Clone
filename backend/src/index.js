const express = require("express");
const app = express();
const routes = require("./router/routes");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;
const mongoURL = process.env.MONGO_URL;


mongoose.connect(mongoURL);

mongoose.connection.on("connected",()=>{
  console.log("Successfully conncted to MongoDB");
})

mongoose.connection.on("error",()=>{
  console.log("Not conncted to MongoDB");
})

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

app.get('/',(req,res)=>{
  res.send("Hello World")
})

app.listen(PORT,()=>{
  console.log("Server is running on port "+PORT)
});
