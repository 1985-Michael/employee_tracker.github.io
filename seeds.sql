USE company_DD;

INSERT INTO department (name)

VALUES
("Sales"),
("Designer"),
("Web Developer"),
("Finance"),
("Controller");

INSERT INTO job

(
title, 
salary, 
department_id
)

VALUES

("Sales", 60,000, 2),
("Designer", 55,000, 1),
("Web Developer", 100000, 2),
("Finance", 80000, 2),
("Controller", 120000, 1);
    
INSERT INTO employee

(
first_name, 
last_name, 
job_id
)

VALUES

("Marnie", "Mandel", 2),
("Mike", "Myers", 1),
("Bruno", "Bokens", 4),
("Greg", "Mandel", 5),
("Stephanie", "Bokens",6);
   