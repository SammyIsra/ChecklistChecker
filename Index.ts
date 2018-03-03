#!/usr/bin/env node

import program from "commander";
// const HandleCreate = require("./Commands/CreateChecklist");
// const HandleCheck = require("./Commands/CheckChecklist");


program
  .version("0.0.1")
  .name("checklist")
  .description("Checklist Checker")

program
  .command("check [fileName]")
  .alias("c")
  .description("Check an existing checklist (Uses checklist.json by default)")
  .action( (fileName: string):void => console.log(`You are checking a checklist! ${fileName}`));

program
  .command("create")
  .alias("i")
  .description("Initialize a checklist")
  .action( ():void => console.log("created! (lol)"));

//console.log(program);

program.parse(process.argv);