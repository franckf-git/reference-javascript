var test = require('./module2'); // Fait appel à test.js (même dossier) pas d extension
var test = require('module1'); // Fait appel à test.js (sous-dossier node_modules)

test.direBonjour();
test.direByeBye();