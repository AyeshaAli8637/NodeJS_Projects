import inquirer from "inquirer";
import { faker } from "@faker-js/faker";
import chalk from "chalk";
// Customer Class: Defines the structure of a customer object with properties like name, age, etc.
class Customer {
    firstName;
    lastName;
    age;
    gender;
    phoneNumber;
    accountNumber;
    constructor(firstName, lastName, age, gender, phoneNumber, accountNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.accountNumber = accountNumber;
    }
}
// Bank Class: Defines a bank with customers and accounts, and methods to manage accounts.
class Bank {
    customers = [];
    accounts = [];
    // Method to add a customer to the bank.
    addCustomer(customer) {
        this.customers.push(customer);
    }
    // Method to add a bank account to the bank.
    addAccount(account) {
        this.accounts.push(account);
    }
    // Method to get the balance of a specified account.
    getBalance(accountNumber) {
        const account = this.accounts.find((acc) => acc.accountNumber === accountNumber);
        return account ? account.balance : undefined;
    }
    // Method to withdraw cash from a specified account.
    withdrawCash(accountNumber, amount) {
        const account = this.accounts.find((acc) => acc.accountNumber === accountNumber);
        if (account && account.balance >= amount) {
            account.balance -= amount;
            return true;
        }
        return false;
    }
    // Method to deposit cash to a specified account.
    depositCash(accountNumber, amount) {
        const account = this.accounts.find((acc) => acc.accountNumber === accountNumber);
        if (account) {
            account.balance += amount;
            return true;
        }
        return false;
    }
}
// Create a new instance of the Bank class called WomenBank.
let WomenBank = new Bank();
// Creating customers and accounts
for (let i = 1; i < 4; i++) {
    // Generate random customer information using the faker library and create Customer objects.
    let customerName = faker.person.firstName("female");
    let customerLastName = faker.person.lastName("male");
    let customerMobNumber = Math.floor(Math.random() * 1000000000) + 3000000000;
    const customer = new Customer(customerName, customerLastName, 25 + i, "female", customerMobNumber, 98765432100 + i);
    // Add the customer to WomenBank and create random accounts with balances.
    WomenBank.addCustomer(customer);
    WomenBank.addAccount({ accountNumber: customer.accountNumber, balance: Math.floor(Math.random() * 1000000) * i });
}
// Bank functionality
// Asynchronous function to provide banking services using the inquirer library.
async function bankService(bank) {
    // Ask the user to select a service (View Balance, Withdraw Cash, or Deposit Cash).
    let service = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Please select service: ",
        choices: ["View Balance", "Withdraw Cash", "Deposit Cash"],
    });
    if (service.select === "View Balance") {
        // If the user selects "View Balance," prompt for the account number and display the account balance.
        const response = await inquirer.prompt({
            type: "input",
            name: "accountNumber",
            message: "Please enter Account Number: ",
        });
        const accountNumber = parseInt(response.accountNumber);
        const balance = bank.getBalance(accountNumber);
        if (balance === undefined) {
            // Use chalk to display an error message in red.
            console.log(chalk.red("Invalid Account Number!"));
        }
        else {
            // Use chalk to display the account balance in green.
            console.log(chalk.green(`Account Balance: $${balance}`));
        }
    }
    else if (service.select === "Withdraw Cash") {
        // If the user selects "Withdraw Cash," prompt for the account number and amount to withdraw.
        const response = await inquirer.prompt([
            {
                type: "input",
                name: "accountNumber",
                message: "Please enter Account Number: ",
            },
            {
                type: "input",
                name: "amount",
                message: "Enter the amount to withdraw: ",
            },
        ]);
        const accountNumber = parseInt(response.accountNumber);
        const amount = parseFloat(response.amount);
        // Attempt to withdraw cash and display the result.
        if (bank.withdrawCash(accountNumber, amount)) {
            // Use chalk to display a success message in green.
            console.log(chalk.green(`Withdraw successful. New balance: $${bank.getBalance(accountNumber)}`));
        }
        else {
            // Use chalk to display an error message in red.
            console.log(chalk.red("Withdrawal failed. Insufficient balance or invalid account number."));
        }
    }
    else if (service.select === "Deposit Cash") {
        // If the user selects "Deposit Cash," prompt for the account number and amount to deposit.
        const response = await inquirer.prompt([
            {
                type: "input",
                name: "accountNumber",
                message: "Please enter Account Number: ",
            },
            {
                type: "input",
                name: "amount",
                message: "Enter the amount to deposit: ",
            },
        ]);
        const accountNumber = parseInt(response.accountNumber);
        const amount = parseFloat(response.amount);
        // Attempt to deposit cash and display the result.
        if (bank.depositCash(accountNumber, amount)) {
            // Use chalk to display a success message in green.
            console.log(chalk.green(`Deposit successful. New balance: $${bank.getBalance(accountNumber)}`));
        }
        else {
            // Use chalk to display an error message in red.
            console.log(chalk.red("Deposit failed. Invalid account number."));
        }
    }
}
// Start the bank service by calling the bankService function with the WomenBank instance.
bankService(WomenBank);
