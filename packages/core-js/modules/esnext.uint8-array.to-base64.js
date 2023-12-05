'use strict';
var $ = require('../internals/export');
var global = require('../internals/global');
var anObjectOrUndefined = require('../internals/an-object-or-undefined');
var anUint8Array = require('../internals/an-uint8-array');
var base64Map = require('../internals/base64-map');
var getAlphabetOption = require('../internals/get-alphabet-option');

var base64Alphabet = base64Map.i2c;
var base64UrlAlphabet = base64Map.i2cUrl;

var Uint8Array = global.Uint8Array;

// `Uint8Array.prototype.toBase64` method
// https://github.com/tc39/proposal-arraybuffer-base64
if (Uint8Array) $({ target: 'Uint8Array', proto: true, forced: true }, {
  toBase64: function toBase64(/* options */) {
    var array = anUint8Array(this);
    var options = arguments.length ? anObjectOrUndefined(arguments[0]) : undefined;
    var alphabet = getAlphabetOption(options) === 'base64' ? base64Alphabet : base64UrlAlphabet;

    var result = '';
    var i = 0;
    var length = array.length;
    var triplet;

    var at = function (shift) {
      return alphabet[(triplet >> (6 * shift)) & 63];
    };

    for (; i + 2 < length; i += 3) {
      triplet = (array[i] << 16) + (array[i + 1] << 8) + array[i + 2];
      result += at(3) + at(2) + at(1) + at(0);
    }
    if (i + 2 === length) {
      triplet = (array[i] << 16) + (array[i + 1] << 8);
      result += at(3) + at(2) + at(1) + '=';
    } else if (i + 1 === length) {
      triplet = array[i] << 16;
      result += at(3) + at(2) + '==';
    }

    return result;
  },
});
