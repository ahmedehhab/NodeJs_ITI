const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '/data.json');

function save(products) {
    fs.writeFileSync(filePath, JSON.stringify(products));
}

function getProducts() {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        return null;
    }

}
function findByName(name, proudcts) {
    const item = proudcts.find((item) => item.name == name);
    return item;
}

function getNextId(products) {
    return (products[products.length - 1]?.id || 0) + 1;
}

function add(args) {
    if (args.length == 0) {
        console.log("the name must be required");
        return;
    }

    const products = getProducts();
    if (!products) {
        console.log('not found');
        return;
    }
    if (findByName(args[0], products)) {
        console.log("item is already exists");
        return;
    }
    const product = {
        id: getNextId(products),
        name: args[0],
        quantity: 1,
        category: "General"
    };
    const updatedProducts = products.concat(product);
    save(updatedProducts);
}

function destock(args) {
    if (args.length != 2) {
        console.log("id and number is requried");
        return;
    }
    if (isNaN(args[0])) {
        console.log("id is requried and must be a number");
    } else if (isNaN(args[1])) {
        console.log("quantity is requied and must be a number");
    } else {
        const products = getProducts();
        const item = products.find((i) => i.id == args[0]);
        if (!item) {
            console.log("item is not found");
            return;
        } else if (item.quantity < args[1]) {
            console.log("not enough in the stock ")

        } else {
            item.quantity -= args[1];
        }
        save(products);
    }

}
function restock(args) {
    if (args.length != 2) {
        console.log("id and number is requried");
        return;
    }
    if ((args[0] && isNaN(args[0]))) {
        console.log("id is requried and must be a number");
    } else if ((args[1] && isNaN(args[1]))) {
        console.log("quantity is requried and must be a number");
    } else {
        const products = getProducts();
        const item = products.find((i) => i.id == args[0]);
        if (!item) {
            console.log("item is not found");
            return;
        } else {
            item.quantity = Number(item.quantity) + Number(args[1]);
            save(products);
        }
    }

}
function edit(args) {
    if (args.length != 2) {
        console.log("id and name is requried");
        return;
    }

    if (isNaN(args[0])) {
        console.log("id is requried and must be a number");
    } else {
        const products = getProducts();
        const item = products.find((i) => i.id == args[0]);
        if (!item) {
            console.log("item is not found");
            return;
        } else {
            item.name = args[1];
            save(products);
        }
    }

}
function removeItem(args) {
    if (!args[0] || isNaN(args[0])) {
        console.log("id is requried and must be a number");
    } else {
        const products = getProducts();
        const updatedProducts = products.filter((item) => item.id != args[0]);
        save(updatedProducts);
    }
}

function summary(args) {
    const products=getProducts();
    const result = { totalItems: products.length };
  const totalQuantity = products.reduce((ac, item) => ac + item.quantity, 0);
  result.totalQuantity = totalQuantity;
  console.log(result);

}
function list (args){
    const products=getProducts();
    const updatedProducts = products.map((item) => {
    if (item.quantity > 2) {
      item.status = "available";
    } else if (item.quantity > 0 && item.quantity < 2) {
      item.status = "low stock"
    } else if (item.quantity == 0) {
      item.status = "out of stock";
    }
  })

  console.table(products);
}
const commands = {
    add,
    destock,
    restock,
    edit,
    delete: removeItem,
    summary,
    list,
}

function main() {
    const [, , command, ...args] = process.argv;
    commands[command] ? commands[command](args) : console.log('command not found');
}
main();