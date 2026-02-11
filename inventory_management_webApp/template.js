function htmlList(items) {
    let tableRows = "";
    for (let i = 0; i < items.length; i++) {
        tableRows += ` <tr>
            <td>${items[i].name}</td>
            <td>${items[i].quantity}</td>
            <td>${items[i].category}</td>
        </tr>`
    }
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Inventory List</title>
    </head>
    <link rel="stylesheet" href="/styles/style.css">
    <body>
        <h1>Product Inventory</h1>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
    </body>
    </html>`
};


function pageTwo(){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>astronomy</title>
    </head>
    <body> 
    <img src="/images/astronomy.jpg">
    <p>lafgjasjdkabsdaks.dbasld.kasf.jsavfak.sbdalf/kabsf.asbf.sbf;a./fnas.f,bflkablkadb akj.sc K>cj aschsvck</p>
    </body>
    </html>`
}

function pageThree(){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>astronomy</title>
    </head>
    <body> 
    <img src="/images/serbal.jpg" width="500" height="300">
    <p>lafgjasjdkabsdaks.dbasld.kasf.jsavfak.sbdalf/kabsf.asbf.sbf;a./fnas.f,bflkablkadb akj.sc K>cj aschsvck</p>
    </body>
    </html>`
}

function notFoundPage(){
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
        <title>404 not found</title>
</head>
<link rel="stylesheet" href="/styles/404.css">
<body>

    <div class="content">
        <h1>404</h1>
        <p>Page not found.</p>
        <a href="/">Go Back Home</a>
    </div>

</body>
</html>`
}
module.exports = {
    htmlList,
    pageTwo,
    pageThree,
    notFoundPage
}