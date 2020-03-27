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

("Sales", 60,000, 1),
("Designer", 55,000, 2),
("Web Developer", 100000, 3),
("Finance", 80000, 4),
("Controller", 120000, 5);
    
INSERT INTO employee

(
first_name, 
last_name, 
job_id
)

VALUES

("Marnie", "Mandel", 1),
("Mike", "Myers", 2),
("Bruno", "Bokens", 3),
("Greg", "Mandel", 4),
("Stephanie", "Bokens",5);
   