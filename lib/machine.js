/**
 * machine resource actions
 */
'use strict';

var internals = {};

/**
 * Constructor
 *
 * @param client
 */
var machine = function (client) {
	this.client = client;
};

/**
 * Find a machine by a unique machine by slug or id
 *
 * @param slug
 * @returns {promise|Object}
 */
machine.prototype.getAll = function(skip) {
	var skipcount = skip || 0;
	var options = {
		uri: '/api/machines?skip=' + skipcount
	};

	// Make initial machine call
	return this.client.request.get(options);
};

module.exports = machine;
