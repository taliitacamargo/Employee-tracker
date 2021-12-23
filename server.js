const express = require('express');
const util = require('util');
// const sequelize = require('./config/connection');
const mysql = require('mysql2');
const inquirer = require('inquirer');
require("console.table");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'employee_db'
    },

    console.log(`connected to employee_db database.`)
);

db.query = util.promisify(db.query);

init();

function init() {
    console.log(`starting employee_tracker`);
    questions();
}

function questions() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "options",
                message: "What would you like to do?",
                choices: ["View All Departments",
                    "View All Roles",
                    "View All Employees",
                    "Add a Deparment",
                    "Add a Role",
                    "Add an Employee",
                    "Update an Employee"]
            }
        ])
        .then((response) => {
            switch (response.options) {
                case "View All Departments":
                    viewAllDeparments();
                    break;

                case "View All Roles":
                    viewAllRoles();
                    break;

                case "View All Employees":
                    viewAllEmployees();
                    break;

                case "Add a Deparment":
                    addDepartment();
                    break;

                case "Add a Role":
                    addRole();
                    break;

                case "Add an Employee":
                    addEmployee();
                    break;

                case "Update an Employee":
                    updateEmployee();
                    break;

            }
        })
}

async function viewAllDeparments() {
    try {
        const allDept = `SELECT department.id AS id, department_name AS department FROM department;`;
        const depts = await db.query(allDept)
        await console.table(depts);

        questions();
    }
    catch (err) {
        console.log(err)
        return;

    }
}


function viewAllRoles() {
    const allRoles = `SELECT id, title FROM employee_role`;
    db.query(allRoles, (err, res) => {
        if (err) {
            return;
        }
        console.log("\n");
        console.table(res);
        questions();
    });
};

function viewAllEmployees() {
    const employeesList = `SELECT employee.id, employee.first_name, employee.last_name, role.title,
    role.salary, department.department_name AS department, manager_id 
    from employee LEFT JOIN employee_role role ON employee.role_id
     = role.id LEFT JOIN department ON department.id = role.department_id;`;
    db.query(employeesList, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("\n")
        console.table(res);
    })
    questions();
};

function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "department_name",
                message: "Please insert the new department title"
            }
        ])
        .then((response) => {
            const newDept = `INSERT INTO department SET? `;
            db.query(newDept, {
                department_name: response.department_name
            }, (err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.table(res)
                questions();
            });
        });
};

function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "role",
                message: "Please inseert new role title."
            },
            {
                type: "input",
                name: "salary",
                mesage: "Please input pay for new role."
            },
            {
                type: "input",
                name: "department_id",
                message: "Please input the department ID for the new role."
            }
        ])
        .then((response) => {
            const newRole = `INSERT INTO employee_role SET ?`;
            db.query(newRole, {
                department_id: response.department_id,
                title: response.role,
                salary: response.salary
            }, (err, res) => {
                if (res) {
                    viewAllRoles();

                }
                if (err) {
                    console.log(err);
                    return;
                }
                questions();
            });
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "Please input new employee's first name."
            },
            {
                type: "input",
                name: "last_name",
                message: "Please input new employee's last name."
            },
            {
                type: "input",
                name: "role_id",
                message: "Please input new employee's role ID"
            },
            {
                type: "input",
                name: "manager_id",
                message: "Please input the new employee's manager ID."
            }
        ])
        .then((response) => {
            const newEmployee = `INSERT INTO employee SET ?`;
            db.query(newEmployee, {
                first_name: response.first_name,
                last_name: response.last_name,
                role_id: response.role_id,
                manager_id: response.manager_id
            }, (err, res) => {
                if (res) {
                    viewAllEmployees();
                }
                if (err) {
                    console.log(err);
                    return;
                }

            });
            questions();
        });
};


function updateEmployee() {
    const updateRole = `SELECT * FROM employee`;
    db.query(updateRole, (err, res) => {
        console.log(res);

        const employees = res.map(({id,first_name,last_name}) => {
            return {name: `${first_name} ${last_name}`, value: id}
        });
        if (err) {
          console.log(err)
            return;
        }
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "first_name",
                    choices: employees
                },
            ])
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update 
// and their new role and this information is updated in the database 

            .then((response) => {
                const updateEmployeeRole = `SELECT * FROM employee_role`;
                db.query(updateEmployeeRole, (err,res) => {
                    return {
                        name: `${}`
                    }
                })
            });
    })

}
