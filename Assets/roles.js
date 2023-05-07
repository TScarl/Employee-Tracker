const { db } = require('../server.js');
const prompts = require('../prompts.js');
const inquirer = require('inquirer');

function viewAllRoles(connection, callback) {
    console.log('Displaying all roles');

    const query = 'SELECT * FROM role';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error displaying roles');
      } else {
        console.table(results);
      }
      if (typeof callback === 'function') {
        callback();
      }
    });
  }

  function addRole(connection, callback) {
   inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the name of the role?',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?',
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'Which department_id does the new role belong to?',
      },
    ])
    .then((answers) => {
      const {title, salary, department_id} = answers;
      const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';

      connection.query(query, [title, salary, department_id], (err, results) => {
        if (err) {
          console.error("Error creating role:", err);
        } else {
          console.log("Role created successfully!", results);
          if (typeof callback === 'function') {
            callback();
          }
        }
      });
  });
}

  module.exports = { viewAllRoles, addRole };