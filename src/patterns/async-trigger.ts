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
        sendMessageProcSchema: "dbo",
        endpoint: args.endpoint,
        sendMessageProcName: "SendMessage",
        rootElement: "TableUpdate",
        collectionName: "Records",
        collectionElementName: "R",
        columns: []
    };

    let colLen = args.column.length;
    for (let i=0; i<colLen; i++) {
        let col = args.column[i];
        defaultArguments.columns.push({name: col, alias: col});
    }

    const writer = writerFactory.get('async-trigger.sql');

    new CreateAsynchronousTrigger(defaultArguments)
        .execute(writer)
        .go();

    writer.close();
}