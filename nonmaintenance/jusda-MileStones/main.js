const fs = require('fs');

let content = "\nimport './index.css';";

fs.writeFileSync('./dist/index.js', content, { flag: 'a' });
