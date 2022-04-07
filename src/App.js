import React, { useState , useEffect } from "react";
import axios from "axios";
// import { staticData } from "./StaticData";
import EmployeeTable from "./EmployeeTable";
import "./App.css";

function App() {

  const [form, setForm] = useState({
    employee_name:"",
    employee_salary:"",
    employee_age:"",
  });

  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");

  const {employee_name, employee_salary, employee_age} = form;

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form, "form data check")
    setTableData([...tableData, form]);
  };

  const handleChange = (e) => {
    setTableData(oldArray => oldArray.filter(item => item.employee_name.toLowerCase().includes(e.target.value.toLowerCase())));
    setSearch(e.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('http://dummy.restapiexample.com/api/v1/employees')
        console.log(res.data.data);
        const myData = res.data.data;
        setTableData(myData);
      } catch (error){
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleDelete = (id) => {
      console.log(id, "delete check")
      const filteredEmployee = tableData.filter(
        abc => abc.id !== id
      );
      setTableData(filteredEmployee);
  };

  return (
    <div className="app" style={{padding:"10px"}}>
      <form style={{display:"flex", flexDirection:"column", gap:"10px", marginTop:"20px"}} onSubmit={handleSubmit}>
        <h2>Enter Employee Details</h2>
        <input placeholder="Enter Name" name="employee_name" value={employee_name} onChange={handleInput}/>
        <input placeholder="Enter Salary" name="employee_salary" value={employee_salary} onChange={handleInput}/>
        <input placeholder="Enter Age" name="employee_age" value={employee_age} onChange={handleInput}/>
        <button type="submit">Submit</button>
      </form>
      <div style={{marginTop:"20px"}}>
        <h2>Search Employee</h2>
        <input type="text" value={search} placeholder="Search Employee Name" onChange={handleChange} />
      </div>
      <div style={{marginTop:"20px"}}>
        <h2>Employee Details</h2>
        <EmployeeTable employeeDetailsArray={tableData} showItem={true} handleDeleteClick={handleDelete} />
      </div>
    </div>
  );
}

export default App;

