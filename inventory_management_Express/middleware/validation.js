const data=require('../model/data.json');
function createItemValidation(req, res, next) {
    if(!req["body"]){
        res.json("you must send data ");
        return;
    }
    const error = {};
    if (!req.body['name']) {
        error.name = "name is requried";
    }else{
       const item =data.find(i=>i.name===req.body.name);
       if(item) error.message ="name must be unique";
    }
    if (!req.body["quantity"] || isNaN(req.body.quantity)) {
        error.quantity = "qunatity is requried and must be a number";
    }
    if (!req.body["category"]) {
        error.category = "category is requried";
    }
    if (Object.keys(error).length) {
        res.status(422).json(error);
        return;
    } else next();
}

function itemExsits(req,res,next){
    const {id}=req.params;
     const item =data.find(i=>i.id==id);
     if(!item){
        res.status(404).json({message:"item not found"});
        return;
     }
     req.item=item;
     next();
}


module.exports = {
    createItemValidation,
    itemExsits
}