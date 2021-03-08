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
      return viewInformation("employee")
      
        
    case "ViewALLDepartments":
      return viewInformation("department")  

    case "ViewALLRoles":
      return viewInformation("role")

    case "ADDEmployees":
      return addEmployees();

    case "ADDDepartments":
      return addDepartmentDetails();

    case "ADDRoles":
      return addRoleDetails();

    case "updateEMPLOYEERoles":
      return updateEmployee();

    default:
      return console.log ("Thank you! Have a great day!");
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
            roles.forEach(({title, id}) => {
              fullRolesList.push(id + " " + title);
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
            manager.forEach(({first_name, last_name, id}) => {
              managerNameList.push({firstname: `${first_name}`, lastname: `${last_name}`, id: id});
            });
            console.log(`checking this out`, managerNameList)
            const manName =[]
            managerNameList.forEach(({id, firstname, lastname})=>{
              manName.push(id + " " + firstname + " " + lastname);
            });
            return manName;
          },
          
      },
  ])

   console.log(`this is the new employee`, newEmployee)
   orm.addEmployeetoDB(newEmployee)

   company()
    
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
  
  company()
}


async function addRoleDetails(){
  let department = await orm.getallDepartments()
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
  
  company()
}





async function viewInformation(info){
  let information = info
  console.log(`this is the choice passed through`, information)
  if(information === "employee"){
      orm.getEmployeeInformation();
      company()
    } else if (information === "department") {
      orm.getallDepartments();
      company()
    } else if (information === "role") {
      orm.getallRoles();
      company()
    }
}




async function updateEmployee(){
  let employees = await orm.getEmployeeInformation();
  
  const employeeUPdate = await inquirer
  .prompt([
      {
          type: "list",
          name:"employeeupdate",
          message:"Which Employee would you like to update?",
          choices(){
            const employeeList = []
            employees.forEach(({first_name}) => {
              employeeList.push(first_name)
            });
            return employeeList;
          },
      }
    ])




}