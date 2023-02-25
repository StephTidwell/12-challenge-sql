const util = require("util");
const connection = require("../config/db");
const inquirer = require("inquirer");

const askTask = require("../index");

const getAllDepts = require("./departments.js");

const getAllRoles = async () => {
  try {
    const rows = await queryAsync("SELECT * FROM roles");
    return rows.map((role) => ({ name: role.title, value: role.id }));
  } catch (err) {
    console.log(`Err at getAllRoles,`, err);
  }
};

const addRole = async () => {
  const allDepts = await getAllDepts();
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of the role?",
    },
    {
      type: "number",
      name: "salary",
      message: "What is the salary for this role?",
    },
    {
      type: "list",
      name: "deptId",
      message: "What is the department for this role?",
      choices: allDepts,
    },
  ]);
  await connection.queryPromise("INSERT INTO roles SET ?", {
    title: answers.title,
    salary: answers.salary,
    department_id: Number(answers.deptId),
  });
  console.log("The role was added successfully!");
};

const deleteRole = () => {
  return new Promise((resolve, reject) => {
    getAllRoles()
      .then((allRoles) =>
        inquirer.prompt([
          {
            type: "list",
            name: "roleToDelete",
            message: "Which role would you like to delete?",
            choices: allRoles,
          },
        ])
      )
      .then((answers) => resolve(answers))
      .catch((err) => reject(err));
  });
};

module.exports = (addRole, getAllRoles, deleteRole);
