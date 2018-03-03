
/**
 * 
 * @param {String} [fileName] - Name of the file where we want to create the checklist
 * @example 
 *  CreateChecklist("./CommitChecklist.json");
 * @example
 *  CreateChecklist();
 */
function CreateChecklist(fileName: String = "./checklist.json"): void {
  console.log(`CreateChecklist was called for ${fileName}`);
}

/**
 * 
 * @param {String} [fileName] - Name of the file where the checklist we want to check is
 * @example 
 *  CheckChecklist("./CommitChecklist.json");
 * @example
 *  CheckChecklist();
 */
function CheckChecklist(fileName: String = "./checklist.json"): void {
  console.log(`CheckChecklist was called for ${fileName}`);
}

export {CreateChecklist, CheckChecklist}