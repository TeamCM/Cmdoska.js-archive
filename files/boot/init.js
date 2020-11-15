const chalk = require("chalk");

module.exports.init = () => {
    require("./cm_init.js").startup();
}
module.exports.shutdown = () => {
    require("./cm_init.js").shutdown();
}