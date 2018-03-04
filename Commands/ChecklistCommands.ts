import fs from "fs";
import jsonfile from "jsonfile";
import inquirer, {Question} from "inquirer";

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
  console.log(`CreateChecklist was called for ${fileName}`);
}

/**
 * 
 * @param {string} [fileName] - Name of the file where the checklist we want to check is
 * @example 
 *  CheckChecklist("./CommitChecklist.json");
 * @example
 *  CheckChecklist();
 */
function CheckChecklist(fileName: string = "./checklist.json"): void {
  console.log(`CheckChecklist was called for ${fileName}`);
  jsonfile.readFile(fileName, null, function(err, jsonChecklist){
    handleQuestions(jsonChecklist.checklist);

  });
}

async function handleQuestions(questions: string[] | ChecklistItem[]): Promise<Boolean>{

  return true;
  // for(let questionItem of questions){
  //   let isChecklistItem: boolean = typeof questionItem === "string" ? false : true;
  //   let question: Question = {
  //     name: isChecklistItem ? questionItem : questionItem.text,
  //     type: isChecklistItem ? GetQuestionType(questionItem) : "confirm"
  //   }
  //   let answer = await inquirer.prompt([question])
  // }
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

function GetQuestionFromChecklistItem(checklistItem: ChecklistItem){

}

function GetQuestionFromString(str: string){

}



export {CreateChecklist, CheckChecklist};