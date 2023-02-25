let mysql = require("mysql");
const { promisify } = require("util");

let connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "codeup",
  database: "employee_trackerDB",
  socketPath: "/System/Volumes/Data/private/tmp/mysql.sock",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
module.exports.queryPromise = promisify(connection.query.bind(connection));
