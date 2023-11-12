import inquirer from "inquirer";
import chalk from "chalk";

class Person {
    private personality: string;

    constructor() {
        this.personality = "a Mystery.";
    }

    askQuestion(answer: number) {
        if (answer === 1) {
            this.personality = "an Extrovert.";
        } else if (answer === 2) {
            this.personality = "an Introvert.";
        } else {
            this.personality = "still a Mystery.";
        }
    }

    getPersonality(): string {
        return this.personality;
    }
}

class Student extends Person {
    private _name: string;

    constructor() {
        super();
        this._name = '';
    }

    get Name(): string {
        return this._name;
    }

    set Name(value: string) {
        this._name = value;
    }
}

async function main() {
    try {
        const { answer } = await inquirer.prompt([
            {
                type: 'input',
                name: 'answer',
                message: 'Type 1 if you like to talk to others\nType 2 if you would rather keep to yourself: ',
            },
        ]);

        const input = parseInt(answer);

        const myStudent = new Student();
        myStudent.askQuestion(input);

        const { name } = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter your name:',
            },
        ]);

        myStudent.Name = name;

        const styledName = chalk.bold.italic.magenta(myStudent.Name);
        const styledPersonality = chalk.blue(myStudent.getPersonality());

        console.log(`${styledName} is ${styledPersonality}`);
    } catch (error) {
        console.error('An error occurred: ' + error);
    }
}

main();
