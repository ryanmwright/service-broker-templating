import { Action } from "./action";
import * as Handlebars from 'handlebars';
import * as template from '../handlebars/service-modify-contracts.handlebars';
import * as existenceCheckTemplate from '../handlebars/existence-check.handlebars';
import { StreamWriter } from "../stream-writer";
import { ActionResult } from "../action-result";

export class ModifyServiceContracts implements Action {

    constructor(private configuration: any) { }

    execute(stream: StreamWriter): ActionResult {
        stream.write(template(this.configuration));
        return new ActionResult(stream);
    }
}