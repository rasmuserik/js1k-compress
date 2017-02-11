/********************************************************************
 *                                                                  *
 *             1K NodeJS compression module for JS1K                *
 *                                                                  *
 *                     LZ77-like algorithm.                         *
 *                                                                  *
 *                                                                  *
 *      See http://js1k-compress.solsort.com for description.       *
 *                                                                  *
 *                                                                  *
 *******************************************************************/

compress = input => {
  var output = '';

  for(var i = 0; i < input.length;) {
    var bestMatch = 0;
    var matchLength = 0;

    for(var j = 0; j < i; ++j) {
      for(k = 0; k + j < i && input[k+i] === input[k+j];++k);
      if(k > matchLength) {
        matchLength = k;
        bestMatch = j;
      }
    }

    matchLength = Math.min(matchLength, 30);

    if(matchLength < 3) {
      output += input[i];
      ++i;
    } else {
      output += String.fromCharCode(bestMatch + 2048 * matchLength );
      i+=matchLength;
    }
  }

  output = output
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\0/g, '\\0')
    .replace(/[$]/g, '\\$')
    .replace(/`/g, '\\`')

    return '(f=(i,o,p,c)=>(c=i.charCodeAt(p),c?f(i,o+(c<256?i[p]:o.slice(c&2047,(c&2047)+(c>>11))),++p):o))(`' + output + '`,``,0)';
}

(typeof module === 'undefined')
? document.write('See <a href=http://js1k-compress.solsort.com>compression description</a><pre>' + 
    ('> compress(source)\n\n' + compress(s) +
     '\n\n> eval(compress(source))\n\n' + s).replace('<','&lt;'))
: module.exports = compress
