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

// FUNCTION TO RUN PROMPT SEQUENCE FOR MANAGER
function buildYourManager(){
    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "What is your manager's name?",
        
    },
    {
        type: "input",
        name: "id",
        message: "What is their I.D. number?",
        
    },
    {
        type: "input",
        name: "email",
        message: "What is their email?",
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?",
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
    inquirer.prompt([{
        type: "input",
        name: "nameInt",
        message: "What is your Intern's name?",

    },
    {
        type: "input",
        name: "idInt",
        message: "What is their I.D. number?",

    },
    {
        type: "input",
        name: "emailInt",
        message: "What is their email?",
    },
    {
        type: "input",
        name: "schoolInt",
        message: "What is their school name?",
    }]).then((intR) => {
        // BUILD NEW INTERN OBJECT 
        let intern = new Intern();
        intern.name = intR.nameInt;
        intern.id = intR.idInt;
        intern.email = intR.emailInt;
        intern.school = intR.schoolInt;
        employeeArray.push(intern);
        // CALL BUILD YOUR TEAM GENERATOR FUNCTION TO START SEQUENCE AGAIN
        buildYourTeam();
    })
}
// // FUNCTION TO RUN PROMPT SEQUENCE FOR ENGINEER
function buildYourEngineer() {
    inquirer.prompt([{
        type: "input",
        name: "nameEng",
        message: "What is your Engineer's name?",

    },
    {
        type: "input",
        name: "idEng",
        message: "What is their I.D. number?",

    },
    {
        type: "input",
        name: "emailEng",
        message: "What is their email?",
    },
    {
        type: "input",
        name: "githubEng",
        message: "What is their gitHub email?",
    }]).then((engR) => {
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
    })
}
// CALL PROMPT SEQUENCE FOR MANAGER
 buildYourManager();
