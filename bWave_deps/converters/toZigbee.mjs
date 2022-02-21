'use strict';

import * as _color from "../lib/color.mjs";
import * as _constants from "../lib/constants.mjs";
import * as _light from "../lib/light.mjs";
import * as _legacy from "../lib/legacy.mjs";
import * as _manufacturerCode from "../manufacturerCode.mjs";
import * as _utils from "../lib/utils.mjs";
import * as _tuya from "../lib/tuya.mjs";
import * as _store from "../lib/store.mjs";
import * as _toConsumableArray2 from "@babel/runtime/helpers/esm/toConsumableArray.mjs";
import * as _defineProperty2 from "@babel/runtime/helpers/esm/defineProperty.mjs";
import * as _asyncToGenerator2 from "@babel/runtime/helpers/esm/asyncToGenerator.mjs";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var module = {
  exports: {}
};
var exports = module.exports;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const globalStore = _store.default;
const tuya = _tuya.default;
const utils = _utils.default;
const ManufacturerCode = _manufacturerCode.default;
const legacy = _legacy.default;
const light = _light.default;
const constants = _constants.default;
const libColor = _color.default;
const manufacturerOptions = {
  xiaomi: {
    manufacturerCode: ManufacturerCode.LUMI_UNITED_TECH,
    disableDefaultResponse: true
  },
  osram: {
    manufacturerCode: ManufacturerCode.OSRAM
  },
  eurotronic: {
    manufacturerCode: ManufacturerCode.JENNIC
  },
  danfoss: {
    manufacturerCode: ManufacturerCode.DANFOSS
  },
  hue: {
    manufacturerCode: ManufacturerCode.PHILIPS
  },
  sinope: {
    manufacturerCode: ManufacturerCode.SINOPE_TECH
  },

  /*
   * Ubisys doesn't accept a manufacturerCode on some commands
   * This bug has been reported, but it has not been fixed:
   * https://github.com/Koenkk/zigbee-herdsman/issues/52
   */
  ubisys: {
    manufacturerCode: ManufacturerCode.UBISYS
  },
  ubisysNull: {
    manufacturerCode: null
  },
  tint: {
    manufacturerCode: ManufacturerCode.MUELLER_LICHT_INT
  },
  legrand: {
    manufacturerCode: ManufacturerCode.VANTAGE,
    disableDefaultResponse: true
  },
  viessmann: {
    manufacturerCode: ManufacturerCode.VIESSMAN_ELEKTRO
  }
};

var transid = undefined
var transId = undefined

