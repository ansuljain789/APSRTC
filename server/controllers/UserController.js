import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const JWT_SECRET = "qwertyu"; // replace with env in production

export const signup = async (req, res) => {
    try {
        const { name, age, email, mobile, address, adhar, role, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, age, email, mobile, address, adhar, role,
            password: hashedPassword
        });

        return res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        return res.status(500).json({ message: "Error during signup", error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

        return res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        return res.status(500).json({ message: "Error during login", error: err.message });
    }
};
