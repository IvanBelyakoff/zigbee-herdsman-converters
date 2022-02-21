function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

export default _classApplyDescriptorGet;
module.exports["default"] = module.exports, module.exports.__esModule = true;