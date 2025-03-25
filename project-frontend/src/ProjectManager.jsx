import { useState, useEffect } from "react";
import "./App.css";
import AddProject from "./components/AddProject";
import ProjectRow from "./components/ProjectRow";

function ProjectManager() {
  const [projects, setProjects] = useState([]);     // Stores project list (intially empty)
  const [loading, setLoading] = useState(true);     // Tracks loading state
  const [projectCount, setProjectCount] = useState(0);     // Project Count
  
  const [deletedProject, setDeletedProject] = useState(null);     // Stores deleted

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

  return (
    <div className="main-container">
      <h1 className="main-heading">Project List</h1>
      <h3 className="project-count">Total Projects: {projectCount}</h3>

      <div className="btn-section">
        <button onClick={handleRefresh} className="btn">Refresh Projects</button>

        <AddProject
          onAddProject={(projectData) => {
            setProjects([...projects, projectData]);
            setProjectCount(projectCount + 1);
          }}
        />

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
                <ProjectRow
                  project={project}
                  onUpdateProject={(id, projectName) => {
                    setProjects(
                      projects.map((project) =>
                        project.id === id ? { ...project, name: projectName } : project
                      )
                    );
                  }}
                  onDeleteProject={(data, id) => {
                    setDeletedProject(data.deletedProject);
                    setProjects(projects.filter((project) => project.id !== id));
                    setProjectCount(projectCount - 1);
    
                    setTimeout(() => {
                      setDeletedProject(null);
                    }, 5000);
                  }}
                />
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
