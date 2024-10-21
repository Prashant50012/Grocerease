document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const vendorName = document.getElementById('vendorName').value;
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;

    const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vendorName, productName, productPrice }),
    });

    const product = await response.json();
    addProductToList(product);

    // Clear the form
    document.getElementById('uploadForm').reset();
});

function addProductToList(product) {
    const productList = document.getElementById('productList');
    const listItem = document.createElement('li');
    listItem.textContent = `${product.productName} by ${product.vendorName}: $${product.productPrice}`;
    productList.appendChild(listItem);
}

async function fetchProducts() {
    const response = await fetch('/api/products');
    const products = await response.json();
    products.forEach(addProductToList);
}

window.onload = fetchProducts;