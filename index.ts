#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";

console.log(
  chalk.white("\n \t<<==="),
  chalk.blue.bold("WELCOME TO THE COUNTDOWN_TIMER"),
  chalk.white("===>>\n")
);

const ans = await inquirer.prompt([
  {
    type: "number",
    name: "userInput",
    message: chalk.italic.yellow("Enter the amount of seconds : "),
    validate: (input) => {
      if (isNaN(input)) {
        return chalk.italic.red("Please enter a valid number");
      } else if (input > 60) {
        return chalk.italic.red("Seconds must be under 60 seconds");
      } else {
        return true;
      }
    },
  },
]);

let input = ans.userInput;

function startTime(value: number) {
  const initialTime = new Date().setSeconds(new Date().getSeconds() + value);
  const intervalTime = new Date(initialTime);
  setInterval(() => {
    const currentTime = new Date();
    const timeDifference = differenceInSeconds(intervalTime, currentTime);
    if (timeDifference <= 0) {
      console.log(chalk.red("\nTime's up!"));
      process.exit();
    }
    const minute = Math.floor((timeDifference % (3600 * 24)) / 3600);
    const second = Math.floor(timeDifference % 60);
    console.log(`${minute.toString().padStart(2, "0")} : ${second}`);
  }, 1000);
}

startTime(input);
