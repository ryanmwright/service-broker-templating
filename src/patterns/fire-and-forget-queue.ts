import * as extend from 'extend';
import { StreamWriter } from '../stream-writer';
import { BeginTransaction } from '../actions/begin-transaction';
import { CommitTransaction } from '../actions/commit-transaction';
import { CreateQueue } from '../actions/create-queue';
import { CreateMessageType } from '../actions/create-message-type';
import { CreateContract } from '../actions/create-contract';
import { CreateService } from '../actions/create-service';
import { ModifyServiceContracts } from '../actions/modify-service-contracts';
import { CreateEndOfStreamMessageType } from '../actions/create-end-of-stream-message-type';
import { InsertEndpointConfigurationTable } from '../actions/insert-endpoint-configuration-table';
import { CreateActivatedProc } from '../actions/create-activated-proc';

/**
 * 
 * @param writer 
 * @param args 
 */
export function fireAndForgetQueue(writer: StreamWriter, args: any) {

    if (!args.name) {
        throw "name is required";
    }

    const defaultSchema = 'dbo';
    const defaultOwner = "dbo";
    const defaultEndOfStreamMessageType = "EndOfStream";
    const ns = args.namespace ? args.namespace : '';

    const initiatorQueueConfiguration = {
        schema: "dbo",
        name: args.initiator ? args.initiator + "Queue" : "InitiatorQueue"
    };

    const targetQueueConfiguration = {
        schema: defaultSchema,
        name: args.name + "Queue"
    };

    const messageTypeConfiguration = {
        name: ns + args.name + "MessageType",
        owner: args.owner || defaultOwner,
        validation: "WELL_FORMED_XML"
    };
    
    const contractConfiguration = {
        name: ns + args.name + "Contract",
        owner: defaultOwner,
        messageTypes: [
            {name: defaultEndOfStreamMessageType},
            {name: messageTypeConfiguration.name}
        ]
    };
    
    const initiatorServiceConfiguration = {
        name: ns + (args.initiator ? args.initiator + "Service" : "InitiatorService"),
        owner: defaultOwner,
        queueSchema: initiatorQueueConfiguration.schema,
        queueName: initiatorQueueConfiguration.name,
        contracts: [
            {name: contractConfiguration.name}
        ]
    };
    
    const targetServiceConfiguration = {
        name: ns + args.name + "Service",
        owner: defaultOwner,
        queueSchema: targetQueueConfiguration.schema,
        queueName: targetQueueConfiguration.name,
        contracts: [
            {name: contractConfiguration.name}
        ]
    };

    const endpointConfigurationTableValues = {
        name: "ServiceBrokerEndpointConfiguration",
        schema: "dbo",
        code: args.name,
        fromService: initiatorServiceConfiguration.name,
        toService: targetServiceConfiguration.name,
        onContract: contractConfiguration.name,
        messageType: messageTypeConfiguration.name,
        conversationTimeout: 3600
    };

    const initiatorActivatedProcConfiguration = {
        schema: "dbo",
        name: (args.initiator ? args.initiator + "Queue" : "InitiatorQueue") + "ActivatedListener",
        queueSchema: initiatorQueueConfiguration.schema,
        queueName: initiatorQueueConfiguration.name,
        conversationTrackingTableSchema: "dbo",
        conversationTrackingTableName: "ServiceBrokerConversationPool",
        conversationErrorLogTableSchema: "dbo",
        conversationErrorLogTableName: "ServiceBrokerErrorLog"
    };

    new BeginTransaction()
        .execute(writer)
        .go()
        .then(new CreateEndOfStreamMessageType({}))
        .go()

        // Initiator
        .then(new CreateQueue(initiatorQueueConfiguration))
        .go()
        .then(new CreateMessageType(messageTypeConfiguration))
        .go()
        .then(new CreateContract(contractConfiguration))
        .go()
        .then(new CreateService(initiatorServiceConfiguration))
        .go()
        .then(new ModifyServiceContracts(initiatorServiceConfiguration))
        .go()
        .then(new InsertEndpointConfigurationTable(endpointConfigurationTableValues))
        .go()
        .then(new CreateActivatedProc(initiatorActivatedProcConfiguration))

        // Target
        .then(new CreateQueue(targetQueueConfiguration))
        .go()
        .then(new CreateMessageType(messageTypeConfiguration))
        .go()
        .then(new CreateContract(contractConfiguration))
        .go()
        .then(new CreateService(targetServiceConfiguration))
        .go()
        .then(new ModifyServiceContracts(targetServiceConfiguration))
        .go()

        .then(new CommitTransaction())
        .go();
}