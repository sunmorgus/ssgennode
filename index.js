const readline = require('readline');
const Parallel = require('paralleljs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var calcTime = function(s, e){
	var timeDiff = e - s;
	timeDiff /= 1000;
	//var seconds = Math.round(timeDiff % 60);
	
	//console.log("Took " + timeDiff + " seconds");
	return timeDiff;
}

var getInput = function(){
		rl.question('Input Number: ', (answer) => {
		var inNum = parseInt(answer);
		
		if (isNaN(inNum)) {
			console.log('You must enter a number!');
		}
		
		rl.close();
		const p = new Parallel([inNum], { env: { calcTime: calcTime}});
		
		p.spawn(getSeqSumFor);
		
		p.spawn(getSeqSum);
		
		p.spawn(getSeqSumForDown);
		
		p.spawn(getSeqSumDown);
	});
}

var getSeqSum = function(inNum){
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
	var t = global.env.calcTime(s, e);
	console.log("RedUp found " + ans + " answer(s). Took " + t + " seconds.");
}

var getSeqSumDown = function(inNum){
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
	var t = global.env.calcTime(s, e);			
	console.log("RedDown found " + ans + " answer(s). Took " + t + " seconds.");
}

var getSeqSumFor = function(inNum){
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
	console.log(global);
	var t = global.env.calcTime(s, e);		
	console.log("ForUp found " + ans + " answer(s). Took " + t + " seconds.");
}


var getSeqSumForDown = function(inNum){
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
	var t = global.env.calcTime(s, e);
	console.log("ForDown found " + ans + " answer(s). Took " + t + " seconds.");
}


getInput();
