const express = require('express');
const router = express.Router();
const postRouter = require('./post');

router.get('/', function(req, res, next) {
  res.status(200).send('hello');
});

let printAll = async () => {
  await printAlphabet('a',5000);
  await printAlphabet('b',3000);
  await printAlphabet('c',1000);
  throw new Error('error');
}

let printAlphabet = (char,sec) => {
  return new Promise(function(resolve, reject){
    setTimeout( function(){
        console.log(char);
        resolve('printed');
    }, sec);
  });
}

router.get('/async',async function(req,res,next){
  try{
    await printAll();
  } catch(err){
    next(err);
  }
});
router.use((err,req,res,next)=>{
  console.log(err);
  res.status(500).json({msg:'error occur!'});
});

router.use('/posts', postRouter);
router.use('/err', (req, res, next) => {
  next('error occurs!');
});

module.exports = router;
