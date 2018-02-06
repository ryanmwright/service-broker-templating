import { TextWriter } from "./text-writer";

export interface TextWriterFactory {
    get(filename: string): TextWriter;
}