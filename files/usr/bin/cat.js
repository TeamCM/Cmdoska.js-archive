module.exports.run=(args)=>{
    args = args.split(" ")[0];
    if(!require("fs").existsSync(require("path").join(process.cwd(), args))){throw "File dosent exist!"}
    console.log(require("fs").readFileSync(require("path").join(process.cwd(), args)).toString("utf-8"));
    return require("fs").readFileSync(require("path").join(process.cwd(), args)).toString("utf-8");
}