import { Action } from "./action";
import * as Handlebars from 'handlebars';
import * as createTemplate from '../handlebars/messagetype-create.handlebars';
import * as existenceCheckTemplate from '../handlebars/existence-check.handlebars';
import { StreamWriter } from "../stream-writer";
import { ActionResult } from "../action-result";
import { CreateMessageType } from "./create-message-type";

export class CreateEndOfStreamMessageType implements Action {

    readonly defaultOwner: string = "dbo";

    constructor(private configuration: any) { }

    execute(stream: StreamWriter): ActionResult {
        const endOfStreamMessageTypeConfiguration = {
            name: "EndOfStream",
            owner: this.defaultOwner,
            validation: "EMPTY"
        };
        
        return new CreateMessageType(endOfStreamMessageTypeConfiguration).execute(stream);
    }
}