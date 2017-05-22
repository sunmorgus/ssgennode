const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var getInput = function(){
		rl.question('Input Number: ', (answer) => {
		var inNum = parseInt(answer);
		
		if (isNaN(inNum)) {
			console.log('You must enter a number!');
		}
		
		rl.close();
		getSeqSum(inNum);
	});
}

var getSeqSum = function(inNum){
	var hold = [];
	var tries = [];
	var start = 0;
	var i = 0;
	var found = false;
	do {
		hold.push(i);
		var sum = hold.reduce((a, b) => a + b, 0).toFixed(2);

		if (sum === inNum) {
			console.log('found it');
			console.log(hold.join('+'));
			found = true;
		}
		else if (sum < inNum) {
			i += 1;
		}
		else if (sum > inNum) {
			console.log("Tried starting at " + start);
			start += 1;
			i = start;
			tries.push(hold);
			hold = [];
		}
		
		if (start > inNum) {
			//console.log("We tried all these and couldnt get an answer:");
			//for (var a = 0; a < tries.length; a++) {
			//	console.log(tries[a].join("+"));
			//}
			console.log(inNum + " has no sequential sum!");
			found = true;
		}
	} while (!found);
}

getInput();
