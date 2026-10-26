const products = [
    { id: 1, title: "Apex Gaming Laptop RTX 4080", category: "laptops", price: 2199, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=80" },
    { id: 2, title: "UltraBook Pro Slim 15", category: "laptops", price: 1299, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80" },
    { id: 3, title: "Custom Liquid Cooled Workstation PC", category: "computers", price: 2899, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=80" },
    { id: 4, title: "Desktop Creator Hub i7", category: "computers", price: 1499, image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=500&q=80" },
    { id: 5, title: "Noise-Canceling Wireless Headphones", category: "electronics", price: 299, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80" },
    { id: 6, title: "4K Ultra HD Curved Gaming Monitor", category: "electronics", price: 649, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80" }
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    // Check URL parameters for initial category selection
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('category');
    if (catParam) {
        filterProducts(catParam);
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if (btn.dataset.category === catParam) btn.classList.add('active');
            else btn.classList.remove('active');
        });
    } else {
        renderProducts(products);
    }

    // Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const cat = e.target.dataset.category;
            filterProducts(cat);
        });
    });

    // Cart Drawer Toggles
    const cartToggle = document.getElementById('cartToggle');
    const cartDrawer = document.getElementById('cartDrawer');
    const closeCart = document.getElementById('closeCart');

    if (cartToggle) {
        cartToggle.addEventListener('click', () => cartDrawer.classList.add('active'));
        closeCart.addEventListener('click', () => cartDrawer.classList.remove('active'));
    }
});

function filterProducts(category) {
    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

function renderProducts(items) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    if (items.length === 0) {
        grid.innerHTML = `<p style="color:var(--text-muted)">No products found in this category.</p>`;
        return;
    }

    grid.innerHTML = items.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.title}">
            <div class="product-details">
                <h4>${p.title}</h4>
                <p>$${p.price.toLocaleString()}</p>
                <button class="btn btn-primary" style="margin-top:auto;" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCartUI();
    document.getElementById('cartDrawer').classList.add('active');
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.querySelectorAll('#cartCount');
    const cartTotal = document.getElementById('cartTotal');

    cartCount.forEach(el => el.textContent = cart.length);

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="color:var(--text-muted)">Your cart is empty.</p>`;
        cartTotal.textContent = "$0.00";
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = cart.map(item => {
        total += item.price;
        return `
            <div style="display:flex; justify-content:space-between; margin-bottom:1rem; border-bottom:1px solid var(--border); padding-bottom:0.5rem;">
                <span>${item.title}</span>
                <span style="color:var(--accent)">$${item.price}</span>
            </div>
        `;
    }).join('');

    cartTotal.textContent = `$${total.toLocaleString()}`;
}