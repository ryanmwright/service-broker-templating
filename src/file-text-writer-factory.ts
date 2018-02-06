import * as fs from 'fs';
import * as path from 'path';
import { TextWriterFactory } from "./text-writer-factory";
import { TextWriter } from "./text-writer";

class FileTextWriter implements TextWriter {

    constructor (private file: fs.WriteStream) { }

    write(string: string) {
        this.file.write(string);
    }

    close() {
        this.file.close();
    }

}

export class FileTextWriterFactory implements TextWriterFactory {

    constructor() { }

    get(filename: string) {
        const filePath = path.resolve('./', filename);
        return new FileTextWriter(fs.createWriteStream(filePath, {'flags': 'w'}));
    }

}
