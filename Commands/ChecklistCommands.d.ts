/**
 *
 * @param {String} [fileName] - Name of the file where we want to create the checklist
 * @example
 *  CreateChecklist("./CommitChecklist.json");
 * @example
 *  CreateChecklist();
 */
declare function CreateChecklist(fileName?: String): void;
/**
 *
 * @param {String} [fileName] - Name of the file where the checklist we want to check is
 * @example
 *  CheckChecklist("./CommitChecklist.json");
 * @example
 *  CheckChecklist();
 */
declare function CheckChecklist(fileName?: String): void;
export { CreateChecklist, CheckChecklist };
