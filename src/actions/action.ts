import { StreamWriter } from "../stream-writer";
import { ActionResult } from "../action-result";

export interface Action {
    execute(writer: StreamWriter): ActionResult;
}