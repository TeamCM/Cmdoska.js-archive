const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

module.exports = () => {
    let sh = "sh";
    while (true){
        if(fs.existsSync(path.join(__dirname, `../usr/bin/${sh}.js`))){
            require(`../usr/bin/${sh}.js`).run();
            console.log(chalk.blue("Shell exited, re-opening\n"));
        }
        else return "Cannot find shell to execute!";
    }
}