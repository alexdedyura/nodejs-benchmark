const fs = require("fs");

const sharp = require('sharp');



module.exports = async ({suite, spinner})=>{
    const loremPNGImage500 = await sharp({
        create: {
          width: 500,
          height: 500,
          channels: 4,
          background: { r: 255, g: 0, b: 0, alpha: 0.5 }
        }
    }).png().toBuffer();
    const loremJPGImage500 = await sharp(__dirname+"/lorem/lorem.picsum.jpg").toBuffer();
    const loremJPGImage500Blured = await sharp(loremJPGImage500).blur(5);

    suite.add('Creating PNG Image Buffer, 500x500', {
        defer: true,
        fn: function(deferred) {
        sharp({
            create: {
              width: 500,
              height: 500,
              channels: 4,
              background: { r: 255, g: 0, b: 0, alpha: 0.5 }
            }
          }).png().toBuffer(function(){
            deferred.resolve();
          });
        }
    })
    suite.add('Resizing PNG Image Buffer, 500x500 to 100x100',{
        defer: true,
        fn: function(deferred) {
            sharp(loremPNGImage500).resize(100, 100).toBuffer(function(){
                deferred.resolve();
            });
        }
    })
    suite.add('Reading JPG from file, 500x500', {
        defer: true,
        fn: function(deferred) {
            sharp(__dirname+"/lorem/lorem.picsum.jpg").toBuffer(function(){
                deferred.resolve();
            });
        }
    })
    suite.add('Bluring 500x500 JPG Image', {
        defer: true,
        fn: function(deferred) {
            sharp(loremJPGImage500).blur(5).toBuffer(function(){
                deferred.resolve();
            });
        }
    })
    suite.add('Writing 500x500 JPG Blured Image', {
        defer: true,
        fn: function(deferred) {
            loremJPGImage500Blured.toBuffer().then(function(imageBuffer){
                fs.writeFileSync(__dirname+"/test_space/"+"JPGImage500Blured_"+Math.random()+".jpg", imageBuffer)
                deferred.resolve();
            });
        }
    })

    return suite;
}