// const express = require('express');
// const multer= require('multer');
// require('dotenv').config();
// const path=require('path');
// const userRoute=require("../routes/userRoutes");
// const cors=require('cors');
// const UsersRegistration= require("../model/userSchema");
// const connectDb=require("../db/connection");
// const app = express();
// const PORT = 5000;
// app.use(cors());
// app.use(express.json());
// const storage= multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'public/images')
//     },filename:(req,file,cb)=>{
//         cb(null,file.fieldname +" "+ Date.now()+ path.extname(file.originalname) )
//     }
// })
// const upload=multer( {storage})
// app.use(express.urlencoded({extended:true}));
// app.use(upload.single("profilePicture"));
// app.use(express.static("public"));
// app.use("/users/create",userRoute);

// connectDb();
// app.listen(PORT, () => {
// console.log(`Server started on port ${PORT}`);
// });

const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const path = require("path");
const userRoute = require("../routes/userRoutes");
const cors = require("cors");
const UsersRegistration = require("../model/userSchema");
const connectDb = require("../db/connection");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

app.use(upload.single("profilePicture"));

app.use("/users/create", userRoute);

connectDb();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
