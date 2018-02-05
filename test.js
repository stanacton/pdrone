require('winston').level = 'debug';

const {CommandParser} = require('./dist/bundle');
const parser = new CommandParser();

parser.warmup();

const testData = [
  [0x02, 0x0c, 0x02, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04],
  [0x02, 0x0d, 0x02, 0x0f, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04],
  [0x02, 0x0e, 0x02, 0x0f, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04],
  [0x02, 0x0f, 0x02, 0x13, 0x02, 0x00, 0x01, 0x00, 0x00, 0x00],
  [0x02, 0x10, 0x02, 0x03, 0x03, 0x00, 0x00],
  [0x02, 0x11, 0x00, 0x05, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01],
  [0x02, 0x05, 0x02, 0x12, 0x00, 0x00, 0xef, 0x11, 0x02, 0x3f, 0x33, 0xd2, 0x7d, 0xbf, 0xb4, 0xff, 0x00, 0x00, 0x00, 0x00],
  [0x02, 0x12, 0x00, 0x05, 0x08, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01],
  [0x02, 0x06, 0x02, 0x12, 0x01, 0x41, 0x55, 0xeb, 0x85, 0xbc, 0x10, 0xe7, 0x32, 0x3c, 0x2a, 0x9b, 0x91, 0xbd, 0xff, 0x53],
];


let command;
for (const row of testData) {
  const buffer = new Buffer(row.splice(2)); // Remove device id and message counter
  command = parser.parseBuffer(buffer);

  console.log(command.toString(true));
}

console.log(Math.fround(13.37), command.speed_x.value)
