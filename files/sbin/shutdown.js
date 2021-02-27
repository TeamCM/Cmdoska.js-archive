module.exports.run = (args, shutdown) => {
    console.log("Cmdoska will shutdown at "+isNaN(args.split(" ")[0]) ? 1 : args.split(" ")[0]+" seconds");
    setTimeout(shutdown, isNaN(args.split(" ")[0]) ? 1000 : Number(args.split(" ")[0]));
}