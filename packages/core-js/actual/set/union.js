'use strict';
require('../../modules/es.set.constructor');
require('../../modules/esnext.set.union');
var entryUnbind = require('../../internals/entry-unbind');

module.exports = entryUnbind('Set', 'union');
