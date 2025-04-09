## 📁 Project Manager App CRUD
A simple React-based project management app that allows users to add, update, delete, and refresh projects.
It interacts with a backend API to fetch project data and display it in a table format.

### ✨ Features

* Fetch and display a list of projects from the backend.
* Add a new project with a specified name.
* Update an existing project's name.
* Delete a project and show a temporary deleted message.
* Refresh the project list and project count.

### 🔌 API Endpoints

The app communicates with a backend server using the following endpoints:

* `GET /api/projects` - Fetch all projects.
* `GET /api/projects/count` - Fetch total project count.
* `POST /api/projects` - Add a new project (Requires `{ name: "Project Name" }` in the request body).
* `PUT /api/projects/:id` - Update a project (Requires `{ name: "Updated Name" }` in the request body).
* `DELETE /api/projects/:id` - Delete a project by ID.

### 💡 Usage

* Open the app in your browser.
* View the project list and total project count.
* Add a new project by entering a name and clicking **"Add Project"**.
* Update a project by clicking **"Update"**, editing the name, and saving it.
* Delete a project by clicking **"Delete"**.
* Refresh the project list anytime using the **"Refresh Projects"** button.

### ⚙️ Technologies Used

* React.js
* JavaScript (ES6+)
* Fetch API
* CSS

### 🖼️ Screenshot
![image_alt](https://github.com/bismah-nasir/crud-mini-project/blob/91b0db166433c34a7fbd2b3c9c5daa3b1c501823/crud-mini-project.PNG)

### 📦 How to Run
This project includes both frontend (React) and backend (API server).

#### Prerequisites
* Ensure Node.js and npm are installed on your machine.
  
#### 🛠️ Backend Setup
1. **Navigate to the backend directory:**

   `cd backend`
2. **Install dependencies:**

   `npm install`
3. **Start the backend server:**

   `npm start`
4. The backend should now be running (usually at `http://localhost:5000/` or your configured port).

#### ⚛️ Frontend Setup
1. Open a **new terminal** window/tab
2. **Navigate to the backend directory:**

   `cd frontend`
3. **Install dependencies:**

   `npm install`
4. **Start the frontend dev server:**

   `npm run dev`
5. Open your browser and go to the URL provided in the terminal (usually http://localhost:5173/).

### 📄 Project Documentation

You can find the detailed project documentation here:

🔗 [View Full Assignment Report](https://github.com/bismah-nasir/crud-mini-project/blob/main/B21110006023%20BISMAH%20NASIR%20CRUD%20OPERATIONS%20APP.pdf)
