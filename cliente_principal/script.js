const listaUsers = [
    {user: "admin", password: "admin"},
    {user: "andres", password: "andres"},
    {user: "testing", password: "testing"}
];

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
    const givenUsername = document.getElementById("usuario").value;
    const givenPassword = document.getElementById("password").value;
    var flag = false;
    for(var i=0, count = listaUsers.length; i< count; i++){
        console.log("test1");
        if(listaUsers[i].user == givenUsername && listaUsers[i].password == givenPassword){
            console.log("test2");
            localStorage.setItem("user", givenUsername);
            localStorage.setItem("password", givenPassword);
            flag = true;
            alert("Usuario correcto, está guardados los datos localmente");
            break;
        }
    }
    if(!flag){
        alert("Usuario o contraseña no existe");
    }
});

//borrar sesion
document.getElementById("close-session-button").onclick = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("password");
}
//borrar datos almacenados
document.getElementById("borrar-datos-almacenados-button").onclick = () => {
    localStorage.clear();
}