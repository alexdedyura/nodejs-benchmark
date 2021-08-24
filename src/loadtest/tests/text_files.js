const fs = require("fs");

const lorem11kkContent = fs.readFileSync(__dirname+"/lorem/lorem.11800.txt", {encoding: "utf-8"});

module.exports = ({suite, spinner})=>{

    suite.add('Reading 11kk file', function() {
        fs.readFileSync(__dirname+"/lorem/lorem.11800.txt", {encoding: "utf-8"});
    })
    suite.add('Writing 11kk file', function() {
        let newFileName = "11kk_"+Math.random()+".txt";
        fs.writeFileSync(__dirname+"/test_space/"+newFileName, lorem11kkContent, {encoding: 'utf-8'});
    })

    return suite;
}