import { Action } from "./action";
import * as Handlebars from 'handlebars';
import * as createTemplate from '../handlebars/conversation-tracking-table-create.handlebars';
import * as existenceCheckTemplate from '../handlebars/existence-check.handlebars';
import { StreamWriter } from "../stream-writer";
import { ActionResult } from "../action-result";

export class CreateConversationTrackingTable implements Action {

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