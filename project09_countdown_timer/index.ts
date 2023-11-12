import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
import chalk from "chalk";
import animation from "chalk-animation";

const response = await inquirer.prompt({
    type: "number",
    name: "userInput",
    message: "Enter seconds: ",
    validate: (input) => {
        if (isNaN(input)) {
            return "Enter a valid number";
        } else if (input > 60) {
            return "Enter below or equal to 60 seconds";
        } else {
            return true;
        }
    }
});

function startTimer(val: number) {
    const initialTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(initialTime);
    const timerInterval = setInterval(() => {
        const currentTime = new Date();
        const timeDifference = differenceInSeconds(intervalTime, currentTime);
        if (timeDifference <= 0) {
            clearInterval(timerInterval);
            console.log(chalk.bold.red("Timer has expired"));
            animation.rainbow("Time's up!").stop();
            process.exit();
        }
        const minute = Math.floor((timeDifference % (3600 * 24)) / 60);
        const second = Math.floor(timeDifference % 60);

        const formattedTime = `${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
        console.log(chalk.bold.italic(formattedTime));
    }, 1000);
}

console.log(chalk.bgGray.white("Timer started..."));
animation.rainbow("Get ready!").start();
startTimer(response.userInput);
