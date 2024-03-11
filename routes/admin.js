var express = require('express');
var multer=require('multer');
var path =require('path');
var router = express.Router();
var productHelper =require('../helpers/product-helpers');
const productHelpers = require('../helpers/product-helpers');
const { response } = require('../app');

/* GET users listing. */
router.get('/', function (req, res, next) {
   
   productHelpers.getAllProducts().then((products)=>{
    console.log(products)
    res.render('admin/view-products', { admin: true, products })
   });
  
});
router.get('/add-product', function (req, res) {
  res.render('admin/add-product')
})
router.post('/add-product', (req, res) => {
  console.log(req.body)
  console.log(req.files.image)

  productHelpers.addProduct(req.body,(id)=>{
     let image=req.files.image
     console.log(id);
     image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
       if(!err){
        res.render("admin/add-product");
       }else{
        console.log(err);
       }
    });
   
     
   
 });
});
router.get('/delete-product/:id',(req,res)=>{
   let proId=req.params.id;
   console.log(proId);
   productHelpers.deleteProduct(proId).then((response)=>{
      res.redirect('/admin/');
   })
   
})

module.exports = router; 
