import { Action } from "./action";
import * as Handlebars from 'handlebars';
import * as createTemplate from '../handlebars/asynchronous-trigger-create.handlebars';
import * as existenceCheckTemplate from '../handlebars/existence-check.handlebars';
import { TextWriter } from "../text-writer";
import { ActionResult } from "../action-result";

export class CreateAsynchronousTrigger implements Action {

    constructor(private configuration: any) { }

    execute(stream: TextWriter): ActionResult {
        stream.write(createTemplate(this.configuration));
        return new ActionResult(stream);
    }
}