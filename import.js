var dao = require('./modules/dao');
var ejs = require('ejs');
var fs = require('fs');
var path = __dirname + '/views/index.ejs';
var str = fs.readFileSync(path, 'utf8');

dao.getData(function (err, ans) {
	if (err) {
		console.log(err);
	} else {
		var ret = ejs.render(str, {
			users: ans
		});

		fs.writeFile('./import.sql', ret, 'utf8', function(err) {
			if (err) {
				console.log('err...');
			} else {
				console.log('finished.');
			}
		})
	}
});
