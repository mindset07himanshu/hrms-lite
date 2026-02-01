import axios from "axios";
import { useEffect, useState } from "react";

const API = "https://hrms-backend-a3sp.onrender.com";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: ""
  });

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    axios.get(`${API}/employees`).then(res => setEmployees(res.data));
  };

  const add = () => {
    axios.post(`${API}/employees`, form)
      .then(() => {
        load();
        alert("Employee Added");
      })
      .catch(e => alert(e.response.data.detail));
  };

  const del = id => {
    axios.delete(`${API}/employees/${id}`).then(() => load());
  };

  return (
    <div>
      <h2>Employees</h2>

      <input placeholder="Employee ID" onChange={e => setForm({...form, employee_id: e.target.value})}/>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})}/>
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})}/>
      <input placeholder="Department" onChange={e => setForm({...form, department: e.target.value})}/>

      <button onClick={add}>Add Employee</button>

      {employees.map(e => (
        <div key={e.id}>
          {e.name} ({e.department})
          <button onClick={() => del(e.employee_id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
