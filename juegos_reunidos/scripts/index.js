document.addEventListener("DOMContentLoaded", () => {
    const loggedUser = localStorage.getItem("loggedUser");
    const title = document.getElementById("welcome-title");
    const text = document.getElementById("welcome-text");
    const button = document.getElementById("action-button");

    const loginItem = document.getElementById("login-item");
    const perfilItem = document.getElementById("perfil-item");
    const logoutItem = document.getElementById("logout-item");
    const logoutBtn = document.getElementById("logout-btn");
    const administracionItem = document.getElementById("administracion-item");

    if (loggedUser) {
        title.textContent = `¡Bienvenido ${loggedUser}!`;
        text.textContent = "Ya estás logueado, puedes acceder a tu perfil o explorar la página.";
        button.textContent = "Ir a perfil";
        button.href = "./perfil.html";
        button.classList.remove("btn-success");
        button.classList.add("btn-primary");

        // Usuario logueado: ocultar login, mostrar perfil y logout
        loginItem.classList.add("d-none");
        perfilItem.classList.remove("d-none");
        logoutItem.classList.remove("d-none");
        perfilItem.querySelector("a").textContent = `Perfil (${loggedUser})`;
        administracionItem.classList.remove("d-none");
    } else {
        title.textContent = "¡Bienvenido a Juegos Reunidos!";
        text.textContent = "Para continuar, debes iniciar sesión o registrarte.";
        button.textContent = "Iniciar sesión / Registrarse";
        button.href = "./login_register.html";

        // Usuario no logueado: mostrar login, ocultar perfil y logout
        loginItem.classList.remove("d-none");
        perfilItem.classList.add("d-none");
        logoutItem.classList.add("d-none");
        administracionItem.classList.add("d-none");
    }

    // Cerrar sesión
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("loggedUser");
        location.reload(); // recargar para actualizar navbar
    });
});






document.getElementById("clearStorage").addEventListener("click", function() {
    localStorage.clear();
    alert("LocalStorage borrado correctamente");
});





const insertBtn = document.getElementById('insertUsersBtn');
const statusP = document.getElementById('insertStatus');

insertBtn.addEventListener('click', () => {
    statusP.textContent = "Insertando usuarios...";
    
    fetch('../scripts/insertar_datos.php')
        .then(response => response.text())
        .then(data => {
            statusP.textContent = data;
        })
        .catch(err => {
            statusP.textContent = "Error al insertar usuarios";
            console.error(err);
        });
});