window.onload = iniciar();

function iniciar(){
    set_up_validated_users();
}

function set_up_validated_users(){
    if (!localStorage.getItem("users")) {
        fetch('../scripts/users.json')
            .then(resp => {
                if (!resp.ok) throw new Error('No se pudo cargar users.json');
                return resp.json();
            })
            .then(data => {
                localStorage.setItem('users', JSON.stringify(data));
            })
            .catch(() => {
                const fallback = [
                    { user: 'admin', password: 'admin', rol: 'administrador' },
                    { user: 'andres', password: 'andres', rol: 'usuario' }
                ];
                localStorage.setItem('users', JSON.stringify(fallback));
            });
    }
}

// Obtener elementos
const loginCard = document.getElementById('login-card');
const registerCard = document.getElementById('register-card');
const welcomeCard = document.getElementById('welcome-card');
const userNameSpan = document.getElementById('userName');

const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const registerMessage = document.getElementById('registerMessage');

// Función para actualizar la vista según usuario logueado
function updateView() {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
        loginCard.classList.add('d-none');
        registerCard.classList.add('d-none');
        welcomeCard.classList.remove('d-none');
        userNameSpan.textContent = loggedUser;
    } else {
        loginCard.classList.remove('d-none');
        registerCard.classList.add('d-none');
        welcomeCard.classList.add('d-none');
    }
}

// Toggle entre login y registro
showRegisterLink.addEventListener('click', e => {
    e.preventDefault();
    loginCard.classList.add('d-none');
    registerCard.classList.remove('d-none');
});

showLoginLink.addEventListener('click', e => {
    e.preventDefault();
    registerCard.classList.add('d-none');
    loginCard.classList.remove('d-none');
});

const modoSelect = document.getElementById("modoConexion");

// Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        user: document.getElementById("loginUser").value.trim(),
        password: document.getElementById("loginPassword").value.trim()
    };

    const modo = modoSelect.value;

    //SI ESTÁ EN MODO LOCAL
    if (modo === "local") {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userFound = users.find(u => u.user === data.user && u.password === data.password);
        if (userFound) {
            localStorage.setItem("loggedUser", data.user);
            alert("Login correcto (local)");
            updateView();
            setTimeout(() => {
                        window.location.href = "../pages/index.html";
                }, 2000);
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    // SI ESTÁ EN MODO SERVIDOR
    } else if (modo === "server") {
        try {
            const resp = await fetch("../scripts/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await resp.json();
            if (result.success) {
                localStorage.setItem("loggedUser", data.user);
                alert("Login correcto (servidor)");
                updateView();
                setTimeout(() => {
                        window.location.href = "../pages/index.html";
                }, 2000);
            } else {
                alert(result.message);
            }
        } catch (err) {
            console.error(err);
            alert("Error de conexión con el servidor");
        }
    }
});

// Register
// document.getElementById('registerForm').addEventListener('submit', e => {
//     e.preventDefault();

//     const newUser = document.getElementById('newUser').value.trim();
//     const newPassword = document.getElementById('newPassword').value.trim();
//     const confirmPassword = document.getElementById('confirmPassword').value.trim();
//     const newEmail = document.getElementById('newEmail').value.trim();
//     const newPhone = document.getElementById('newPhone').value.trim().replace(/\s+/g, '');
//     const newBirthDate = document.getElementById('newBirthDate').value;
//     const newRole = document.getElementById('newRole').value || 'usuario';
//     const newFavoriteNumber = document.getElementById('newFavoriteNumber').value;

//     if (newPassword !== confirmPassword) {
//         registerMessage.textContent = "Las contraseñas no coinciden.";
//         registerMessage.style.color = "red";
//         return;
//     }

//     const errorPassword = validarPasswordAvanzada(newPassword);

//     if (errorPassword) {
//         registerMessage.textContent = errorPassword;
//         registerMessage.style.color = "red";
//         return;
//     }

//     let users = JSON.parse(localStorage.getItem('users')) || [];
//     if (users.some(u => u.user === newUser)) {
//         alert('Usuario ya existe');
//         return;
//     }

//     // Validar teléfono
//     const errorTelefono = validarTelefono(newPhone);
//     if (errorTelefono) {
//         registerMessage.textContent = errorTelefono;
//         registerMessage.style.color = "red";
//         return;
//     }

//     // Validar número favorito
//     const errorNumero = validarNumeroFavorito(newFavoriteNumber);
//     if (errorNumero) {
//         registerMessage.textContent = errorNumero;
//         registerMessage.style.color = "red";
//         return;
//     }

//     if (newUser.length < 3 || newUser.length > 10) {
//         registerMessage.textContent = "El nombre de usuario debe tener entre 3 y 10 caracteres.";
//         registerMessage.style.color = "red";
//         return;
//     }

//     const userObj = {
//         user: newUser,
//         password: newPassword,
//         email: newEmail,
//         telefono: newPhone,
//         fechaNacimiento: newBirthDate,
//         rol: newRole,
//         favorito: newFavoriteNumber
//     };

