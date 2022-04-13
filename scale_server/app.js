const express = require('express'); 
const bodyParser = require('body-parser'); 
const path = require('path');
const app = express(); 
const cors = require('cors')
 
app.use(bodyParser.json()); 
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.post('/', (req, res) => {
    // file system module to perform file operations
    json = JSON.stringify(req.body)
    fs.writeFile('./output.json', json, (err) => {
        if (!err) {
            console.log("JSON file created!");
        }
    })
    res.send(req.body)
})

app.get('/', (req, res) => {
    const fs = require('fs')
    const path = './output.json'
    const data = JSON.parse(fs.readFileSync(path));
    console.log(data)
    res.send(data)
})

app.listen(port, () => {
    console.log("Listening on port")
})