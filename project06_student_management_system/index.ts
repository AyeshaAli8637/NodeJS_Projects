import inquirer from "inquirer";
import chalk from 'chalk';

class Student {
  id: string;
  name: string;
  courses: Course[];
  balance: number;

  constructor(name: string) {
    this.id = this.generateStudentID();
    this.name = name;
    this.courses = [];
    this.balance = 0;
  }

  // Generates a unique student ID.
  private generateStudentID(): string {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  // Enrolls a student in a course and updates their balance.
  enroll(course: Course) {
    this.courses.push(course);
    this.balance += course.price;
  }

  // Handles tuition payment and updates the balance.
  payTuition(amount: number) {
    if (amount <= this.balance) {
      console.log(chalk.green(`Payment of $${amount} received. Remaining balance: $${this.balance}`));
      this.balance -= amount;
    } else {
      console.log(chalk.red(`Insufficient balance. Remaining balance: $${this.balance}`));
    }
  }

  // Displays the student's information.
  showStatus() {
    console.log(chalk.bold.italic('Student ID:'), this.id);
    console.log(chalk.bold.italic('Student Name:'), this.name);
    console.log(chalk.bold.italic('Enrolled Courses:'), this.courses.map(course => course.name).join(', '));
    console.log(chalk.bold.italic('Balance:'), chalk.blue(`$${this.balance}`));
  }
}

class Course {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

const students: Student[] = [];
const courses: Course[] = [
  new Course("Metaverse", 3000),
  new Course("Web 3.0", 2500),
  new Course("Generative AI", 2500),
  new Course("Python 3", 2000)
];

// Adds a new student to the system.
function addStudent() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter student name:',
      },
    ])
    .then((answers) => {
      const newStudent = new Student(answers.name);
      students.push(newStudent);
      console.log(chalk.green(`Student ${newStudent.name} added with ID: ${newStudent.id}`));
      mainMenu();
    });
}

// Enrolls a student in a course based on user input.
function enrollStudent() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'studentName',
        message: 'Select a student to enroll:',
        choices: students.map((student) => student.name),
      },
      {
        type: 'list',
        name: 'courseName',
        message: 'Select a course to enroll in:',
        choices: courses.map((course) => course.name),
      },
    ])
    .then((answers) => {
      const student = students.find((s) => s.name === answers.studentName);
      const course = courses.find((c) => c.name === answers.courseName);

      if (student && course) {
        student.enroll(course);
        console.log(chalk.green(`${student.name} has been enrolled in ${course.name}.`));
      } else {
        console.log(chalk.red('Student or course not found. Please check the names and try again.'));
      }

      mainMenu();
    });
}

// Handles tuition payment for a student.
function payTuition() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'studentName',
        message: 'Select a student to pay tuition for:',
        choices: students.map((student) => student.name),
      },
      {
        type: 'input',
        name: 'amount',
        message: 'Enter the tuition amount to pay:',
      },
    ])
    .then((answers) => {
      const student = students.find((s) => s.name === answers.studentName);
      const amount = parseFloat(answers.amount);

      if (student && !isNaN(amount)) {
        student.payTuition(amount);
      } else {
        console.log(chalk.red('Student not found or invalid amount. Please check and try again.'));
      }

      mainMenu();
    });
}

// Displays the status of a selected student.
function viewStatus() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'studentName',
        message: 'Select a student to view status:',
        choices: students.map((student) => student.name),
      },
    ])
    .then((answers) => {
      const student = students.find((s) => s.name === answers.studentName);

      if (student) {
        student.showStatus();
      } else {
        console.log(chalk.red('Student not found. Please check the name and try again.'));
      }

      mainMenu();
    });
}

// Displays the main menu for user interaction.
function mainMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Select an action:',
        choices: ['Add Student', 'Enroll Student', 'Pay Tuition', 'View Status', 'Exit'],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case 'Add Student':
          addStudent();
          break;
        case 'Enroll Student':
          enrollStudent();
          break;
        case 'Pay Tuition':
          payTuition();
          break;
        case 'View Status':
          viewStatus();
          break;
        case 'Exit':
          console.log(chalk.bold('Goodbye!'));
          break;
      }
    });
}

// Initialize the main menu to start the program.
mainMenu();
