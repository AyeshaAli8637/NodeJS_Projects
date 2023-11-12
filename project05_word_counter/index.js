import inquirer from "inquirer";
import chalk from "chalk";
// This async function gets text input from the user.
async function getText() {
    // Prompt the user to enter text and store the response in the 'answer' object.
    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "text",
            message: "Please enter your text: "
        }
    ]);
    const allWordCount = eachWordCount(answer.text.trim());
    const longWordCount = wordCount(answer.text.trim().split(" "));
    console.log(chalk.blue(`Word count (all words and characters): ${allWordCount}`));
    console.log(chalk.green(`Word count (letters >= 4): ${longWordCount}`));
}
function eachWordCount(sentence) {
    if (sentence.length > 0) {
        const words = sentence.split(" ");
        return words.length;
    }
    else {
        return 0;
    }
}
function wordCount(words) {
    let wordsCount = 0;
    for (const word of words) {
        if (word.length >= 4) {
            wordsCount++;
        }
    }
    return wordsCount;
}
async function startLoop() {
    do {
        await getText();
        var again = await inquirer.prompt([
            {
                type: "list",
                name: "loop",
                choices: ["Yes", "No"],
                message: "Do you want to continue: "
            }
        ]);
    } while (again.loop == "Yes");
}
startLoop();
