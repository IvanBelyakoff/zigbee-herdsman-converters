import QtQml 2.14

import 'dist/index.mjs' as C
import 'dist/buffaloZcl.mjs' as BuffaloZcl
import 'dist/buffaloZclDataType.mjs' as BuffaloZclDataType
import 'dist/dataType.mjs' as DataType
import 'dist/buffer.mjs' as Buffer
import 'dist/cluster.mjs' as CLUSTER
import 'dist/events.mjs' as EVENTS
import 'dist/foundation.mjs' as Foundation
import 'dist/zclFrameConverter.mjs' as ZclFrameConverter

// The code below is take from zigbee-herdsman and zigbee-herdsman-converters projects
// and modified to fit our needs

QtObject {
    objectName: "z2m"

    function convertToZigbee(device, command, value) {

        console.log("QML convert to zigbee:", device, command, "value:", value);

        // const deviceShort2 = {
        //     // "modelID":"lumi.sensor_ht",
        //     // "modelID":"TS0601_thermostat",
        //     // "modelID":"kud7u2l",
        //     "modelID":"lumi.plug",
        // }

        const deviceObj = JSON.parse(device)
        if (!deviceObj)
            return {};

        const definition = C.findByDevice(deviceObj)

        if (definition) {
            const resolvedEntity = { definition: definition, settings: {} }

            const converters = resolvedEntity.definition.toZigbee;

            const key = command;
            const converter = converters.find((c) => c.key.includes(key));

            if (!converter) {
                console.error(`No converter available for '${key}'`);
                return {};
            }

            let converted = converter.convertSet(resolvedEntity, key, value, { message: {[`${key}`]: value }, device: JSON.parse(device), logger: console, options: {} } )

            console.log("TZ VALUE:", JSON.stringify(converted))

            const cluster = CLUSTER.default[converted.clusterKey]

            console.log("C2Z Cluster:", JSON.stringify(cluster))

            let clusterID = cluster.ID
            let commandID
            let parameters = []

            // This seemed to work for on/off
            for (const [k, val] of Object.entries(cluster.commands)) {
                console.log("Cluster ID:", clusterID, "command:", k, "value:", JSON.stringify(val))

                if (k == converted.commandKey) {
                    commandID = val.ID
                    parameters = val.parameters
                }
                else
                    console.log("Commands are not equal:", k, converted.commandKey)
            }

            console.log("TZ test conversion return:", clusterID, commandID, "params:", JSON.stringify(parameters), "payload:", JSON.stringify(converted.payload))

            return {
                clusterID: clusterID,
                commandID: commandID,
                parameters: parameters,
                payload: converted.payload
            }
        }
        else {
            console.warn("Device not found:", device)
            return {};
        }
    }

    function convertFromZigbee(deviceStr, clusterNumber, attr, value, commandID, serverToClient, clusterSpecific) {

        console.log("attr:", attr, "value:", value, "command ID:", commandID, "serverToClient:", serverToClient, "clusterSpecific:", clusterSpecific)

        const device = JSON.parse(deviceStr)

        const definition = C.findByDevice(device)
        if (!definition) {
            console.warn("Device not found:", device)
            return null;
        }

        const cluster = C.findClusterByID(clusterNumber)
        if (!cluster) {
            console.warn("Cluster not found:", clusterNumber)
            return null;
        }

        console.log("Cluster:", JSON.stringify(cluster))

        let commandName
        let valResult

        const buff = new Buffer.Buffer(value)
        // console.log("Value type:", typeof value, "value:", buff);
        const buf = new BuffaloZcl.BuffaloZcl(buff);

        let globalCmdResult

        if (clusterSpecific) {
            const objectToLookThrough = serverToClient ? cluster.commandsResponse : cluster.commands;
            commandName = Object.keys(objectToLookThrough).find((c) => objectToLookThrough[c].ID === commandID);

            globalCmdResult = parsePayloadCluster(commandID, cluster, buf, serverToClient);

            console.log("parsePayloadCluster result:", JSON.stringify(globalCmdResult), "type:", typeof globalCmdResult);
        }
        else {
            console.log("Searching for global command...");
            commandName = Object.keys(Foundation.default).find((c) => Foundation.default[c].ID === commandID);

            globalCmdResult = parsePayloadGlobal(commandID, buf)

            console.log("parseGlobalCommand result:", JSON.stringify(globalCmdResult));
        }

        if (commandName)
            console.log("Command name:", commandName)

        let eventName = ""

        if (clusterSpecific) {
            eventName = EVENTS.CommandsLookup[commandName];
            valResult = globalCmdResult;
        }
        else {
            if (commandName === 'report') {
                eventName = 'attributeReport';
                valResult = ZclFrameConverter.attributeKeyValue(globalCmdResult, cluster);
            }
            else if (commandName === 'read') {
                eventName = 'read';
                valResult = ZclFrameConverter.attributeList(globalCmdResult, cluster);
            }
            else if (commandName === 'write') {
                eventName = 'write';
                valResult = ZclFrameConverter.attributeKeyValue(globalCmdResult, cluster);
            }
            else {
                /* istanbul ignore else */
                if (commandName === 'readRsp') {
                    eventName = 'readResponse';
                    valResult = ZclFrameConverter.attributeKeyValue(globalCmdResult, cluster);
                }
            }
            // valResult = JSON.stringify(valResult); // Need a string
        }

        console.log("Event name:", eventName);
        console.log("READ VALUE:", JSON.stringify(valResult))

        const endpoint = JSON.stringify(device.endpoint);

        const data = {
            type: eventName,
            data: valResult,
            cluster: cluster.name,
            endpoint: endpoint
        }

        console.log("Received data:", JSON.stringify(data))

        console.log("Definition:", JSON.stringify(definition))

        const resolvedEntity = { definition: definition, settings: {} }

        return onZigbeeEvent('message', data, resolvedEntity, device)
    }

    function parsePayloadGlobal(commandID, buffalo) {

        console.log(`parsePayloadGlobal: ${JSON.stringify(buffalo)}`)

        const definition_1 = {
            Foundation: Foundation.default,
            DataType: DataType,
            BuffaloZclDataType: BuffaloZclDataType.BuffaloZclDataType
        }

        const command = Object.values(definition_1.Foundation).find((c) => c.ID === commandID);
        if (command.parseStrategy === 'repetitive') {
            const payload = [];
            while (buffalo.isMore()) {
                const entry = {};
                for (const parameter of command.parameters) {
                    const options = {};
                    // if (!this.conditionsValid(parameter, entry, buffalo.getBuffer().length - buffalo.getPosition())) {
                    //     continue;
                    // }
                    if (parameter.type === definition_1.BuffaloZclDataType.USE_DATA_TYPE && typeof entry.dataType === 'number') {
                        // We need to grab the dataType to parse useDataType
                        // options.dataType = definition_1.DataType[entry.dataType];
                        options.dataType = definition_1.DataType.getTypeString(entry.dataType);

                        console.log("entry.dataType:", entry.dataType, "entry:", JSON.stringify(entry));

                        if (entry.dataType === definition_1.DataType.charStr && entry.hasOwnProperty('attrId')) {
                            // For Xiaomi struct parsing we need to pass the attributeID.
                            options.attrId = entry.attrId;
                        }
                    }

                    console.log("Parameter type:", parameter.type, "DataType:", definition_1.DataType.getTypeString(parameter.type))

                    // const typeStr = definition_1.DataType[parameter.type] != null ?
                    //     definition_1.DataType[parameter.type] : definition_1.BuffaloZclDataType[parameter.type];
                    const typeStr = definition_1.DataType.getTypeString(parameter.type) != null ?
                        definition_1.DataType.getTypeString(parameter.type) : BuffaloZclDataType.getTypeString(parameter.type);

                    console.log("typeStr:", typeStr, "options:", JSON.stringify(options))

                    entry[parameter.name] = buffalo.read(typeStr, options);
                    // TODO: not needed, but temp workaroudn to make payload equal to that of zcl-packet
                    if (parameter.type === definition_1.BuffaloZclDataType.USE_DATA_TYPE && entry.dataType === definition_1.DataType.struct) {
                        entry['structElms'] = entry.attrData;
                        entry['numElms'] = entry.attrData.length;
                    }
                }
                payload.push(entry);
            }
            return payload;
        }
        else if (command.parseStrategy === 'flat') {
            const payload = {};
            for (const parameter of command.parameters) {
                payload[parameter.name] = buffalo.read(definition_1.DataType[parameter.type], {});
            }
            return payload;
        }
        else {
            /* istanbul ignore else */
            if (command.parseStrategy === 'oneof') {
                /* istanbul ignore else */
                if (command === definition_1.Foundation.discoverRsp) {
                    const payload = {};
                    payload.discComplete = buffalo.readUInt8();
                    payload.attrInfos = [];
                    while (buffalo.isMore()) {
                        const entry = {};
                        for (const parameter of command.parameters) {
                            entry[parameter.name] = buffalo.read(definition_1.DataType[parameter.type], {});
                        }
                        payload.attrInfos.push(entry);
                    }
                    return payload;
                }
            }
        }
    }

    function parsePayloadCluster(commandID, cluster, buffalo, serverToClient) {
        console.log(`parsePayloadCluster: ${JSON.stringify(buffalo)}`)

        const definition_1 = {
            Foundation: Foundation.default,
            DataType: DataType,
            BuffaloZclDataType: BuffaloZclDataType.BuffaloZclDataType
        }

        const ListTypes = [
            definition_1.BuffaloZclDataType.LIST_UINT8,
            definition_1.BuffaloZclDataType.LIST_UINT16,
            definition_1.BuffaloZclDataType.LIST_UINT24,
            definition_1.BuffaloZclDataType.LIST_UINT32,
            definition_1.BuffaloZclDataType.LIST_ZONEINFO,
        ];

        const command = Object.values(!serverToClient ? cluster.commands : cluster.commandsResponse).find((c) => c.ID == commandID);
        const payload = {};
        for (const parameter of command.parameters) {
            const options = { payload };
            if (ListTypes.includes(parameter.type)) {
                const lengthParameter = command.parameters[command.parameters.indexOf(parameter) - 1];
                const length = payload[lengthParameter.name];
                /* istanbul ignore else */
                if (typeof length === 'number') {
                    options.length = length;
                }
            }
            // const typeStr = ZclFrame.getDataTypeString(parameter.type);
            const typeStr = DataType.getTypeString(parameter.type);
            payload[parameter.name] = buffalo.read(typeStr, options);
        }
        return payload;
    }

    function shouldProcess(type, data, resolvedEntity) {
        if (type !== 'message' || !resolvedEntity) {
            return false;
        }

        if (!resolvedEntity.definition) {
            if (data.device.interviewing) {
                console.log(`Skipping message, definition is undefined and still interviewing`);
            } else {
                console.warn(
                    `Received message from unsupported device with Zigbee model '${data.device.modelID}' ` +
                    `and manufacturer name '${data.device.manufacturerName}'`);
                console.warn(`Please see: https://www.zigbee2mqtt.io/how_tos/how_to_support_new_devices.html.`);
            }

            return false;
        }

        return true;
    }

    function onZigbeeEvent(type, data, resolvedEntity, device) {
        /**
         * Handling of re-transmitted Xiaomi messages.
         * https://github.com/Koenkk/zigbee2mqtt/issues/1238
         * https://github.com/Koenkk/zigbee2mqtt/issues/3592
         *
         * Some Xiaomi router devices re-transmit messages from Xiaomi end devices.
         * The network address of these message is set to the one of the Xiaomi router.
         * Therefore it looks like if the message came from the Xiaomi router, while in
         * fact it came from the end device.
         * Handling these message would result in false state updates.
         * The group ID attribute of these message defines the network address of the end device.
         */
        // if (type === 'message' && utils.isXiaomiDevice(data.device) && data.device.type === 'Router' && data.groupID) {
        //     logger.debug('Handling re-transmitted Xiaomi message');
        //     data.device = this.zigbee.getDeviceByNetworkAddress(data.groupID);
        //     resolvedEntity = this.zigbee.resolveEntity(data.device);
        // }

        if (!shouldProcess(type, data, resolvedEntity)) {
            return null;
        }

        const converters = resolvedEntity.definition.fromZigbee.filter((c) => {
            console.log("converter:", JSON.stringify(c));
            const type = Array.isArray(c.type) ? c.type.includes(data.type) : c.type === data.type;
            return c.cluster === data.cluster && type;
        });

        // Check if there is an available converter, genOta messages are not interesting.
        if (!converters.length && !['genOta', 'genTime', 'genBasic'].includes(data.cluster)) {
            console.log(
                `No converter available for '${resolvedEntity.definition.model}' with cluster '${data.cluster}' ` +
                `and type '${data.type}' and data '${JSON.stringify(data.data)}'`,
            );
            return null;
        }

        // const meta = {device: data.device, logger, state: this.state.get(data.device.ieeeAddr)};
        const meta = { device: { manufacturerName: device.manufacturerName } };

        let payload = [];

        converters.forEach((converter) => {
            console.log("Before converting:", JSON.stringify(converter))
            const converted = converter.convert(
                resolvedEntity.definition, data, () => {}, resolvedEntity.settings, meta,
            );
            if (converted) {
                payload.push(converted);

                console.log("CONVERTED:", JSON.stringify(payload))
            }
        });

        return payload;
    }
}
