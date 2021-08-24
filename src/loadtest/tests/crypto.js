const fs = require("fs");

let crypto = require("crypto");
const secretKey = 'IlyaDevmanIlyaDevmanIlyaDevmanYt';
const iv = crypto.randomBytes(16);

let bcrypt = require('bcrypt');

const encrypt = (text, algorithm) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return encrypted;
};

const decrypt = (content, algorithm) => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    const decrpyted = Buffer.concat([decipher.update(content), decipher.final()]);
    return decrpyted.toString();
};


const lorem11kkContent = fs.readFileSync(__dirname+"/lorem/lorem.11800.txt", {encoding: "utf-8"});
const lorem11kkContent_encrypted_aes256 = encrypt(lorem11kkContent, 'aes256');

let defaultSalt = bcrypt.genSaltSync(10);
const loremPasswordHash = bcrypt.hashSync('IlyaDevmanPassword', defaultSalt);

module.exports = ({suite, spinner})=>{

    suite.add('Encrypting AES256 11kk content', function() {
        let encrypted = encrypt(lorem11kkContent, 'aes256');
    })
    suite.add('Decrypting AES256 11kk content', function() {
        let decrypted = decrypt(lorem11kkContent_encrypted_aes256, 'aes256');
    })
    suite.add('Password hashing', function() {
        bcrypt.hashSync('IlyaDevmanPassword', defaultSalt)
    })
    suite.add('Password hash comparison', function() {
        bcrypt.compareSync('IlyaDevmanPassword', loremPasswordHash)
    })

    return suite;
}