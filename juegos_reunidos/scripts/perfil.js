document.addEventListener('DOMContentLoaded', () => {
    const loggedUser = localStorage.getItem('loggedUser');
    const notice = document.getElementById('profileNotice');
    if (!loggedUser) {
        alert('Debes iniciar sesión para ver tu perfil.');
        window.location.href = './login_register.html';
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const currentIndex = users.findIndex(u => u.user === loggedUser);
    if (currentIndex === -1) {
        alert('Usuario no encontrado.');
        window.location.href = './index.html';
        return;
    }

    const user = users[currentIndex];

    // elementos
    const inputUser = document.getElementById('profileUser');
    const inputPassword = document.getElementById('profilePassword');
    const inputEmail = document.getElementById('profileEmail');
    const inputTelefono = document.getElementById('profileTelefono');
    const inputFecha = document.getElementById('profileFecha');
    const inputRol = document.getElementById('profileRol');
    const form = document.getElementById('profileForm');

    // rellenar
    inputUser.value = user.user || '';
    inputPassword.value = user.password || '';
    inputEmail.value = user.email || '';
    inputTelefono.value = user.telefono || '';
    inputFecha.value = user.fechaNacimiento || '';
    inputRol.value = user.rol || '';

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        users[currentIndex].password = inputPassword.value;
        users[currentIndex].email = inputEmail.value;
        users[currentIndex].telefono = inputTelefono.value;
        users[currentIndex].fechaNacimiento = inputFecha.value;

        localStorage.setItem('users', JSON.stringify(users));

        alert('Perfil actualizado correctamente');
        window.location.href = './index.html';
    });
});
