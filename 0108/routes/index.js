const express = require('express');
const router = express.Router();
const postRouter = require('./post');
const bodyParser = require('body-parser');

router.get('/', function(req, res, next) {
  res.status(200).send('hello');
});

/*router.post('/',function(req,res,next){
  if(req.body.phrase==='<script>'){
    res.status(400).send('XSS detected!');
  }else{
    res.status(200).send(req.body.phrase);
  }
});*/

router.use('/posts', postRouter);
router.use('/err', (req, res, next) => {
  next('error occurs!');
});

router.use('/err', function(err,req,res,next,){
  //let stack=new Error().stack;
  console.log(err);
  console.trace('Here I am!');
  res.status(200).json({success:false});
});
module.exports = router;
