

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (data.success) {
                document.getElementById('error').style.display = 'none';
                document.getElementById('userMenu').style.display = 'block';
            } else {
                document.getElementById('error').style.display = 'block';
            }
        } catch (error) {
            console.error('Error en la petición:', error);
        }
    } else {
        alert('Por favor, ingresa usuario y contraseña.');
    }
});

document.getElementById('logoutButton').addEventListener('click', async function() {
    try {
        const response = await fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data.success) {
            document.getElementById('userMenu').style.display = 'none';
            document.getElementById('loginForm').reset();
            document.getElementById('error').style.display = 'none';
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
});

document.getElementById('deleteAccountButton').addEventListener('click', async function() {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar tu cuenta?');
    if (confirmDelete) {
        try {
            const response = await fetch('/deleteAccount', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (data.success) {
                alert('Cuenta eliminada con éxito.');
                document.getElementById('userMenu').style.display = 'none';
                document.getElementById('loginForm').reset();
                document.getElementById('error').style.display = 'none';
            } else {
                alert('No se pudo eliminar la cuenta.');
            }
        } catch (error) {
            console.error('Error al eliminar la cuenta:', error);
        }
    }
});

document.getElementById('updateButton').addEventListener('click', async function() {
    document.getElementById('updateForm').style.display = 'block';

    try {
        const response = await fetch('/getUserData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const userData = await response.json();
        if (userData.success) {
            document.getElementById('updateUsername').value = userData.username;
            document.getElementById('updatePassword').value = '';
        }
    } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
    }
});

document.getElementById('saveChangesButton').addEventListener('click', async function() {
    const updatedUsername = document.getElementById('updateUsername').value;
    const updatedPassword = document.getElementById('updatePassword').value;

    if (updatedUsername && updatedPassword) {
        try {
            const response = await fetch('/updateUser', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: updatedUsername,
                    password: updatedPassword
                })
            });
            const data = await response.json();
            if (data.success) {
                alert('Datos actualizados con éxito');
                document.getElementById('updateForm').style.display = 'none';
            } else {
                alert('Hubo un error al actualizar los datos');
            }
        } catch (error) {
            console.error('Error al actualizar los datos:', error);
        }
    } else {
        alert('Por favor, completa todos los campos');
    }
});
