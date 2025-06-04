const db = 'https://your-api-url.com/products'; // Ingresa al sitio de Mongo DB y Reemplaza esto a tu URL de API

// Obtiene la lista de productos desde la API
async function fetchProducts() {
    const response = await fetch(db);
    const data = await response.json();
    return data;
}

// Guarda un nuevo producto en la API
async function saveProduct(product) {
    await fetch(db, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
}

// Actualiza un producto existente en la API
async function updateProduct(index, product) {
    await fetch(`${db}/${index}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
}

// Elimina un producto de la API
async function deleteProduct(index) {
    await fetch(`${db}/${index}`, {
        method: 'DELETE',
    });
}

// Renderiza la lista de productos en la Tabla HTML
async function renderProducts() {
    products = await fetchProducts();
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

// Agrega un evento al formulario para manejar el envío
document.getElementById('productForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const quantity = parseInt(document.getElementById('productQuantity').value);

    const product = { name, description, quantity };
    await saveProduct(product);
    await renderProducts();
    this.reset();
});

// Edita un producto existente
async function editProduct(index) {
    const product = products[index];
    document.getElementById('productName').value = product.name;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productQuantity').value = product.quantity;

    await deleteProduct(index);
    await renderProducts();
}

// Elimina un producto
async function deleteProduct(index) {
    await deleteProduct(index);
    await renderProducts();
}

renderProducts();
