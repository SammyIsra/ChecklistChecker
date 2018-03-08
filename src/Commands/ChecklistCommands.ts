import fs from "fs";
import jsonfile from "jsonfile";
import inquirer, {Question, Answers} from "inquirer";

import {QuestionType} from "../Enums/QuestionType";

type ChecklistItem = {
  text: string,
  type: QuestionType,
  option?: string[]
}

/**
 * 
 * @param {string} [fileName] - Name of the file where we want to create the checklist
 * @example 
 *  CreateChecklist("./CommitChecklist.json");
 * @example
 *  CreateChecklist();
 */
function CreateChecklist(fileName: string = "./checklist.json"): void {

  //Ok this is a funky line. 'commander' doesn't pass an empty string if no argument is passed
  // so I give a default value to fileName
  if(typeof fileName !== "string")
    fileName = "./checklist.json";

  console.log(`CreateChecklist was called for ${fileName}`);
  console.log("- Write down the items of your checklist. \n- Press enter to go to the next item, and input an empty string to finish");

  getQuestionsFromUser()
  .then((questionList: ChecklistItem[]):Promise<any> => {
    return writeToJsonFile(fileName, {checklist: questionList})
  })
  .then(():void => {
    return console.log(`New checklist logged! Your checklist is ${fileName}`);
  });
}

/**
 * Read and handle the checkist at location [fileName] or default
 * @param {string} [fileName] - Name of the file where the checklist we want to check is
 * @param {Object} [options] - options passed to the command
 * @example 
 *  CheckChecklist("./CommitChecklist.json");
 * @example
 *  CheckChecklist();
 */
function CheckChecklist(fileName: string = "./checklist.json", options:any ): void {

  //Determine if the --critical flag is used
  const isCritical:boolean = !!options.critical;

  //Ok this is a funky line. 'commander' doesn't pass an empty string if no argument is passed
  // so I give a default value to fileName
  if(typeof fileName !== "string")
    fileName = "./checklist.json";

  jsonfile.readFile(fileName, null, function(err, jsonChecklist){

    if(err)
      throw err;

    handleQuestions(
      jsonChecklist.checklist
      .map((item: string | ChecklistItem) => typeof item === "string" ? CheckListItemFromString(item) : item
    ))
    .then( (preflightPassed: boolean) => {
      if(preflightPassed)
        console.log("You're good!");
      else {
        console.log("You still have work to do, dont you?");
        if(isCritical) process.exit(1);
      }
    });
  });
}


/**
 * Write contents to pathToFile, return a Promise
 * @param {string} pathToFile 
 * @param {Object} objectToWrite 
 */
function writeToJsonFile(pathToFile: string, objectToWrite: Object): Promise<void>{
  return new Promise((resolve, reject) => {
    jsonfile.writeFile(pathToFile, objectToWrite, {spaces: 2},function jsonWriteCallbacl(err){
      if(err)
        reject(err);
      else
        resolve();
    })
  })  
}

/**
 * 
 * @param {ChecklistItem[]} questions - List of question items 
 */
async function handleQuestions(questions: ChecklistItem[]): Promise<boolean>{
  for(let i in questions){
    let questionItem:ChecklistItem = questions[i]; 
    let question: Question = {
      name: i,
      type: GetQuestionType(questionItem),
      message: questionItem.text,
    }
    let answer = await inquirer.prompt([question]);
    if(!answer[i])
      return false;
  }
  return true;
}

async function getQuestionsFromUser(): Promise<ChecklistItem[]>{

  const current:string = "currentQuestion";
  let isDone:boolean = false;
  let questionNumber:number = 0;
  let listOfQuestions: string[] = [];

  while(!isDone){

    let question: Question = {
      name: current,
      type: "input",
      message: `What's your checklist item #${++questionNumber}`,
      default: ""
    };

    let answers:Answers = await inquirer.prompt([question]);

    if(answers[current].trim())
      listOfQuestions.push(answers[current].trim());
    else
      isDone = true;
  }
  return listOfQuestions.map(CheckListItemFromString);
}

function GetQuestionType(questionIten: ChecklistItem): string {

  switch (questionIten.type){
    case QuestionType.YesNo:
      return "confirm";
    case QuestionType.OneOfList:
      return "list";
    case QuestionType.FreeForm:
      return "input";
  }
}

function CheckListItemFromString(str: string): ChecklistItem{
  return {
    text: str,
    type: QuestionType.YesNo
  };
}


export {CreateChecklist, CheckChecklist};