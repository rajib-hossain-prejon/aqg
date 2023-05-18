import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc Auth user/set token
//route Post /api/users/auth
//@access public
const authUser = asyncHandler(async(req, res) => {

 const {email, password} = req.body;

 const user = await User.findOne({email});

 if(user && ( await user.matchPassword(password) )){
  generateToken(res,user._id);

  res.status(201).json({
   _id: user._id,
    name: user.name, 
    email: user.email
  })
  }else{
   res.status(401);
   throw new Error('Invalid Email or Password')
  }
 


 
});

//@desc Register a New User
//Route Post /post/user
//@access Public
const registerUser = asyncHandler(async(req,res)=>{
 const {name, email, password} = req.body;


 
 const userExist = await User.findOne({email });

 if(userExist){
  res.status(400)
  throw new Error('User Exist');
 }

 const user = await User.create({name, email, password})

 if(user){
 generateToken(res, user._id)
  res.status(201).json({
   _id: user._id,
   name: user.name,
   email: user.email
  }
  
  )
 }else{
  res.status(400);
  throw new Error('Invalid User Data');
 }



 
});

//@desc Logout User
//route Post /api/users/logout
//@access public
const logoutUser = asyncHandler(async(req, res) =>{

 res.cookie('jwt', "", {
  httpOnly: true,
  expires: new Date(0)
 })

 res.status(200).json({message: 'User Logged Out'});
});

//@desc Get User Profile
//route Get /api/user/profile
//@access private
const getUserProfile =asyncHandler(async (req, res ) => {
 res.status(200).json({message: 'Get user Profile'});
})

//@desc Update user profile
//route Put /api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req,res)=>{
 res.status(200).json({message: 'Update User Profile'});
})


export {
 authUser,
 registerUser,
 getUserProfile,
 updateUserProfile,
 logoutUser
};

