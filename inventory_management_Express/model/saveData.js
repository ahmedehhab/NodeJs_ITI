const fs =require('fs');
function save(items) {
    const writeStream = fs.createWriteStream('./model/data.json');
    writeStream.write(JSON.stringify(items));
    writeStream.end();

}
module.exports={
    save
}