<img src=https://js1k-compress.solsort.com/icon.png width=96 height=96 align=right>

[![website](https://img.shields.io/badge/website-js1k-compress.solsort.com-blue.svg)](https://js1k-compress.solsort.com/) 
[![github](https://img.shields.io/badge/github-solsort/js1k-compress-blue.svg)](https://github.com/solsort/js1k-compress)
[![travis](https://img.shields.io/travis/solsort/js1k-compress.svg)](https://travis-ci.org/solsort/js1k-compress)
[![npm](https://img.shields.io/npm/v/js1k-compress.svg)](https://www.npmjs.com/package/js1k-compress)

# 1K source compression npm module

Two source code compressors, for [JS1K](http://js1k.com). Makes self-extracting JavaScript. Both are less than 1KB.

**Full of bugs, may or may not work :)**

- Version 1 is [grammar based compression](https://en.wikipedia.org/wiki/Grammar-based_code), (awesome theory), with a greedy binary grammar. The compression is quite bad, as I originally designed for byte, and not utf-8 encoding. Redesigning for utf-8 encoding thus made the grammar very small. It compresses itself from 1226 bytes to 968 bytes.
- Version 2 is semi-[lz77](https://en.wikipedia.org/wiki/LZ77_and_LZ78). This is more suitable for self-extracting utf-8 encoded JavaScript. It only works for small programs up to ~2K, without unicode characters, and has other bugs. It compresses itself from 2040 bytes to 687 characters = 995 bytes.

Usage example:

```
$ npm install js1k-compress

[...]

$ node 

> compress = require('js1k-compress')

[Function]

> compressed = compress(require('fs').readFileSync('lz.js','utf-8'));

'(f=(i,o,p,c)=>(c=i.charCodeAt(p),c?f(i,o+(c<256?i[p]:o.slice(c&2047,(c&2047)+(c>>11))),++p):o))(`/***᠁、态쀁ꀁ\\n *   ᡈえ恈쁈遈1K LZ77 source compression npm module碅See http://js1k-䃱.solsort.ᣱ for descript⃹境...

> console.log(eval(compressed));

/********************************************************************
 *                                                                  *
 *                                                                  *
 *              1K LZ77 source compression npm module               *
 *                                                                  *
 *                                                                  *
 *      See http://js1k-compress.solsort.com for description        *
 *                                                                  *
 *                                                                  *
 *                                                                  *
 ********************************************************************/

var compress = input => {
[...]


> require('fs').writeFile('./lz.min.js', 'eval(' + compressed + ')');

undefined

> require('lz.min.js');

[Function]

> // lz.js has now been minified, saved as lz.min.js, and is working :)
```

Files:

- `grammar.js` - version 1, grammar based compression
- `lz.js` - version 2, semi-lz77
- `entry-*` compressed versions of above
- `build.js` node script that uses the module, and makes the entries
- `index.html` shows the readme, and runs some of the entries in the browser
