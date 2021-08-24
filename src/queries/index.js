module.exports = ({spinner})=>{
    return new Promise(async function(resolve){
        spinner.start('Starting server');
        let port = 8080;

        let express = require("express");
        let app = express();
        let httpServer = require('http').createServer(app);
        httpServer.listen(port).on("listening", async function(e){
            spinner.succeed('Server listening on '+port);

            const autocannon = require('autocannon');

            let request_counter = 0;
            app.get('/', (req,res)=>{
                request_counter++;
                let text = "Alex Dedyura JS Benchmark. Request number "+request_counter;
                let result = text.split("").reverse().join("").split("").sort().map(x=>x!==" ");
                res.send(result)
            })
    
            spinner.start('AutoCannon test...');
        
            const testing_result = await autocannon({
                url: 'http://localhost:'+port,
                connections: 1000, //default
                pipelining: 1, // default
                duration: 10 // default
              });
    
              spinner.stop();
              console.table({
                  Errors: testing_result.errors+'/'+testing_result.requests.total,
                  "Average latency": testing_result.latency.average+' ms'
              })
              spinner.text = 'Closing WEB-server...';
              httpServer.close(function(){
                spinner.succeed("WEB-server closed!")
                return resolve();
              })

        });
    });
};
