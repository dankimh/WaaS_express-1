const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.post('/0108', function(req,res,next){
    const imsiBody=req.body;
    let count=0;
    for (let key in imsiBody) {
        if(imsiBody[key]==='<script>'){
            count=1;
            res.status(400).send('XSS detected because of "'+key+'"='+imsiBody[key]);
        }
    }
    if(count===0)res.status(200).send(imsiBody);
    next();
});

app.use('/', indexRouter);
app.listen(3000);
module.exports = app;
