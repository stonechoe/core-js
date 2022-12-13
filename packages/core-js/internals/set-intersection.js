'use strict';
var SetHelpers = require('../internals/set-helpers');
var getSetRecord = require('../internals/get-set-record');
var iterateSimple = require('../internals/iterate-simple');

var Set = SetHelpers.Set;
var aSet = SetHelpers.aSet;
var add = SetHelpers.add;
var has = SetHelpers.has;
var size = SetHelpers.size;
var iterate = SetHelpers.iterate;
var nativeHas = SetHelpers.$has;
var nativeKeys = SetHelpers.$keys;

var isNativeSetRecord = function (record) {
  return record.has === nativeHas && record.keys === nativeKeys;
};

// `Set.prototype.intersection` method
// https://github.com/tc39/proposal-set-methods
module.exports = function intersection(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  var result = new Set();

  // observable side effects
  if (!isNativeSetRecord(otherRec) && size(O) > otherRec.size) {
    iterateSimple(otherRec.getIterator(), function (e) {
      if (has(O, e)) add(result, e);
    });

    if (size(result) < 2) return result;

    var disordered = result;
    result = new Set();
    iterate(O, function (e) {
      if (has(disordered, e)) add(result, e);
    });
  } else {
    iterate(O, function (e) {
      if (otherRec.includes(e)) add(result, e);
    });
  }

  return result;
};
