DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE
    departments (
        id INTEGER NOT NULL AUTO_INCREMENT,
        dept_name VARCHAR(30),
        PRIMARY KEY (id)
    );

CREATE TABLE
    roles (
        id INTEGER NOT NULL AUTO_INCREMENT,
        title VARCHAR(30),
        salary DECIMAL (10, 2),
        department_id INTEGER NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    employees (
        id INTEGER NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(30),
        last_name VARCHAR(30),
        role_id INTEGER(8),
        manager_id INTEGER(8),
        PRIMARY KEY (id)
    );