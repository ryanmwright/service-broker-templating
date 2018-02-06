import { Action } from "./action";
import * as Handlebars from 'handlebars';
import * as createTemplate from '../handlebars/endpoint-configuration-table-insert.handlebars';
import * as existenceCheckTemplate from '../handlebars/existence-check.handlebars';
import { StreamWriter } from "../stream-writer";
import { ActionResult } from "../action-result";

export class InsertEndpointConfigurationTable implements Action {

    constructor(private configuration: any) { }

    execute(stream: StreamWriter): ActionResult {
        stream.write(createTemplate(this.configuration));
        return new ActionResult(stream);
    }
}