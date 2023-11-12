import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation'

// The API link to fetch quiz questions
const apiLink = "https://opentdb.com/api.php?amount=10&category=28&difficulty=easy&type=multiple";

// Function to fetch quiz data from the provided API link
let fetchData = async (data: string) => {
  let fetchQuiz: any = await fetch(data);
  let response = await fetchQuiz.json();
  return response.results; 
};

// Function to start the quiz
let startQuiz = async () => {
  let data = await fetchData(apiLink);

  let score: number = 0;
  // Prompt the user for their name
  let userInfo = await inquirer.prompt
  ({
      type: "input",
      name: "userName",
      message: "Enter your name:"
  });

  for (let i = 0; i < data.length; i++) {
     // Extract answer choices, including the correct answer
    let answers = [...data[i].incorrect_answers, data[i].correct_answer];

     // Prompt the user with the quiz question and answer choices
    let questions = await inquirer.prompt
    ({
        type: "list",
        name: "question",
        message: data[i].question,
        choices: answers.map((val: any) => val)
    });

    // Check if the user's answer is correct and update the score
    if (questions.question === data[i].correct_answer) {
      console.log(chalk.green("correct!"));
      score++;
    } else {
      console.log(`${chalk.red("incorrect!")} correct answer is ${chalk.green(data[i].correct_answer)}`);
    }
  }

  // Display the user's final score
  let result = chalkAnimation.rainbow(`${userInfo.userName} scored: ${score}/${data.length}`);
  setTimeout(() => {
    result.stop(); 
}, 1000);
  
};
// Start the quiz
startQuiz();
