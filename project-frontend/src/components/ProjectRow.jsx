import { useState } from "react";

const ProjectRow = ({project, onUpdateProject, onDeleteProject}) => {
    const [editProjectId, setEditProjectId] = useState(null);     // Stores updated project id
    const [editProjectName, setEditProjectName] = useState("");     // Stores updated project name

    const updateProject = (id) => {
        if (editProjectName.trim().length < 3) {
          alert("Project name must be at least 3 characters!");
          return;
        }
    
        fetch(`http://localhost:5000/api/projects/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: editProjectName }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "success") {
              setEditProjectId(null);
              setEditProjectName("");

              onUpdateProject(id, editProjectName);
            } else {
              alert(data.message);
            }
          })
          .catch((error) => console.error("Error updating project:", error));
      };

      const deleteProject = (id) => {
        fetch(`http://localhost:5000/api/projects/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "success") {
                onDeleteProject(data, id);
            } else {
              alert("Error deleting project");
            }
          })
          .catch((error) => console.error("Error deleting project:", error));
      };

    return (
        <tr key={project.id}>
                  <td className="table-pro-id">{project.id}</td>
                  <td className="table-pro-name">
                    {editProjectId === project.id ? (
                      <input
                        type="text"
                        value={editProjectName}
                        onChange={(e) => setEditProjectName(e.target.value)}
                        className="input-project"
                      />
                    ) : (
                      project.name
                    )}
                  </td>
                  <td className="table-pro-actions">
                    {editProjectId === project.id ? (
                      <div className="btn-section-2">
                        <button onClick={() => updateProject(project.id)} className="btn">Save</button>
                        <button onClick={() => setEditProjectId(null)} className="btn">Cancel</button>
                      </div>
                    ) : (
                      <div className="btn-section-2">
                        <button onClick={() => { setEditProjectId(project.id); setEditProjectName(project.name); }} className="btn">
                          Update
                        </button>
                        <button onClick={() => deleteProject(project.id)} className="btn">Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
    );
};

export default ProjectRow;