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

connection.connect(err => {
    runApplication();

})

function runApplication() {
    inquirer.prompt([{
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
    }])

    .then(answer => {
        switch (answer.action) {

            case "View All Employees":
                viewEmployees();
                break;

            case "View All Departments":
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
    inquirer.prompt([{
        name: " ViewEmployees",
        type: "input",
        message: "Search Employee by name"

    }])

    .then(answer => {
        var query = "SELECT employee.id, SELECT first_name, last_name, id FROM employee WHERE ?";
        connection.query(query, { last_name: answer.viewEmployees }, (err, res) => {
            for (var i = 0; i < res.length; i++) {
                console.log("First Name: " + res[i].first_name + " || Last name: " + res[i].last_name + " || Id: " + res[i].id);
            }

            runApplication();

        });
    });
}

function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
        if (err) throw err;
        consoleTable("All Departments:", res);
        runApplication();
    })
}

function viewJobs() {
    var query = "SELECT * FROM job";
    connection.query(query, (err, res) => {
        if (err) throw err;
        consoleTable("All jobs:", res);
        runApplication();
    })
}

function addEmployee() {
    inquirer.prompt([{
        name: "addEmployee",
        type: "input",
        question: "Add New Employee?"

    }])

    .then(answer => {
        console.log(answer)
        const addMember = answer.employeeAdd;
        const firstNameLastName = addMember.split(" ");
        console.log(firstNameLastName);
        var query = "INSERT INTO employee (first_name, last_name) VALUES ?";
        connection.query(query, [
                [firstNameLastName]

            ],

            (err, res) => {
                consoleTable("All employee:", res);
                runApplication();

            });
    })
}

function addDepartment() {
    inquirer.prompt([{
        name: "addDepartment",
        type: "input",
        question: "Add New Department?"

    }])

    .then(answer => {
        connection.query(
            "INSERT INTO department SET ?", {
                name: answer.addDepartment
            }
        );
        var query = "SELECT * FROM department";
        connection.query(query, (err, res) => {
            if (err) throw err;
            consoleTable("All Departments:", res);
            runApplication();
        })
    })
}

function removeEmployee() {
    inquirer.prompt([{
        name: "removeEmployee",
        type: "input",
        question: "Remove an Employee?",

    }])

    .then(answer => {
        console.log(answer);
        var query = "DELETE FROM employee WHERE ?";
        var newEmployee = Number(answer.removeEmployee);
        console.log(newEmployee);
        connection.query(query, { id: newEmployee }, (err, res) => {
            runAplication();

        });
    });
}

function updateEmployee() {
    console.log("Update Employee");
    inquirer.prompt({
            name: "UpdateEmployee",
            type: "input",
            question: "Update Employee?",
        })
        .then(answer => {
            const id = answer.UpdateEmployee;

            inquirer.prompt([{
                name: "jobId",
                type: "input",
                question: "Enter Job id",

            }])

            .then(answer => {
                const jobId = answer.jobId;

                var query = "UPDATE employee SET job_id=? WHERE id=?";
                connection.query(query, [jobId, id], (err, res) => {
                    if (err) {
                        console.log(err);
                    }
                    runApplication();
                });
            });
        });
}


function quitApp() {
    connection.end();
    process.exit();

}