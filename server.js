const express = require('express');
const sequelize = require('./config/connection');
const mysql = require('mysql2');
const inquirer = require('inquirer');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

function viewAllDeparments() {
    const allDept = `SELECT id, department_name FROM deparment`;
    sequelize.query(allDept, (err, res) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'sucess',
            data: res
        });
        questions();
    });
};

function viewAllRoles() {
    const allRoles = `SELECT id, title FROM role`;
    sequelize.query(allRoles, (err, res) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'sucess',
            data: res
        });
        questions();
    });
};

function viewAllEmployees() {
    const employeesList = `SELECT employee.id, first_name, last_name, role.title,
    role.salary, department.deparment_name, manager_id 
    from employeeLEFT JOIN role ON employee.role_id
     = role.id LEFT JOIN department ON department.id = role.department_id;`;
    sequelize.query(employeesList, (err, res) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'sucess',
            data: res
        });
        questions();
    });
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
            sequelize.query(newDept, {
                department_name: response.department_name
            }, (err, res) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.json({
                    message: 'sucess',
                    data: res
                });
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
                name: "deparment_id",
                message: "Please input the deparment ID for the new role."
            }
        ])
        .then((response) => {
            const newRole = `INSERT INTO role SET ?`;
            sequelize.query(newRole, {
                department_id: response.department_id,
                title: response.title,
                salary: response.salary
            }, (err, res) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.json({
                    message: 'sucess',
                    data: res
                });
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
            sequelize.query(newEmployee, {
                first_name: response.first_name,
                last_name: response.last_name,
                role_id: response.role_id,
                manager_id: response.manager_id
            }, (err, res) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.json({
                    message: 'sucess',
                    data: res
                });
                questions();
            });
        });
}

function updateEmployee() {
    const updateRole = `SELECT * FROM employee`;
    sequelize.query(updateRole, (err,res) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        inquirer
        .prompt ([
            {
               type: "list",
               name:  "first_name",
               choices: []
            },
        ])
    })

}





sequelize.sync().then(() => {
    app.listen(PORT, () => console.log('Now listening'));
    
});