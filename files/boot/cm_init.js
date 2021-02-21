const chalk = require("chalk");

module.exports.startup = (shutdown1) => {
    console.log(chalk.green("Cmdoska INIT v1.0")+"\n");
    console.log(chalk.green("> Starting services"));
    require("fs").readdirSync("./files/etc/services").forEach(function(srv){
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
    return require("../etc/profile.js")(shutdown1);
}
module.exports.shutdown = () => {
    if(!require("fs").existsSync("./files/etc/services")) return "Cant get services folder";
    console.log(chalk.blue("> Stopping Services"));
    require("fs").readdirSync("./files/etc/services").forEach(function(srv){
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
    return true;
}