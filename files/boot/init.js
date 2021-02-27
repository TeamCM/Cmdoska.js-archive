const fs = require("fs");
const path = require("path");

//Edit this to change what init system to use
let init = "cm_init";
module.exports.init = async (rsh = false) => {
    if(!fs.existsSync(path.join(__dirname, `./${init}.js`)) || rsh){
        if(!fs.existsSync(path.join(__dirname, `./rsh.js`))) require("../../kernel.js").shutdown();
        let newInit = await require(`./rsh.js`).run();
        newInit = newInit[1];
        if(!newInit) return require("../../kernel.js").shutdown();
        let rsh;
        try {
            rsh = require("./"+newInit);
        } catch {
            require("../../kernel.js").shutdown();
        }
        rsh.startup ? (function(){init = newInit;rsh.startup();}.call()) : require("../../kernel.js").shutdown();
    }
    console.log("INIT: Starting "+init);
    return require(`./${init}.js`).startup();
}
module.exports.shutdown = async () => {
    if(!fs.existsSync(path.join(__dirname, `./${init}.js`))) {
        console.log(`${init} is not found! trying to shutdown`);
        await require("../../kernel.js").shutdown();
        return
    }
    console.log("INIT: Stopping "+init);
    return require(`./${init}.js`).shutdown();
}