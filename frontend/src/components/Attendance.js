import axios from "axios";
import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000";

export default function Attendance() {
  const [emps, setEmps] = useState([]);
  const [emp, setEmp] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  useEffect(() => {
    axios.get(`${API}/employees`).then(res => setEmps(res.data));
  }, []);

  const mark = () => {
    axios.post(`${API}/attendance`, {
      employee_id: emp,
      date: date,
      status: status
    }).then(() => alert("Attendance Marked"));
  };

  return (
    <div>
      <h2>Attendance</h2>

      <select onChange={e => setEmp(e.target.value)}>
        <option>Select Employee</option>
        {emps.map(e => (
          <option key={e.id} value={e.employee_id}>{e.name}</option>
        ))}
      </select>

      <input type="date" onChange={e => setDate(e.target.value)} />

      <select onChange={e => setStatus(e.target.value)}>
        <option>Present</option>
        <option>Absent</option>
      </select>

      <button onClick={mark}>Mark Attendance</button>
    </div>
  );
}
