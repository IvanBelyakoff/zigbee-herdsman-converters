"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.attributeList = exports.attributeKeyValue = void 0;

function getAttribute(attributes, attrId) {
    for (const [key, val] of Object.entries(attributes)) {
        if (val.ID == attrId)
            return { name: key }
    }
}

export function attributeKeyValue(Payload, cluster) {
    console.log("Received data in attributeKeyValue:", JSON.stringify(Payload))

    const payload = {};
    for (const item of Payload) {
        try {
            const attribute = getAttribute(cluster.attributes, item.attrId);
            payload[attribute.name] = item.attrData;
        }
        catch (error) {
            payload[item.attrId] = item.attrData;
        }
    }
    console.log("Converted data in attributeKeyValue:", JSON.stringify(payload))
    return payload;
}
// exports.attributeKeyValue = attributeKeyValue;
export function attributeList(Payload, cluster) {
    console.log("Received data in attributeList:", JSON.stringify(Payload))
    const payload = [];
    for (const item of Payload) {
        try {
            const attribute = getAttribute(cluster.attributes, item.attrId);
            payload.push(attribute.name);
        }
        catch (error) {
            payload.push(item.attrId);
        }
    }
    console.log("Converted data in attributeList:", JSON.stringify(payload))
    return payload;
}
// exports.attributeList = attributeList;
//# sourceMappingURL=zclFrameConverter.js.map
