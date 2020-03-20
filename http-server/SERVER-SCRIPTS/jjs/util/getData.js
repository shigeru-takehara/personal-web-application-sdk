function jjsExec(args) {
	var args = pwa.process.getArgs4Jjs(args);
	var fileName = args[0];
	try {
		return pwa.file.read(fileName);
	}
	catch(e) {
		return "";
	}
}

