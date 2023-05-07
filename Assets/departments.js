const { db } = require('../server.js');
const prompts = require('../prompts.js');
const inquirer = require('inquirer');

function viewAllDepartments(connection, callback) {
  console.log("Displaying all departments")

  const query = 'SELECT * FROM department';
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving departments");
    } else {
      console.table(results);
    }
    if (typeof callback === 'function') {
      callback();
    }
  });
}

function addDepartment(connection, callback) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'newDepartment',
        message: 'What is the name of the department?',
      },
    ])
    .then((answers) => {
      const departmentName = answers.newDepartment;
      const query = 'INSERT INTO department (name) VALUES (?)';
      connection.query(query, [departmentName], (err, results) => {
        if (err) {
          console.error("Error adding department:", err);
        } else {
          console.log("Department added successfully!", results);
          if (typeof callback === 'function') {
          callback();
          }
        }
      });
    });
}

module.exports = {
  viewAllDepartments,
  addDepartment,
};