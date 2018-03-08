#!/usr/bin/env node

import program from "commander";
import {
  CheckChecklist as HandleCheck, 
  CreateChecklist as HandleCreate
} from "./Commands/ChecklistCommands";

program
  .version("0.1.0")
  .name("prefly")
  .description("Prefly list checker")

program
  .command("check [fileName]")
  .alias("c")
  .option("-c --critical", "This checklist is critical and should stop operation if failed")
  .description("Check an existing checklist (Uses checklist.json by default)")
  .action(HandleCheck);

program
  .command("create")
  .alias("i")
  .description("Initialize a checklist")
  .action(HandleCreate);

//console.log(program);

program.parse(process.argv);