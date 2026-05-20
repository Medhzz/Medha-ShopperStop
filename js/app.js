// Cart (localStorage) 
function getCart() { return JSON.parse(localStorage.getItem("mss_cart") || "[]"); }
function saveCart(cart) { localStorage.setItem("mss_cart", JSON.stringify(cart)); }

function addToCart(product, qty) {
  const cart = getCart();
  const ex = cart.find(i => i.productId === product.id);
  if (ex) ex.quantity += qty;
  else cart.push({ productId: product.id, title: product.title, price: product.price, quantity: qty, image_url: product.image_url });
  saveCart(cart);
  updateNavBadge();
}

function removeFromCart(productId) {
  saveCart(getCart().filter(i => i.productId !== productId));
  updateNavBadge();
}

function updateCartQty(productId, qty) {
  if (qty <= 0) return removeFromCart(productId);
  const cart = getCart();
  const item = cart.find(i => i.productId === productId);
  if (item) item.quantity = qty;
  saveCart(cart);
}

function cartTotal() { return getCart().reduce((s, i) => s + i.price * i.quantity, 0); }
function cartCount() { return getCart().reduce((s, i) => s + i.quantity, 0); }

function updateNavBadge() {
  const c = cartCount();
  $("#cart-badge").text(c).toggle(c > 0);
}

// --- Alerts ---
function showAlert(msg, type) {
  const cls = type === "success" ? "alert-success" : "alert-error";
  $("#alert-area").html(`<div class="alert ${cls}">${msg}</div>`);
  setTimeout(() => $("#alert-area").empty(), 4000);
}

// --- Auth guard ---
function requireAuth(adminOnly) {
  auth.onAuthStateChanged(user => {
    if (!user) return (window.location.href = "login.html");
    if (adminOnly && !isAdmin(user)) return (window.location.href = "index.html");
    if (!adminOnly && isAdmin(user)) return (window.location.href = "admin.html");
  });
}

// --- Navbar logout ---
$(document).on("click", "#btn-logout", function () {
  signOutUser().then(() => (window.location.href = "login.html"));
});

// --- Seed products ---
const SEED = [
  { category_id: "women", title: "Floral Maxi Dress", description: "Elegant floral print maxi dress for summer outings.", quantity: 25, price: 1299, image_url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400", active: true },
  { category_id: "women", title: "Off-Shoulder Evening Gown", description: "Stunning gown for special occasions.", quantity: 12, price: 2499, image_url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400", active: true },
  { category_id: "women", title: "Casual Wrap Dress", description: "Comfortable wrap dress for everyday wear.", quantity: 40, price: 899, image_url: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400", active: true },
  { category_id: "women", title: "Bodycon Party Dress", description: "Sleek bodycon dress for night outs.", quantity: 18, price: 1599, image_url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", active: true },
  { category_id: "women", title: "Boho Sundress", description: "Light boho sundress with embroidery.", quantity: 110, price: 749, image_url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400", active: true },
  { category_id: "men", title: "Classic Kurta", description: "Traditional cotton kurta.", quantity: 35, price: 999, image_url: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=400", active: true },
  { category_id: "men", title: "Linen Shirt Dress", description: "Breathable linen shirt for casual days.", quantity: 8, price: 1199, image_url: "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=400", active: true },
  { category_id: "men", title: "Sherwani Set", description: "Royal sherwani for weddings.", quantity: 5, price: 4999, image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", active: true },
  { category_id: "kids", title: "Princess Frock", description: "Adorable princess frock for girls.", quantity: 50, price: 649, image_url: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400", active: true },
  { category_id: "kids", title: "Boys Ethnic Set", description: "Cute ethnic set for little boys.", quantity: 30, price: 799, image_url: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400", active: true },
  { category_id: "kids", title: "Tutu Party Dress", description: "Fun tutu dress for parties.", quantity: 120, price: 549, image_url: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400", active: true },
  { category_id: "women", title: "Saree Gown Fusion", description: "Modern fusion of saree and gown.", quantity: 3, price: 3299, image_url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400", active: true },
];

function seedProducts() {
  const promises = SEED.map(p => addProduct(p));
  return Promise.all(promises);
}
