import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";

// Define a TypeScript interface for the answer type
interface answerType {
    userId: string,
    userPIN: number,
    accountType: string,
    transactionType: string,
    transactionAmount: number,
}

// Define a TypeScript type for a user
type User = {
    userId: string,
    userPIN: number,
}

// Array of sample user data
const users: User[] = [
    {
        userId: "Ayesha Ali",
        userPIN: 2222
    }, 
    {
        userId: "Ali Muhammad",
        userPIN: 4444
    },
    {
        userId: "Hasan Ali",
        userPIN: 5555
    }
]

// Initialize the account balance with a random value
let balance: number = Math.floor(Math.random()*1_000_000)

// Declare variables to store user input and system state
let answer1: answerType;
let answer2: answerType;
let system = false;

// Main loop that continues as long as `system` is false
do {
    // Start the main loop
    startLoop();

    async function startLoop() {
        // Prompt the user for their user ID and PIN
        await getUserId();
        do {
            // Prompt the user for the transaction details
            await getTransaction();
            // Ask the user if they want to continue
            var again = await inquirer.prompt([
                {
                    type: "list",
                    name: "restart",
                    choices: ["Yes", "No"],
                    message: "Do you want to continue: "
                }
            ])
        } while (again.restart == "Yes")
    }

    async function getUserId() {
        // Prompt the user for their ID and PIN
        answer1 = await inquirer.prompt([
            {
                type: "input",
                name: "userId",
                message: "Please enter your ID: "
            },
            {
                type: "number",
                name: "userPIN",
                message: "Please enter your PIN: "
            }
        ])
        // Check if the provided ID and PIN are valid
        await checkUserId(answer1.userId, answer1.userPIN);
    }

    async function checkUserId(userId: string, userPIN: number) {
        let condition = false;
        // Check if the provided ID and PIN match any of the users in the array
        for (let i = 0; i < users.length; i++) {
            if (userId === users[i].userId && userPIN === users[i].userPIN) {
                condition = true;
                break;
            }
        }
        // If the ID and PIN are not valid, ask the user to try again
        if (!condition) {
            console.log("Invalid ID or Pin. Try again.");
            await getUserId();
        }
    }

    async function getTransaction() {
        // Prompt the user for the transaction details
        answer2 = await inquirer.prompt([
            {
                type: "list",
                name: "accountType",
                choices: ["Current", "Saving"],
                message: "Please select account type: "
            },
            {
                type: "list",
                name: "transactionType",
                choices: ["Fast cash", "Withdraw"],
                message: "Please select transaction type: "
            },
            {
                type: "list",
                name: "transactionAmount",
                choices: [5000, 10000, 15000, 20000, 25000],
                message: `Please select your amount (Current Balance is ${balance}: )`,
                when(answer2) {
                    return answer2.transactionType == "Fast cash"
                }
            },
            {
                type: "number",
                name: "transactionAmount",
                message: `Please enter your amount (Current Balance is ${balance}: )`,
                when(answer2) {
                    return answer2.transactionType == "Withdraw";
                }
            }
        ])
        
        if (answer1.userId && answer1.userPIN) {
            // Check if there is enough balance for the transaction
            if (answer2.transactionAmount <= balance) {
                balance -= answer2.transactionAmount;
                console.log(`Your Current Balance is ${balance}`);
            } else {
                console.log(`Insufficient balance ${balance}`);
            }
        }
    }
} while (system = false);  
