const data = require('../model/data.json');
const { nextId } = require('../utils/getId.js');
const { save } = require('../model/saveData.js');

function root(req, res) {
    res.render('index', { data });
}

function notFound(req, res) {
    res.status(404).json("notFound");
}

function getProductById(req, res) {
    res.status(200).json(req.item);

}
function getAllProducts(req, res) {
    let listOfProduct = data.concat();
    console.log(req.query);
    if (req.query["category"]) {
        listOfProduct = listOfProduct.filter(item => item.category == req.query.category);
    }
    res.json(listOfProduct);
}



function addProduct(req, res) {
    const newItem = {
        id: nextId(),
        name: req.body.name,
        quantity: req.body.quantity,
        category: req.body.category
    }
    data.push(newItem);
    save(data);
    res.status(201).json(newItem);

}

function deleteProduct(req, res) {
    const updateProduct = data.filter(i => i.id != req.item.id);
    res.status(204).json("item deleted successfully");

}

function updateProduct(req, res) {
    for (const key in req.item) {
        if (req.body[key]) {
            if (key == "quantity" && isNaN(req.body[key])) {
                res.status(420).json({ message: "quantity must be a number" });
                return;
            }
            req.item[key] = req.body[key];
        }
    }
    save(data);
    res.json(204).json({ message: "item updated successfully", data });
}

function restock(req,res){
    const {quantity}=req.body;
    if(isNaN(quantity)){
        res.status(422).json({message:"quantity must be a number"});
        return;
    }
   req.item.quantity+=quantity;
     save(data);
  res.json(req.item);

}

function destock(req,res){
     const {quantity}=req.body;
    if(isNaN(quantity)){
        res.status(422).json({message:"quantity must be a number"});
        return;
    } 
    if(quantity > req.item.quantity){
        res.json({message:"not enough in the stock"});
        return;
    }
    req.item.quantity-=quantity;
    save(data);
    res.json(req.item);
}
module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    deleteProduct,
    updateProduct,
    root,
    notFound,
    restock,
    destock
};