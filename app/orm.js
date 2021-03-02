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
 

  async function addEmployeetoDB(a){
    console.log(`this is the add employee function`, a)
  }

  async function addDepartment(departmentName){
    console.log(`this is the add department function`, departmentName)
    const sql = `INSERT INTO department (name) VALUES ("${departmentName}")`
    const result = await db.query(sql)
    return (result)
  }

  async function addRoles(newRole){
    console.log(`this is the add roles function`, newRole)
    // const sql = `INSERT INTO role (title, salary) VALUES ("${newRole}")`
    // const result = await db.query(sql)
    // return (result)
  }






async function managerList(){
    const sql = `SELECT first_name FROM employee WHERE role_id = manager_id`
    const manager =  await db.query(sql)
    return manager

}


















// always close the db (ORM)
function closeORM(){
    return db.close()
}


module.exports = { getEmployeeInformation, getallDepartments, getallRoles, addEmployeetoDB, managerList, addDepartment, addRoles, closeORM }