var compress = require('./compress.js');
var fs = require('fs');
var string = fs.readFileSync('compress.js', 'utf-8');
string = compress(string);
var code = 'eval(s=' + string + ')';

s = fs.writeFileSync('entry.js', code);
s = fs.writeFileSync('entry.js.b64', require('btoa')(require('utf8').encode(code)));

console.log(string.length, eval(string).length, string);
console.log();
console.log(eval(string));
