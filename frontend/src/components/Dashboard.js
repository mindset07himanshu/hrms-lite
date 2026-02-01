import axios from "axios";
import { useEffect, useState } from "react";

const API = "https://hrms-backend-a3sp.onrender.com";

export default function Dashboard() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get(`${API}/employees`).then(res => setCount(res.data.length));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Employees: {count}</p>
    </div>
  );
}
