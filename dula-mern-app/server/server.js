const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./models/Student");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch students" });
    }
});

app.post("/students", async (req, res) => {
    try {
        const { name, course, age } = req.body;
        const newStudent = new Student({
            name: name,
            course: course,
            age: age
        });
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        console.log("Error adding student:", error)
        res.status(500).json({ message: "Failed to add student" });
    }
})

app.put("/students/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { name, course, age } = req.body;
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { name: name, course: course, age: age },
            { new: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(updatedStudent);
    } catch (error) {
        console.log("Error updating student", error);
        res.status(500).json({ message: "Failed to update student" });
    }
});

app.delete("/students/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json({ message: "Student deleted successfully" })
    } catch (error) {
        console.log("Error deleting student:", error);
        res.status(500).json({ message: "Failed to delete student" })
    }
})

app.listen(5000, () => {
    console.log("Server running on port 5000");
});






