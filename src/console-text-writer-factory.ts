import * as fs from 'fs';
import * as path from 'path';
import * as streams from 'memory-streams';
import { TextWriterFactory } from "./text-writer-factory";
import { TextWriter } from "./text-writer";

const stream = new streams.ReadableStream('');
stream.pipe(process.stdout);

class ConsoleTextWriter implements TextWriter {

    constructor () { }

    write(string: string) {
        stream.push(string);
    }

    close() { }

}

export class ConsoleTextWriterFactory implements TextWriterFactory {

    constructor() { }

    get(filename: string) {
        return new ConsoleTextWriter();
    }

}
