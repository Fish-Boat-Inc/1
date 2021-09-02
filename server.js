var express = require('express');
var router = express.Router();
var fs = require('fs');

var HOST = process.env.HOST == undefined ? HOST='0.0.0.0' : HOST=process.env.HOST;
var PORT = process.env.PORT == undefined ? PORT=8080 : PORT=process.env.PORT;
var PREFIX = process.env.PREFIX == undefined ? PREFIX='app' : PREFIX=process.env.PREFIX

var hits = 0;
var status = 200;
var app = express();
app.use(express.json());
app.use(express.urlencoded())

app.use('/'+PREFIX,router);

router.use(express.static('public'))

router.get('/blinky',(req,res)=>{
    console.log(`/blinky has been hit ${++hits} time/s`);
    const data = fs.readFileSync("blinky");
    res.status(status);
    res.send(data);
})

router.post('/status', (req,res) => {
    var rstatus = parseInt(req.body.status);
    console.log(req.body);
    if(rstatus <= 600 && rstatus >= 100){
        status = rstatus;
        res.status(200);
    } else {
        res.status(418);
    }
    res.send();
})

router.get('/hits', (req,res) => {
    res.send(`${hits}\n`);
})

app.listen(PORT, HOST, () => console.log(`${HOST} Listening to /${PREFIX}/* on ${PORT}...`));