DROP DATABASE IF EXISTS company_DB;
CREATE DATABASE company_DB;
USE company_DB;

CREATE TABLE department
(
id INTEGER AUTO_INCREMENT NOT NULL,
name VARCHAR (30) NULL,
PRIMARY KEY (id)
);


CREATE TABLE job
(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR (30) NOT NULL,
salary DECIMAL (10,2) NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee
(
    
id INTEGER NOT NULL AUTO_INCREMENT,
first_name VARCHAR (30),
last_name VARCHAR (30),
job_id INT,
PRIMARY KEY (id),
--FOREIGN KEY (job_id) REFERENCES job (id)
);



SELECT *
FROM department;
SELECT *
FROM job;
SELECT *
FROM employee;

