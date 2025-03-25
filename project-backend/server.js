import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import projects from "./project-data.json" assert { type: "json" };
import fs from "fs";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware: CORS and JSON Parsing
app.use(cors());
app.use(express.json());

const writeDataToFile = () => {
    // Convert data to JSON string
    const jsonData = JSON.stringify(projects, null, 4); // Pretty format

    // Write JSON data to a file
    fs.writeFile("./project-data.json", jsonData, (err) => {
        if (err) {
            console.error("Error writing to file:", err);
        } else {
            console.log("Data successfully written to projects.json");
        }
    });
};


// Simple API Route

// GET - Fetch all projects
app.get("/api/projects", (req, res) => {
    res.json({ status: "success" , projects});
});

// GET - Fetch count (number of projects)
app.get("/api/projects/count", (req, res) => {
    res.json({ status: "success" , count: projects.length});
});


// POST - Add a new project
app.post("/api/projects", (req, res) => {
    const { name } = req.body;
    if (!name || name.length < 3) {
        return res.status(400).json({ status: "error", message: "Project name must be at least 3 characters" });
    }

    // Prevent duplicate names (case-insensitive check)
    if (projects.some(proj => proj.name.toLowerCase() === name.toLowerCase())) {
        return res.status(400).json({ status: "error", message: "Project name already exists" });
    }

    // Assign a unique ID
    const newProjectId = projects[projects.length-1].id + 1;
    const newProject = { id: newProjectId, name };
    projects.push(newProject);
    writeDataToFile();

    res.status(201).json({ status: "success", project: newProject });
});

// PUT - Update a project
app.put("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    const{ name } = req.body;

    if (!name || name.length < 3) {
        return res.status(400).json({ status: "error", message: "Project name must be atleast 3 characters" });
    }

    const project = projects.find(p => p.id == id);
    
    if (!project) {
        return res.status(404).json({ status: "error", message: "Project not found"});
    }

    project.name = name;
    writeDataToFile();
    res.json({ status: "success", project });
});

// DELETE - Remove a project and return details
app.delete("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    const projectIndex = projects.findIndex(p => p.id == id);

    if (projectIndex === -1){
        return res.status(404).json({ status: "error", message: "Project not found" });
    }

    const deletedProject = projects.splice(projectIndex, 1)[0];
    writeDataToFile();
    res.json({ status: "success", deletedProject });
});


// Start Server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));