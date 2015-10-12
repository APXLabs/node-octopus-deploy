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
machine.prototype.getAll = function() {

	var options = {
		uri: '/api/machines/'
	};

	var macarray = new Array();

	// Make initial machine call
	var prom = this.client.request.get(options);

	var promarr = new Array();
	promarr.push(prom);

	prom.then(function (machines) {
		macarray.push(machines.Items);
		var pages = Math.ceil(machines.TotalResults / machines.ItemsPerPage);
		for (i = 1; i < pages; i++) {
			var page = "Page." + i;
			var options = {
				uri: machines.Links[page]
			};
			var pageprom = this.client.request.get(options);
			pageprom.then(function (machines) {
				macarray.push(machines.Items);
			});
			promarr.push(pageprom);
		}
		return macarray;
	});

	return promarr;
};

module.exports = machine;
