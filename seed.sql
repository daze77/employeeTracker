DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Marketing");

INSERT INTO department (name)
VALUES ("PMO");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO department (name)
VALUES ("IT");

INSERT INTO department (name)
VALUES ("Product Development");

INSERT INTO department (name)
VALUES ("Operations");


CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO role (title, salary, department_id)
VALUES 
("VP Product and Sales", 200000, 1),
("Product and Sales Manager", 90000, 1),
("Inside Sales Associate", 85000, 1),
("VP Marketing", 200000, 2),
("Product Manager", 85000, 1),
("VP Finance", 250000, 3),
("Director Accounting", 150000, 3),
("Controller", 80000, 3),
("VP Legal", 250000, 4),
("Legal Counsel", 195000, 4),
("Legal Assistant", 95000, 4),
("VP Operations", 200000, 5),
("Operations Manager", 85000, 5),
("Operations Associate", 75000, 5);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Bill", "Smith", 1, 1),
("Bob", "Franco", 2, 1),
("Lucy", "Hronis", 3, 1),
("Frank", "Soma", 4, 4),
("Suzie", "Zola", 5, 1),
("Tina", "Alpha", 6, 6),
("Laura", "Bravo", 7, 6),
("Natasha", "Noting", 8, 6),
("Shaun", "Orlin", 9, 9),
("Carol", "McCaul", 10, 9),
("Barb", "Barbra", 11, 9),
("Carrie", "Scary", 12, 12),
("Tim", "Tim", 13, 12),
("Simone", "What", 2, 1),
("Simon", "Yes", 3, 1),
("Costa", "Souvlaki", 3, 1),
("Peter", "Pop", 3, 1),
("Casy ", "Today", 5, 1),
("Bobby", "Young", 5, 1),
("Brian", "Lost", 8, 6),
("Bill", "Tired", 8, 6),
("Terrance", "Smart", 14, 12),
("Kathy", "Small", 14, 12);