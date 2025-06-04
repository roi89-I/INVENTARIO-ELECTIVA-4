let products = JSON.parse(localStorage.getItem('products')) || [];

function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

function renderProducts() {
    const tbody = document.querySelector('#productTable tbody');
    tbody.innerHTML = '';
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.quantity}</td>
            <td>
                <button onclick="editProduct(${index})">Editar</button>
                <button onclick="deleteProduct(${index})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const quantity = parseInt(document.getElementById('productQuantity').value);

    products.push({ name, description, quantity });
    saveProducts();
    renderProducts();
    this.reset();
});

function editProduct(index) {
    const product = products[index];
    document.getElementById('productName').value = product.name;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productQuantity').value = product.quantity;

    products.splice(index, 1);
    saveProducts();
    renderProducts();
}

function deleteProduct(index) {
    products.splice(index, 1);
    saveProducts();
    renderProducts();
}

function searchProduct() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    renderFilteredProducts(filteredProducts);
}

function advancedSearch() {
    const minQuantity = parseInt(document.getElementById('minQuantity').value) || 0;
    const maxQuantity = parseInt(document.getElementById('maxQuantity').value) || Infinity;
    const filteredProducts = products.filter(product => product.quantity >= minQuantity && product.quantity <= maxQuantity);
    renderFilteredProducts(filteredProducts);
}

function renderFilteredProducts(filteredProducts) {
    const tbody = document.querySelector('#productTable tbody');
    tbody.innerHTML = '';
    filteredProducts.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.quantity}</td>
            <td>
                <button onclick="editProduct(${index})">Editar</button>
                <button onclick="deleteProduct(${index})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

renderProducts();