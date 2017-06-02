const readline = require('readline');
const Parallel = require('paralleljs');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var logData = function (data) {
	console.log(data.name + " found " + data.ans + " answer(s). Took " + data.timeDiff + " seconds.");
}

var getInput = function () {
	rl.question('Input Number: ', (answer) => {
		var inNum = parseInt(answer);

		if (isNaN(inNum)) {
			console.log('You must enter a number!');
		}

		rl.close();
		const a = new Parallel(inNum).require({ fn: getSeqSumFor, name: 'getSeqSumFor' }).spawn(function (data) { return getSeqSumFor(data); }).then(logData);

		const b = new Parallel(inNum).require({ fn: getSeqSum, name: 'getSeqSum' }).spawn(getSeqSum).then(logData);

		const c = new Parallel(inNum).require({ fn: getSeqSumForDown, name: 'getSeqSumForDown' }).spawn(getSeqSumForDown).then(logData);

		const d = new Parallel(inNum).require({ fn: getSeqSumDown, name: 'getSeqSumDown' }).spawn(getSeqSumDown).then(logData)
	});
}

var getSeqSum = function (inNum) {
	var s = new Date();
	var hold = [];
	var ans = 0;
	var start = 1;
	var i = 1;
	var found = false;
	do {
		hold.push(i);
		var sum = hold.reduce((a, b) => a + b, 0);

		if (sum === inNum && start != inNum) {
			ans += 1;
		}
		else if (sum < inNum) {
			i += 1;
		}
		else if (sum > inNum) {
			//console.log("Tried starting at " + start);
			start += 1;
			i = start;
			hold = [];
		}

		if (start > inNum) {
			found = true;
		}
	} while (!found);

	var e = new Date();
	//var t = global.env.calcTime(s, e);
	// console.log("RedUp found " + ans + " answer(s). Took " + t + " seconds.");
	var timeDiff = e - s;
	timeDiff /= 1000;
	return { name: 'RedUp', ans: ans, timeDiff: timeDiff };
}

var getSeqSumDown = function (inNum) {
	var s = new Date();
	var hold = [0];
	var ans = 0;
	var start = inNum;
	var i = inNum - 1;
	var found = false;
	do {
		hold.push(i);
		var sum = hold.reduce((a, b) => a + b, 0);

		if (sum === inNum) {
			ans += 1;
		}
		else if (sum < inNum) {
			i -= 1;
		}
		else if (sum > inNum) {
			//console.log("Tried starting at " + start);
			start -= 1;
			i = start;

			hold = [0];
		}

		if (start < 0 || i < 0) {
			found = true;
		}
	} while (!found);

	hold = hold.slice(1, hold.length);
	var e = new Date();
	// var t = global.env.calcTime(s, e);
	var timeDiff = e - s;
	timeDiff /= 1000;
	return { name: 'RedDown', ans: ans, timeDiff: timeDiff };
}

var getSeqSumFor = function (inNum) {
	var s = new Date();
	var hold = [];
	var ans = 0;
	var start = 1;
	var i = 1;
	var found = false;
	do {
		hold.push(i);

		var sum = 0;
		for (var b = 0; b < hold.length; b++) {
			sum += hold[b];
		}

		if (sum === inNum && start != inNum) {
			ans += 1;
		}
		else if (sum < inNum) {
			i += 1;
		}
		else if (sum > inNum) {
			//console.log("Tried starting at " + start);
			start += 1;
			i = start;

			hold = [];
		}

		if (start > inNum) {
			found = true;
		}
	} while (!found);

	var e = new Date();
	// var t = global.env.calcTime(s, e);
	// console.log("ForUp found " + ans + " answer(s). Took " + t + " seconds.");
	var timeDiff = e - s;
	timeDiff /= 1000;
	return { name: 'ForUp', ans: ans, timeDiff: timeDiff };
}


var getSeqSumForDown = function (inNum) {
	var s = new Date();
	var hold = [0];
	var ans = 0;
	var start = inNum;
	var i = inNum - 1;
	var found = false;
	do {
		hold.push(i);

		var sum = 0;
		for (var b = 0; b < hold.length; b++) {
			sum += hold[b];
		}
		if (sum === inNum) {
			ans += 1;
		}
		else if (sum < inNum) {
			i -= 1;
		}
		else if (sum > inNum) {
			//console.log("Tried starting at " + start);
			start -= 1;
			i = start;

			hold = [0];
		}

		if (start < 0 || i < 0) {
			found = true;
		}
	} while (!found);

	hold = hold.slice(1, hold.length);
	var e = new Date();
	// var t = global.env.calcTime(s, e);
	// console.log("ForDown found " + ans + " answer(s). Took " + t + " seconds.");
	var timeDiff = e - s;
	timeDiff /= 1000;
	return { name: 'ForDown', ans: ans, timeDiff: timeDiff };
}


getInput();
