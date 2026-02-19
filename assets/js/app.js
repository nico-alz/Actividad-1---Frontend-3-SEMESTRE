// Predefined accounts
const DEMO_ACCOUNTS = {
    user: { username: 'nico-alz', password: '1234' },
    admin: { username: 'admin', password: '12345' }
};

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // LOGIN HANDLER
    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            const username = document.getElementById('login-username').value.trim();
            const password = document.getElementById('login-password').value;
            const role = document.getElementById('login-role').value;

            // Check demo credentials
            const demoAcc = DEMO_ACCOUNTS[role];
            if (demoAcc && username === demoAcc.username && password === demoAcc.password) {
                // Ensure demo user exists
                let users = getUsers();
                let user = users.find(u => u.name === username && u.role === role);
                if (!user) {
                    user = { id: Date.now(), name: username, role, categories: [], budget: 0, password };
                    addUser(user);
                }
                localStorage.setItem('currentRole', role);
                localStorage.setItem('currentUserId', user.id);
                window.location.href = role === 'admin' ? 'admin.html' : 'dashboard.html';
                return;
            }

            // Check registered users
            let users = getUsers();
            let user = users.find(u => u.name === username && u.password === password && u.role === role);
            if (user) {
                localStorage.setItem('currentRole', role);
                localStorage.setItem('currentUserId', user.id);
                window.location.href = role === 'admin' ? 'admin.html' : 'dashboard.html';
                return;
            }

            // Credentials not found
            alert('Credenciales incorrectas');
            document.getElementById('login-password').value = '';
        });
    }

    // REGISTER HANDLER
    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault();
            const username = document.getElementById('register-username').value.trim();
            const password = document.getElementById('register-password').value;
            const passwordConfirm = document.getElementById('register-password-confirm').value;
            const role = document.getElementById('register-role').value;

            // Validations
            if (username.length < 4) {
                alert('El usuario debe tener más de 3 caracteres');
                return;
            }
            if (password.length < 4) {
                alert('La contraseña debe tener más de 3 caracteres');
                return;
            }
            if (password !== passwordConfirm) {
                alert('Las contraseñas no coinciden');
                return;
            }

            // Check if user already exists
            let users = getUsers();
            if (users.find(u => u.name === username)) {
                alert('El usuario ya existe');
                return;
            }

            // Create new user
            const newUser = {
                id: Date.now(),
                name: username,
                role,
                categories: [],
                budget: 0,
                password
            };
            addUser(newUser);

            alert('Cuenta creada exitosamente. ¡Inicia sesión!');
            // Clear form and switch to login tab
            registerForm.reset();
            document.getElementById('login-tab').click();
            document.getElementById('login-username').focus();
        });
    }

    // ROLE PROTECTION
    const role = localStorage.getItem('currentRole');
    if (window.location.pathname.endsWith('dashboard.html') && role !== 'user') {
        window.location.href = 'index.html';
    }
    if (window.location.pathname.endsWith('admin.html') && role !== 'admin') {
        window.location.href = 'index.html';
    }

    // LOGOUT HANDLER
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('¿Deseas cerrar sesión?')) {
                localStorage.removeItem('currentRole');
                localStorage.removeItem('currentUserId');
                window.location.href = 'index.html';
            }
        });
    }
});