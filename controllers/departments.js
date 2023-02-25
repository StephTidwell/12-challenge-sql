const util = require("util");
const connection = require("../config/db");
const inquirer = require("inquirer");
const queryAsync = util.promisify(connection.query).bind(connection);

const addDept = (askTask) => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "deptName",
      },
    ])
    .then((answers) => {
      console.log(answers);
      connection.query(
        "INSERT INTO departments SET ?",
        {
          dept_name: answers.deptName,
        },
        function (err) {
          console.log(err);
          if (err) throw err;
          console.log("Successfully added new department");
          askTask();
        }
      );
    });
};

const deleteDept = () => {
  return new Promise((resolve, reject) => {
    getAllDepts()
      .then((allDepts) =>
        inquirer.prompt([
          {
            type: "list",
            name: "deptToDelete",
            message: "Which department would you like to delete?",
            choices: allDepts,
          },
        ])
      )
      .then((answers) => resolve(answers))
      .catch((err) => reject(err));
  });
};

const getAllDepts = async () => {
  try {
    const rows = await queryAsync("SELECT * FROM departments");
    return rows.map((dept) => ({ name: dept.dept_name, value: dept.id }));
  } catch (err) {
    console.log(`Err at getAllDepts,`, err);
  }
};

module.exports = (addDept, deleteDept, getAllDepts);
