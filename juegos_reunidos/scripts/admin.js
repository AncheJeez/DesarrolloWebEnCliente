
document.addEventListener('DOMContentLoaded', () => {
    const modoSelect = document.getElementById('modoConexion');
    const cargarBtn = document.getElementById('cargarModo');
    const editUserModalEl = document.getElementById('editUserModal');
    const editUserModal = new bootstrap.Modal(editUserModalEl);
    const editForm = document.getElementById('editUserForm');
    let usersList = [];
    let editingUser = null;
    let favoritoChart = null;
    let usersTable = null;

    function initDataTable() {
        if (usersTable) {
            usersTable.destroy();
            $('#usersTable').empty();
        }

        const modo = modoSelect.value;

        usersTable = $('#usersTable').DataTable({
            data: modo === "local" ? usersList : null,
            ajax: modo === "server" ? '../scripts/get_users.php' : null,
            columns: [
                { data: 'user' },
                { data: 'email' },
                { data: 'telefono' },
                { data: 'fechaNacimiento' },
                { data: 'rol' },
                { data: 'favorito' },
                { 
                    data: null,
                    render: function(row, type, data) {
                        return `
                            <button class="btn btn-sm btn-primary me-2 btn-edit" data-user="${data.user}">Editar</button>
                            <button class="btn btn-sm btn-danger btn-delete" data-user="${data.user}">Borrar</button>
                        `;
                    }
                }
            ],
            paging: true,
            searching: true,
            ordering: true,
            responsive: true
        });

        // Delegación de eventos (edit / delete)
        $('#usersTable tbody').on('click', '.btn-edit', function() {
            const data = usersTable.row($(this).parents('tr')).data();
            openEditModal(data.user);
        });

        $('#usersTable tbody').on('click', '.btn-delete', function() {
            const data = usersTable.row($(this).parents('tr')).data();
            deleteUser(data.user);
        });

        // Sincronizar usuarios para la gráfica
        if (modo === "server") {
            $('#usersTable').on('xhr.dt', function(e, settings, json, xhr) {
                usersList = json.data;
                renderChart();
            });
        } else {
            renderChart();
        }
    }

    function openEditModal(user) {
        const u = usersList.find(x => x.user === user) || {};
        editingUser = user;

        document.getElementById('editUsername').value = u.user || '';
        document.getElementById('editPassword').value = '';
        document.getElementById('editEmail').value = u.email || '';
        document.getElementById('editTelefono').value = u.telefono || '';
        document.getElementById('editFecha').value = u.fechaNacimiento || '';
        document.getElementById('editRol').value = u.rol || 'usuario';
        document.getElementById('editFavorito').value = u.favorito || 0;

        editUserModal.show();
    }

    editForm.addEventListener('submit', e => {
        e.preventDefault();
        if (!editingUser) return;

        const payload = {
            user: editingUser,
            newUser: document.getElementById('editUsername').value,
            password: document.getElementById('editPassword').value,
            email: document.getElementById('editEmail').value,
            telefono: document.getElementById('editTelefono').value,
            fechaNacimiento: document.getElementById('editFecha').value,
            rol: document.getElementById('editRol').value,
            favorito: parseInt(document.getElementById('editFavorito').value) || 0
        };

        const modo = modoSelect.value;

        if (modo === "local") {
            const idx = usersList.findIndex(x => x.user === editingUser);
            if (idx !== -1) {
                usersList[idx] = { ...usersList[idx], ...payload };
                localStorage.setItem('users', JSON.stringify(usersList));
                initDataTable();
                renderChart();
                editUserModal.hide();
            }
        } else {
            fetch('../scripts/update_user.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    initDataTable();
                    renderChart();
                    editUserModal.hide();
                } else {
                    alert('Error al actualizar usuario: ' + (res.message || ''));
                }
            });
        }
    });

    function deleteUser(user) {
        if(!confirm(`¿Eliminar al usuario "${user}"?`)) return;
        const modo = modoSelect.value;

        if (modo === "local") {
            usersList = usersList.filter(u => u.user !== user);
            localStorage.setItem('users', JSON.stringify(usersList));
            initDataTable();
            renderChart();
        } else {
            fetch('../scripts/delete_user.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user })
            })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    initDataTable();
                    renderChart();
                } else alert('Error al eliminar usuario: ' + (res.message || ''));
            });
        }
    }

    function renderChart() {
        const counts = {};
        usersList.forEach(u => counts[u.favorito] = (counts[u.favorito] || 0) + 1);
        const labels = Object.keys(counts);
        const data = Object.values(counts);

        const ctx = document.getElementById('favoritoChart').getContext('2d');

        if (favoritoChart) favoritoChart.destroy();

        favoritoChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Usuarios por número favorito',
                    data,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: { scales: { y: { beginAtZero:true, stepSize:1 } } }
        });
    }

    cargarBtn.addEventListener('click', () => {
        if (modoSelect.value === "local") {
            usersList = JSON.parse(localStorage.getItem('users')) || [];
        }
        initDataTable();
        renderChart();
    });

    // Inicializar al cargar
    if (modoSelect.value === "local") usersList = JSON.parse(localStorage.getItem('users')) || [];
    initDataTable();
    renderChart();
});
















// document.addEventListener('DOMContentLoaded', () => {
//     const modoSelect = document.getElementById('modoConexion');
//     const cargarBtn = document.getElementById('cargarModo');

//     const usersTbody = document.getElementById('usersTbody');
//     const editUserModalEl = document.getElementById('editUserModal');
//     const editUserModal = new bootstrap.Modal(editUserModalEl);
//     const editForm = document.getElementById('editUserForm');

