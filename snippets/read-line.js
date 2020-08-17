const readline = require('readline');
const fs = require('fs');

// create instance of readline
// each instance is associated with single input stream
let rl = readline.createInterface({
    input: fs.createReadStream('products.txt')
});

let line_no = 0;

// event is emitted after each line
rl.on('line', function(line) {
    line_no++;
    console.log(line);
});

// end
rl.on('close', function(line) {
    console.log('Total lines : ' + line_no);
});


/***********************************/

//Read line by line from a file.
function processFile(inputFile) {
    var fs = require('fs'),
        readline = require('readline'),
        instream = fs.createReadStream(inputFile),
        outstream = new (require('stream'))(),
        rl = readline.createInterface(instream, outstream);
     
    rl.on('line', function (line) {
        console.log(line);
    });
    
    rl.on('close', function (line) {
        console.log(line);
        console.log('done reading file.');
    });
}
processFile('/path/to/a/input/file.txt');

//Read the entire file in utf8 format.
fs.readFile('input.txt', 'utf8', function (err, data) {
  if (err) throw err;
  console.log(data);
});

/***********************************/

const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  const src = fs.createReadStream('./big.file');
  src.pipe(res);
});

server.listen(8000);