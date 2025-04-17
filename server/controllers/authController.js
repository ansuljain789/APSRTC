import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
  

import { generateToken } from '../middleware/auth.js';

export const signup = async (req, res) => {
    try {
      const { name, age, email, mobile, address, aadharCardNumber, password, role } = req.body;
     console.log(req.body);
     
  
      // Assume User is a Mongoose model
      const existingUser = await User.findOne({ aadharCardNumber });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
    

      const newUser = await User.create({ name, age, email, mobile, address, aadharCardNumber, password, role });
      
      // await newUser.save();
  
      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Signup error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const login = async (req, res) => {
    try {
      const { aadharCardNumber, password } = req.body;
      console.log(password);
      
  
      const user = await User.findOne({ aadharCardNumber });
      console.log(user);
      
      if (!user) {
        return res.status(400).json({ message: "Invalid Aadhaar or password." });
      }
  
      if (user.password !== password) {
        return res.status(400).json({ message: "Invalid Aadhaar or password." });
      }
  
      // If using token
      const token = generateToken({ id: user._id, role: user.role });
      console.log(token);
      
  
      res.status(200).json({ token, role: user.role });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error during login" });
    }
  };
  

