import React from "react";

const EmployeeTable = ({ employeeDetailsArray, showItem, handleDeleteClick }) => {

  const employeeHeadingArray = ["Employee Name", "Employee Salary", "Employee Age"];

  return (
    <div className="employee-table details-table">
      {employeeDetailsArray.length === 0 ? (
        <p>Employee details not found</p>
      ) : (
        <table>
          <tr>
            {employeeHeadingArray.map((head, i) => (
              <th key={i}>{head}</th>
            ))}
            {showItem && (
              <th>Remove Details</th>
            )}
          </tr>
          {employeeDetailsArray.map((item, i) => (
            <tr key={i}>
              <td>{item.employee_name}</td>
              <td>{item.employee_salary}</td>
              <td>{item.employee_age}</td> 
              {showItem && (
                <td style={{cursor:"pointer"}} onClick={() => handleDeleteClick(item.id)}>
                  Delete
                </td>
              )}
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}; 

export default EmployeeTable;
