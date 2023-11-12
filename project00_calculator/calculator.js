#!/user/bin/env node
import { add } from "./sum.js";
import { subtract } from "./difference.js";
import { divide } from "./division.js";
import { multiply } from "./product.js";
import { modulus } from "./modulus.js";
import { power } from "./power.js";
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};
async function Welcome() {
    let neonTitle = chalkAnimation.neon("Welcome to my calculator");
    await sleep();
    neonTitle.stop();
    console.log(chalk.magentaBright(`
   _____________________
  |  _________________  |
  | |              00 | |
  | |_________________| |
  |  ___ ___ ___   ___  |
  | | 7 | 8 | 9 | | + | |
  | |___|___|___| |___| |
  | | 4 | 5 | 6 | | - | |
  | |___|___|___| |___| |
  | | 1 | 2 | 3 | | x | |
  | |___|___|___| |___| |
  | | . | 0 | = | | / | |
  | |___|___|___| |___| |
  |_____________________|
  `));
}
await Welcome();
async function askQuestion() {
    const answers = await inquirer.prompt([
        {
            name: "number1",
            message: chalk.greenBright("Enter first number:"),
            type: "number"
        },
        {
            name: "number2",
            message: chalk.greenBright("Enter second number:"),
            type: "number"
        },
        {
            type: "list",
            name: "operator",
            message: chalk.greenBright("Choose your operator:"),
            choices: ["Addition", "Subtraction", "Multiplication", "Division", "Modulus", "Power"]
        }
    ]);
    if (answers.operator == "Addition") {
        console.log("result: ", chalk.blueBright(add(answers.number1, answers.number2)));
    }
    else if (answers.operator == "Subtraction") {
        console.log("result: ", chalk.blueBright(subtract(answers.number1, answers.number2)));
    }
    else if (answers.operator == "Multiplication") {
        console.log("result: ", chalk.blueBright(multiply(answers.number1, answers.number2)));
    }
    else if (answers.operator == "Division") {
        console.log("result: ", chalk.blueBright(divide(answers.number1, answers.number2)));
    }
    else if (answers.operator == "Modulus") {
        console.log("result: ", chalk.blueBright(modulus(answers.number1, answers.number2)));
    }
    else if (answers.operator == "Power") {
        console.log("result: ", chalk.blueBright(power(answers.number1, answers.number2)));
    }
}
;
async function startAgain() {
    do {
        await askQuestion();
        var again = await inquirer.prompt({
            type: "input",
            name: "restart",
            message: "Do you want to continue? Press y or n: "
        });
    } while (again.restart == "y" || again.restart == "Y" || again.restart == "yes" || again.restart == "YES");
}
startAgain();
