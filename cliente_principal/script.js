// const listaUsers = [{user: "admin", password: "admin"},{user: "andres", password: "andres"},{user: "testing", password: "testing"}];
if (!localStorage.getItem("users")) {
    const defaultUsers = [
        { user: "admin", password: "admin" },
        { user: "andres", password: "andres" },
        { user: "testing", password: "testing" }
    ];
    localStorage.setItem("users", JSON.stringify(defaultUsers));
}
//sidebar
const sidebar = document.getElementById('sidebar');
document.getElementById("profile-button").onclick = () => {
    sidebar.classList.toggle('active');
};

document.getElementById("back-button").onclick = () => {
    sidebar.classList.toggle('active');
};
//formularip
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("usuario").value.trim();
    const password = document.getElementById("userPassword").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userFound = users.find(
        u => u.user === username && u.password === password
    );

    if (userFound) {
        localStorage.setItem("loggedUser", username);
        alert("Login correcto");
        mostrarUsuario();
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});

document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const newUser = document.getElementById("newUser").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(u => u.user === newUser)) {
        alert("El usuario ya existe");
        return;
    }

    users.push({ user: newUser, password: newPassword });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Usuario registrado correctamente");
});

function mostrarUsuario() {
    const loggedUser = localStorage.getItem("loggedUser");

    if (loggedUser) {
        document.querySelector(".container-login").style.display = "none";
        document.getElementById("profile-button").title = loggedUser;
    }
}

mostrarUsuario();



//borrar sesion
document.getElementById("close-session-button").onclick = () => {
    localStorage.removeItem("loggedUser");
    location.reload();
}
//borrar datos almacenados
document.getElementById("borrar-datos-almacenados-button").onclick = () => {
    localStorage.clear();
    location.reload();
}