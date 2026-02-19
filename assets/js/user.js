// Logic specific to the user dashboard

// Global variables for event handlers
let movForm = null;
let editingId = null;

function initUserDashboard() {
    const userId = Number(localStorage.getItem('currentUserId'));
    if (!userId) {
        window.location.href = 'index.html';
        return;
    }
    const user = getUserById(userId);
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('user-name').textContent = user.name;

    // render initial UI
    refreshCategoryList(user);
    refreshCategorySelects(user);
    const budgetInput = document.getElementById('budget-amount');
    if (budgetInput && user.budget) {
        budgetInput.value = user.budget;
    }
    refreshBalance(user.id);
    renderHistory(user.id);

    // form handlers
    movForm = document.getElementById('movement-form');
    if (movForm) {
        movForm.addEventListener('submit', e => {
            e.preventDefault();
            const type = document.getElementById('mov-type').value;
            const amount = parseFloat(document.getElementById('mov-amount').value) || 0;
            const date = document.getElementById('mov-date').value;
            const category = document.getElementById('mov-category').value;
            const desc = document.getElementById('mov-desc').value;
            if (!date || !category) return;
            if (editingId) {
                updateMovement(editingId, {
                    type,
                    amount,
                    date,
                    category,
                    description: desc
                });
                editingId = null;
                movForm.querySelector('button[type="submit"]').textContent = 'Guardar';
            } else {
                addMovement({
                    id: Date.now(),
                    userId: user.id,
                    type,
                    amount,
                    date,
                    category,
                    description: desc
                });
            }
            movForm.reset();
            refreshBalance(user.id);
            renderHistory(user.id);
        });
    }

    const catForm = document.getElementById('category-form');
    if (catForm) {
        catForm.addEventListener('submit', e => {
            e.preventDefault();
            const input = document.getElementById('new-category');
            const name = input.value.trim();
            if (!name) return;
            if (!user.categories) user.categories = [];
            if (!user.categories.includes(name)) {
                user.categories.push(name);
                updateUser(user.id, user);
                refreshCategoryList(user);
                refreshCategorySelects(user);
            }
            input.value = '';
        });
    }

    const budgetForm = document.getElementById('budget-form');
    if (budgetForm) {
        budgetForm.addEventListener('submit', e => {
            e.preventDefault();
            const budgetInput = document.getElementById('budget-amount');
            let amt = parseFloat(budgetInput.value) || 0;
            if (amt < 0) amt = 0;
            
            user.budget = amt;
            updateUser(user.id, user);
            
            // Force refresh
            budgetInput.value = amt;
            refreshBalance(user.id);
            
            console.log('Presupuesto guardado:', amt);
        });
    }

    const filterForm = document.getElementById('filter-form');
    if (filterForm) {
        filterForm.addEventListener('submit', e => {
            e.preventDefault();
            applyFilters(user.id);
        });
    }

    const resetBtn = document.getElementById('reset-filter');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            document.getElementById('filter-from').value = '';
            document.getElementById('filter-to').value = '';
            document.getElementById('filter-category').value = '';
            renderHistory(user.id);
        });
    }
}

function refreshCategoryList(user) {
    const list = document.getElementById('category-list');
    list.innerHTML = '';
    (user.categories || []).forEach(cat => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = cat;
        const btn = document.createElement('button');
        btn.className = 'btn btn-sm btn-danger';
        btn.textContent = 'Eliminar';
        btn.addEventListener('click', () => {
            user.categories = user.categories.filter(c => c !== cat);
            updateUser(user.id, user);
            refreshCategoryList(user);
            refreshCategorySelects(user);
        });
        li.appendChild(btn);
        list.appendChild(li);
    });
}

function refreshCategorySelects(user) {
    const movSelect = document.getElementById('mov-category');
    const filterSelect = document.getElementById('filter-category');
    movSelect.innerHTML = '';
    filterSelect.innerHTML = '<option value="">Todas</option>';
    (user.categories || []).forEach(cat => {
        const opt1 = document.createElement('option');
        opt1.value = cat;
        opt1.textContent = cat;
        movSelect.appendChild(opt1);
        const opt2 = document.createElement('option');
        opt2.value = cat;
        opt2.textContent = cat;
        filterSelect.appendChild(opt2);
    });
}

