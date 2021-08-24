const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv;
let ora = require("ora");
const cliSpinners = require('cli-spinners');
const spinner = ora({
    spinner: cliSpinners.moon
});

(async ()=>{
    let test_type = argv.type || "full";

    console.log("👌 Selected Test Type:", test_type);

    if(test_type == "loadtest" || test_type == "full") {
        await require("./src/loadtest")({spinner});
    }
    if(test_type == "queries" || test_type == "full") {
        await require("./src/queries")({spinner});
    }

    spinner.succeed("All tests completed!")
})();