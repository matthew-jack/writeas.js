'use strict'
var Client = require('./client');
var Post = require('./post');
const { endpoints } = require('./constants');

function Writeas(options) {
  this.endpoint = options.hasOwnProperty('protocol') ? options.protocol : endpoints.https;
  this.username = options.username ? options.username : null;
  this.password = options.password ? options.password : null;
  this.client = new Client(this.endpoint);
};

Writeas.prototype.authenticate = function(client) {
  return client.authenticate(this.client, this.username, this.password).then( () => { return this } );
}

module.exports = Writeas;
