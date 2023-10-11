// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
    try {
        console.log('hello');
      const { username, password } = req.body;
      const user = await User.findOne({ username: username });
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
        
      const isMatch = (password == user.password)? true : false;
      if (isMatch){
        return res.status(200).send(password);
      } 
  
    //   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    //   delete user.password;
        return res.status(200).send("Invalid credentials");
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};
export const users = async (req, res) => {
    try{
        const getUser = await User.find();
        res.status(200).send(getUser);
        
    }catch(err){
        res.status(400).send(err);
    }
};
export const register = async (req, res) => {
    try{
        const newuser = new User(req.body);
        const createUser = await newuser.save();
        res.status(200).send(createUser);
    }catch(err){
        res.status(400).send(err);
    }
};