//     let usersList = [];
//     let editingUser = null;
//     let favoritoChart = null;

//     function deleteUser(user) {
//         if(!confirm(`¿Eliminar al usuario "${user}"?`)) return;

//         const modo = modoSelect.value;

//         if (modo === "local") {
//             usersList = usersList.filter(u => u.user !== user);
//             localStorage.setItem("users", JSON.stringify(usersList));
//             renderUsers();
//             renderChart();
//         } else {
//             fetch('../scripts/delete_user.php', {
//                 method: 'POST',
//                 body: JSON.stringify({user})
//             })
//             .then(res => res.json())
//             .then(res => {
//                 if(res.success) loadUsers();
//                 else alert('Error al eliminar usuario');
//             });
//         }
//     }

//     function loadUsers() {
//         const modo = modoSelect.value;

//         if (modo === "local") {
//             usersList = JSON.parse(localStorage.getItem("users")) || [];
//             renderUsers();
//             renderChart();
//         } else {
//             // AJAX desde PHP
//             fetch('../scripts/get_users.php')
//                 .then(res => res.json())
//                 .then(data => {
//                     usersList = data;
//                     renderUsers();
//                     renderChart();
//                 });
//         }
//     }

//     cargarBtn.addEventListener('click', () => {
//         loadUsers();
//         console.log("Datos cargados en modo:", modoSelect.value);
//     });

//     function renderUsers() {
//         usersTbody.innerHTML = '';
//         usersList.forEach(u => {
//             const tr = document.createElement('tr');
//             tr.innerHTML = `
//                 <td>${u.user}</td>
//                 <td>${u.email || ''}</td>
//                 <td>${u.telefono || ''}</td>
//                 <td>${u.fechaNacimiento || ''}</td>
//                 <td>${u.rol || 'usuario'}</td>
//                 <td>
//                     <button class="btn btn-sm btn-primary me-2 btn-edit" data-user="${u.user}">Editar</button>
//                     <button class="btn btn-sm btn-danger btn-delete" data-user="${u.user}">Borrar</button>
//                 </td>`;
//             usersTbody.appendChild(tr);
//         });

//         document.querySelectorAll('.btn-edit').forEach(btn => {
//             btn.addEventListener('click', e => openEditModal(e.currentTarget.dataset.user));
//         });
//         document.querySelectorAll('.btn-delete').forEach(btn => {
//             btn.addEventListener('click', e => deleteUser(e.currentTarget.dataset.user));
//         });
//     }

//     function openEditModal(user) {
//         const u = usersList.find(x => x.user === user);
//         if (!u) return;
//         editingUser = u.user;
//         document.getElementById('editUsername').value = u.user;
//         document.getElementById('editPassword').value = '';
//         document.getElementById('editEmail').value = u.email || '';
//         document.getElementById('editTelefono').value = u.telefono || '';
//         document.getElementById('editFecha').value = u.fechaNacimiento || '';
//         document.getElementById('editRol').value = u.rol || 'usuario';
//         document.getElementById('editFavorito').value = u.favorito || '';
//         editUserModal.show();
//     }

//     editForm.addEventListener('submit', e => {
//         e.preventDefault();
//         if (!editingUser) return;

//         const payload = {
//             user: editingUser,
//             newUser: document.getElementById('editUsername').value,
//             password: document.getElementById('editPassword').value,
//             email: document.getElementById('editEmail').value,
//             telefono: document.getElementById('editTelefono').value,
//             fechaNacimiento: document.getElementById('editFecha').value,
//             rol: document.getElementById('editRol').value,
//             favorito: parseInt(document.getElementById('editFavorito').value) || 0
//         };

//         const modo = modoSelect.value;

//         if (modo === "local") {
//             const idx = usersList.findIndex(x => x.user === editingUser);
//             if (idx !== -1) {
//                 usersList[idx].user = payload.newUser;
//                 if (payload.password) usersList[idx].password = payload.password;
//                 usersList[idx].email = payload.email;
//                 usersList[idx].telefono = payload.telefono;
//                 usersList[idx].fechaNacimiento = payload.fechaNacimiento;
//                 usersList[idx].rol = payload.rol;
//                 usersList[idx].favorito = payload.favorito;
//                 localStorage.setItem("users", JSON.stringify(usersList));
//                 renderUsers();
//                 renderChart();
//                 editUserModal.hide();
//             }
//         } else {
//             fetch('../scripts/update_user.php', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(payload)
//             })
//             .then(res => res.json())
//             .then(res => {
//                 if(res.success) {
//                     loadUsers();
//                     editUserModal.hide();
//                 } else {
//                     alert('Error al actualizar usuario: ' + (res.message || ''));
//                 }
//             });
//         }
//     });

//     function renderChart() {
//         const counts = {};
//         usersList.forEach(u => counts[u.favorito] = (counts[u.favorito] || 0) + 1);
//         const labels = Object.keys(counts);
//         const data = Object.values(counts);

//         const ctx = document.getElementById('favoritoChart').getContext('2d');

//         if (favoritoChart) favoritoChart.destroy();

//         favoritoChart = new Chart(ctx, {
//             type: 'bar',
//             data: {
//                 labels,
//                 datasets: [{
//                     label: 'Usuarios por número favorito',
//                     data,
//                     backgroundColor: 'rgba(54, 162, 235, 0.6)',
//                     borderColor: 'rgba(54, 162, 235, 1)',
//                     borderWidth: 1
//                 }]
//             },
//             options: {
//                 scales: {
//                     y: {
//                         beginAtZero: true,
//                         stepSize: 1
//                     }
//                 }
//             }
//         });
//     }

//     loadUsers();
// });