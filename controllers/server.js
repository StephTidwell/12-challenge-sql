// Set up requires
const inquirer = require("inquirer");
const { connection } = require("./db");
// const { viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./db');
const db = require("./db");
require("console.table");

// Create the function to start the Employee-Tracker, it'll run through the inquirer inquiries
function runEmployeeTracker() {
  console.log("=====================================");
  console.log("WELCOME TO THE EMPLOYEE-TRACKER");
  console.log("=====================================");

  // Inquirer prompts
  inquirer
    .prompt([
      {
        type: "list",
        name: "navigation",
        message: "How can we help?",
        choices: [
          "View all Departments",
          "View all Roles",
          "View all Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    // Depending on users choice, it will return the specific call.
    .then((response) => {
      switch (response.navigation) {
        case "View all Departments":
          return viewAllDepartments();
        case "View all Roles":
          return viewAllRoles();
        case "View all Employees":
          return viewAllEmployees();
        case "Add Department":
          return addDepartment();
        case "Add Role":
          return addRole();
        case "Add Employee":
          return addEmployee();
        case "Update Employee Role":
          return updateEmployeeRole();
        case "Exit":
          return exit();
        // End of Switch cases
      }
    });
}

// Add ability to view all departments
async function viewAllDepartments() {
  const department = await db.viewAllDepartments();
  console.log("\n");
  console.table(department);

  // ALert user
  console.log("VIEWING EVERY DEPARTMENT WITHIN DATABASE");

  // Then run runEmployeeTracker(); to continue.
  runEmployeeTracker();
}

// Add ability to view all roles
async function viewAllRoles() {
  const role = await db.viewAllRoles();
  console.log("\n");
  console.table(role);

  // ALert user
  console.log("VIEWING EVERY ROLE WITHIN DATABASE");

  // Then run runEmployeeTracker(); to continue.
  runEmployeeTracker();
}

// Add ability to view all employees
async function viewAllEmployees() {
  const employee = await db.viewAllEmployees();
  console.log("\n");
  console.table(employee);

  // ALert user
  console.log("VIEWING EVERY EMPLOYEE WITHIN DATABASE");

  // Then run runEmployeeTracker(); to continue.
  runEmployeeTracker();
}

// Add ability to ADD department
async function addDepartment() {
  const department = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter department name.",
      validate: (answer) => {
        if (answer === "") {
          return "Please enter the department name.";
        } else {
          return true;
        }
      },
    },
  ]);

  // Await for db.addDeparment
  await db.addDepartment(department);

  // Notify user the role has been successfully added
  console.log("Success! Your Department entry has been added");

  // Then run runEmployeeTracker(); to continue.
  runEmployeeTracker();
}

// Add ability to ADD role
async function addRole() {
  // Connect to the db for viewAllDepartments
  const departments = await db.viewAllDepartments();

  // departmentOptions is going to take the department id and display it as a name
  // When you go to department options further below, you won't see department numbers
  // It will say the name versus the id number.
  const departmentOptions = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const role = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of the role?",
      validate: (answer) => {
        if (answer === "") {
          return "Please enter a title!";
        } else {
          return true;
        }
      },
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary of role?",
      validate: (answer) => {
        if (answer === "") {
          return "Please enter a salary!";
        } else {
          return true;
        }
      },
    },

    // Ask which role the department belongs in
    // Also call department options, to display the names.
    {
      type: "list",
      name: "department_id",
      message: "To which department does this role belong to?",
      choices: departmentOptions,
    },
  ]);

  await db.addRole(role);

  // Notify user the role has been successfully added
  console.log("Success! A new role has been added.");

  // Then run runEmployeeTracker(); to continue.
  runEmployeeTracker();
}

// Add ability to ADD employee
async function addEmployee() {
  // View all available roles to add the Employee to
  const positions = await db.viewAllRoles();

  // So positionOptions is going to take the position id and display it by the TITLE
  // Further down when positionOptions is invoked, you won't be seeing the department by it's ID's
  // Instead you'll get the name.
  const positionOptions = positions.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const managers = await db.viewAllEmployees();

  // Almost the same as positionOptions this just displays the name of the available managers
  const managerChoice = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  // Invoke inquirer prompt
  const employee = await inquirer.prompt([
    // User MUST enter the name of the employee FIRST AND LAST
    {
      type: "input",
      name: "first_name",
      message: "Enter the name of the employee",
      validate: (answer) => {
        if (answer === "") {
          return "You need to enter the employees first name!";
        } else {
          return true;
        }
      },
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter the surname of the employee",
      validate: (answer) => {
        if (answer === "") {
          return "You need to add the employees last name!";
        } else {
          return true;
        }
      },
    },
    // Display and ask what position the employee belongs to
    {
      type: "list",
      name: "role_id",
      message: "What is the employees current position?",
      choices: positionOptions,
    },
    // Display list of managers to add to.
    {
      type: "list",
      name: "manager_id",
      message: "Whats the ID of the employees manager?",
      choices: managerChoice,
    },
  ]);

  await db.addEmployee(employee);

  // Let the user know their input is successful
  console.log("Success! A new employee has been added");

  // Then run runEmployeeTracker(); to continue.
  runEmployeeTracker();
}

// Add ability to UPDATE employee
async function updateEmployeeRole() {
  // View all available roles to add the Employee to
  const positions = await db.viewAllRoles();

  // So positionOptions is going to take the position id and display it by the TITLE
  // Further down when positionOptions is invoked, you won't be seeing the department by it's ID's
  // Instead you'll get the name.
  const positionOptions = positions.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const employees = await db.viewAllEmployees();

  // Display list of employees
  const employeeOptions = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  const { employee_id } = await inquirer.prompt([
    {
      type: "list",
      name: "employee_id",
      message: "Pick an employees role to update",
      choices: employeeOptions,
    },
  ]);

  const { role_id } = await inquirer.prompt([
    {
      type: "list",
      name: "role_id",
      message: "Pick the employees new role.",
      choices: positionOptions,
    },
  ]);

  await db.updateEmployeeRole(role_id, employee_id);

  // Notify user the role has been successfully updated
  console.log("Success! The role has been updated.");

  // Then run runEmployeeTracker(); to continue.
  runEmployeeTracker();
}

// Ability to exit the program
async function exit() {
  console.log(
    "====================================================================="
  );
  console.log(
    "Thank for using Employee-Tracker, we will see you soon, have a good day!"
  );
  console.log(
    "====================================================================="
  );
  connection.end();
  return;
}
// Call the function
// Just a heads up, this call invokes the entire EmployeeTracker application
runEmployeeTracker();
