const readline = require("readline-sync");
const fs = require("fs");
const path = require("path");

module.exports.run = (shutdown) => {
    while(true){
        let command = readline.question("> ");

        if(command == "clear"){console.clear();}
        else if(command == "exit"){return;}
        else {
            if(command == "") void 0;
            else if(fs.existsSync(path.join(__dirname, `./${command}.js`))){
                try {
                    require(`./${command}`).run(shutdown);   
                } catch (e) {
                    console.log(`Error: ${e.message}`);
                }
            } else {
                console.log("Command not found!");
            }
        }
    }
}