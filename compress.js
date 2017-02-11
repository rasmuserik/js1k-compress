/***************************************************
 *                                                 *
 *  Compression module                             *
 *                                                 *
 *                                                 *
 ***************************************************/

console.log('start');
function stringEscape(string) {
  return string
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/"/g, '\\"');
}
function compress(string) {
  console.log('compress');
  var i = 0;
  var dictionary = '';
  var histogram = '1';

  for (i = 0; i < 128 && string.length > 1; ++i) {

    var freq = {};
    for (j = 0; j < string.length; ++j) {
      var pair = string[j] + string[j + 1];
      freq[pair] = (freq[pair] || 202) -1;
    }

    var histogram = [];
    for (pair in freq) {
      histogram.push(freq[pair] + pair);
    }
    histogram = histogram.sort();

    pair = histogram[0].slice(3);
    dictionary += pair;
    string = string.split(pair).join(String.fromCharCode(i+128));
  };

  console.log('dictionary size:', dictionary.length);
  console.log('string size:', string.length);
  dictionary = stringEscape(dictionary);
  string = stringEscape(string);

  return '"' + string + '"' +
    '.replace(/./mg,' +
    'f=(s,c)=>(' +
      'd=p=>f("' + dictionary + '"[p*2-256]),' +
      'c=s.charCodeAt(0),' +
      'c>127?d(c)+d(c+.5):s)' +
    ')';
};

if (typeof module === 'object') {
  module.exports = compress;
} else {
  document.body.innerHTML = '<pre>' + s + '<pre>';
}
