import { Action } from "./action";
import * as Handlebars from 'handlebars';
import * as completeTransactionTemplate from '../handlebars/complete-transaction.handlebars';
import { StreamWriter } from "../stream-writer";
import { ActionResult } from "../action-result";

export class CommitTransaction implements Action {

    constructor() { }

    execute(stream: StreamWriter): ActionResult {
        stream.write(completeTransactionTemplate({
            commit: true
        }));
        return new ActionResult(stream);
    }
}