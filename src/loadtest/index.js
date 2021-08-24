let Benchmark = require("benchmark");
let suite = new Benchmark.Suite('Benchmark');

let fs = require("fs");

module.exports = ({spinner})=>{
    return new Promise(async function(resolve){
        let table = [];

        if(!fs.existsSync(__dirname+"/tests/test_space/")){
            fs.mkdirSync(__dirname+"/tests/test_space");
        }

        (await require("./tests/images")({suite, spinner}))
        require("./tests/text_files")({suite, spinner})
        require("./tests/crypto")({suite, spinner})
        .on('start', function(event) {
            spinner.start(event.target.name);
        })
        .on('cycle', function(event) {
            spinner.succeed(event.target.name);
            let next_name = event.currentTarget[1]?.name;
            if(next_name) spinner.start(next_name);
            table.push({
                name: event.target.name,
                'ops/sec': event.target.hz.toFixed(2),
                deviation: event.target.stats.rme.toFixed(2) + "%"
            })
        })
        .on('complete', function(x, y) {
            let dirContentList = fs.readdirSync(__dirname+"/tests/test_space/");
            spinner.text = "Cleaning up test_space folder... "+ dirContentList.length+' items';
            for(let fileName of dirContentList) fs.unlinkSync(__dirname+"/tests/test_space/"+fileName)
            spinner.succeed("Cleaning done");
            console.table(table);
            resolve();
        })
        .run({ 'async': true, 'queued': true });
    })
};
