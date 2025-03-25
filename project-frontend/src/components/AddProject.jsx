import { useState } from "react";

const AddProject = ({onAddProject}) => {
    const [newProjectName, setNewProjectName] = useState("");     // Stores new project name

    const addProject = () => {
        if (newProjectName.trim().length < 3) {
          alert("Project name must be at least 3 characters!");
          return;
        }
    
        fetch("http://localhost:5000/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newProjectName }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "success") {
              setNewProjectName("");
              onAddProject(data.project);
            } else {
              alert(data.message);
            }
          })
          .catch((error) => console.error("Error adding project:", error));
    };

    return (<div className="add-project">
    <h2>Add Project</h2>
    <input
      type="text"
      placeholder="Enter project name"
      value={newProjectName}
      onChange={(e) => setNewProjectName(e.target.value)}
      className="input-project"
    />
    <button onClick={addProject} className="btn">Add Project</button>
  </div>);
};

export default AddProject;