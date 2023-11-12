import inquirer from "inquirer";

let Conversion = {
    GBP: {
        GBP: 1.00,
        EUR: 1.15,
        USD: 1.23,
        AUD: 1.93,
        PKR: 339.27
    },
    EUR: {
        GBP: 0.87,
        EUR: 1.00,
        USD: 1.06,
        AUD: 1.67,
        PKR: 294.56
    },

    USD: {
        GBP: 0.82,
        EUR: 0.94,
        USD: 1.00,
        AUD: 1.57,
        PKR: 276.64
    },
    AUD: {
        GBP: 0.52,
        EUR: 0.60,
        USD: 0.64,
        AUD: 1.00,
        PKR: 176.10
    },
    PKR: {
        GBP: 0.0029,
        EUR: 0.0034,
        USD: 0.0036,
        AUD: 0.0057,
        PKR: 1.0000
    }
};

async function startLoop() {
    let again;
    do {
        await convertAmount();
        again = await inquirer.prompt([
            {
                type: "list",
                name: "continue",
                choices: ["Yes", "No"],
                message: "Do you want to continue: "
            }
        ]);
    } while (again.continue == "Yes");
};

startLoop();

async function convertAmount() {
    const answer: {
        from : "GBP" | "EUR" | "USD" | "AUD" | "PKR",
        to : "GBP" | "EUR" | "USD" | "AUD" | "PKR",
        amount : number
    } = await inquirer.prompt([
        {
            type: "list",
            name: "from",
            choices: ["GBP" , "EUR" , "USD" , "AUD" , "PKR"],
            message: "Select a currency you want to convert from: "
        },
        {
            type: "list",
            name: "to",
            choices: ["GBP" , "EUR" , "USD" , "AUD" , "PKR"],
            message: "Select a currency you want to convert to: "
        },
        {
            type: "number",
            name: "amount",
            message: "Enter the amount: "
        },
    ])

    const {from, to, amount} = answer;
    if(from && to && amount) {
        let result = Conversion[from][to] * amount;
        console.log(`${amount} ${from} is equal to ${result} ${to}`);
    }
    
    else{
        console.log("Invalid input");
    }   
}
        

