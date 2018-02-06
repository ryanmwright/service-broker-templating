import { Action } from "./action";
import * as Handlebars from 'handlebars';
import * as createTemplate from '../handlebars/contract-create.handlebars';
import * as existenceCheckTemplate from '../handlebars/existence-check.handlebars';
import { StreamWriter } from "../stream-writer";
import { ActionResult } from "../action-result";

export class CreateContract implements Action {

    constructor(private configuration: any) { }

    execute(stream: StreamWriter): ActionResult {
        stream.write(existenceCheckTemplate({
            not: true,
            schema: this.configuration.schema,
            contractName: this.configuration.name,
            trueBody: createTemplate(this.configuration)
        }));
        return new ActionResult(stream);
    }
}