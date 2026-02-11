const express = require('express');
const data = require('./model/data.json');
const { getAllProducts, getProductById,destock, addProduct, restock,deleteProduct, updateProduct, root ,notFound} = require('./controller/products.js');
const {createItemValidation,itemExsits} =require('./middleware/validation.js')
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.set("view engine", "pug");
app.get('/',root)
app.get('/products', getAllProducts);
app.get('/products/:id',itemExsits, getProductById)
app.post('/products', createItemValidation,addProduct);
app.patch('/products/:id',itemExsits, updateProduct);
app.patch('/products/:id/restock',itemExsits,restock);
app.patch('/products/:id/destock',itemExsits,destock);
app.delete('/products/:id',itemExsits , deleteProduct);
app.use(notFound);
app.use((err,req,res,next)=>{
    console.log(err);
    res.json();
})

app.listen(3000, () => {
    console.log("server is up and running ");
});