import { Action } from "./actions/action";
import { TextWriter } from "./text-writer";

export class ActionResult {
    constructor(private writer: TextWriter) {

    }

    go() {
        this.writer.write('\n');
        this.writer.write('GO');
        this.writer.write('\n');
        return this;
    }

    then(action: Action) {
        return action.execute(this.writer);
    }
}