const data=require('../model/data.json');

function nextId(){
    return data[data.length-1]? data[data.length-1].id +1:1;
}
module.exports={
    nextId,
}