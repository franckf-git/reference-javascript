## notes and test to come

- [adonisv5](https://preview.adonisjs.com/guides/http/form-submissions)
- [nestjs](https://docs.nestjs.com/)
- [sailsjs](https://sailsjs.com/get-started)

- [ramda-functional](https://ramdajs.com/docs/)

- [datefns](https://date-fns.org/)

- [dayjs](https://day.js.org/en/)

- DOM testing :
https://github.com/puppeteer/puppeteer
https://playwright.dev/
https://jestjs.io/docs/en/snapshot-testing
https://www.npmjs.com/package/jsdom

- try to use setAttribute vs addClass in frontend js

- `console.log(process.memoryUsage())`

- npm install -g clinic

- prototypes :
json-server
live-server
node-json-db

- npm -g > no sudo, change ownership on user in /usr/lib/nodesmodules

- bdd : don't read data from position in array. If data or structure change, column change too.

- knexjs : `core.destroy()`

- https://www.npmjs.com/package/cors

- jsdoc :
```
/**
* This is a description
* @namespace My.Namespace
* @method myMethodName
* @param {String} some string
* @param {Object} some object
* @return {bool} some bool
*/
```

- make a function to store/read cookies with json (frontend)

- add user infos to body object : `req.body.user = req.user.id`

- define var before loop - less memory print
```
const a = ref.ef()
for(i=0;i++;i<a)...
// vs
for(i=0;i++;i<ref.ef())...
```

- function with object
```
const calc = {
    add : function(a,b) {
        return a + b;
    },
    sub : function(a,b) {
        return a - b;
    }
}
calc.run(calc.mult, 7, 4); //28
```

- jwt :
https://www.codeheroes.fr/2020/02/02/securiser-une-api-rest-2-3-implementation-en-node-js/
https://www.codeheroes.fr/2020/06/20/securiser-une-api-rest-3-3-gestion-du-jwt-cote-client/
https://medium.com/@ryanchenkie_40935/react-authentication-how-to-store-jwt-in-a-cookie-346519310e81

