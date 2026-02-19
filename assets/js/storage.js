// Helper functions for interacting with localStorage

const STORAGE_KEYS = {
    USERS: 'fin_users',
    MOVEMENTS: 'fin_movements',
};

function getUsers() {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function getMovements() {
    const data = localStorage.getItem(STORAGE_KEYS.MOVEMENTS);
    return data ? JSON.parse(data) : [];
}

function saveMovements(movs) {
    localStorage.setItem(STORAGE_KEYS.MOVEMENTS, JSON.stringify(movs));
}

// Example CRUD helpers
function addMovement(movement) {
    const movs = getMovements();
    movs.push(movement);
    saveMovements(movs);
}

function updateMovement(id, updated) {
    const movs = getMovements();
    const idx = movs.findIndex(m => m.id === id);
    if (idx !== -1) {
        movs[idx] = {...movs[idx], ...updated};
        saveMovements(movs);
    }
}

function deleteMovement(id) {
    let movs = getMovements();
    movs = movs.filter(m => m.id !== id);
    saveMovements(movs);
}

// user helpers
function addUser(user) {
    const users = getUsers();
    users.push(user);
    saveUsers(users);
}

function getUserById(id) {
    const users = getUsers();
    return users.find(u => u.id === id);
}

function updateUser(id, updated) {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx !== -1) {
        users[idx] = {...users[idx], ...updated};
        saveUsers(users);
    }
}
