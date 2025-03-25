import { useState, useEffect } from "react";
import "./App.css";

function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectCount, setProjectCount] = useState(0);
  const [newProjectName, setNewProjectName] = useState("");
  const [editProjectId, setEditProjectId] = useState(null);
  const [editProjectName, setEditProjectName] = useState("");
  const [deletedProject, setDeletedProject] = useState(null);

  const fetchProjects = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/projects")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setLoading(false);
      });
  };

  const fetchProjectCount = () => {
    fetch("http://localhost:5000/api/projects/count")
      .then((response) => response.json())
      .then((data) => {
        setProjectCount(data.count);
      })
      .catch((error) => console.error("Error fetching project count:", error));
  };

  useEffect(() => {
    fetchProjects();
    fetchProjectCount();
  }, []);

  const handleRefresh = () => {
    fetchProjects();
    fetchProjectCount();
  };

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
          setProjects([...projects, data.project]);
          setNewProjectName("");
          setProjectCount(projectCount + 1);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error("Error adding project:", error));
  };

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
          setProjects(
            projects.map((project) =>
              project.id === id ? { ...project, name: editProjectName } : project
            )
          );

          setEditProjectId(null);
          setEditProjectName("");
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
          setDeletedProject(data.deletedProject);
          setProjects(projects.filter((project) => project.id !== id));
          setProjectCount(projectCount - 1);

          setTimeout(() => {
            setDeletedProject(null);
          }, 5000);
        } else {
          alert("Error deleting project");
        }
      })
      .catch((error) => console.error("Error deleting project:", error));
  };

  return (
    <div className="main-container">
      <h1 className="main-heading">Project List</h1>
      <h3 className="project-count">Total Projects: {projectCount}</h3>

      <div className="btn-section">
        <button onClick={handleRefresh} className="btn">Refresh Projects</button>

        <div className="add-project">
          <h2>Add Project</h2>
          <input
            type="text"
            placeholder="Enter project name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            className="input-project"
          />
          <button onClick={addProject} className="btn">Add Project</button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1">
          <thead className="table-head">
            <tr>
              <th className="table-pro-id">ID</th>
              <th className="table-pro-name">Project Name</th>
              <th className="table-pro-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((project) => (
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
              ))
            ) : (
              <tr>
                <td colSpan="3" className="table-pro-actions">No projects available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {deletedProject && (
        <div className="deleted-message">
          <p>❌ Deleted Project: <strong>{deletedProject.name}</strong> (ID: {deletedProject.id})</p>
        </div>
      )}
    </div>
  );
}

export default ProjectManager;
