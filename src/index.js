'use strict'
var Writeas = require('./writeas');
var Post = require('./post');

const options = {
  'username': '',
  'password': '',
};

var wa = new Writeas(options);
wa.authenticate(wa.client).then( /* do stuff */);
