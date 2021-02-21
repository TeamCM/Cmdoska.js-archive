const fs = require("fs");
const path = require("path");

//Edit this to change what init system to use
let init = "cm_init";
module.exports.init = (shutdown) => {
    if(!fs.existsSync(path.join(__dirname, `./${init}.js`))){
        if(!fs.existsSync(path.join(__dirname, `../usr/bin/sh.js`))) return `Cannot find "${init}.js" and Recovery Shell`;
        else require(`../usr/bin/sh.js`).run();
        return `Recovery shell exited.`
    }
    console.log("INIT: Starting "+init);
    return require(`./${init}.js`).startup(shutdown);
}
module.exports.shutdown = () => {
    if(!fs.existsSync(path.join(__dirname, `./${init}.js`))) return `ERROR! Cannot find ${init}.js`;
    console.log("INIT: Stopping "+init);
    return require(`./${init}.js`).shutdown();
}