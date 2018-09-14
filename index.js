const fs = require('fs');
const xml2js = require('xml2js');
const util = require('util');

let parser = new xml2js.Parser();

let count = 0;

const printNodes = (doc) => {

    for (let key in doc) {

        if ( (typeof doc[key] === 'object' ||
          ( typeof doc[key] === 'array' && doc[key].length === 1 )) &&
          ['_', '$'].indexOf(key) === -1 ) {

            if (isNaN(parseInt(key))) {
                console.log(`TAG: %s , VALUE: %s`, key, util.inspect(doc[key], false, null));
            }

            if (doc[key].length > 1) {
                doc[key].forEach(item => console.log ('TAG %s , ATTRIBUTE %s = %s', key, item['$'].name, item['_']));
                printNodes(doc[key][0]);
            }
            printNodes(doc[key]);
        }
    }
};

const getValuesByTag = (doc, tag) => {

  for (let key in doc) {

    if (typeof doc[key] === 'object') {

      if (key === tag) {
        console.log(`TAG: %s , VALUE: %s`, key, util.inspect(doc[key], false, null));
      }

      getValuesByTag(doc[key], tag);
    }
  }
};

const countNodesByAttribute = (doc, attribute) => {

  for (let key in doc) {

    if ( (typeof doc[key] === 'object' ||
      ( typeof doc[key] === 'array' && doc[key].length === 1 )) &&
      ['_', '$'].indexOf(key) === -1 ) {

      if (doc[key].length > 1) {
        doc[key].forEach(item => {
          if (item['$'][attribute]) {
            console.log(item['$'][attribute]);
            count++;
          }

        });
        countNodesByAttribute(doc[key][0], attribute);
      }
      countNodesByAttribute(doc[key], attribute);
    }
  }

  return count;
};

(() => {

    fs.readFile(__dirname + '/demo.xml', function(err, data) {
        parser.parseString(data, function (err, result) {
            console.log(util.inspect(result, false, null));
            console.log('Done');
            printNodes(result);
          console.log('------------------------------------------------------------------------------');
          getValuesByTag(result, 'age');
          console.log('------------------------------------------------------------------------------');
          console.log('Количество тегов с атрибутом name: ' + countNodesByAttribute(result, 'name'));
        });
    });


})();

