const express=require('express');
const router=express.Router();
const {getAllUsers,addUser,getSingleUser,updateUser,deleteUserData} = require("../controllers/controllers");
router.route("/").get(getAllUsers).post(addUser);
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUserData);
module.exports=router;


