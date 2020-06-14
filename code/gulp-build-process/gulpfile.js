const fs = require("fs");
const { Transform } = require("stream");

exports.default = () => {
  const read = fs.createReadStream("styles.css");
  const write = fs.createWriteStream("sytles.min.css");

  const transform = new Transform({
    transform: (chunk, encoding, callback) => {
      const input = chunk.toString();
      const output = input.replace(/\s+/g, "").replace(/\/\*.+?\*\//g, "");
      callback(null, output);
    },
  });

  read.pipe(transform).pipe(write);

  return read;
};
