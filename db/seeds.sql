USE employee_trackerDB;

INSERT INTO
    departments (`dept_name`, `id`)
VALUES ("Engineering", 1);

INSERT INTO departments (`dept_name`, `id`) VALUES ("Finance", 2);

INSERT INTO departments (`dept_name`, `id`) VALUES ("Legal", 3);

INSERT INTO departments (`dept_name`, `id`) VALUES ("Sales", 4);

INSERT INTO
    roles (
        `title`,
        `id`,
        `salary`,
        `department_id`
    )
VALUES ("Lead Engineer", 100, 150000, 1);

INSERT INTO
    roles (
        `title`,
        `id`,
        `salary`,
        `department_id`
    )
VALUES (
        "Software Engineer",
        101,
        120000,
        1
    );

INSERT INTO
    roles (
        `title`,
        `id`,
        `salary`,
        `department_id`
    )
VALUES (
        "Lead Accountant",
        200,
        140000,
        2
    );

INSERT INTO
    roles (
        `title`,
        `id`,
        `salary`,
        `department_id`
    )
VALUES ("Accountant", 201, 125000, 2);

INSERT INTO
    roles (
        `title`,
        `id`,
        `salary`,
        `department_id`
    )
VALUES (
        "Legal Team Lead",
        300,
        250000,
        3
    );

INSERT INTO
    roles (
        `title`,
        `id`,
        `salary`,
        `department_id`
    )
VALUES ("Lawyer", 301, 190000, 3);

INSERT INTO
    roles (
        `title`,
        `id`,
        `salary`,
        `department_id`
    )
VALUES ("Sales Lead", 400, 100000, 4);

INSERT INTO
    roles (
        `title`,
        `id`,
        `salary`,
        `department_id`
    )
VALUES ("Salesperson", 401, 80000, 4);

INSERT INTO
    employees (
        `id`,
        `first_name`,
        `last_name`,
        `role_id`,
        `manager_id`
    )
VALUES (1, 'Michael', 'Scott', 100, null);

INSERT INTO
    employees (
        `id`,
        `first_name`,
        `last_name`,
        `role_id`,
        `manager_id`
    )
VALUES (2, 'Andy', 'Bernard', 101, 3);

INSERT INTO
    employees (
        `id`,
        `first_name`,
        `last_name`,
        `role_id`,
        `manager_id`
    )
VALUES (3, 'Pam', 'Beesly', 301, 1);

INSERT INTO
    employees (
        `id`,
        `first_name`,
        `last_name`,
        `role_id`,
        `manager_id`
    )
VALUES (4, 'Jim', 'Halpert', 400, 3);

INSERT INTO
    employees (
        `id`,
        `first_name`,
        `last_name`,
        `role_id`,
        `manager_id`
    )
VALUES (5, 'Dwight', 'Schrute', 401, 4);