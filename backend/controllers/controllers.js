// const { ConnectionCheckOutFailedEvent } = require("mongodb");
const userSchema = require("../model/userSchema");
const UsersRegistration = require("../model/userSchema");
//Get all the data from the API
const getAllUsers = async (req, res, next) => {
  let userData;
  try {
    userData = await UsersRegistration.find();
  } catch (error) {
    console.log(error);
  }
  if (!userData) {
    res.status(404).json({ message: "No User found" });
  } else {
    res.status(200).json({ userData });
  }
};
//POST all the data in the database
const addUser = async (req, res, next) => {
  console.log(req.file, 21);
  const { name, gender, email, mobile, category, technology } = req.body;
  const profilePicture = req.file ? req.file.filename : undefined;
  let userData;
  try {
    userData = new userSchema({
      name,
      gender,
      email,
      mobile,
      category,
      technology,
      profilePicture,
    });
    const addedUser = await userData.save();
    console.log(profilePicture, 38);
    console.log(addedUser);
  } catch (error) {
    console.log(error);
  }
  if (!userData) {
    res.status(500).json({ message: "Unable to add" });
  }
  res.status(201).json({ userData });
};
//Get single data from the database by the id
const getSingleUser = async (req, res, next) => {
  let userData;
  try {
    userData = await UsersRegistration.findById(req.params.id);
  } catch (error) {
    console.log(error);
  }
  if (!userData) {
    res.status(404).json({ message: "No User Found" });
  }
  res.status(200).json(userData);
};
//Update a single user data by the id 
const updateUser = async (req, res, next) => {
  let userdata;
  try {
    userdata = await UsersRegistration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    const updatedUser = await userdata.save();
    console.log(updatedUser);
  } catch (error) {
    console.log(error);
  }
  if (!userdata) {
    res.status(500).json({ message: "Unable to update user" });
  }
  res.status(201).json({ userdata });
};
//Detele a single user 
const deleteUserData = async (req, res, next) => {
  let userData;
  try {
    userData = await UsersRegistration.findByIdAndDelete(req.params.id);
    console.log(userData);
  } catch (error) {
    console.log(error);
  }
  if (!userData) {
    res.status(500).json({ message: "Unable to delete User" });
  }
  res.status(201).json({ message: "Deleted Successfully" });
};

module.exports = {
  getAllUsers,
  addUser,
  getSingleUser,
  updateUser,
  deleteUserData,
};
