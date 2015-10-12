'use strict';

var deployment = require('./deployment.js');
var environment = require('./environment.js');
var release = require('./release.js');
var project = require('./project.js');
var variable = require('./variable.js');
var machine = require('./machine.js');

var helper = require('./helper.js');

var Client = function(config) {

	// Verify Configuration was passed
	if (!config){
		throw new Error('config is required to instantiate client');
	}
	if (!config.host){
		throw new Error('host is required to instantiate client');
	}
	if (!config.apiKey){
		throw new Error('apiKey is required to instantiate client');
	}

	this.config = config;

	this.request = require("request-promise").defaults(
		{
			baseUrl: config.host,
			json: true,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'X-Octopus-ApiKey': config.apiKey
			}
		}
	);

	this.deployment = new deployment(this);
	this.environment = new environment(this);
	this.release = new release(this);
	this.project = new project(this);
	this.variable = new variable(this);
	this.machine = new machine(this);

	this.helper = new helper(this);
};

module.exports = Client;
