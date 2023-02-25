const inquirer = require("inquirer");
const taskOptions = require("./controllers/task");

const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("./controllers/employees");
const { addRole, deleteRole } = require("./controllers/roles");
const { addDept, deleteDept } = require("./controllers/departments");

const viewByMng = require("./controllers/managers");

const dal = require("./controllers/dal");
const queries = require("./db/queries");

const askTask = () => {
  inquirer
    .prompt(taskOptions)
    .then((answers) => {
      const task = answers.task;

      if (task === "View all employees") {
        dal.viewAll(queries.allEmployees).then((res) => askTask());
      } else if (task === "View employees by manager") {
        viewByMng()
          .then((answers) =>
            dal.viewAllBy(queries.allEmployeesByMng, "m.id", answers.managerId)
          )
          .then(() => askTask());
      } else if (task === "View all roles") {
        dal.viewAll(queries.allRoles).then(() => askTask());
      } else if (task === "View all departments") {
        dal.viewAll(queries.allDepts).then(() => askTask());
      } else if (task === "Add employee") {
        addEmployee(askTask);
      } else if (task === "Add role") {
        addRole().then(() => askTask());
      } else if (task === "Add department") {
        addDept(askTask);
      } else if (task === "Update employee") {
        updateEmployee().then(() => askTask());
      } else if (task === "Delete employee") {
        deleteEmployee()
          .then((answers) =>
            dal.deleteFrom(
              queries.deleteId,
              "employees",
              Number(answers.deleteEmployee)
            )
          )
          .then(() => askTask());
      } else if (task === "Delete role") {
        deleteRole()
          .then((answers) =>
            dal.deleteFrom(
              queries.deleteId,
              "roles",
              Number(answers.deleteRole)
            )
          )
          .then(() => askTask());
      } else if (task === "Delete department") {
        deleteDept()
          .then((answers) =>
            dal.deleteFrom(
              queries.deleteId,
              "departments",
              Number(answers.deleteDept)
            )
          )
          .then(() => askTask());
      } else {
        process.exit();
      }
    })
    .catch((err) => console.log(err));
};

askTask();

module.exports = askTask;
