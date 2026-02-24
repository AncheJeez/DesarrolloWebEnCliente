import Popup from "./Popup.js";

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("email").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // alert(`Datos contáctanos: ${nombre}, ${correo}, ${asunto}, ${mensaje}`);
    console.log(`Datos contáctanos: ${nombre}, ${correo}, ${asunto}, ${mensaje}`);
    const popup = new Popup(`Datos contáctanos: ${nombre}, ${correo}, ${asunto}, ${mensaje}`);
    popup.mostrar();
});