const inquirer = require('inquirer');
const Choice = require('inquirer/lib/objects/choice');
const dbConnect = require('./app/connection');
const orm = require( './app/orm' );
const cTable = require('console.table')


async function company() {
    const {companyOptions} = await inquirer
    .prompt([
     {
        type: 'list',
        name: 'companyOptions',
        message: 'What would you like to do?',
        choices: [
          {
            name: "View Information (Employees, Departments, Roles)",
            value: "View",

          },
          {
            name: "Add Information (Employees, Departments, Roles",
            value: "Add",

          },
          {
            name: "Delete information (Employees, Departments, Roles)",
            value: "Delete",

          },
          {
            name: "Update Information (Employees Manager, Employees Role)",
            value: "Update",
          },
          {
            name: "Quit",
            value: "Quit",
          },
        ]
      },
    ]);
  switch (companyOptions) {

    case "View":
      return whatToView()

    case "Add":
      return whatToAdd()

    case "Update":
      return whatToUpdate()

    case "Delete":
      return whatToDelete()

    default:
      return console.log ("Thank you! Have a great day!");
  }
}
company()




// function for user to input what they would like to view
async function whatToView(){
  const viewOptions = await inquirer
  .prompt([
    {
      type: "list",
      name: "viewList",
      message: "Please select the information you would like to view",
      choices:["View Employees", "View Departments", "View Roles", "View Utilized budget of a Department", "Go Back"]
    }
    
  ])
  veiwInfoSelected(viewOptions)
}

// function to call database details based on user selection
async function veiwInfoSelected(viewOptions){
  let option = viewOptions
  if(option.viewList === "View Employees"){
    const employees = await orm.getEmployeeInformation();
    console.table(employees)
    whatToView()
    } else if (option.viewList === "View Departments"){
      const departments = await orm.getallDepartments();
      console.table(departments)
      whatToView()
    } else if (option.viewList === "View Roles"){
      const roles = await orm.getallRoles();
      console.table(roles)
      whatToView()
    } else if (option.viewList === "View Utilized budget of a Department" ){
      const departments = await orm.getallDepartments();
      const picDep = await inquirer
      .prompt([
        {
          type: "list",
          name: "departmentBudg",
          message: "Please select the department for which you would like to see the utilization budget for.",
          choices(){
            const departmentList = []
            departments.forEach(({name}) => {
              departmentList.push(name);
            });
            return departmentList;
          }
        },
      ])
      const results = await orm.unitilzatonBudgets(picDep)
      console.table(results)
      whatToView()
    } else {
      company()
    }

}



// function to for user input of what information to be added
async function whatToAdd(){
  const addOptions = await inquirer
  .prompt([
    {
      type: "list",
      name: "viewList",
      message: "Please select the type of information you would like to add",
      choices: ["Add Employees", "Add Departments", "Add Roles", "Go Back"]
    }
  ])
  addSelectedInfoType(addOptions)
}

// function to determine what add function to call based on user input
function addSelectedInfoType(addOptions){
  let option = addOptions
  if(option.viewList === "Add Employees"){
    addEmployees();
    
    } else if (option.viewList === "Add Departments"){
      addDepartmentDetails();
      
    } else if (option.viewList === "Add Roles"){
      addRoleDetails();
      
    } else {
      company()
    }

}


// add functions run based on which option the user selected
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
            const manName =[]
            managerNameList.forEach(({id, firstname, lastname})=>{
              manName.push(id + " " + firstname + " " + lastname);
            });
            return manName;
          },
          
      },
  ])

   orm.addEmployeetoDB(newEmployee)

   whatToAdd()    
}
async function addDepartmentDetails(){
  let department = await orm.getallDepartments()
  const newDepartment = await inquirer
  .prompt([
      {
          type: "input",
          name:"departmentName",
          message:"Please enter the new Department Name",
      },
  ])
  orm.addDepartment(newDepartment.departmentName)
  
  whatToAdd()
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
          return departmentList;
          
        },

      },
  ])
  orm.addRoles(newRole)
  
  whatToAdd()
}

