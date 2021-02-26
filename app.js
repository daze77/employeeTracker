const inquirer = require("inquirer");


async function company() {
    const companyDir = await inquirer
    .prompt([

     {
        type: 'list',
        name: 'nextSteps',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employees', 'Add Departments', 'Add Roles', 'Update Employee Roles']
    }
    ])

    switch(companyDir.nextSteps) {
        case "View All Employees":
          console.log("You chose to View All Employees");
          break;
        case "View All Departments":
            console.log("You chose to View All Departments");
          break;
        case "View All Roles":
            console.log("You chose to View All Roles");
          break;
        case "Add Employees":
            console.log("You chose to Add Employees");
        break;
        case "Add Departments":
            console.log("You chose to Add Departments");
        break;
        case "Add Roles":
            console.log("You chose to Add Roles");
        break;
        case "Update Employee Roles":
            console.log("You chose to Update Employees Roles");
        default:
          console.log ("You didn't make a proper selection - booooo");
      }




















}

company()
