import { Action } from "./actions/action";
import { StreamWriter } from "./stream-writer";

export class ActionResult {
    constructor(private writer: StreamWriter) {

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