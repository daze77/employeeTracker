const db = require(`./connection`)('employeesDB', 'SummerSummer')


async function getEmployeeInformation( first_name='' ){
    const sql = `SELECT * FROM employee `+ (first_name ? `WHERE first_name = ?` : '' );
    const results = await db.query(sql);
    console.table(results)
    return ( results, [ first_name ] );
}




async function getallDepartments( name='' ){
    const sql = `SELECT * FROM department `+ (name ? `WHERE name = ?` : '' );
    const results = await db.query(sql);
    console.table(results)
    return ( results);
  }
  
  async function getallRoles( title='' ){
    const sql = `SELECT * FROM role `+ (title ? `WHERE title = ?` : '' );
    const results = await db.query(sql);
    return ( results );
  }
 

  async function addEmployeetoDB(newEmployee){
    console.log(`this is the add employee function`, newEmployee)
    console.log(`first name`, newEmployee.eManager,newEmployee.eManager.first_name)


  }

  async function addDepartment(departmentName){
    console.log(`this is the add department function`, departmentName)
    const sql = `INSERT INTO department (name) VALUES ("${departmentName}")`
    const result = await db.query(sql)
    return (result)
  }

  async function addRoles(newRole){
    const depID = await locateDepartmentID(newRole.departmentName)
    console.log(`dep ID is `, depID)
    console.log(`this is the add roles function`, newRole)
    const sql = `INSERT INTO role (title, salary, department_id) VALUES ("${newRole.roleName}", "${newRole.salary}", "${depID}")`
    const result = await db.query(sql)
    return (result)
  }






async function managerList(){
    const sql = `SELECT first_name, last_name FROM employee WHERE role_id = manager_id`
    const manager =  await db.query(sql)
    return manager

}


async function locateDepartmentID(depName){
  const sql = `SELECT id FROM department WHERE name = "${depName}"`;
  const results = await db.query(sql)
  console.log(`the number result is`, results)
  console.log(`the number ID is `, results[0].id)
  return results[0].id
}



async function locateManagerID(managerName){
  const sql = `SELECT id FROM employee WHERE first_name = "${managerName}" AND role_id = manager_id`;
  const results = await db.query(sql)
  console.log(`the number result is`, results)
  console.log(`the number ID is `, results[0].id)
  return results[0].id
}





async function locateRoleID(roleName){
  const sql = `SELECT id FROM role WHERE title = "${roleName}"`;
  const results = await db.query(sql)
  console.log(`the number result is`, results)
  console.log(`the number ID is `, results[0].id)
  return results[0].id
}









// always close the db (ORM)
function closeORM(){
    return db.close()
}


module.exports = { getEmployeeInformation, getallDepartments, getallRoles, addEmployeetoDB, managerList, addDepartment, addRoles, closeORM }



