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
    return ( results, [ name ] );
  }
  
  async function getallRoles( title='' ){
    const sql = `SELECT * FROM role `+ (title ? `WHERE title = ?` : '' );
    const results = await db.query(sql);
    console.table(results)
    return ( results, [ title ] );
  }

  async function addEmployeetoDB(a){
    console.log(`this is the add employee function`, a)




  }



async function managerList(){
    const sql = `SELECT first_name FROM employee WHERE role_id = manager_id`
    const manager =  await db.query(sql)
    console.table(manager)
    const a = JSON.stringify(manager)
    console.log(`this is the first name`, a)
    return a
}

managerList()
















// always close the db (ORM)
function closeORM(){
    return db.close()
}


module.exports = { getEmployeeInformation, getallDepartments, getallRoles, addEmployeetoDB, managerList, closeORM }