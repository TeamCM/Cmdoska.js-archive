function start(){
    console.log("Cmdoska 9.6, By TeamCM");
    let reason = require("./files/boot/init.js").init(shutdown);

    console.error("ERROR! Error trying to start init. Reason: "+reason);
    process.exit(1);
}

function shutdown(){
    console.log("Closing INIT");
    let warning = require("./files/boot/init.js").shutdown();

    //Init system will return an warning if error/warning is detected
    warning != true && warning != undefined ? console.warn("WARNING: INIT system exited with an error reason! Reason: "+warning) : undefined;
    
    console.log("SHUTDOWNING!");
    process.exit(0);
}

module.exports.shutdown = shutdown;

process.on("SIGINT", () => {})
.on("SIGTERM", () => {
    shutdown();
})
.on("warning", warn => {
    console.warn("WARNING: "+ warn);
})
.on("uncaughtException", err => {
    console.error("ERROR: "+err.message);
    shutdown();
});

start();