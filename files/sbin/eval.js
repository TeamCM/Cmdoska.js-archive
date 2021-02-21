module.exports.run = (args, shutdown) => {
    try {
        console.log(eval(args));
    } catch (err) {
        console.log(require("chalk").red("ERROR!")+`\n${err.message}`);
    }
}