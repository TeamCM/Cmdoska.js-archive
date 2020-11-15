const chalk = require("chalk");

module.exports.startup = (shutdown1) => {
    console.log(chalk.blue("Welcome to ")+chalk.green("Cmdoska V9.6")+"\n"+chalk.yellow("We are entering in the OS\n"));
    console.log(chalk.blue("Entering in shell..."));
    require("../etc/profile.js")(shutdown);

    function shutdown(){
        require("./cm_init.js").shutdown();
        shutdown1();
    }
}
module.exports.shutdown = () => {
    
}