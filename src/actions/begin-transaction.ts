import { Action } from "./action";
import * as Handlebars from 'handlebars';
import * as beginTransactionTemplate from '../handlebars/begin-transaction.handlebars';
import { StreamWriter } from "../stream-writer";
import { ActionResult } from "../action-result";

export class BeginTransaction implements Action {

    execute(stream: StreamWriter): ActionResult {
        stream.write(beginTransactionTemplate());
        return new ActionResult(stream);
    }
}