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
                    "Add an Employee",
                    "Update an Employee"]
            }
        ])
        .then
}


sequelize.sync().then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});