let fs = require("fs");
let zlib = require("zlib");

let readableStream = fs.createReadStream('D:\University of Winnipeg\Fall-winter 2022-2023\adv web dev\text\readStream.txt');
let writeStream = fs.createWriteStream('D:\University of Winnipeg\Fall-winter 2022-2023\adv web dev\text\writeStream.txt');