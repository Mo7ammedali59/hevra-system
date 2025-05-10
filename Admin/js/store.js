document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("addProductForm");
    const productTable = document.getElementById("productTable");

    let products = JSON.parse(localStorage.getItem("storeProducts")) || [];

    function renderProducts() {
        productTable.innerHTML = "";
        products.forEach((product, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="btn edit-btn" onclick="editProduct(${index})"><i class="bi bi-pencil"></i> Edit</button>
                    <button class="btn delete-btn" onclick="deleteProduct(${index})"><i class="bi bi-trash"></i> Delete</button>
                </td>
            `;
            productTable.appendChild(row);
        });
    }

    productForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("productName").value;
        const price = parseFloat(document.getElementById("productPrice").value);
        const stock = parseInt(document.getElementById("productStock").value);

        products.push({ name, price, stock });
        localStorage.setItem("storeProducts", JSON.stringify(products));

        productForm.reset();
        renderProducts();
    });

    window.editProduct = function (index) {
        const product = products[index];
        const newName = prompt("Enter new product name:", product.name);
        const newPrice = parseFloat(prompt("Enter new price:", product.price));
        const newStock = parseInt(prompt("Enter new stock quantity:", product.stock));

        if (newName && !isNaN(newPrice) && !isNaN(newStock)) {
            products[index] = { name: newName, price: newPrice, stock: newStock };
            localStorage.setItem("storeProducts", JSON.stringify(products));
            renderProducts();
        }
    };

    window.deleteProduct = function (index) {
        if (confirm("Are you sure you want to delete this product?")) {
            products.splice(index, 1);
            localStorage.setItem("storeProducts", JSON.stringify(products));
            renderProducts();
        }
    };

    renderProducts();
});
