'use strict'
var request = require('snekfetch');
var wa = require('./Writeas');

function Client(endpoint) {
  Client.prototype.endpoint = endpoint;
  this.accessToken;
};

Client.prototype.authenticate = function(client, username, password) {
  return Client.prototype._request('post', '/auth/login', { alias: username, pass: password })
    .then(( access_token ) => {
      client.accessToken = JSON.parse(access_token).data.access_token;
    }).catch((error) => {
      console.log('Something went wrong in client.js: ', error);
    });
};

Client.prototype._request = function(method, path, data) {
  if(this.path) data.headers = "Authorization: Token " + this.accessToken;
  console.log(data);
  return new request(method, this.endpoint+path, { data }).then(
    (res) => {
      if(res.ok === true) {
        return res.text;
      }
    }).catch((error) => {
      throw error.body;
    });
};

module.exports = Client;
