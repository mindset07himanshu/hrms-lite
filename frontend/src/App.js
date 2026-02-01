import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Employees from "./components/Employees";
import Attendance from "./components/Attendance";
import "./App.css";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="container">
      <aside>
        <h2>HRMS Lite</h2>
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("employees")}>Employees</button>
        <button onClick={() => setPage("attendance")}>Attendance</button>
      </aside>

      <main>
        {page === "dashboard" && <Dashboard />}
        {page === "employees" && <Employees />}
        {page === "attendance" && <Attendance />}
      </main>
    </div>
  );
}

export default App;
