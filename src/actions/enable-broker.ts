import { Action } from "./action";
import * as Handlebars from 'handlebars';
import * as enableBrokerTemplate from '../handlebars/enable-broker.handlebars';
import { StreamWriter } from "../stream-writer";
import { ActionResult } from "../action-result";

export class EnableBroker implements Action {

    constructor(private configuration: any) { }

    execute(stream: StreamWriter): ActionResult {
        stream.write(enableBrokerTemplate(this.configuration));
        return new ActionResult(stream);
    }
}