const converters = {
    on_off: {
        key: ['state', 'on_time', 'off_wait_time'],
        convertSet: (entity, key, value, meta) => {
            const state = meta.message.hasOwnProperty('state') ? meta.message.state.toLowerCase() : null;
            utils.validateValue(state, ['toggle', 'off', 'on']);

            if (state === 'on' && (meta.message.hasOwnProperty('on_time') || meta.message.hasOwnProperty('off_wait_time'))) {
                const onTime = meta.message.hasOwnProperty('on_time') ? meta.message.on_time : 0;
                const offWaitTime = meta.message.hasOwnProperty('off_wait_time') ? meta.message.off_wait_time : 0;

                if (typeof onTime !== 'number') {
                    throw Error('The on_time value must be a number!');
                }
                if (typeof offWaitTime !== 'number') {
                    throw Error('The off_wait_time value must be a number!');
                }

                const payload = {ctrlbits: 0, ontime: Math.round(onTime * 10), offwaittime: Math.round(offWaitTime * 10)};
                // await entity.command('genOnOff', 'onWithTimedOff', payload, utils.getOptions(meta.mapped, entity));
                return {
                    clusterKey: 'genOnOff',
                    commandKey: 'onWithTimedOff',
                    payload: payload,
                    options: utils.getOptions(meta.mapped, entity)
                };
            } else {
                // await entity.command('genOnOff', state, {}, utils.getOptions(meta.mapped, entity));
                return {
                    clusterKey: 'genOnOff',
                    commandKey: state,
                    payload: {},
                    options: utils.getOptions(meta.mapped, entity)
                };

                // if (state === 'toggle') {
                //     const currentState = meta.state[`state${meta.endpoint_name ? `_${meta.endpoint_name}` : ''}`];
                //     return currentState ? {state: {state: currentState === 'OFF' ? 'ON' : 'OFF'}} : {};
                // } else {
                //     return {state: {state: state.toUpperCase()}};
                // }
            }
        },
        convertGet: (entity, key, meta) => {
            // await entity.read('genOnOff', ['onOff']);
            return {
                clusterKey: 'genOnOff',
                attributes: ['onOff'],
            };
        },
    },
    tuya_cover_control: {
        key: ['state', 'position'],
        // convertSet: async (entity, key, value, meta) => {
        convertSet: (entity, key, value, meta) => {
            // Protocol description
            // https://github.com/Koenkk/zigbee-herdsman-converters/issues/1159#issuecomment-614659802

            console.log("meta:", JSON.stringify(meta))

            if (key === 'position') {
                if (value >= 0 && value <= 100) {
                    const invert = tuya.isCoverInverted(meta.device.manufacturerName) ?
                        !meta.options.invert_cover : meta.options.invert_cover;

                    value = invert ? 100 - value : value;
                    // await tuya.sendDataPointValue(entity, tuya.dataPoints.coverPosition, value);

        // entity,
        // dataTypes.value,
        // dp,
        // convertDecimalValueTo4ByteHexArray(value),
        // cmd,
        // transid,
                    const data = tuya.convertDecimalValueTo4ByteHexArray(value);

                    return {
                        clusterKey: 'manuSpecificTuya',
                        commandKey: 'setData',
                        payload: {
                            status: 0,
                            transid: transid,
                            dp: tuya.dataPoints.coverPosition,
                            datatype: tuya.dataTypes.value,
                            length_hi: (data.length >> 8) & 0xFF,
                            length_lo: data.length & 0xFF,
                            data: data,
                        },
                        options: {disableDefaultResponse: true}
                    };
                } else {
                    throw new Error('TuYa_cover_control: Curtain motor position is out of range');
                }
            } else if (key === 'state') {
                const stateEnums = tuya.getCoverStateEnums(meta.device.manufacturerName);
                meta.logger.debug(`TuYa_cover_control: Using state enums for ${meta.device.manufacturerName}:
                ${JSON.stringify(stateEnums)}`);

                value = value.toLowerCase();
                    if (transid === undefined) {
                        if (transId === undefined) {
                            transId = 0;
                        } else {
                            transId++;
                            transId %= 256;
                        }

                        transid = transId;
                    }
                switch (value) {
                case 'close':
                    // await tuya.sendDataPointEnum(entity, tuya.dataPoints.state, stateEnums.close);
        // 'manuSpecificTuya',
        // cmd || 'setData',
        // {
        //     status: 0,
        //     transid,
        //     dp: dp,
        //     datatype: datatype,
        //     length_hi: (data.length >> 8) & 0xFF,
        //     length_lo: data.length & 0xFF,
        //     data: data,
        // },
        // {disableDefaultResponse: true},

                    let data = [stateEnums.close]

                    return {
                        clusterKey: 'manuSpecificTuya',
                        commandKey: 'setData',
                        payload: {
                            status: 0,
                            transid: transid,
                            dp: tuya.dataPoints.state,
                            datatype: tuya.dataTypes.enum,
                            length_hi: (data.length >> 8) & 0xFF,
                            length_lo: data.length & 0xFF,
                            data: data,
                        },
                        options: {disableDefaultResponse: true}
                    };
                    break;
                case 'open':
                    // await tuya.sendDataPointEnum(entity, tuya.dataPoints.state, stateEnums.open);
                    data = [stateEnums.open]

                    return {
                        clusterKey: 'manuSpecificTuya',
                        commandKey: 'setData',
                        payload: {
                            status: 0,
                            transid: transid,
                            dp: tuya.dataPoints.state,
                            datatype: tuya.dataTypes.enum,
                            length_hi: (data.length >> 8) & 0xFF,
                            length_lo: data.length & 0xFF,
                            data: data,
                        },
                        options: {disableDefaultResponse: true}
                    };
                    break;
                case 'stop':
                    // await tuya.sendDataPointEnum(entity, tuya.dataPoints.state, stateEnums.stop);
                    data = [stateEnums.stop]

                    return {
                        clusterKey: 'manuSpecificTuya',
                        commandKey: 'setData',
                        payload: {
                            status: 0,
                            transid: transid,
                            dp: tuya.dataPoints.state,
                            datatype: tuya.dataTypes.enum,
                            length_hi: (data.length >> 8) & 0xFF,
                            length_lo: data.length & 0xFF,
                            data: data,
                        },
                        options: {disableDefaultResponse: true}
                    };
                    break;
                default:
                    throw new Error('TuYa_cover_control: Invalid command received');
                }
            }
        },
    },
    // tuya_cover_options: {
    //     key: ['options'],
    //     convertSet: async (entity, key, value, meta) => {
    //         if (value.reverse_direction != undefined) {
    //             if (value.reverse_direction) {
    //                 meta.logger.info('Motor direction reverse');
    //                 await tuya.sendDataPointEnum(entity, tuya.dataPoints.motorDirection, 1);
    //             } else {
    //                 meta.logger.info('Motor direction forward');
    //                 await tuya.sendDataPointEnum(entity, tuya.dataPoints.motorDirection, 0);
    //             }
    //         }
    //
    //         if (value.motor_speed != undefined) {
    //             if (value.motor_speed < 0 || value.motor_speed > 255) {
    //                 throw new Error('TuYa_cover_control: Motor speed is out of range');
    //             }
    //
    //             meta.logger.info(`Setting motor speed to ${value.motor_speed}`);
    //             await tuya.sendDataPointValue(entity, tuya.dataPoints.coverSpeed, value.motor_speed);
    //         }
    //     },
    // },
};

module.exports = converters;

export default module.exports;
