const inquirer = require('inquirer');


function questions() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "options",
                message: "What would you like to do?",
                choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Deparment", "Add an Employee", "Update an Employee"]
            }
        ])
    }