function refreshBalance(userId) {
    const summaryEl = document.getElementById('balance');
    const bal = calculateBalance(userId);
    const user = getUserById(userId);
    let text = `Ingresos: $${bal.income.toFixed(2)} — Gastos: $${bal.expense.toFixed(2)} — Balance: $${bal.balance.toFixed(2)}`;
    if (user && user.budget !== undefined && user.budget !== null && user.budget !== '') {
        const budgetAmount = parseFloat(user.budget);
        if (!isNaN(budgetAmount) && budgetAmount > 0) {
            text += ` — Presupuesto: $${budgetAmount.toFixed(2)}`;
            const diff = budgetAmount - bal.expense;
            text += diff < 0 ? ` (sobrepresupuesto $${Math.abs(diff).toFixed(2)})` : ` (restante $${diff.toFixed(2)})`;
        }
    }
    summaryEl.textContent = text;
    generateStatistics(userId);
}

function generateStatistics(userId) {
    const statsDiv = document.getElementById('statistics');
    const movs = filterMovements(userId, {});
    // compute totals per category
    const categoryTotals = {};
    movs.forEach(m => {
        if (!categoryTotals[m.category]) categoryTotals[m.category] = 0;
        categoryTotals[m.category] += m.amount * (m.type === 'expense' ? -1 : 1);
    });
    let html = '<h4>Estadísticas por categoría</h4>';
    if (Object.keys(categoryTotals).length === 0) {
        html += '<p>No hay movimientos registrados aún.</p>';
    } else {
        html += '<ul class="list-group">';
        for (const [cat, tot] of Object.entries(categoryTotals)) {
            html += `<li class="list-group-item">${cat}: $${tot.toFixed(2)}</li>`;
        }
        html += '</ul>';
    }
    statsDiv.innerHTML = html;
}

function applyFilters(userId) {
    const from = document.getElementById('filter-from').value;
    const to = document.getElementById('filter-to').value;
    const category = document.getElementById('filter-category').value;
    const movs = filterMovements(userId, {from, to, category});
    renderMovementsTable(movs);
}

function renderHistory(userId) {
    const movs = filterMovements(userId, {});
    renderMovementsTable(movs);
}

function renderMovementsTable(movs) {
    const tbody = document.querySelector('#history-table tbody');
    tbody.innerHTML = '';
    movs.forEach(m => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${m.type === 'income' ? 'Ingreso' : 'Gasto'}</td>
            <td>$${m.amount.toFixed(2)}</td>
            <td>${m.date}</td>
            <td>${m.category}</td>
            <td>${m.description || ''}</td>
            <td>
                <button class="btn btn-sm btn-warning btn-edit" data-id="${m.id}">Editar</button>
                <button class="btn btn-sm btn-danger btn-delete" data-id="${m.id}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    // attach delete handlers
    tbody.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = Number(btn.getAttribute('data-id'));
            deleteMovement(id);
            const uid = Number(localStorage.getItem('currentUserId'));
            renderHistory(uid); // refresh again
            refreshBalance(uid);
            generateStatistics(uid);
        });
    });
    // attach edit handlers
    tbody.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = Number(btn.getAttribute('data-id'));
            const mov = getMovements().find(m => m.id === id);
            if (!mov) return;
            document.getElementById('mov-type').value = mov.type;
            document.getElementById('mov-amount').value = mov.amount;
            document.getElementById('mov-date').value = mov.date;
            document.getElementById('mov-category').value = mov.category;
            document.getElementById('mov-desc').value = mov.description || '';
            editingId = id;
            movForm.querySelector('button[type="submit"]').textContent = 'Actualizar';
        });
    });
}

// initialize when page loaded
if (document.readyState !== 'loading') {
    const pathname = window.location.pathname;
    if (pathname.includes('dashboard.html') || document.getElementById('movement-form')) {
        initUserDashboard();
    }
} else {
    document.addEventListener('DOMContentLoaded', () => {
        const pathname = window.location.pathname;
        if (pathname.includes('dashboard.html') || document.getElementById('movement-form')) {
            initUserDashboard();
        }
    });
}
