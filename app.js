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
    if (err) throw (err);
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

function viewdepartments() {
    let query = "SELECT * FROM department";
    connection.query(query, (err, answer) => {
        if (err) throw (err);
        console.log(answer);
        console.table(answer);
        runApplication();


    });
}

function viewjobs() {
    let query;
    query = "SELECT * FROM job";
    connection.query("SELECT * FROM job, employee", (err, answer) => {
        if (err) throw (err);

        console.log("job Retrieved from Database");
        console.table(answer);

        runApplication();

    });

}

function viewemployees() {
    let query = "SELECT * FROM employee";
    connection.query(query, function(err, answer) {
        if (err) throw (err);
        console.log("employee Retrieved from Database");
        console.table(answer);

        runApplication();

    });


}


function addemployee() {
    inquirer.prompt([{
                type: "input",
                name: "first_name",
                message: "employee's Name"

            },

            {
                type: "input",
                name: "last_name",
                message: "employee's last name"

            },
            {

                type: "number",
                name: "job_id",
                message: "employee'job"

            }
        ])
        .then(answer => {
            var query = "INSERT INTO employee (first_name, last_name, job_id) VALUES (?, ?, ?)";
            connection.query(query, [answer.first_name, answer.last_name, answer.job_id], (err, answer) => {
                if (err) throw (err);

                console.log([answer.first_name, answer.last_name, answer.job_id]);

                console.table();


                runApplication();

            });
        });
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
        "INSERT INTO department SET ?", {
            name: answer.update,
            name: answer.newjob
        },
        connection.query(query, [answer.newjob, answer.update], (err, answer) => {
            if (err) throw (err);
            console.log("Job has been updated");
            console.table(answer);

            runApplication();

        });
    });
}


function addjob() {
    inquirer.prompt([{
            type: "input",
            message: "job name?",
            name: "jobName"
        },
        {
            type: "input",
            message: "job salary?",
            name: "salary"
        },
        {
            type: "input",
            message: "department id?",
            name: "department_id"
        }
    ])

    .then(answer => {
        var query = "INSERT INTO job (title, salary, department_id) VALUES(?,?,?)";
        "INSERT INTO department SET ?", {
            name: answer.jobName,
            name: answer.salary,
            name: answer.department_id
        },
        connection.query(query, [answer.jobName, answer.salary, answer.department_id], (err, answer) => {
            if (err) throw (err);
            connection.query("SELECT * FROM job WHERE title=?", (err, answer) => {
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