//     users.push(userObj);
//     registerMessage.textContent = "";
//     localStorage.setItem('users', JSON.stringify(users));
//     registerMessage.textContent = "Usuario registrado correctamente.";
//     registerMessage.style.color = "green";
//     alert('Usuario registrado correctamente');
//     registerCard.classList.add('d-none');
//     loginCard.classList.remove('d-none');
// });


document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        user: document.getElementById("newUser").value.trim(),
        password: document.getElementById("newPassword").value.trim(),
        confirmPassword: document.getElementById('confirmPassword').value.trim(),
        email: document.getElementById("newEmail").value.trim(),
        telefono: document.getElementById("newPhone").value.replace(/\s+/g, ''),
        fechaNacimiento: document.getElementById("newBirthDate").value,
        rol: document.getElementById("newRole").value,
        favorito: document.getElementById("newFavoriteNumber").value
    };

    if (data.password !== data.confirmPassword) {
        registerMessage.textContent = "Las contraseñas no coinciden.";
        registerMessage.style.color = "red";
        return;
    }

    const errorPassword = validarPasswordAvanzada(data.password);

    if (errorPassword) {
        registerMessage.textContent = errorPassword;
        registerMessage.style.color = "red";
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.user === data.user)) {
        alert('Usuario ya existe');
        return;
    }

    // Validar teléfono
    const errorTelefono = validarTelefono(data.telefono);
    if (errorTelefono) {
        registerMessage.textContent = errorTelefono;
        registerMessage.style.color = "red";
        return;
    }

    // Validar número favorito
    const errorNumero = validarNumeroFavorito(data.favorito);
    if (errorNumero) {
        registerMessage.textContent = errorNumero;
        registerMessage.style.color = "red";
        return;
    }

    if (data.user.length < 3 || data.user.length > 10) {
        registerMessage.textContent = "El nombre de usuario debe tener entre 3 y 10 caracteres.";
        registerMessage.style.color = "red";
        return;
    }

    const modo = modoSelect.value;

    //SI ESTÁ EN MODO LOCAL
    if (modo === "local") {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some(u => u.user === data.user)) {
            alert("Usuario ya existe");
            return;
        }
        users.push(data);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Usuario registrado correctamente (local)");
        registerCard.classList.add("d-none");
        loginCard.classList.remove("d-none");

    // SI ESTÁ EN MODO SERVIDOR
    } else if (modo === "server") {
        try {
            const resp = await fetch("../scripts/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await resp.json();
            alert(result.message);
            if (result.success) {
                registerCard.classList.add("d-none");
                loginCard.classList.remove("d-none");
            }
        } catch (err) {
            console.error(err);
            alert("Error de conexión con el servidor");
        }
    }
});

// document.getElementById("registerForm").addEventListener("submit", e => {
//     e.preventDefault();

//     const data = {
//         user: document.getElementById("newUser").value.trim(),
//         password: document.getElementById("newPassword").value.trim(),
//         email: document.getElementById("newEmail").value.trim(),
//         telefono: document.getElementById("newPhone").value.replace(/\s+/g, ''),
//         fechaNacimiento: document.getElementById("newBirthDate").value,
//         rol: document.getElementById("newRole").value,
//         favorito: document.getElementById("newFavoriteNumber").value
//     };

//     fetch("../php/register.php", {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(data)
//     })
//     .then(res => res.json())
//     .then(resp => {
//         registerMessage.textContent = resp.message;
//         registerMessage.style.color = resp.success ? "green" : "red";

//         if (resp.success) {
//             registerCard.classList.add("d-none");
//             loginCard.classList.remove("d-none");
//         }
//     })
//     .catch(err => console.error(err));
// });

// Inicializar vista
updateView();



//METODOS DE VALIDACIONES (MENOS NOMBRE QUE ES UN IF ARRIBA PORQUE ES SENCILLO)

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

function validarPasswordAvanzada(password) {

    if (password.length < 8) {
        return "Debe tener al menos 8 caracteres.";
    }

    if (!/[a-z]/.test(password)) {
        return "Debe contener al menos una letra minúscula.";
    }

    if (!/[A-Z]/.test(password)) {
        return "Debe contener al menos una letra mayúscula.";
    }

    if (!/\d/.test(password)) {
        return "Debe contener al menos un número.";
    }

    return null;
}

const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
const passwordInput = document.getElementById("newPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");

togglePassword.addEventListener("click", () => mostrarContrasena(passwordInput, togglePassword));
toggleConfirmPassword.addEventListener("click", () => mostrarContrasena(confirmPasswordInput, toggleConfirmPassword));

function mostrarContrasena(passwordInput, button) {

    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    button.textContent = type === "password" ? "Mostrar" : "Esconder";
}

function validarTelefono(telefono) {
    const telefonoRegex = /^[6789]\d{8}$/;

    if (!telefonoRegex.test(telefono)) {
        return "El teléfono debe tener 9 dígitos y empezar por 6, 7, 8 o 9.";
    }

    return null;
}

function validarNumeroFavorito(numero) {
    const num = Number(numero);

    if (isNaN(num)) {
        return "El número favorito debe ser un número.";
    }

    if (num < 0 || num > 100) {
        return "El número favorito debe estar entre 0 y 100.";
    }

    return null;
}