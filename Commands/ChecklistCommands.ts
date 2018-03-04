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
      else
        console.log("You still have worked to do, dont you?");
    });
  });
}

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

function GetQuestionFromChecklistItem(checklistItem: ChecklistItem){

}

function GetQuestionFromString(str: string){

}



export {CreateChecklist, CheckChecklist};