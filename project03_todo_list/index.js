import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
// Initialize an array to store to-do items, a loop flag, and answer objects
let todos = [];
let loop = true;
let answer1;
let answer2;
let answer3;
// Display a welcome animation
const welcomeAnimation = chalkAnimation.rainbow("Welcome to the To-Do List App!");
setTimeout(() => {
    welcomeAnimation.stop();
    // Start the main loop after the welcome animation completes
    startLoop();
}, 4000);
// Asynchronous function to start the main loop
async function startLoop() {
    while (loop) {
        await displayMenuItem();
    }
}
// Asynchronous function to display the main menu and handle user choices
async function displayMenuItem() {
    // Prompt the user to choose an option from the menu
    answer1 = await inquirer.prompt([
        {
            type: "list",
            name: "menu",
            choices: ["Add task", "Delete task", "Exit"],
            message: chalk.blue("Please select an option: ") // Color the message
        }
    ]);
    switch (answer1.menu) {
        case "Add task": {
            // If the user selects "Add task," call the addToDo function
            await addToDo();
            break;
        }
        case "Delete task": {
            // If the user selects "Delete task," call the deleteToDo function
            await deleteToDo();
            break;
        }
        default: {
            // If the user selects "Exit," set the loop flag to false to exit the program
            loop = false;
            console.log(chalk.green("Exit Program")); // Color the message
            break;
        }
    }
}
// Asynchronous function to add a to-do item
async function addToDo() {
    // Prompt the user to enter a to-do item
    answer2 = await inquirer.prompt([
        {
            type: "input",
            name: "to_do",
            message: chalk.blue("Enter a task: ") // Color the message
        }
    ]);
    // Add the to-do item to the "todos" array
    todos.push(answer2.to_do);
    // Display the updated list of to-do items 
    console.log(chalk.cyan(todos.join("\n")));
}
// Asynchronous function to delete a to-do item
async function deleteToDo() {
    if (todos.length > 0) {
        // Prompt the user to select a to-do item to delete
        answer3 = await inquirer.prompt([
            {
                type: "list",
                name: "menu",
                choices: todos,
                message: chalk.blue("Select task to delete: ") // Color the message
            }
        ]);
        let i = 0;
        do {
            if (todos[i] === answer3.menu) {
                // Remove the selected to-do item from the "todos" array
                todos.splice(i, 1);
                break;
            }
            i++;
        } while (i < todos.length);
        // Display the updated list of to-do items 
        console.log(chalk.cyan(todos.join("\n")));
    }
    else {
        // If there are no to-do items to delete, inform the user
        console.log(chalk.yellow("You have nothing to delete!")); // Color the message
    }
}
