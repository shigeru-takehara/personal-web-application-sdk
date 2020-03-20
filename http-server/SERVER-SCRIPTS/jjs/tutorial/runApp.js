function jjsExec(args) {
	var params = pwa.process.getArgs4Jjs(args);
	var tempFilePrefix = params[0];
	var implementation = params[1]; //From Implementation Radiobox Selection

	// The second parameter printFlag=false because it's server-side processing. We don't want to display anything.
	// The third parameter logFlag=false because we don't call getCommandResult method at all.
	var cmdObjects = pwa.commandWindow.initialize(tempFilePrefix, false, false);

	cmdObjects.cmdWin.executeCommand('UTIL\\tutorial\\StartExampleApp1.bat');

	if (implementation === '1') {
		implementation1(cmdObjects);
	}
	else if (implementation === '2') {
		implementation2(cmdObjects);
	}
	else if (implementation === '3') {
		implementation3(cmdObjects);
	}

	pwa.commandWindow.close(cmdObjects);

	return "";
}

function implementation1(cmdObjects) {
	print('[runApp.js] 1');
	cmdObjects.cmdLogger.log("##### Implementation 1 #####");

	cmdObjects.cmdWin.setLogFlag(true); // because we use cmdWin.getCommandResult() method

	cmdObjects.cmdWait.waitForCommandDone(5);
	var results = cmdObjects.cmdWin.getCommandResult();
	for(var i=0; i<results.size(); i++) {
		cmdObjects.cmdLogger.log(results.get(i));
	}

	cmdObjects.cmdWin.setLogFlag(false); // turn it back since it's done
}


function implementation2(cmdObjects) {
	print('[runApp.js] 2');
	cmdObjects.cmdLogger.log("##### Implementation 2 #####");

	var criteria = "Processing 1 done";
	cmdObjects.cmdWait.waitByFileContent(criteria, 2);
	cmdObjects.cmdLogger.log(criteria);

	criteria = "Processing 2 done";
	cmdObjects.cmdWait.waitByFileContent(criteria, 2);
	cmdObjects.cmdLogger.log(criteria);

	var result = cmdObjects.cmdWait.waitByFileContent(["Completed Successfully", "Failed"], 2);
	cmdObjects.cmdLogger.log(result + ".");
}

function implementation3(cmdObjects) {
	print('[runApp.js] 3');
	cmdObjects.cmdLogger.log("##### Implementation 3 #####");

	var criteria = "Processing 1 done";
	cmdObjects.cmdWait.waitByFileContent(criteria, 2);
	cmdObjects.cmdLogger.log(criteria);

	criteria = "Processing 2 done";
	cmdObjects.cmdWait.waitByFileContent(criteria, 2);
	cmdObjects.cmdLogger.log(criteria);
	
	waitCommandDone();
	cmdObjects.cmdLogger.log("The command has finished.");
	
	var result = cmdObjects.cmdWait.waitByFileContent(["Completed Successfully", "Failed"], 2);
	cmdObjects.cmdLogger.log(result + ".");
}

function waitCommandDone() {
	pwa.commandWindow.runItInAnotherCmd(checkCommandDone, 'checkExampleApp1Done');
}

function checkCommandDone(cmdWin2, cmdWait2, cmdLogger2) {
	pwa.process.checkProcessDoneByCommandLine(cmdWin2, cmdWait2, cmdLogger2, "jjs.exe", "StartExampleApp1.bat");
}