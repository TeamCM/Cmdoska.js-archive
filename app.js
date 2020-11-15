const fs = require("fs");
const path = require("path");
const readline = require("readline-sync");
const fconsole = require("fancy-log");

const console = {
    log: fconsole,
    info: fconsole.info,
    warn: fconsole.warn,
    error: fconsole.error,
    dir: fconsole.dir
}

function start(){
    console.log("Cmdoska 9.6, By TeamCM");
    console.log("INIT: Starting init system...");
    require("./files/boot/init.js").init();
}

function shutdown(){
    require("./files/boot/init.js").shutdown();
    process.exit(0);
}

process.on("SIGINT", () => {
})
.on("SIGQUIT", () => {
})
.on("SIGTERM", () => {

});

start();