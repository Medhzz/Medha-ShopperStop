// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaeMSpZ59gePFDTOV4jqkEnovV23_WD7A",
  authDomain: "medhashopperstop.firebaseapp.com",
  projectId: "medhashopperstop",
  storageBucket: "medhashopperstop.firebasestorage.app",
  messagingSenderId: "384596746364",
  appId: "1:384596746364:web:74dfe49bfb87d880b529f9",
  databaseURL: "https://medhashopperstop-default-rtdb.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();
const ADMIN_EMAIL = "admin@medhashopperstop.com";

// --- Auth ---
function signUp(email, password, name) {
  return auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.ref("customers/" + cred.user.uid).set({
      uid: cred.user.uid, name, email,
      creditLimit: 1000, creditUsed: 0,
      createdAt: new Date().toISOString()
    }).then(() => cred.user);
  });
}

function signIn(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

function signOutUser() { return auth.signOut(); }

function resetPwd(email) { return auth.sendPasswordResetEmail(email); }

function isAdmin(user) { return user && user.email === ADMIN_EMAIL; }

// --- Products ---
function getProducts() {
  return db.ref("inventory").get().then(snap => {
    if (!snap.exists()) return [];
    const d = snap.val();
    return Object.keys(d).map(id => ({ id, ...d[id] }));
  });
}

function addProduct(data) { return db.ref("inventory").push(data); }

function updateProduct(id, data) { return db.ref("inventory/" + id).update(data); }

function deleteProduct(id) { return db.ref("inventory/" + id).remove(); }

// --- Orders ---
function placeOrder(order) {
  return db.ref("orders").push({ ...order, createdAt: new Date().toISOString() });
}

function getOrdersByUser(uid) {
  return db.ref("orders").get().then(snap => {
    if (!snap.exists()) return [];
    const d = snap.val();
    return Object.keys(d).map(id => ({ id, ...d[id] }))
      .filter(o => o.uid === uid)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  });
}

function getAllOrders() {
  return db.ref("orders").get().then(snap => {
    if (!snap.exists()) return [];
    const d = snap.val();
    return Object.keys(d).map(id => ({ id, ...d[id] }))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  });
}

function getAllCustomers() {
  return db.ref("customers").get().then(snap => {
    if (!snap.exists()) return [];
    return Object.values(snap.val());
  });
}

function getCustomer(uid) {
  return db.ref("customers/" + uid).get().then(s => s.exists() ? s.val() : null);
}

function updateCustomer(uid, data) { return db.ref("customers/" + uid).update(data); }
