const inquirer = require('inquirer');
const Choice = require('inquirer/lib/objects/choice');
const dbConnect = require('./app/connection');
const orm = require( './app/orm' );


async function company() {
    const {companyOptions} = await inquirer
    .prompt([
     {
        type: 'list',
        name: 'companyOptions',
        message: 'What would you like to do?',
        choices: [
          {
            name: "View all Employees",
            value: "ViewALLEmployees",
          },
          {
            name: "View all Departments",
            value: "ViewALLDepartments",
          },
          {
            name: "View all Roles",
            value: "ViewALLRoles",
          },
          {
            name: "Add Employees",
            value: "ADDEmployees",
          },
          {
            name: "Add Departments",
            value: "ADDDepartments",
          },
          {
            name: "Add Roles",
            value: "ADDRoles",
          },
          {
            name: "Update Employee Roles",
            value: "updateEMPLOYEERoles",
          },
          {
            name: "Quit",
            value: "Quit",
          },
        ]
      },
    ]);
  switch (companyOptions) {
    
    case "ViewALLEmployees":
      return orm.getEmployeeInformation();
        
    case "ViewALLDepartments":
      return orm.getallDepartments();

    case "ViewALLRoles":
      return orm.getallRoles();

    case "ADDEmployees":
      return addEmployees();

    case "ADDDepartments":
      return addDepartmentDetails();

    case "ADDRoles":
      return addRoleDetails();

    case "updateEMPLOYEERoles":
      return console.log("You chose to Update Employees Roles");

    default:
      return console.log ("You didn't make a proper selection - booooo");
  }
}
company()

async function addEmployees(){
  let manager = await orm.managerList()
  let roles = await orm.getallRoles()
  const newEmployee = await inquirer
  .prompt([
      {
          type: "input",
          name:"eFirstName",
          message:"Enter the employees first name?",
      },
      {
          type: "input",
          name:"eLastName",
          message:"Enter the employees last name?",
      },
      {
          type: "list",
          name:"eRole",
          message:"Enter the employees role?",
          choices(){
            const fullRolesList = []
            roles.forEach(({title}) => {
              fullRolesList.push(title);
            });
            return fullRolesList;
          },
      },
      {
          type: "list",
          name:"eManager",
          message:"Select the Employees Manager",
          choices(){
            const managerNameList = []
            manager.forEach(({first_name}) => {
              managerNameList.push(first_name);
            });
            return managerNameList;
          },
      },
  ])

   console.log(`this is the new employee`, newEmployee, )
   orm.addEmployeetoDB(newEmployee)
    
}

async function addDepartmentDetails(){
  let department = await orm.getallDepartments()
  console.log('department list pulled', department)
  const newDepartment = await inquirer
  .prompt([
      {
          type: "input",
          name:"departmentName",
          message:"Please enter the new Department Name",
      },
  ])
  console.log(`this is the new department`, newDepartment.departmentName ) 
  orm.addDepartment(newDepartment.departmentName)
    
}


async function addRoleDetails(){
  let department = await orm.getallDepartments()
  console.log(`this is the department pull`, department)
  const newRole = await inquirer
  .prompt([
      {
          type: "input",
          name:"roleName",
          message:"Please enter the new Role Name",
      },
      {
        type: "input",
        name:"salary",
        message:"Please enter the new Role Salary",
      },
      {
        type: "rawlist",
        name:"departmentName",
        message:"Please align with a department",
        choices(){
          const departmentList = []
          department.forEach(({name}) => {
            departmentList.push(name);
          });
          console.log(`updated`, departmentList)
          return departmentList;
          
        },

      },
  ])
  console.log(`this is the new roll`, newRole.roleName, newRole.salary, newRole.departmentName ) 
  orm.addRoles(newRole)
    
}