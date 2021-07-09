const express = require("express");
const list = require("../fakeDb");
const ExpressError = require("../expressError");

const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    return res.json({ list });
  } catch(err){
    return next(err)
  }
});


router.post('/post', (req, res, next) => {
  try {
  	if(!req.body.name || !req.body.price){
  	 throw new ExpressError("name and price required", 400);
  	}
    const product = {name: req.body.name, price: req.body.price };
    list.push(product);
    return res.status(201).json({list: list });
  } catch (err) {
    return next(err)
  }
});


router.get('/get/:name', (req, res, next) => {
  try {
    const findItem = list.find(item => item.name === req.params.name);
    if (findItem === undefined) {
    	throw new ExpressError("Name not found", 404);
    }
    return res.json({item:findItem});
  } catch(err){
    return next(err)
  }
});


router.patch('/update/:name', (req, res, next) => {
  try {
    const findItem = list.find(item => item.name === req.params.name);
    if (findItem === undefined) {
    	throw new ExpressError("Name not found", 404);
  }
  	findItem.name = req.body.name;
    return res.json({item:findItem});
 
  } catch (err) {
    return next(err)
  }
});


router.patch('/update/price/:price', (req, res, next) => {
  try {
    const findItem = list.find(item => item.price === req.params.price);
    if (findItem === undefined) {
    	throw new ExpressError("Price not found", 404);
  }
  	findItem.price = req.body.price;
    return res.json({item:findItem});
  } catch (err) {
    return next(err)
  }
});


router.delete('/delete/:name', (req, res, next) => {
  try {
    const findItem = list.find(item => item.name === req.params.name);
    if (findItem === -1) {
    	throw new ExpressError("Name not found", 404);
  }
  	list.splice(findItem, 1);
    return res.json({message:'Deleted'});
  } catch (err) {
    return next(err)
  }
});




module.exports = router;