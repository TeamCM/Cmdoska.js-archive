module.exports.init = (shutdown) => {
    require("./cm_init.js").startup(shutdown);
}
module.exports.shutdown = () => {
    require("./cm_init.js").shutdown();
}