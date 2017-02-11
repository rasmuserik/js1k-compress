/***************************************************
 *                                                 *
 *  Compression module                             *
 *                                                 *
 *                                                 *
 ***************************************************/

function stringEscape(string) {
  return string
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\0/g, '\\0')
    .replace(/[$]/g, '\\$')
    .replace(/`/g, '\\`');
}
function compress(string) {
  var dictionarySize = 0;
  var dictionary = [];
  dictionary[0] = '\0.';
  var escapes = {};

  string.replace(/[\0-\x20]/g, function(c) {
    dictionary[c.charCodeAt(0)] = '\0.';
  });

  for (i = 0; i < 32; ++i) {
    if(dictionary[i] === undefined) {
      if(string.length > 1) {
        var freq = {};
        for (j = 0; j < string.length - 1; ++j) {
          var pair = string[j] + string[j + 1];
          freq[pair] = (freq[pair] || 100000000) -1;
        }

        var histogram = [];
        for (pair in freq) {
          histogram.push(freq[pair] + pair);
        }
        histogram = histogram.sort();

        pair = histogram[0].slice(8);
        string = string.split(pair).join(String.fromCharCode(i));
      } else {
        pair = '  ';
      }
      if(pair.length !== 2) {
        console.log(1742, pair, string[j], string[j+1], histogram[0]);
      }
      dictionary[i] = pair;
    }
  };

  //console.log(dictionary);
  dictionary = dictionary.join('');
  console.log('dictionary size:', dictionary.length);
  console.log('string size:', string.length);
  //console.log(dictionary.length, dictionary);
  //console.log(string.length, string);
  dictionary = stringEscape(dictionary);
  string = stringEscape(string);

  return `
    \`${string}\`
    .replace(/[\\s\\S]/mg,
        f=(s,c) => (
          d = \`${dictionary}\`,
          c = s.charCodeAt(0),
          log(c, s, d[c*2], d.length, d),
          g = p => f(d[p]),
          c > 31 || '\0' === d[c*2]
          ? s
          : g(c*2) + g(c*2+1)
          ))
    `;
  /*
     return '`' + string + '`' +
     '.replace(/./mg,' +
     'f=(s,c)=>(' +
     'd=`' + dictionary + '`,' +
     'c=s.charCodeAt(0),' +
     'g=p=>f(d[p]),' +
     '(c<31||!d[c*2])?s:g(c*2)+g(c*2+1))'+
     ')';
     `;
     */
};
for(var i = 0; i < 32; ++i) {
  s = '`'+String.fromCharCode(i)+'`';
  eval(s);
}

function log(o) {
  //console.log.apply(console, arguments);
  return o;
}

if (typeof module === 'object') {
  module.exports = compress;
} else if (typeof s === 'string') {
  document.body.innerHTML = '<pre>' + s + '<pre>';
}
s = '\n\n\n';
s = require('fs').readFileSync('compress.js', 'utf8');
//s = s.slice(0,10);
console.log(s.slice(420,430));
c = compress(s); 
//console.log(c.length, c);
//console.log(s);
console.log(c.length,eval(c).length, eval(c)===s);
console.log('\n\n\n\n\n');
