compress = s => {

  dict = ['\0.']

  s.replace(/[\0-\x20]/g, 
      s => dict[s.charCodeAt(0)] = '\0.')

  for(i = 0; i < 32; ++i) {
    if(!dict[i]) {
      pair = '  '
      if(s.length > 1) {
        freq = {}

        for(j = 0; j < s.length - 1; ++j) {
          pair = s[j] + s[j + 1]
          freq[pair] = (freq[pair] || 1e8) -1
        }

        hist = []
        for(pair in freq) {
          hist.push(freq[pair] + pair)
        }
        hist = hist.sort()

        pair = hist[0].slice(8)
        s = s.split(pair).join(String.fromCharCode(i))
      } else {
        pair = '  '
      }
      dict[i] = pair
    }
  }

  esc = s => s
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\0/g, '\\0')
    .replace(/[$]/g, '\\$')
    .replace(/`/g, '\\`')

  dict = dict.join('')
  dict = esc(dict)
  s = esc(s)

  return '`' + s + '`.replace(/[\\s\\S]/mg,f=(s,c)=>(d=`' +
    dict + '`,c=s.charCodeAt(0),g=p=>f(d[p]),c>31||"\0"===d[c*2]?s:g(c*2)+g(c*2+1)))'
}

(typeof module === 'undefined')
  ? document.write('<pre>' + 
      ('> compress(source)\n\n' + compress(s) +
      '\n\n> eval(compress(source))\n\n' + s).replace('<','&lt;'))
  : module.exports = compress
