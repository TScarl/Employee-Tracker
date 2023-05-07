const inquirer = require('inquirer');
const { db } = require('./server.js')
const departments = require('./Assets/departments.js');
const roles = require('./Assets/roles.js');
const employees = require('./Assets/employees.js');

const startApp = () =>
inquirer.prompt([
    {
        type: 'list',
        name: 'department',
        message: 'What would you like to do?',
        choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee\'s role'],
    },
    ]).then(answers => {
        const { department } = answers;
      
        switch (department) {
          case 'View all Departments':
            departments.viewAllDepartments(db, () => {
                startApp();
            });
            break;
          case 'View all Roles':
            roles.viewAllRoles(db, () => {
                startApp();
            });
            break;
          case 'View all Employees':
            employees.viewAllEmployees(db, () => {
                startApp();
            });
            break;
          case 'Add a Department':
            departments.addDepartment(db, () => {
                startApp();
              });
            break;
          case 'Add a Role':
            roles.addRole(db, () => {
                startApp();
            });
            break;
          case 'Add an Employee':
            employees.addEmployee(db, () => {
                startApp();
            });
            break;
          case 'Update an Employee\'s role':
            employees.updateEmployeeRole(db, () => {
                startApp();
            });
            break;
          default:
            console.log('Invalid choice');
        }
});

startApp();

module.exports = {
    startApp,
  };