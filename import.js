var dao = require('./modules/dao');
var affiliation = require('./modules/affiliationconf.js');

var ejs = require('ejs');
var fs = require('fs');
var path = __dirname + '/views/index.ejs';
var str = fs.readFileSync(path, 'utf8');

var findAffliation = function (ans) {
	ans.forEach(function(_ansi, index, arr) {
		
		var isChanged = false;

		affiliation.forEach(function(_aff, inpx) {
			var isa = _aff.shortname.toLowerCase().indexOf(_ansi.school.toString().toLowerCase());
			var isb = _aff.name.toLowerCase().indexOf(_ansi.school.toString().toLowerCase());
			if (isa >= 0 || isb >= 0) {
				console.log(_ansi.school  + ' [-] ' + _aff.name);
				arr[index].school = inpx+2;
				isChanged = true;
			}
		});

		if(false == isChanged) {
			arr[index].school = 1;
		}
	});
	return ans;
}

dao.getData(function (err, ans) {
	if (err) {
		console.log(err);
	} else {
		ans.forEach(function(ansi) {
			console.log(ansi.school);
		})
		// console.log(ans);
		ans = findAffliation(ans);
		// console.log(ans);		
		ans.forEach(function(ansi) {
			console.log(ansi.school);
		})
		var ret = ejs.render(str, {
			aff:affiliation,
			users: ans
		});

		fs.writeFile('./import.sql', ret, 'utf8', function(err) {
			if (err) {
				console.log('err...');
			} else {
				console.log('finished.');
			}
		});
	}
});
