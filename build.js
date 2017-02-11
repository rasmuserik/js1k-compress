function write(file, alg, b64) {
  var compress = require('./' + alg + '.js');
  var fs = require('fs');
  var source= fs.readFileSync(file + '.js', 'utf-8');
  string = compress(source);
  var code = 'eval(s=' + string + ')';

  fs.writeFileSync(`entry-${file}-${alg}.js`, code);
  if(b64) {
    fs.writeFileSync(`entry-${file}-${alg}.js.b64`, require('btoa')(require('utf8').encode(code)));
  }

  console.log(file, alg, eval(string) === source);
}

      write('grammar', 'lz');
      write('grammar', 'grammar');
      write('lz', 'lz', true);
      write('lz', 'grammar');
      write('lz', 'entry-lz-lz');
