function start(){
    console.clear();
    console.log("Cmdoska 9.6, By TeamCM");
    require("./files/boot/init.js").init(require("yargs").argv._[0]==="rsh");
}

function requestShutdown(){
    console.clear();
    console.log("Shutdown by an root app, requesting to close init");
    require("./files/boot/init.js").shutdown();

    return true;
}
async function shutdown(k = "", err = undefined){
    if(k != "kernel_panic") {console.log("Shutdown from init system")} else {console.log("KERNEL PANIC\n"+err.message)}
    console.log("SHUTDOWNING!");
    return process.exit(0);
}

module.exports.requestShutdown = requestShutdown;
module.exports.shutdown = shutdown;

process.on("SIGINT", () => {})
.on("SIGTERM", () => {
    shutdown();
})
/*.on("warning", warn => {
    console.warn("WARNING: "+ warn);
})*/
.on("uncaughtException", err => {
    console.log("[Debug] kp detected!");
    shutdown("kernel_panic", err);
});

start();