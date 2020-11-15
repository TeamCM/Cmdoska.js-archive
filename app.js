const fs = require("fs");
const path = require("path");
const readline = require("readline-sync");
const fconsole = require("fancy-log");

const console1 = {
    log: fconsole,
    info: fconsole.info,
    warn: fconsole.warn,
    error: fconsole.error,
    dir: fconsole.dir,
    clear: console.clear
}

function start(){
    console1.log("Cmdoska 9.6, By TeamCM");
    console1.log("INIT: Starting init system...");
    require("./files/boot/init.js").init(shutdown);
}

function shutdown(){
    console1.log("Closing INIT");
    require("./files/boot/init.js").shutdown();
    console.clear();
    process.exit(0);
}

process.on("SIGINT", () => {
})
.on("SIGQUIT", () => {
})
.on("SIGTERM", () => {

});

start();