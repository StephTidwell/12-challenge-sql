const inquirer = require("inquirer");

const taskOptions = [
  {
    type: "rawlist",
    name: "task",
    message: "What would you like to do today?",
    choices: [
      new inquirer.Separator("=== VIEW INFO ==="),
      "View all employees",
      "View employees by manager",
      "View all roles",
      "View all departments",
      new inquirer.Separator("=== ADD NEW INFO ==="),
      "Add employee",
      "Add role",
      "Add department",
      new inquirer.Separator("=== UPDATE INFO ==="),
      "Update employee",
      new inquirer.Separator("=== DELETE INFO ==="),
      "Delete employee",
      "Delete role",
      "Delete department",
      new inquirer.Separator("=== EXIT ==="),
      "Exit Application",
    ],
    pageSize: 17,
  },
];

module.exports = taskOptions;
