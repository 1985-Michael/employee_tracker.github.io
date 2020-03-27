const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table")

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Michael27$",
    database: "company_DB",
})

connection.connect(function(err) {
    runApplication();

})

function runApplication() {
    inquirer.prompt({
        name: "choices",
        type: "list",
        message: "Welcome to Employee Tracker, an App Designed to manage and track your Employees. What would you like to do?",
        choices: [
            "View Employees",
            "View Departments",
            "View Job",
            "Add New Employee",
            "Add New Department",
            "Add New Job",
            "Remove Employee",
            "Update Employee",
            "QUIT"
        ]
    })

    .then(answer => {
        switch (answer.action) {

            case "View Employees":
                viewEmployees();
                break;

            case "View all departments":
                viewDepartments();
                break;

            case "View all Jobs":
                viewJobs();
                break;

            case "Add New Employee":
                addEmployee();
                break;

            case "Add New Department":
                addDepartment();
                break;

            case "Add New Job":
                addJob();
                break;

            case "Remove Employee":
                removeEmployee();
                break;

            case "Update Employee":
                updateEmployee();
                break;

            case "QUIT":
                quitApp();
                break;

            default:
                break;
        }
    })
}

function viewEmployees() {
    connection.query("SELECT employee.id,employee.first_name AS First,employee.last_name AS Last,role.title,role.salary,department.name AS Department FROM employee_db.employee LEFT JOIN employee_db.role ON employee.role_id = role.id LEFT JOIN employee_db.department ON role.department_id = department.id ", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("First Name: " + res[i].first_name + " || Last name: " + res[i].last_name + " || Id: " + res[i].id);
        }

        console.table(results);
        if (err) throw err;
        console.log(res.length + " employees found!");
        consoleTable("All Employees:", res);
        runApplication()

    });

}

function viewDepartments() {
    connection.query("SELECT employee.id,employee.first_name AS First, employee.last_name AS Name,department.name AS Department FROM employee_db.employee LEFT JOIN employee_db.role ON employee.role_id = role.id LEFT JOIN employee_db.department ON role.department_id = department.id", function(err, res) {

        console.table(results);
        if (err) throw err;
        consoleTable("All Departments:", res);
        runApplication()
    });

}

function viewJobs() {
    var query = "SELECT * FROM job";
    connection.query(query, (err, res) => {
        console.table(results);
        if (err) throw err;
        consoleTable('All Jobs:', res);
        runApplication()
    });

}

function addEmployee() {
    connection.query("SELECT * FROM job", (err, results) => {
        if (err) throw err;
        inquirer.prompt(

            [{

                    name: "first_name",
                    type: "input",
                    question: "What is the employee's first name?"

                },

                {

                    name: "last_name",
                    type: "input",
                    question: "What is the employee's last name?"

                },


                {
                    name: "choice",
                    type: "rawlist",
                    choices: function() {
                        var resultsArray = [];
                        for (var i = 0; i < results.length; i++) {
                            resultsArray.push(results[i].title);
                        }

                        return resultsArray;
                    },

                    question: "What is the employee's job?"

                },

            ]).then(function(res) {

            for (var i = 0; i < results.length; i++) {
                if (results[i].title === res.choice) {
                    res.role_id = results[i].id;
                }
            }
            var query = "Add newly created Employee?"
            const VALUES = {
                first_name: res.first_name,
                last_name: res.last_name,
                role_id: res.role_id

            }

            connection.query(query, VALUES, err => {
                if (err) throw err;
                console.log("Succesfully Added A New Employee!");
                runApplication()
            })
        })
    })
}


function addDepartment() {
    inquirer.prompt({
        name: "newDepartment",
        type: "input",
        question: "Which Department would you like to add?"
    })

    .then(result => {
        var query = "SELECT * FROM department";
        connection.query(query, [{ name: result.newDepartment }], err => {
            if (err) throw err;
            consoleTable("New Department Created!");
            runApplication()
        });
    })
}

function addJob() {
    inquirer.prompt({
            name: "title",
            type: "input",
            message: ["Job Name"]
        })
        .then(answer => {
            let title = answer.title;

            inquirer.prompt({
                name: "salary",
                type: "input",
                message: ["How much money does this job make?"]
            })

            .then(answer => {
                let salary = answer.salary;
                inquirer.prompt({
                    name: "department_id",
                    type: "input",
                    message: ["Enter new Job ID?"]

                })

                .then(answer => {
                    let department_id = answer.department_id;
                    console.log(`title: ${title} salary: ${salary} department id: ${department_id}`);
                    var query = "INSERT INTO job (title, salary, department_id) VALUES ?";
                    connection.query(query, [
                            [
                                [title, salary, department_id]
                            ]
                        ],

                        function(err, res) {
                            if (err) {
                                console.log(err);
                            }

                            runApplication();

                        });
                })
            })
        })
}

function removeEmployee() {
    inquirer.prompt({
            name: "RemoveEmployee",
            type: "input",
            message: "Enter Employee's ID",

        })
        .then(answer => {
            console.log(answer);
            let query = "This will Terminate and Delete Employee?";
            var defaultId = Number(answer.employeeRemove);
            console.log(defaultId);
            connection.query(query, { id: defualtId }, function(err, res) {
                runApplication();

            });
        });
}

function updateEmployee() {
    const jobQuery = "SELECT * FROM job;";
    const departmentQuery = "SELECT * FROM department;";
    connection.query(jobQuery, (err, job) => {
        connection.query(departmentQuery, function(err, departments) {
            if (err) throw err;
            inquirer.prompt([{
                    name: "newJob",
                    type: "rawlist",
                    choices: function() {
                        var arrayChoices = [];
                        for (var i = 0; i < job.length; i++) {
                            arrayChoices.push(job[i].title);
                        }

                        return arrayChoices;

                    },

                    message: "What job needs to be updated?"
                },
                {
                    name: "updateSalary",
                    type: "input",
                    message: "How much does this job make?"

                },
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function() {
                        var arrayChoices = [];
                        for (var i = 0; i < departments.length; i++) {
                            rrayChoices.push(departments[i].name);

                        }

                        return arrayChoices;

                    },

                    message: "Change Department?"

                },

            ])

            .then(result => {
                for (var i = 0; i < departments.length; i++) {
                    if (departments[i].name === result.choice) {
                        result.department_id = departments[i].id;

                    }
                }

                var query = "UPDATE job SET title=?,salary= ? WHERE department_id= ?"
                const VALUES = [
                    { title: result.newJob },
                    { salary: result.updateSalary },
                    { department_id: result.department_id }
                ]

                connection.query(query, VALUES, err => {
                    if (err) throw err;
                    console.table("Successfuly Updated Job!");
                    runApplication()
                });

            })
        })
    })
}

function quitApp() {
    connection.end();
    process.exit();

}