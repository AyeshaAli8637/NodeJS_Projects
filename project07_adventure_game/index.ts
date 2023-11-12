import inquirer from "inquirer";
import chalk from "chalk";

// Classes for Player and Enemy
class Player {
  name: string;
  fuel: number = 100;

  constructor(name: string) {
    this.name = name;
  }
}

class Enemy {
  name: string;
  fuel: number = 100;

  constructor(name: string) {
    this.name = name;
  }
}

// Function to simulate a turn-based combat
const combat = async (player: Player, enemy: Enemy) => {
  while (player.fuel > 0 && enemy.fuel > 0) {
    const playerAction = await inquirer.prompt({
      type: "list",
      name: "action",
      message: `What will ${chalk.green(player.name)} do?`,
      choices: ["Attack", "Defend", "Run", "Drink Potion"],
    });

    if (playerAction.action === "Attack") {
      const damage = Math.floor(Math.random() * 20) + 10;
      enemy.fuel -= damage;
      console.log(`${chalk.green(player.name)} attacks ${chalk.red(enemy.name)} for ${damage} damage.`);
    } else if (playerAction.action === "Defend") {
      console.log(`${chalk.green(player.name)} chooses to defend.`);
      console.log(`Player Health : ${player.fuel} | Enemy Health: ${enemy.fuel}`);
      
    } else if (playerAction.action === "Drink Potion") {
      console.log(`${chalk.green(player.name)} drinks potion.`);
      player.fuel +=25
      console.log(`Player Health : ${player.fuel} | Enemy Health: ${enemy.fuel}`);
      
    } else if (playerAction.action === "Run") {
      console.log(`${chalk.green(player.name)} runs away from ${chalk.red(enemy.name)}.`);
      console.log(`Player Health : ${player.fuel} | Enemy Health: ${enemy.fuel}`);
      
      break;
    }

    if (enemy.fuel <= 0) {
      console.log(`${chalk.green(player.name)} defeated ${chalk.red(enemy.name)}!`);
      break;
    }

    const enemyDamage = Math.floor(Math.random() * 20) + 10;
    player.fuel -= enemyDamage;
    console.log(`${chalk.red(enemy.name)} attacks ${chalk.green(player.name)} for ${enemyDamage} damage.`);

    if (player.fuel <= 0) {
      console.log(`${chalk.red(enemy.name)} defeated ${chalk.green(player.name)}!`);
    }
  }
};

// Get the player's name and enemy selection through prompts
(async () => {
  let player = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Enter your name: ",
  });

  let enemy = await inquirer.prompt({
    type: "list",
    name: "select",
    choices: ["Skeleton", "Zombie", "Warrior", "Assassin"],
    message: "Select Enemy: ",
  });

   // Create instances of Player and Enemy
  let player1 = new Player(player.name);
  let enemy1 = new Enemy(enemy.select);

  // Display the player and enemy names for the combat
  console.log(`${chalk.green(player1.name)} VS ${chalk.red(enemy1.name)}`);
  // Start the combat
  await combat(player1, enemy1);

  // Ask if the player wants to play again
  const playAgain = await inquirer.prompt({
    type: "confirm",
    name: "continue",
    message: "Do you want to play again?",
  });

  if (playAgain.continue) {
    // Restart the game
    console.log("Let's play again!");
    player1.fuel = 100;
    enemy1.fuel = 100;
    combat(player1, enemy1);
  } else {
    // End the game
    console.log("Thanks for playing! Goodbye.");
  }
})();


