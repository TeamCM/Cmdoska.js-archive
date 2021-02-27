const chalk = require("chalk");
/**
 * How to make a service for CM Init:
 * File:
 * module.exports = {}
 *  
 * file.name    :   "service name";     // [OPCIONAL] or it will display the file name without the .js
 * file.start   :   function(){...};    // [ESSENCIAL!] it will be your code when starting the cmdoska
 * file.stop    :   function(){...};    // [OPCIONAL] it will be your code when stopping cmdoska, if undefined then it will ignore 
 * folder for the services: files/etc/services
 */

module.exports.startup = async () => {
    console.log(chalk.green("Cmdoska INIT v1.0")+"\n");
    if(!require("fs").existsSync("./files/etc/services")) return "Cant get services folder";
    console.log(chalk.green("> Starting services"));
    require("fs").readdirSync("./files/etc/services").forEach(function(srv){
        if(srv.includes(".dead")) return;
        let service = require(`../etc/services/${srv}`);
        service.name ? undefined : service.name = srv.replace(/\.js/, "");
        console.log(chalk.blue("--> ")+chalk.green(`Starting ${service.name}...`));
        try {
            service.start();
            console.log(chalk.green(`--> Started ${service.name}`));
        } catch (err) {
            console.error(chalk.red(`--> Error starting ${service.name}. Error: ${err.message}`));
        }
    });
    console.log(chalk.blue("> Entering in shell..."));
    return require("../etc/profile.js")();
}
module.exports.shutdown = () => {
    if(!require("fs").existsSync("./files/etc/services")) return require("../../kernel.js").shutdown();
    console.log(chalk.blue("> Stopping Services"));
    require("fs").readdirSync("./files/etc/services").forEach(function(srv){
        if(srv.includes(".dead")) return;
        let service = require(`../etc/services/${srv}`);
        return service.stop ? (function(){
            service.name ? undefined : service.name = srv.replace(/\.js/, "");
            console.log(chalk.blue("--> ")+chalk.green(`Stopping ${service.name}...`));
            try {
                service.stop();
                console.log(chalk.green(`--> Stopped ${service.name}`));
            } catch (err) {
                console.error(chalk.red(`--> Error stopping ${service.name}. Error: ${err.message}`));
            }
        }.call()) : false;
    });
    return require("../../kernel.js").shutdown();
}