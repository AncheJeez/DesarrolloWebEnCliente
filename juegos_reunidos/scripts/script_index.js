window.onload = iniciar;

function iniciar() {

    mostrarUsuario();

    set_up_validated_users();

    //sidebar
    const sidebar = document.getElementById('sidebar');

    // var exists_profile_btn = document.getElementById("profile-button");
    document.getElementById("profile-button").onclick = () => {
        sidebar.classList.toggle('active');
    };

    document.getElementById("back-button").onclick = () => {
        sidebar.classList.toggle('active');
    };

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

    //formulario login
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
            alert(`¡Bienvenido ${username}! Has iniciado sesión correctamente.`);
            mostrarUsuario();
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });

    //formulario registrarse
    document.getElementById("registerForm").addEventListener("submit", function (e) {
        e.preventDefault();// si no se pone esto se vuelve a refrescar la página y no me deja hacer pj consolelog

        if (!validar(e)) return;
        const newUser = document.getElementById("newUser").value.trim();
        const newPassword = document.getElementById("newPassword").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;
        const rol = document.getElementById("rol").value;
        const genero = document.querySelector('input[name="genero"]:checked').value;
        const recibirCorreos = document.getElementById("recibirCorreos").checked;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(u => u.user === newUser)) {
            alert("El usuario ya existe");
            return;
        }

        const nuevoUsuario = {
            user: newUser,
            password: newPassword,
            email: email,
            telefono: telefono,
            fechaNacimiento: fechaNacimiento,
            rol: rol,
            genero: genero,
            recibirCorreos: recibirCorreos
        };

        users.push(nuevoUsuario);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Usuario registrado correctamente");
        document.getElementById("registerForm").reset();

        //cambiamos a la pantalla de login
        registerContainer.classList.add("hidden");
        loginContainer.classList.remove("hidden");
    });

    //q aparezca y desaparezca cuando toca
    const loginContainer = document.getElementById("login-container");
    const registerContainer = document.getElementById("register-container");

    document.getElementById("show-register").addEventListener("click", (e) => {
        e.preventDefault();
        loginContainer.classList.add("hidden");
        registerContainer.classList.remove("hidden");
    });

    document.getElementById("show-login").addEventListener("click", (e) => {
        e.preventDefault();
        registerContainer.classList.add("hidden");
        loginContainer.classList.remove("hidden");
    });

}

function set_up_validated_users(){
    if (!localStorage.getItem("users")) {
        const defaultUsers = [
            {
                user: "admin",
                password: "admin",
                email: "admin@mail.com",
                telefono: "12345678",
                fechaNacimiento: "1990-01-15",
                rol: "administrador",
                genero: "masculino",
                "recibirCorreos": true
            },
            {
                user: "andres",
                password: "andres",
                email: "andres@mail.com",
                telefono: "87654321",
                fechaNacimiento: "1995-06-20",
                rol: "usuario",
                genero: "masculino",
                "recibirCorreos": true
            },
            {
                user: "testing",
                password: "testing",
                email: "testing@mail.com",
                telefono: "11223344",
                fechaNacimiento: "1992-03-10",
                rol: "usuario",
                genero: "otros",
                "recibirCorreos": false
            }
        ];
        localStorage.setItem("users", JSON.stringify(defaultUsers));
    }
}

function mostrarUsuario() {
    const loggedUser = localStorage.getItem("loggedUser");

    if (loggedUser) {
        document.getElementById("login-container").classList.add("hidden");
        document.getElementById("register-container").classList.add("hidden");
        document.getElementById("profile-button").title = loggedUser;
    }
}

function validar(e) {
    clear_errores();
    let valido = true;

    if (!validarNombreUsuario()) valido = false;
    if (!validarPassword()) valido = false;
    if (!validarEmail()) valido = false;
    if (!validarTelefono()) valido = false;
    if (!validarFechaNacimiento()) valido = false;
    if (!validarRol()) valido = false;
    if (!validarGenero()) valido = false;

    if (!valido) {
        e.preventDefault();
        alert(get_mensaje_error());
        return false;
    }

    return true;
}


function validarNombreUsuario() {
    console.log("validando nombre usuario");
    var elemento = document.getElementById("newUser");
    if (elemento.value== "")
    {
        add_mensaje_error("El campo nombre no puede ser vacío");
        return false;
    }
    if (elemento.value.length < 3) {
        add_mensaje_error("usuario demasiado corto");
        return false;
    }
    return true;
}

function validarPassword() {
    const elemento = document.getElementById("newPassword");

    if (elemento.value.trim() === "") {
        add_mensaje_error("contraseña vacía");
        return false;
    }

    if (elemento.value.length < 6) {
        add_mensaje_error("contraseña mínima 6 caracteres");
        return false;
    }

    return true;
}

function validarEmail() {
    const elemento = document.getElementById("email");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (elemento.value.trim() === "") {
        add_mensaje_error("email vacío");
        return false;
    }

    if (!regex.test(elemento.value)) {
        add_mensaje_error("email inválido");
        return false;
    }

    return true;
}

function validarRol() {
    const rol = document.getElementById("rol").value;

    if (rol === "") {
        add_mensaje_error("rol no seleccionado");
        return false;
    }

    return true;
}

function validarGenero() {
    const genero = document.querySelector('input[name="genero"]:checked');

    if (!genero) {
        add_mensaje_error("género no seleccionado");
        return false;
    }

    return true;
}

function validarTelefono() {
    const elemento = document.getElementById("telefono");
    const valor = elemento.value.trim();

    if (valor === "") {
        add_mensaje_error("teléfono vacío");
        return false;
    }

    if (!/^\d+$/.test(valor)) {
        add_mensaje_error("teléfono debe contener solo números");
        return false;
    }

    if (valor.length !== 8) {
        add_mensaje_error("teléfono debe tener exactamente 8 números");
        return false;
    }

    return true;
}

function validarFechaNacimiento() {
    const elemento = document.getElementById("fechaNacimiento");
    const valor = elemento.value.trim();

    if (valor === "") {
        add_mensaje_error("fecha de nacimiento vacía");
        return false;
    }

    return true;
}


let errores = [];

function add_mensaje_error(palabra) {
    if (!errores.includes(palabra)) {
        errores.push(palabra);
    }
}

function get_mensaje_error() {
    if (errores.length === 0) return "";
    return "Usted ha introducido mal: " + errores.join(", ");
}

function clear_errores() {
    errores = [];
}
