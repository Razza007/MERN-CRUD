var express = require('express');
var router = express.Router();
var mongoose = require ('mongoose');


var student =mongoose.model('student',{
  name: String,
  age: Number,
  address: String,
  email: String

})
/* GET home page. */


router.get('/', async function(req, res, next) {
  let userData = await student.find({});
  res.render('index',{userData:userData} );
});


router.post('/', async function(req, res, next) {
  var name = req.body.name;
  var age = req.body.age;
  var address = req.body.address;
  var email = req.body.email;

  await student.create({
    name: name,
    age: age,
    address: address,
    email: email
  });

  console.log(
    'Name: ' + name +
    ', age: ' + age +
    ', address: ' + address +
    ', Email: ' + email
  );

  res.send('Form data received');
});

  
//about pages
router.get('/about', function(req, res, next){
  res.render('about', {title: 'About Us' });
});
// this code is for updatae student data which show existinng data in form
router.get('/edit/:id', async function(req, res, next) {
  var id = req.params.id;
   var userData = await student.findOne({_id:id});
  res.render('edit', {userData:userData});
});
// this code helps to update in database
router.post('/edit/:id', async function(req, res, next) {
  var id = req.params.id;
  var name = req.body.name;
  var age = req.body.age;
  var address = req.body.address;
  var email = req.body.email;

  await student.updateOne({_id:id}, { $set: { name:name,  age:age, address:address, email:email,  } });
  res.redirect('/');
});

//delete
router.get('/delete/:id', async function(req, res, next) {
  var id = req.params.id;
  await student.deleteOne({_id:id});
  res.redirect('/');
});


module.exports = router;
