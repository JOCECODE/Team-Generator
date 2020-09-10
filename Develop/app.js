const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employeeArray = [];
const employeeChoices = ["Intern", "Engineer", "No more, This is my Team!"]
let choice = ""
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
            let manager = new Manager();
            manager.name = response.name;
            manager.id = response.id;
            manager.email = response.email;
            manager.officeNumber = response.officeNumber;
            employeeArray.push(manager);
           buildYourTeam();
        })}; 
        
function buildYourTeam() {
    inquirer.prompt([{
        type: "list",
        name: "teamChoice",
        message: "Build your team",
        choices: employeeChoices,
    }]).then((teamR) => {
        choice = teamR.teamChoice;
        //    IF USER SELECTS INTERN DO SET OF PROMPTS
        if (choice == employeeChoices[0]) {
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
                    let intern = new Intern();
                    intern.name = intR.nameInt;
                    intern.id = intR.idInt;
                    intern.email = intR.emailInt;
                    intern.school = intR.schoolInt;
                    employeeArray.push(intern);
                    buildYourTeam();
                })
            }
            buildYourIntern();      
        }
        else if (choice === employeeChoices[1]) {
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
                    let engineer = new Engineer();
                    engineer.name = engR.nameEng;
                    engineer.id = engR.idEng;
                    engineer.email = engR.emailEng;
                    engineer.github = engR.githubEng;
                    employeeArray.push(engineer);
                    console.log(employeeArray);
                    buildYourTeam();
                })
            }
            buildYourEngineer();
        
        }
        else {
            const data = render(employeeArray);
            fs.writeFile(outputPath, data, function () {
                console.log("Success");
                console.log(choice)
            });
        }
    })
} 
         buildYourManager();
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
