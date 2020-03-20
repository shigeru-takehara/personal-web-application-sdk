@echo off

setlocal

cd http-server
jjs -cp pwa.jar HttpServer.js -scripting -- %1

endlocal
cd ..