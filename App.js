var inquirer = require("inquirer")
var mysql = require("mysql")
var connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "password",
  database: "employeeTracker"
})
require("console.table") 
connection.connect(function(err){
  if (err) throw err
  displayMenu()
})
function displayMenu(){
  inquirer.prompt([{
    name:"userchoice",
  
    type: "list",
    choices: ["view employees", "view departments","view roles","add employee", "add department","add role","update Employee Role","Exit App"],
  }
  ]).then(function(response){
    switch(response.userchoice){
      case "view employees": 
       allEmployees();
       break;
      case "view departments":
        allDepartments();
        break;
      case "view roles":
        allRoles();
        break;
      case "add employee":
        addEmployees();
        break;
      case "add department":
        addDepartments();
        break;
      case "add role":
        addRoles();
        break;
      case "update Employee Role":
        updateEmprole();
        break;
      default:
      connection.end()
      process.exit(0)
    }

  })
}
function allEmployees(){
  connection.query("select * from employee", function(err,result){
    if (err) throw err 
    console.log("employee Results");
    console.log("======================================")
    console.table(result)
   displayMenu() 
  })
}
function allDepartments(){
  connection.query("select * from department", function(err,result){
    if (err) throw err 
    console.log("department Results");
    console.log("======================================")
    console.table(result)
   displayMenu() 
  })
}
function allRoles(){
  connection.query("select * from empRole", function(err,result){
    if (err) throw err 
    console.log("Roles Results");
    console.log("======================================")
    console.table(result)
   displayMenu() 
  })
}
function addEmployees(){
  inquirer.prompt(
    [
      {
        type: "input",
        name: "first_name",
        message: "employee First name"
      },
      {
        type: "input",
        name: "last_name",
        message: "employee Last name"
      },
      {
        type: "list",
        name: "role_id",
        choices: [4,5,6],
        message: "employee Role ID"
      },
      {
        type: "list",
        name: "manager_id",
        choices: [1,2,3],
        message: "employee Manager ID"
      }
    ]
  ).then(function(response){
    connection.query("insert into employee (first_name,last_name, role_id,manager_id) values (?,?,?,?);",
    [response.first_name,response.last_name, response.role_id, response.manager_id],function(err,data){
      if (err) throw err
      console.log("employee data added")
      displayMenu()
    })
  })
}
function addDepartments(){
  inquirer.prompt(
    [
      {
        type: "input",
        name: "name",
        message: "employees department"
      }
    ]
  ).then(function(response){
    connection.query("insert into department (name) values (?);",
    [response.name],function(err,data){
      if (err) throw err
      console.log("department data added")
      displayMenu()
    })
  })
}
function addRoles(){
  inquirer.prompt(
    [
      {
        type: "input",
        name: "title",
        message: "employee title"
      },
      {
        type: "input",
        name: "salary",
        message: "employee salary"
      },
      {
        type: "list",
        name: "department_id",
        choices: [1,2,3,4],
        message: "employee Role ID"
      }
    ]
  ).then(function(response){
    connection.query("insert into empRole (title,salary, department_id) values (?,?,?);",
    [response.title,response.salary, response.department_id],function(err,data){
      if (err) throw err
      console.log("role data added")
      displayMenu()
    })
  })
}
function updateEmprole(){
  inquirer.prompt([
    {
      type: "list",
      message: "select employee id",
      choices: [1,2,3,4,5,6,7,8,9,10],
      name: "Employeeid"
    },
    {
      type: "list",
      message: "select employee role",
      choices: [1,2,3,4,5,6,7,8],
      name: "role"
    }
  ]).then(function(response){
    connection.query("update employee set role_id = ? where id=?;",[response.role, response.Employeeid],function(err,response){
      if (err) throw err
      console.log("employee role updated")
      displayMenu()
    })
  })
  
}