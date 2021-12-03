DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
    id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee_role(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(70) NOT NULL,
    salary DECIMAL (10,0) NOT NULL,
    department_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    employee_role INT, 
    PRIMARY KEY(id),
    FOREIGN KEY (employee_id)
    REFERENCES employee_role(id)
    ON DELETE SET NULL
);