var mysql = require('mysql');
var config = require('./dbconf');

var sqlstring = require('sqlstring');


var dao = {};

var getRes = function (querystr, callback) {
	var con = mysql.createConnection(config);

	con.connect();
	con.query(querystr, function(err, ans) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, ans);
		}
	});
	con.end();
}

module.exports = dao;

dao.getData = function(callback) {
	var sqlstr = sqlstring.format('select name, nick from users');

	getRes(sqlstr, function(err, ans) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, ans);
		}
	});
}
