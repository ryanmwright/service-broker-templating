import { dbInit, fireAndForgetQueue } from './module';
import * as argparse from 'argparse';
import { TextWriter } from './text-writer';
import { FileTextWriterFactory } from './file-text-writer-factory';
import { ConsoleTextWriterFactory } from './console-text-writer-factory';

const commandLineOptions = [
    { name: 'action', alias: 'a', type: String, multiple: false }
];

const parser = new argparse.ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'Argparse example'
});

var subparsers = parser.addSubparsers({
    title: 'Generators',
    dest: 'generator'
});

// //////////////////////////
var dbInitCommand = subparsers.addParser('db-init', {addHelp:true, description: 'Generates service broker database initialization scripts'});
dbInitCommand.addArgument(
    [ '-d', '--database' ],
    {
      action: 'store',
      required: true,
      help: 'The name of the database that will be initialized'
    }
);

dbInitCommand.addArgument(
    [ '-s', '--schema' ],
    {
      action: 'store',
      required: false,
      defaultValue: 'dbo',
      help: 'The schema to use. Default = dbo'
    }
);

// //////////////////////////
var queueCommand = subparsers.addParser('fire-and-forget-queue', {addHelp: true, description: 'Generates a fire and forget messaging pattern where an initiator can send messages to a target queue without leaking conversations.'});
queueCommand.addArgument(
    [ '-n', '--name' ],
    {
      action: 'store',
      required: true,
      help: '(Required) The name to use when generating the artifacts. All artifacts are generated using the {Name}{Type} convention. E.X: If Name = HelloWorld then we would generate the following artifacts message type and target queue names: HelloWorldMessageType, HelloWorldTargetService, HelloWorldTargetQueue'
    }
);

queueCommand.addArgument(
    [ '-i', '--initiator' ],
    {
      action: 'store',
      required: false,
      help: 'The name of the initiator objects. Default = Initiator (i.e. InitatorQueue/InitiatorService)'
    }
);

queueCommand.addArgument(
    [ '-s', '--namespace' ],
    {
      action: 'store',
      required: false,
      help: 'A namespace to prefix the following object types with: MessageType, Service'
    }
);

// //////////////////////////
const args = parser.parseArgs();

switch (args.generator.toLowerCase()) {
    case "db-init":
        dbInit(new FileTextWriterFactory(), args);
        break;
    case "fire-and-forget-queue":
        fireAndForgetQueue(new FileTextWriterFactory(), args);
        break;
}
