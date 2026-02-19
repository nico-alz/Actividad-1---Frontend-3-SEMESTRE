// Business logic for financial movements

function calculateBalance(userId) {
    const movs = getMovements().filter(m => m.userId === userId);
    let income = 0, expense = 0;
    movs.forEach(m => {
        if (m.type === 'income') income += m.amount;
        else if (m.type === 'expense') expense += m.amount;
    });
    return {income, expense, balance: income - expense};
}

function filterMovements(userId, {from, to, category}) {
    let movs = getMovements().filter(m => m.userId === userId);
    if (from) movs = movs.filter(m => new Date(m.date) >= new Date(from));
    if (to) movs = movs.filter(m => new Date(m.date) <= new Date(to));
    if (category) movs = movs.filter(m => m.category === category);
    return movs;
}
