const db = require(`./connection`)('employeesDB', 'Summer77')

// function to get employee information from the database
async function getEmployeeInformation( first_name='' ){
    const sql = `SELECT * FROM employee `+ (first_name ? `WHERE first_name = ?` : '' );
    const results = await db.query(sql);
    return ( results);
}

// function to get department information from the database
async function getallDepartments( name='' ){
    const sql = `SELECT * FROM department `+ (name ? `WHERE name = ?` : '' );
    const results = await db.query(sql);
    return ( results);
  }
  
// function to get role information from the database
async function getallRoles( title='' ){
  const sql = `SELECT * FROM role `+ (title ? `WHERE title = ?` : '' );
  const results = await db.query(sql);
  return ( results );
}
 

// function to add a new employee to the database
async function addEmployeetoDB(newEmployee){
  const manager = newEmployee.eManager
  const splitmanager = manager.split(" ")
  const role = newEmployee.eRole
  const splitrole = role.split(" ")
  let managerID = splitmanager[0]
  let roleID = splitrole[0]
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${newEmployee.eFirstName}", "${newEmployee.eLastName}", ${roleID}, ${managerID})`
  const result = await db.query(sql)
  return (result)

}

// function to add a new department to the database
async function addDepartment(departmentName){
  const sql = `INSERT INTO department (name) VALUES ("${departmentName}")`
  const result = await db.query(sql)
  return (result)
}

// function to add a new role to the database
async function addRoles(newRole){
  const depID = await locateDepartmentID(newRole.departmentName)
  const sql = `INSERT INTO role (title, salary, department_id) VALUES ("${newRole.roleName}", "${newRole.salary}", "${depID}")`
  const result = await db.query(sql)
  return (result)
}


// function to find all the magagers in the database
async function managerList(){
  const sql = `SELECT first_name, last_name, id FROM employee WHERE role_id = manager_id`
  const manager =  await db.query(sql)
  return manager

}

// function to identify the department id based on a department name
async function locateDepartmentID(depName){
  const sql = `SELECT id FROM department WHERE name = "${depName}"`;
  const results = await db.query(sql)
  return results[0].id
}

// function to identify the role id based on the role name
async function locateRoleID(roleName){
  const sql = `SELECT id FROM role WHERE title = "${roleName}"`;
  const results = await db.query(sql)
  return results[0].id
}


// function to update an employees role
async function updateEmployee(employee){
  const roleID = await locateRoleID(employee.newRole)
  const employeeName = employee.employeeupdate
  const employeeconcat = employeeName.split(" ").join("")
  const sql = `UPDATE employee SET role_id = ${roleID} WHERE CONCAT(first_name,last_name) = "${employeeconcat}"`;
  const results = await db.query(sql)
  return (results)

}

// function to update an employees manager
async function updateEmployeeManager(employee){
  const managerName = employee.newManager
  const managerconcat = managerName.split(" ").join("")
  const managerID = `SELECT manager_id FROM employee WHERE CONCAT (first_name,last_name) = "${managerconcat}"`;
  const resultmanID = await db.query(managerID)
  const mID = resultmanID[0].manager_id
  const employeeName = employee.employeeupdate
  const employeeconcat = employeeName.split(" ").join("")
  const sql = `UPDATE employee SET manager_id = ${mID} WHERE CONCAT(first_name,last_name) = "${employeeconcat}"`;
  const results = await db.query(sql)
  return (results)

}


// always close the db (ORM)
function closeORM(){
    return db.close()
}


module.exports = { getEmployeeInformation, getallDepartments, getallRoles, addEmployeetoDB, managerList, addDepartment, addRoles, closeORM, updateEmployee, updateEmployeeManager }



