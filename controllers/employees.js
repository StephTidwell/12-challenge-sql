const util = require("util");
const connection = require("../config/db");
const inquirer = require("inquirer");
const queryAsync = util.promisify(connection.query).bind(connection);

const getAllRoles = require("./roles");
const getAllManagers = require("./managers");

const getAllEmp = async (value) => {
  try {
    const rows = await queryAsync("SELECT * FROM employees");
    return rows.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));
  } catch (err) {
    console.log(
      "There was an error querying the database to select all employees."
    );
  }
};

const addEmployee = (askTask) => {
  Promise.all([getAllRoles(), getAllManagers()])
    .then(([allRoles, allManagers]) =>
      inquirer.prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the employee's first name?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employee's last name?",
        },
        {
          type: "list",
          name: "roleId",
          message: "What is the employee's role?",
          choices: allRoles,
        },
        {
          type: "list",
          name: "managerOrNo",
          message: "Does the employee have a manager?",
          choices: ["yes", "no"],
        },
        {
          type: "list",
          name: "managerId",
          message: "Who is the employee's manager?",
          choices: allManagers,
          when: (answers) => answers.managerOrNo === "yes",
        },
      ])
    )
    .then((answers) => {
      if (answers.managerOrNo === "yes") {
        connection.query(
          "INSERT INTO employees SET ?",
          {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: Number(answers.roleId),
            manager_id: Number(answers.managerId),
          },
          function (err) {
            if (err) throw err;
            console.log("Your employee was added successfully!");
            askTask();
          }
        );
      } else {
        connection.query(
          "INSERT INTO employees SET ?",
          {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: Number(answers.roleId),
          },
          function (err) {
            if (err) throw err;
            console.log("Your manager was added successfully!");
            askTask();
          }
        );
      }
    })
    .catch((err) => console.log(err));
};

const deleteEmployee = () => {
  return new Promise((resolve, reject) => {
    getAllEmp()
      .then((allEmployees) =>
        inquirer.prompt([
          {
            type: "list",
            name: "empToDelete",
            message: "Which employee would you like to delete?",
            choices: allEmployees,
          },
        ])
      )
      .then((answers) => resolve(answers))
      .catch((err) => reject(err));
  });
};

const updateRole = (answers) => {
  return connection.queryPromise("UPDATE employees SET ? WHERE ?", [
    { role_id: answers.newRole },
    { id: Number(answers.empl) },
  ]);
};

const updateManager = (answers) => {
  const askTask = require("../index");
  return connection.queryPromise("UPDATE employees SET ? WHERE ?", [
    { manager_id: Number(answers.newManager) },
    { id: Number(answers.empl) },
  ]);
};

const updateEmployee = () => {
  return Promise.all([getAllEmp(), getAllRoles(), getAllManagers()])
    .then(([allEmployees, allRoles, allManagers]) =>
      inquirer.prompt([
        {
          type: "list",
          name: "empl",
          message: "Which employee would you like to update?",
          choices: allEmployees,
        },
        {
          type: "list",
          name: "updateWhat",
          message: "What would you like to update?",
          choices: ["role", "manager"],
        },
        {
          type: "list",
          name: "newRole",
          message: "What is the employee's new role?",
          choices: allRoles,
          when: (answers) => answers.updateWhat === "role",
        },
        {
          type: "list",
          name: "mngYorN",
          message: "Does the employee still have a manager?",
          choices: ["yes", "no"],
          when: (answers) => answers.updateWhat === "manager",
        },
        {
          type: "list",
          name: "newManager",
          message: "Who is the employee's new manager?",
          choices: allManagers,
          when: (answers) => answers.updateWhat === "manager",
        },
      ])
    )
    .then((answers) => {
      if (answers.updateWhat === "role") {
        return updateRole(answers);
      } else {
        return updateManager(answers);
      }
    })
    .catch((err) => console.log(err));
};

module.exports = (getAllEmp, addEmployee, deleteEmployee, updateEmployee);
