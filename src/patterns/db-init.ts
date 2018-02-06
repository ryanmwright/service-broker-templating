import * as extend from 'extend';
import { EnableBroker } from '../actions/enable-broker';
import { StreamWriter } from '../stream-writer';
import { BeginTransaction } from '../actions/begin-transaction';
import { CommitTransaction } from '../actions/commit-transaction';
import { CreateQueue } from '../actions/create-queue';
import { CreateConversationTrackingTable } from '../actions/create-conversation-tracking-table';
import { CreateConversationErrorLogTable } from '../actions/create-conversation-error-log-table';
import { CreateEndpointConfigurationTable } from '../actions/create-endpoint-configuration-table';
import { CreateSendMessageProc } from '../actions/create-send-message-proc';
import { CreateRemoveTrackedConversationProc } from '../actions/create-remove-tracked-conversation-proc';
import { CreatePurgeAllTrackedConversationsProc } from '../actions/create-purge-all-tracked-conversations-proc';
import { CreatePurgeAllTrackedConversationsSqlJob } from '../actions/create-purge-all-tracked-conversations-sql-job';

/**
 * 
 * @param writer 
 * @param args 
 */
export function dbInit(writer: StreamWriter, args: any) {

    const defaultArguments = {
        schema: "dbo",
        trackingTableSchema: "dbo",
        trackingTableName: "ServiceBrokerConversationPool",
        endpointConfigurationTableSchema: "dbo",
        endpointConfigurationTableName: "ServiceBrokerEndpointConfiguration",
        removeTrackedConversationProcSchema: "dbo",
        removeTrackedConversationProcName: "RemoveTrackedConversation",
        purgeAllTrackedConversationsProcSchema: "dbo",
        purgeAllTrackedConversationsProcName: "PurgeAllTrackedConversations",
        conversationErrorLogTableSchema: "dbo",
        conversationErrorLogTableName: "ServiceBrokerErrorLog",
        sendMessageProcSchema: "dbo",
        sendMessageProcName: "SendMessage",
        endOfStreamMessageType: "EndOfStream"
    };

    const baseArguments = extend({}, defaultArguments, args);

    new EnableBroker(extend({}, baseArguments, {database: baseArguments.database}))
        .execute(writer)
        .go()
        .then(new BeginTransaction())
        .go()
        .then(new CreateEndpointConfigurationTable(extend({}, baseArguments, {schema: baseArguments.endpointConfigurationTableSchema, name: baseArguments.endpointConfigurationTableName, memoryOptimized: false})))
        .go()
        .then(new CreateConversationTrackingTable(extend({}, baseArguments, {schema: baseArguments.trackingTableSchema, name: baseArguments.trackingTableName, memoryOptimized: false})))
        .go()
        .then(new CreateConversationErrorLogTable(extend({}, baseArguments, {schema: baseArguments.conversationErrorLogTableSchema, name: baseArguments.conversationErrorLogTableName, memoryOptimized: false})))
        .go()
        .then(new CreateSendMessageProc(extend({}, baseArguments, {schema: baseArguments.sendMessageProcSchema, name: baseArguments.sendMessageProcName})))
        .go()
        .then(new CreateRemoveTrackedConversationProc(extend({}, baseArguments, {schema: baseArguments.removeTrackedConversationProcSchema, name: baseArguments.removeTrackedConversationProcName})))
        .go()
        .then(new CreatePurgeAllTrackedConversationsProc(extend({}, baseArguments, {schema: baseArguments.purgeAllTrackedConversationsProcSchema, name: baseArguments.purgeAllTrackedConversationsProcName})))
        .go()
        .then(new CreatePurgeAllTrackedConversationsSqlJob(extend({}, baseArguments)))
        .go()
        .then(new CommitTransaction())
        .go();
}