// function to determine what information the user would like to update
async function whatToUpdate(){
  const updateOptions = await inquirer
  .prompt([
    {
      type: "list",
      name: "viewList",
      message: "Please select the type of employee information you would like to update",
      choices: ["Employees Manager", "Employees Role", "Go Back"]
    }
  ])
  updateSelectedInfoType(updateOptions)
}

// function to determine next set of functions based on user selection of what they would like to update
function updateSelectedInfoType(updateOptions){
  let option = updateOptions
  if(option.viewList === "Employees Manager"){
    updateEmployeeManager();
    } else if (option.viewList === "Employees Role"){
      updateEmployeeRole();
    } else {
      company()
    }

}

// update functions
async function updateEmployeeRole(){
  let employees = await orm.getEmployeeInformation();
  let roles = await orm.getallRoles()

 
  const eUPdate = await inquirer
  .prompt([
      {
          type: "list",
          name:"employeeupdate",
          message:"Which Employee would you like to update?",
          choices(){
            const employeeList = []
            employees.forEach(({first_name, last_name, id}) => {
              employeeList.push(first_name + " " + last_name);
            });
            return employeeList;
          }
      },
      {
        type: "list",
        name: "newRole",
        message:"Please select the employess new role.",
        choices(){
          const fullRolesList = []
          roles.forEach(({title}) => {
            fullRolesList.push(title);
          });
          return fullRolesList; 
        },
      }
    ])
    orm.updateEmployee(eUPdate)

    whatToUpdate()


}
async function updateEmployeeManager(){
  let employees = await orm.getEmployeeInformation();
  let manager = await orm.managerList()

  const eUPdate = await inquirer
  .prompt([
      {
          type: "list",
          name:"employeeupdate",
          message:"Which Employee would you like to update?",
          choices(){
            const employeeList = []
            employees.forEach(({first_name, last_name}) => {
              employeeList.push(first_name + " " + last_name);
            });
            return employeeList;
          }
      },
      {
        type: "list",
        name: "newManager",
        message:"Please select the employess new role.",
        choices(){
          const fullManagerList = []
          manager.forEach(({first_name, last_name}) => {
            fullManagerList.push(first_name + " " + last_name);
          });
          return fullManagerList; 
        },
      }
    ])
    orm.updateEmployeeManager(eUPdate)

    whatToUpdate()


}



// function to determine what the user would like to delete
async function whatToDelete(){
  const deleteOption = await inquirer
  .prompt([
    {
      type: "list",
      name: "viewList",
      message: "Please select the type of iinformation you would like to delete",
      choices: ["Employees", "Departments", "Roles", "Go Back"]
    }
  ])
  deleteSelectedDetails(deleteOption)
}



// function to call database details based on user selection
async function deleteSelectedDetails(deleteOption){
  let employees = await orm.getEmployeeInformation()

  let option = deleteOption
  if(option.viewList === "Employees"){
    const delEmployees = await inquirer
    .prompt([
      {
        type: "list",
        name: "deleteEMP",
        message: "Please select the employee you would like to delete.",
        choices(){
          const employeeList = []
          employees.forEach(({first_name, last_name, id}) => {
            employeeList.push(id + " " + first_name + " " + last_name);
          });
          return employeeList;
        }
      },
    ])
    orm.deleteEmployees(delEmployees)
    whatToDelete()

  } else if (option.viewList === "Departments"){
    let departments = await orm.getallDepartments()

      const deldepartments = await inquirer
      .prompt([
        {
          type: "list",
          name: "deletedep",
          message: "Please select the department you would like to delete.",
          choices(){
            const departmentList = []
            departments.forEach(({name}) => {
              departmentList.push(name);
            });
            return departmentList;
          }
        },
      ])
      orm.deleteDepartments(deldepartments)
      whatToDelete()

  } else if (option.viewList === "Roles"){
    let roles = await orm.getallRoles()

    const delRoles = await inquirer
    .prompt([
      {
        type: "list",
        name: "deleterole",
        message: "Please select the department you would like to delete.",
        choices(){
          const roleList = []
          roles.forEach(({title}) => {
            roleList.push(title);
          });
          return roleList;
        }
      },
    ])
    orm.deleteRoles(delRoles)
    whatToDelete()

  } else {
    company()
  }
}
