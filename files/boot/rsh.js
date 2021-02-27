const readline = require("readline-sync");

module.exports.run = async () => {
    console.log("Welcome to Recovery Shell! Here can you boot from another source of js files, just type boot to start, poweroff to shutdown the cmdoska");

    while(true){
        const command = readline.question(">");
        
        if(command == "") void 0;
        else if(command.split(" ")[0] == "boot"){
            return [true, command.split(" ")[1]];
        }
        else if(command.split(" ")[0] == "poweroff" || command.split(" ")[0] == "exit"){
            return [false, "./init.js"]//await require("./init.js").shutdown();
        }
        else {
            console.error("Command not found!");
        }
    }
}