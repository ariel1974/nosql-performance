var mocker = require('mocker-data-generator').default;
const Json2csvParser = require('json2csv').Parser;

const fs = require('fs');

const fields = ['origin_id', 'label', 'type_id', 'tenant_id'];
const opts = {fields};
const parser = new Json2csvParser(opts);

const index = parseInt(process.argv[2]);

const chunk = 100000;

var item = {
    origin_id: {
        incrementalId: 1 + (index * chunk)
    },
    label: {
        faker: 'lorem.words(3)'
    },
    type_id: {
        faker: 'random.number({"min": 3, "max": 31})'
    },
    tenant_id: {
        randexp: /t1B2(A|B)po9i(1|2)k4j5(R|T)ASDE(5|F)IuweY(2|F)at43(T|C)qwer(U|B)/
    }
};

mocker()
    .schema('items', item, chunk)
    .build(function (error, data) {
        if (error) {
            throw error;
        }
        const csv = parser.parse(data['items']);
        fs.writeFile(`dataset/origins-dataset-${index}.csv`, csv, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });

    });

