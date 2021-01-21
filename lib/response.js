'use strict';

module.exports = function(req, res, code, data = {}) {
  var response = {};
  response.code = code;
  response.data = data;

  /////////////////////////////////////////////////////////
  //Object.keys(data).forEach(function (key) {
  //  console.log(key, data[key]);
  //  response[key] = data[key];
  //});

  switch(code) {
  case 100: response.message = 'Continue'; break;
  case 101: response.message = 'Switching Protocols'; break;
  case 102: response.message = 'Processing'; break;
  case 103: response.message = 'Early Hints'; break;
  case 200: response.message = 'OK'; break;
  case 201: response.message = 'Created'; break;
  case 202: response.message = 'Accepted'; break;
  case 203: response.message = 'Non-Authoritative Information'; break;
  case 204: response.message = 'No Content'; break;
  case 205: response.message = 'Reset Content'; break;
  case 206: response.message = 'Partial Content'; break;
  case 207: response.message = 'Multi-Status'; break;
  case 208: response.message = 'Already Reported'; break;
  case 226: response.message = 'IM Used'; break;
  case 300: response.message = 'Multiple Choices'; break;
  case 301: response.message = 'Moved Permanently'; break;
  case 302: response.message = 'Found (Previously "Moved temporarily")'; break;
  case 303: response.message = 'See Other'; break;
  case 304: response.message = 'Not Modified'; break;
  case 305: response.message = 'Use Proxy'; break;
  case 306: response.message = 'Switch Proxy'; break;
  case 307: response.message = 'Temporary Redirect'; break;
  case 308: response.message = 'Permanent Redirect'; break;
  case 400: response.message = 'Bad Request'; break;
  case 401: response.message = 'Unauthorized'; break;
  case 402: response.message = 'Payment Required'; break;
  case 403: response.message = 'Forbidden'; break;
  case 404: response.message = 'Not Found'; break;
  case 405: response.message = 'Method Not Allowed'; break;
  case 406: response.message = 'Not Acceptable'; break;
  case 407: response.message = 'Proxy Authentication Required'; break;
  case 408: response.message = 'Request Timeout'; break;
  case 409: response.message = 'Conflict'; break;
  case 410: response.message = 'Gone'; break;
  case 411: response.message = 'Length Required'; break;
  case 412: response.message = 'Precondition Failed'; break;
  case 413: response.message = 'Payload Too Large'; break;
  case 414: response.message = 'URI Too Long'; break;
  case 415: response.message = 'Unsupported Media Type'; break;
  case 416: response.message = 'Range Not Satisfiable'; break;
  case 417: response.message = 'Expectation Failed'; break;
  case 418: response.message = 'I\'m a teapot'; break;
  case 421: response.message = 'Misdirected Request'; break;
  case 422: response.message = 'Unprocessable Entity'; break;
  case 423: response.message = 'Locked'; break;
  case 424: response.message = 'Failed Dependency'; break;
  case 425: response.message = 'Too Early'; break;
  case 426: response.message = 'Upgrade Required'; break;
  case 428: response.message = 'Precondition Required'; break;
  case 429: response.message = 'Too Many Requests'; break;
  case 431: response.message = 'Request Header Fields Too Large'; break;
  case 451: response.message = 'Unavailable For Legal Reasons'; break;
  case 500: response.message = 'Internal Server Error'; break;
  case 501: response.message = 'Not Implemented'; break;
  case 502: response.message = 'Bad Gateway'; break;
  case 503: response.message = 'Service Unavailable'; break;
  case 504: response.message = 'Gateway Timeout'; break;
  case 505: response.message = 'HTTP Version Not Supported'; break;
  case 506: response.message = 'Variant Also Negotiates'; break;
  case 507: response.message = 'Insufficient Storage'; break;
  case 508: response.message = 'Loop Detected'; break;
  case 510: response.message = 'Not Extended'; break;
  case 511: response.message = 'Network Authentication Required'; break;

  case 103: response.message = 'Checkpoint'; break;
  case 218: response.message = 'This is fine'; break; 
  case 419: response.message = 'Page Expired'; break; 
  case 420: response.message = 'Method Failure'; break; 
  case 420: response.message = 'Enhance Your Calm'; break; 
  case 430: response.message = 'Request Header Fields Too Large'; break; 
  case 450: response.message = 'Blocked by Windows Parental Controls'; break; 
  case 498: response.message = 'Invalid Token'; break; 
  case 499: response.message = 'Token Required'; break; 
  case 509: response.message = 'Bandwidth Limit Exceeded'; break; 
  case 526: response.message = 'Invalid SSL Certificate'; break;
  case 529: response.message = 'Site is overloade'; break;d
  case 530: response.message = 'Site is frozen'; break;
  case 598: response.message = '(Informal convention) Network read timeout error'; break;
  case 440: response.message = 'Login Time-out'; break;
  case 449: response.message = 'Retry With'; break;
  case 451: response.message = 'Redirect'; break;
  case 444: response.message = 'No Response'; break;
  case 494: response.message = 'Request header too large'; break;
  case 495: response.message = 'SSL Certificate Error'; break;
  case 496: response.message = 'SSL Certificate Required'; break;
  case 497: response.message = 'HTTP Request Sent to HTTPS Port'; break;
  case 499: response.message = 'Client Closed Request'; break;
  case 520: response.message = 'Web Server Returned an Unknown Error'; break;
  case 521: response.message = 'Web Server Is Down'; break;
  case 522: response.message = 'Connection Timed Out'; break;
  case 523: response.message = 'Origin Is Unreachable'; break;
  case 524: response.message = 'A Timeout Occurred'; break;
  case 525: response.message = 'SSL Handshake Failed'; break;
  case 526: response.message = 'Invalid SSL Certificate'; break;
  case 527: response.message = 'Railgun Error'; break;
  case 530: response.message = 'Error'; break;
  case 460: response.message = 'Client closed the connection'; break; 
  case 463: response.message = 'The load balancer received an X-Forwarded-For request header'; break;
  }

  //res.contentType('application/json');
  //res.send(JSON.stringify(response));
  res.json(response);
}

