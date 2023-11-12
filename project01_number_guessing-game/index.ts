import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
 

const sleep = ()=>{
    return new Promise((res) => {
      setTimeout(res, 2000);
    })
  }
  
  async function Welcome(){
    let rainbowTitle = chalkAnimation.rainbow('Welcome to The Number Guessing Game!');
    await sleep();
    rainbowTitle.stop()
}

async function winner(){
    let neonTitle = chalkAnimation.neon("Congratulations! You have guessed 'The Secret Number'\nYOU WIN");
    await sleep();
    neonTitle.stop()
}

await Welcome();


console.log( `Guess a number between 1 and 10.\nYou have 3 tries to guess the number\n`);

let isPlayingAgain = false;

let score=0;

let game = 0

do{

const systemGeneratedNumber = Math.floor(Math.random()*10) + 1;
let round = 0;
game+=1

do{
    round+=1
    console.log(chalk.bold(chalk.blueBright(chalk.italic(`Game: ${game} `)+chalk.italic(`Round: ${round}\n`))));
    
    const input= await inquirer.prompt({
       
        name: "guess",
        type: "number",
        message: "Enter your Guess:",
        validate: (input:number): string|boolean =>{
            if 
            (isNaN(input)){
                return "Invalid Number"
            }
            else 
            return true
    }
});
 
if
(systemGeneratedNumber < input.guess){
    console.log(chalk.redBright("Your guess is greater than 'The Secret Number'\n"));
}

else if
(systemGeneratedNumber > input.guess){
    console.log(chalk.redBright("Your guess is smaller than 'The Secret Number'\n"));
}

else
{console.log();

    await winner()
    score+=1
    break
}

}while(round<3)

console.log(chalk.cyanBright(`Your score is "${score}"`));
console.log(chalk.cyanBright(`The Secret Number was ${systemGeneratedNumber}\n`));

const playAgain= await inquirer.prompt({
       
    name: "confirm",
    type: "confirm",
    message: "Would you like to Play Again:",
    
})

isPlayingAgain= playAgain.confirm

}while(isPlayingAgain)