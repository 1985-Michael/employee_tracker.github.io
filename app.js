const inquirer = require("inquirer");
let mysql = require("mysql");
let consoletable = require("console.table");


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

let runApplication = () => {

    inquirer.prompt([{
        type: "list",
        name: "data",
        question: "Welcome, What would you like to do?",
        choices: [
            "view employees",
            "view jobs",
            "view departments",
            "add employee",
            "add department",
            "add job",
            "update employee",
            "remove employee",
        ]

    }])

    .then(answer => {

        console.log(answer);

        switch (answer.data) {
            case "view employees":
                viewemployees();
                break;

            case "view jobs":
                viewjobs();
                break;

            case "view departments":
                viewdepartments();
                break;

            case "add employee":
                addemployee();
                break;

            case "update employee":
                updateemployee();
                break;

            case "add department":
                adddepartment();
                break;

            case "add job":
                addjob();
                break;

        }
    });
};

runApplication();

function viewdepartments() {
    let query;
    query = "SELECT * FROM department";
    connection.query("SELECT * FROM department, department id", (err, answer) => {
        console.log("department Retrieved from Database");
        console.table(answer);

        runApplication();


    });
}

function viewjobs() {
    let query;
    query = "SELECT * FROM job";
    connection.query("SELECT * FROM job, employee", (err, answer) => {
        console.log("job Retrieved from Database");
        console.table(answer);

        runApplication();

    });

}

function viewemployees() {
    let query = "SELECT * FROM employee";
    connection.query(query, function(err, answer) {
        console.log("employee Retrieved from Database");
        console.table(answer);

        runApplication();

    });


}


function addemployee() {
    inquirer.prompt([{
            name: "first_name",
            type: "input",
            message: "first name of the new employee"
        },
        {
            name: "last_name",
            type: "input",
            message: "last name of the employee"
        },
        {
            name: "job_id",
            type: "number",
            message: "Enter the job this employee will have"
        },
        {

        }
    ])

    .then(answer => {
        var query = "INSERT INTO employee (first_name, last_name, job_id) VALUES(?,?,?)";
        connection.query(query, [answer.first_name, answer.last_name, answer.job_id], (err, res) => {
            if (err) throw err;
            connection.query("SELECT * FROM employee WHERE last_name=?", answer.last_name, (err, res) => {
                if (err) throw err;
                console.table(answer);

                runApplication();

            });
        });
    })
}

function updateemployee() {
    inquirer.prompt([{
            type: "input",
            message: "update employee?",
            name: "update"
        },

        {
            type: "input",
            message: "What will be the new current job?",
            name: "newjob"
        }
    ])

    .then(answer => {
        var query = "UPDATE employee SET job_id = ? WHERE id = ?;";
        connection.query(query, [answer.newRole, answer.employee], (err, res) => {
            if (err) throw err;
            console.log("Job has been updated");
            console.table(answer);

            runApplication();

        });
    });
}


function addjob() {
    inquirer.prompt([{
            type: "input",
            message: "What's the name of the role?",
            name: "jobName"
        },
        {
            type: "input",
            message: "What is the salary for this role?",
            name: "salary"
        },
        {
            type: "input",
            message: "What is the department id number?",
            name: "departmentID"
        }
    ])

    .then(answer => {
        var query = "INSERT INTO job (title,salary,department_id) VALUES(?,?,?)";
        connection.query(query, [answer.title, answer.salary, answer.department_id], (err, res) => {
            if (err) throw err;
            connection.query("SELECT * FROM job WHERE title=?", answer.title, (err, res) => {
                if (err) throw err;
                console.table(answer);

                runApplication();

            });
        });
    });
}

function adddepartment() {
    inquirer.prompt({
        type: "input",
        message: "enter new department name",
        name: "departmentname"

    })

    .then(answer => {
        connection.query(
                "INSERT INTO department SET ?", {
                    name: answer.departmentname
                },

                function(err, answer) {
                    if (err) {
                        throw err;
                    }
                }
            ),

            console.table(answer);

        runApplication();
    });
}