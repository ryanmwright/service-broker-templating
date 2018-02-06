import { Action } from "./action";
import * as Handlebars from 'handlebars';
import * as createTemplate from '../handlebars/conversation-error-log-table-create.handlebars';
import * as existenceCheckTemplate from '../handlebars/existence-check.handlebars';
import { StreamWriter } from "../stream-writer";
import { ActionResult } from "../action-result";

export class CreateConversationErrorLogTable implements Action {

    constructor(private configuration: any) { }

    execute(stream: StreamWriter): ActionResult {
        stream.write(existenceCheckTemplate({
            not: true,
            schema: this.configuration.schema,
            tableName: this.configuration.name,
            trueBody: createTemplate(this.configuration)
        }));
        return new ActionResult(stream);
    }
}