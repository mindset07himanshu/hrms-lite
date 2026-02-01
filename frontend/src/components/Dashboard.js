import axios from "axios";
import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000";

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
