load("http-server/SERVER-SCRIPTS/lib/JavaType.js");

load("http-server/SERVER-SCRIPTS/lib/system/System.js");
load("http-server/SERVER-SCRIPTS/lib/system/Command.js");
load("http-server/SERVER-SCRIPTS/lib/system/Process.js");
load("http-server/SERVER-SCRIPTS/lib/util/File.js");

var port = pwa.system.getAvailableTCPIPPort();

pwa.file.write("http-server/TEMP/PORT.txt", port.toString());