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
      return console.log("You chose to Add Departments");

    case "ADDRoles":
      console.log("You chose to Add Roles");
      return console.log(' You chose to add a role');

    case "updateEMPLOYEERoles":
      return console.log("You chose to Update Employees Roles");

    default:
      return console.log ("You didn't make a proper selection - booooo");
  }

}
company()

async function addEmployees(){
  let manager = await orm.managerList()
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
          type: "input",
          name:"eRole",
          message:"Enter the employees role?",
      },
      {
          type: "list",
          name:"eManager",
          message:"Select the Employees Manager",
          choices(){
            const choiceArray = []
            manager.forEach(({first_name}) => {
              choiceArray.push(first_name);
            });
            return choiceArray;
          },
      },

  ])

    console.log(`this is the new employee`, newEmployee, )
   orm.addEmployeetoDB(newEmployee)
    
}

orm.managerList()