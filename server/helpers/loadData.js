
var req = {body: require('../../clientData.json')};
require('../database/people/controller').post(req, {send: function() {}});
