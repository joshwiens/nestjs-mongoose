const fs = require('fs');
const selfsigned = require('selfsigned');
const attrs = [{ name: 'commonName', value: 'deviantjs.local' }];
const pems = selfsigned.generate(attrs, {
  algorithm: 'sha256',
  keySize: 2048,
  extensions: [
    {
      name: 'subjectAltName',
      altNames: [
        {
          type: 2, // DNS
          value: 'localhost',
        },
        {
          type: 2, // DNS
          value: 'deviantjs.local', // local hostname
        },
        {
          type: 6, // URI
          value: 'https://deviantjs.local', // and again
        },
        {
          type: 7, // IP
          ip: '127.0.0.1',
        },
      ],
    },
  ],
});

fs.writeFileSync('./server.crt', pems.cert, { encoding: 'utf-8' });
fs.writeFileSync('./server.key', pems.private, { encoding: 'utf-8' });
