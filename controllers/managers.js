const util = require("util");
const connection = require("../config/db");
const inquirer = require("inquirer");
const queryAsync = util.promisify(connection.query).bind(connection);

const getAllManagers = async () => {
  try {
    const rows = await queryAsync(
      "SELECT * FROM employees WHERE manager_id IS NULL OR manager_id = id OR id IN (SELECT DISTINCT manager_id FROM employees)"
    );
    const managers = rows.map((manager) => {
      return {
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.id,
      };
    });
    return managers;
  } catch (err) {
    console.log("Err at getAllManagers:", err);
    throw err;
  }
};

const viewByManager = () => {
  return new Promise((resolve, reject) => {
    getAllManagers()
      .then((allManagers) => {
        return inquirer.prompt([
          {
            type: "list",
            name: "managerId",
            message: "Which manager would you like to view?",
            choices: allManagers,
          },
        ]);
      })
      .then((answers) => resolve(answers))
      .catch((err) => reject(err));
  });
};

module.exports = (getAllManagers, viewByManager);
