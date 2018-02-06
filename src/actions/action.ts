import { TextWriter } from "../text-writer";
import { ActionResult } from "../action-result";

export interface Action {
    execute(writer: TextWriter): ActionResult;
}