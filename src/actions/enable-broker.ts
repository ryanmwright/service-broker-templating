import { Action } from "./action";
import * as Handlebars from 'handlebars';
import * as enableBrokerTemplate from '../handlebars/enable-broker.handlebars';
import { TextWriter } from "../text-writer";
import { ActionResult } from "../action-result";

export class EnableBroker implements Action {

    constructor(private configuration: any) { }

    execute(stream: TextWriter): ActionResult {
        stream.write(enableBrokerTemplate(this.configuration));
        return new ActionResult(stream);
    }
}