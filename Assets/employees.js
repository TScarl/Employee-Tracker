const { db } = require('../server.js');
const prompts = require('../prompts.js');
const inquirer = require('inquirer');

function viewAllEmployees(connection, callback) {
  console.log('Displaying all employees');

  const query = 'SELECT * FROM employee';
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving employees");
    } else {
      console.table(results);
    }
    if (typeof callback === 'function') {
      callback();
    }
  });
}

// function viewEmployeesByManager(connection, manager_id, callback) {
//   const queryManagerName = `
//   SELECT CONCAT(m.first_name, ' ', m.last_name) AS manager_name
//   FROM employee AS e
//   LEFT JOIN employee AS m ON e.manager_id =m.id
//   WHERE e.id = ?
//   `;

//   connection.query(queryManagerName, [manager_id], (err, managerResults) => {
//     if (err) {
//       console.error("Error retrieving manager by name", err);
//     } else {
//       const managerName = managerResults[0].manager_name;
//       console.log(`Displaying all emplyees under ${managerName};`)

//       const queryEmployees = `
//       SELECT e.id, e.first_name, e.last_name, r.title
//       FROM employee AS e
//       INNER JOIN role AS r ON e.role_id = r.id
//       WHERE e.manager_id = ?
//       `;

//       connection.query(queryEmployees, [manager_id], (err, employeeResults) => {
//         if (err) {
//           console.error("error retrieving employees by manager", err);
//         } else {
//           console.table(employeeResults)
//         }
//       })

//     }
//     if (typeof callback === 'function') {
//       callback();
//     }
//   });
// }

function addEmployee(connection, callback) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "What is the employee's first name?",
      },
      {
        type: 'input',
        name: 'last_name',
        message: "What is the employee's last name?",
      },
      {
        type: 'input',
        name: 'role_id',
        message: 'What is the role_id the new employee works in?',
      },
      {
        type: 'input',
        name: 'manager_id',
        message: 'What is the manager_id for the manager in charge of the new employee?',
      },
    ])
    .then((answers) => {
      const { first_name, last_name, role_id, manager_id } = answers;
      const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";

      connection.query(query, [first_name, last_name, role_id, manager_id], (err, results) => {
        if (err) {
          console.error("error adding new employee", err.message);
        } else {
          console.log("New employee successfully added!", results);
          if (typeof callback === 'function') {
            callback();
          }
        }
      });
    });
}

function updateEmployeeRole(connection) {
  function callback() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'employee_id',
          message: "Which employee's role do you want to update",
        },
        {
          type: 'input',
          name: 'new_role',
          message: "Enter the new role for the employee:",
        },
      ])
    .then((answers) => {
      const employeeId = answers.employee_id;
      const newRole = answers.new_role;
      const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
      connection.query(query, [newRole, employeeId], (err, results) => {
        if (err) {
          console.error("Error updating employee role:", err);
        } else {
          console.log("employee role updated successfully!", results);
          if (typeof callback === 'function') {
            callback();
          }
        }
      });
    });
  }
  viewAllEmployees(connection, callback)
}

module.exports = {
  viewAllEmployees,
  // viewEmployeesByManager,
  addEmployee,
  updateEmployeeRole,
};