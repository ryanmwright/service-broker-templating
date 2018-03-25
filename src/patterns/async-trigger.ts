import { TextWriter } from '../text-writer';
import { TextWriterFactory } from '../text-writer-factory';
import { CreateAsynchronousTrigger } from '../actions/create-asynchronous-trigger';

/**
 * 
 * @param writer 
 * @param args 
 */
export function asyncTrigger(writerFactory: TextWriterFactory, args: any) {

    const defaultArguments = {
        schema: args.schema,
        name: args.name,
        tableName: args.table,
        json: args.json,
        sendMessageProcSchema: "dbo",
        endpoint: args.endpoint,
        sendMessageProcName: "SendMessage",
        rootElement: "TableUpdate",
        collectionName: "Records",
        collectionElementName: "R",
        columns: []
    };

    const colLen = args.column.length;
    for (let i = 0; i < colLen; i++) {
        const col = args.column[i];
        defaultArguments.columns.push({name: col, alias: col});
    }

    const writer = writerFactory.get('async-trigger.sql');

    new CreateAsynchronousTrigger(defaultArguments)
        .execute(writer)
        .go();

    writer.close();
}