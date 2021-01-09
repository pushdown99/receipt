'use strict';

const php = '/usr/bin/php';
const parser = 'receipt-parser.php';

module.exports = function(data, cb = null) {
  const exec  = require('child_process').exec;

  exec(`${php} ${parser} "${data}"`, function(err, stdout, stderr) {
    if(err) return cb (err, null);
    var obj = JSON.parse(stdout);
    if(cb != null) cb (err, obj);
  });
}

