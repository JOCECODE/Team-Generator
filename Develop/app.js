const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// EMPTY ARRAY THAT GETS POPULATED WITH EACH TEAM MEMBER SELECTED 
const employeeArray = [];
const employeeChoices = ["Intern", "Engineer", "No more, This is my Team!"]


// VALIDATE FOR NAME IF ERROR RETURN ERROR MESSAGE
function nameVal(name) {
  let pass = name.match(
    /([a-zA-Z]{1,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{1,}\s?(^[a-zA-Z]{1,})?$)/g
  );
  if (pass) {
    return true;
  }

  return "Please enter a valid name (First name, Middle In.(optional), Last Name, suffix(optional))";
}

// VALIDATE FOR ID IF ERROR RETURN MUST CONTAINT ONLY NUMBERS
function numVal(input) {
  let pass = input.match(/^([0-9]{3})$/g);
  if (pass) {
    return true;
  }

  return "Please enter a valid I.D. number (must be 3 digits)";
}

// VALIDATE FOR EMAIL IF ERROR RETURN MUST CONTAINT ONLY NUMBERS
function emVal(input) {
  let pass = input.match(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  if (pass) {
    return true;
  }

  return "Please enter a valid email address (ex. hello57@hotmail.net)";
}

// VALIDATE FOR OFFICE NUMBER IF ERROR RETURN MUST CONTAINT ONLY NUMBERS
function offVal(input) {
  let pass = input.match(/^([0-9]{2})$/g);
  if (pass) {
    return true;
  }

  return "Please enter a two digit number";
}

// VALIDATE FOR GITHUB USERNAME IF ERROR RETURN MUST CONTAINT ONLY NUMBERS
function gitHub(input) {
  let pass = input.match(/^[A-Za-z0-9]{1,}$/g);
  if (pass) {
    return true;
  }

  return "Please enter valid gitHub username";
}

// FUNCTION TO RUN PROMPT SEQUENCE FOR MANAGER
function buildYourManager(){
    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "What is your manager's name?",
        validate: nameVal,
        
    },
    {
        type: "input",
        name: "id",
        message: "What is their I.D. number?",
        validate: numVal,
        
    },
    {
        type: "input",
        name: "email",
        message: "What is their email?",
        validate: emVal,
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?",
        validate: offVal,
        }]).then((response) => {
            // CREATE NEW MANAGER OBJECT
            let manager = new Manager();
            manager.name = response.name;
            manager.id = response.id;
            manager.email = response.email;
            manager.officeNumber = response.officeNumber;
            employeeArray.push(manager);
            // CALL BUILD YOUR TEAM PROMPT SEQUENCE
           buildYourTeam();
        })};  
        // FUNCTION TO RUN PROMPT SEQUENCE TO PICK INTERN OR ENGINEER
function buildYourTeam() {
    inquirer.prompt([{
        type: "list",
        name: "teamChoice",
        message: "Build your team",
        choices: employeeChoices,
    }]).then((teamR) => {
        const choice = teamR.teamChoice;
        //    IF USER SELECTS INTERN THEN, CALLS INTERN FUNCTION
        if (choice == employeeChoices[0]) {
            buildYourIntern();      
        }
        // IF USER SELECTS ENGINEER THEN, CALLS ENGINEER FUNCTION
        else if (choice === employeeChoices[1]) {
            buildYourEngineer();
        
        }
        else {
            const data = render(employeeArray);
            fs.writeFile(outputPath, data, function () {
                console.log(` Success!!!!!`, "\n", "team.html has been created and added to the output folder!");
            });
        }
    })
} 
// // FUNCTION TO RUN PROMPT SEQUENCE FOR INTERN
function buildYourIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "nameInt",
          message: "What is your Intern's name?",
          validate: nameVal,
        },
        {
          type: "input",
          name: "idInt",
          message: "What is their I.D. number?",
          validate: numVal,
        },
        {
          type: "input",
          name: "emailInt",
          message: "What is their email?",
          validate: emVal,
        },
        {
          type: "input",
          name: "schoolInt",
          message: "What is their school name?",
          validate: nameVal,
        },
      ])
      .then((intR) => {
        // BUILD NEW INTERN OBJECT
        let intern = new Intern();
        intern.name = intR.nameInt;
        intern.id = intR.idInt;
        intern.email = intR.emailInt;
        intern.school = intR.schoolInt;
        employeeArray.push(intern);
        // CALL BUILD YOUR TEAM GENERATOR FUNCTION TO START SEQUENCE AGAIN
        buildYourTeam();
      });
}
// // FUNCTION TO RUN PROMPT SEQUENCE FOR ENGINEER
function buildYourEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "nameEng",
          message: "What is your Engineer's name?",
          validate: nameVal,
        },
        {
          type: "input",
          name: "idEng",
          message: "What is their I.D. number?",
          validate: numVal,
        },
        {
          type: "input",
          name: "emailEng",
          message: "What is their email?",
          validate: emVal,
        },
        {
          type: "input",
          name: "githubEng",
          message: "What is their gitHub username?",
          validate: gitHub,
        },
      ])
      .then((engR) => {
        // BUILD NEW ENGINEER OBJECT
        let engineer = new Engineer();
        engineer.name = engR.nameEng;
        engineer.id = engR.idEng;
        engineer.email = engR.emailEng;
        engineer.github = engR.githubEng;
        // PUSH NEW ENGINEER OBJECT INTO EMPLOYEE ARRAY
        employeeArray.push(engineer);
        // // FUNCTION TO RUN PROMPT SEQUENCE FOR ENGINEER
        buildYourTeam();
      });
}
// CALL PROMPT SEQUENCE FOR MANAGER
 buildYourManager();
