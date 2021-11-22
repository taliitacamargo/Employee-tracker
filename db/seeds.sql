INSERT INTO department (department_name)
VALUES (1,"Sales"),
       (2,"Engineering"),
       (3,"Finance"), 
       (4,"Legal");

INSERT INTO employee_role (id, title, salary)
VALUES  (1, "Sales Lead", "$100,000"),
        (2, "Salesperson", "$80,000"),
        (3, "Lead Engineer", "$150,000"),
        (4, "Software Engineer", "$120,000"),
        (5, "Account Manager", "$160,000"),
        (6, "Accountant", "$125,000"),
        (7, "Legal Team Lead", "$250,000"),
        (8, "Lawyer", "$190,000");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe", 1, NULL),
        ("Mike", "Chan", 2,1),
        ("Ashley", "Rodriguez", 3,NULL),
        ("Kevin", "Tupik", 4,3),
        ("Kunal", "Singh", 5,NULL),
        ("Malia", "Brown", 6,5),
        ("Sarah", "Lourd", 7,NULL),
        ("Tom", "Allen", 8,7);
