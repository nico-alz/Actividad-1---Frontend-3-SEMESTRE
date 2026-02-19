// Logic for administrator dashboard

function initAdminDashboard() {
    const role = localStorage.getItem('currentRole');
    if (role !== 'admin') {
        window.location.href = 'index.html';
        return;
    }

    renderReports();
    renderOverBudgetAlert();
    renderStatistics();
    renderUsersTable();
}

function renderReports() {
    const movs = getMovements();
    const users = getUsers();
    let totalIncome = 0, totalExpense = 0;
    movs.forEach(m => {
        if (m.type === 'income') totalIncome += m.amount;
        else if (m.type === 'expense') totalExpense += m.amount;
    });
    const net = totalIncome - totalExpense;
    const avgPerUser = users.length > 0 ? (net / users.length).toFixed(2) : 0;

    const html = `
        <h4 class="mb-4">📊 Reporte General del Sistema</h4>
        <div class="row">
            <div class="col-md-3 mb-3">
                <div class="card bg-light border-0 shadow-sm">
                    <div class="card-body text-center">
                        <small class="text-muted d-block">Usuarios activos</small>
                        <h3 class="text-primary">${users.length}</h3>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card bg-light border-0 shadow-sm">
                    <div class="card-body text-center">
                        <small class="text-muted d-block">Movimientos totales</small>
                        <h3 class="text-info">${movs.length}</h3>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card bg-light border-0 shadow-sm">
                    <div class="card-body text-center">
                        <small class="text-muted d-block">Ingreso total</small>
                        <h3 class="text-success">$${totalIncome.toFixed(2)}</h3>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card bg-light border-0 shadow-sm">
                    <div class="card-body text-center">
                        <small class="text-muted d-block">Gasto total</small>
                        <h3 class="text-danger">$${totalExpense.toFixed(2)}</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-6">
                <div class="card bg-light border-0 shadow-sm">
                    <div class="card-body">
                        <small class="text-muted d-block">Balance neto</small>
                        <h4 class="${net >= 0 ? 'text-success' : 'text-danger'}">${net >= 0 ? '+' : ''}$${net.toFixed(2)}</h4>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card bg-light border-0 shadow-sm">
                    <div class="card-body">
                        <small class="text-muted d-block">Promedio por usuario</small>
                        <h4 class="${avgPerUser >= 0 ? 'text-success' : 'text-danger'}">${avgPerUser >= 0 ? '+' : ''}$${avgPerUser}</h4>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('reports').innerHTML = html;
}

function renderOverBudgetAlert() {
    const users = getUsers();
    const overBudgetUsers = users.filter(user => {
        const bal = calculateBalance(user.id);
        return user.budget && bal.expense > user.budget;
    });

    let html = '<h4 class="mb-4">⚠️ Usuarios con sobrepresupuesto</h4>';
    if (overBudgetUsers.length === 0) {
        html += '<div class="alert alert-success">Todos los usuarios están dentro de presupuesto ✓</div>';
    } else {
        html += '<div class="alert alert-danger"><strong>Atención:</strong> ' + overBudgetUsers.length + ' usuario(s) han excedido su presupuesto</div>';
        html += '<div class="list-group">';
        overBudgetUsers.forEach(user => {
            const bal = calculateBalance(user.id);
            const exceeded = (bal.expense - user.budget).toFixed(2);
            html += `
                <div class="list-group-item list-group-item-danger">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h6 class="mb-1">${user.name}</h6>
                            <small>Presupuesto: $${user.budget.toFixed(2)} | Gastado: $${bal.expense.toFixed(2)}</small>
                        </div>
                        <span class="badge bg-danger">-$${exceeded}</span>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    }
    document.getElementById('reports').innerHTML += html;
}

function renderUsersTable() {
    const users = getUsers();
    const tbodyLines = users.map(user => {
        const bal = calculateBalance(user.id);
        const over = user.budget && bal.expense > user.budget;
        return `
            <tr class="${over ? 'table-danger' : ''}">
                <td><strong>${user.name}</strong></td>
                <td>$${bal.income.toFixed(2)}</td>
                <td>$${bal.expense.toFixed(2)}</td>
                <td>$${bal.balance.toFixed(2)}</td>
                <td>$${(user.budget||0).toFixed(2)}</td>
                <td>
                    ${over ? '<span class="badge bg-danger">Sobrepresupuesto</span>' : '<span class="badge bg-success">OK</span>'}
                </td>
            </tr>
        `;
    }).join('');

    const html = `
        <h4 class="mb-4">👥 Detalle de usuarios</h4>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead class="table-dark"><tr><th>Usuario</th><th>Ingresos</th><th>Gastos</th><th>Balance</th><th>Presupuesto</th><th>Estado</th></tr></thead>
                <tbody>${tbodyLines}</tbody>
            </table>
        </div>
        <p class="small text-muted mt-3">📌 <strong>Nota:</strong> El administrador solo puede visualizar datos. No se pueden modificar registros personales de usuarios por políticas de integridad.</p>
    `;
    document.getElementById('users-list').innerHTML = html;
}

function renderStatistics() {
    // statistics across all users / categories
    const movs = getMovements();
    const catTotals = {};
    movs.forEach(m => {
        if (!catTotals[m.category]) catTotals[m.category] = {income:0, expense:0};
        if (m.type === 'income') catTotals[m.category].income += m.amount;
        else if (m.type === 'expense') catTotals[m.category].expense += m.amount;
    });
    let html = '<h4 class="mb-4">📈 Estadísticas por categoría</h4>';
    if (Object.keys(catTotals).length === 0) {
        html += '<p class="text-muted">No hay movimientos registrados aún.</p>';
    } else {
        html += '<div class="table-responsive"><table class="table table-sm table-striped"><thead class="table-light"><tr><th>Categoría</th><th>Ingresos</th><th>Gastos</th><th>Balance</th></tr></thead><tbody>';
        for (const [cat, tot] of Object.entries(catTotals)) {
            const catBalance = tot.income - tot.expense;
            html += `<tr><td><strong>${cat}</strong></td><td class="text-success">$${tot.income.toFixed(2)}</td><td class="text-danger">$${tot.expense.toFixed(2)}</td><td>${catBalance >= 0 ? '<span class="text-success">' : '<span class="text-danger">'}$${catBalance.toFixed(2)}</span></td></tr>`;
        }
        html += '</tbody></table></div>';
    }
    document.getElementById('stats').innerHTML = html;
}

// initialize when page loaded
if (document.readyState !== 'loading') {
    if (window.location.pathname.endsWith('admin.html')) initAdminDashboard();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.location.pathname.endsWith('admin.html')) initAdminDashboard();
    });
}
