var express = require('express');
var multer = require('multer');
var path = require('path');
var router = express.Router();
var productHelper = require('../helpers/product-helpers');
var productHelpers = require('../helpers/product-helpers');
const { response } = require('../app');

/* GET users listing. */
router.get('/', function (req, res, next) {

   productHelpers.getAllProducts().then((products) => {
      console.log(products)
      res.render('admin/view-products', { admin: true, products })
   });

});
router.get('/add-product', function (req, res) {
   res.render('admin/add-product')
})
router.post('/add-product', (req, res) => {
   console.log(req.body)
   console.log(req.files.Image)

   productHelpers.addProduct(req.body, (id) => {
      let image = req.files.Image
      console.log(id);
      image.mv('./public/product-images/' + id + '.jpg', (err, done) => {
         if (!err) {
            res.render("admin/add-product");
         } else {
            console.log(err);
         }
      });

   });
});
router.get('/delete-product/:id', (req, res) => {
   let proId = req.params.id;
   console.log(proId);
   productHelpers.deleteProduct(proId).then((response) => {
      res.redirect('/admin/');
   });

});

router.get('/edit-product/:id', async (req, res) => {
   let product = await productHelpers.getProductDetails(req.params.id);
   console.log(product);
   res.render('admin/edit-product', { product });
});

router.post('/edit-product/:id', (req, res) => {
   console.log(req.params.id);
   let id = req.params.id;

   productHelpers.updateProduct(id, req.body).then(() => {
      // Product update successful, now check for file upload
      if (req.files && req.files.Image) {
         let image = req.files.Image;
         image.mv('./public/product-images/' + id + '.jpg', (err) => {
            if (err) {
               console.error(err);
               res.status(500).send('Error uploading image');
            } else {
               res.redirect('/admin');
            }
         });
      } else {
         res.redirect('/admin');
      }
   }).catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
   });
});




module.exports = router; 
