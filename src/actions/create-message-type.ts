import { Action } from "./action";
import * as Handlebars from 'handlebars';
import * as createTemplate from '../handlebars/messagetype-create.handlebars';
import * as existenceCheckTemplate from '../handlebars/existence-check.handlebars';
import { StreamWriter } from "../stream-writer";
import { ActionResult } from "../action-result";

export class CreateMessageType implements Action {

    constructor(private configuration: any) { }

    execute(stream: StreamWriter): ActionResult {
        stream.write(existenceCheckTemplate({
            not: true,
            schema: this.configuration.schema,
            messageTypeName: this.configuration.name,
            trueBody: createTemplate(this.configuration)
        }));
        return new ActionResult(stream);
    }
}