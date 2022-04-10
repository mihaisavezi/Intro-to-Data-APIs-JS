const express = require('express');
var fs = require('fs');
var getDirName = require('path').dirname;
const db = require('./database');

const app = express();
app.listen(3000, () => { console.log('listening at port 3000') })
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.post('/api', (request, response) => {
    const { body } = request;
    const { image: imageInBase64 } = body;
    const timestamp = Date.now();
    const buffer = Buffer.from(imageInBase64, 'base64');

    const path = `./resources/image-${timestamp}.png`;

    writeFile(path, buffer, (error) => {
        if (error) {
            response.end();
            return
        }
        const data = { ...body, image: path, timestamp: timestamp }
        db.insert(data);

        response.json({
            status: 'success',
            data,
        })
    })
});

app.use((req, res, next) => {
    console.log('I got a request');
    next()
})

app.get('/api', (request, response) => {
    db.find({}, (error, docs) => {
        if (error) {
            response.end()
            return;
        }

        const preparedDocs = docs.map(doc => {
            const {image: imagePath} = doc;
            debugger;
            doc.image = fs.readFileSync(imagePath, 'base64url');

            return doc;
        })


        response.json({
            status: 'success',
            data: preparedDocs
        })
    });
});

function writeFile(path, contents,  cb) {
    fs.mkdir(getDirName(path), { recursive: true}, function (err) {
      if (err) return cb(err);
  
      fs.writeFile(path, contents, 'base64', cb);
    });
  }
  


