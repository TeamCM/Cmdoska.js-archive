const { shutdown } = require("../boot/cm_init");

module.exports = (shutdown) => {
    let sh = "sh";
    require(`../usr/bin/${sh}.js`).run(shutdown);
}