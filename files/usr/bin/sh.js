const readline = require("readline-sync");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

module.exports.run = () => {
    while(true){
        let dir = process.cwd();
        let shDir = __dirname;

        dir = dir.replace(/\\/g, "/").replace(/C/, "").replace(/:/, "");
        let command = readline.question(`root@cmdoska:${dir}#> `);

        let cmd = command.split(" ")[0];
        let args = command.split(" ").slice(1).join(" ");

        if(cmd == ""){void 0;}
        else if(cmd == "exit"){return 0;}
        else {
            if(fs.existsSync(path.join(dir, `./${cmd}.js`))){
                try {
                    require(`./${cmd}.js`).run(args);
                } catch (err) {
                    console.error(chalk.red(`Was an error trying to execute ${cmd}. ${err.message}`));
                }
            }

            else if(fs.existsSync(path.join(shDir, `./${cmd}.js`))){
                try {
                    require(path.join(shDir, `./${cmd}.js`)).run(args);
                } catch (err) {
                    console.error(chalk.red(`Was an error trying to execute ${cmd}. ${err.message}`));
                }
            }
            else if(fs.existsSync(path.join(shDir, `../../sbin/${cmd}.js`))){
                try {
                    let shutdown = require("../../../kernel.js").shutdown;
                    require(path.join(shDir, `../../sbin/${cmd}.js`)).run(args, shutdown);
                } catch (err) {
                    console.error(chalk.red(`Was an error trying to execute ${cmd}. ${err.message}`));
                }
            }

            else {
                console.error(chalk.red(`Cannot find command "${cmd}"`));
            }
        }
    }
}