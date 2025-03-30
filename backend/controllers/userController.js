const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 2;
const SECRET_KEY = "userSecret";

async function register(req, res) {
    const { username, password } = req.body;

    try {
        if (typeof username !== "string") {
            return res.status(400).json({ message: "Username must be a string" });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = await User.create({ ...req.body, password: hashedPassword });

        const token = jwt.sign({ id: newUser._id, username: newUser.username }, SECRET_KEY);

        res.status(201).json({
            message: "User was registered successfully",
            token,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation error",
                errors: Object.values(error.errors).map((err) => err.message),
            });
        }

        console.error("Registration error:", error);
        res.status(404).json({ message: "Registration failed" });
    }
}

async function login(req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY);

        res.status(200).json({
            message: "logged in successfully",
            token,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(400).json({ error: "invalid credentials" });
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(400).json({ message: "Could not retrieve users" });
    }
}

async function deleteUser(req, res) {
    const { email } = req.body;

    try {
        const result = await User.deleteOne({ username: email });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(400).json({ message: "Deletion failed" });
    }
}

async function editUser(req, res) {
    const { email, editValue } = req.body;

    try {
        const existingUser = await User.findOne({ username: editValue });

        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const updatedUser = await User.findOneAndUpdate(
            { username: email },
            { $set: { username: editValue } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(400).json({ message: "Update failed" });
    }
}

module.exports = { register, login, getAllUsers, deleteUser, editUser };
