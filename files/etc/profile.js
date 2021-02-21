const fs = require("fs");
const path = require("path");

module.exports = () => {
    let sh = "sh";
    while (true){
        if(fs.existsSync(path.join(__dirname, `../usr/bin/${sh}.js`))){
            require(`../usr/bin/${sh}.js`).run();
        }
        else return "Cannot find shell to execute!";
    }
}