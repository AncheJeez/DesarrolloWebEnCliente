import React from 'react';
import './Contact.scss';

export default function Contact() {

    return (
        <div className="container-form">
            <p>Contáctanos</p>
            <form id="contactForm" action="" method="post">
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" name="name" required />

                <label htmlFor="email">Correo electrónico:</label>
                <input type="email" id="email" required />

                <label htmlFor="asunto">Asunto:</label>
                <input type="text" id="asunto" required />

                <label htmlFor="mensaje">Mensaje:</label>
                <textarea id="mensaje" rows="5" cols="33" required />

                <input type="submit" value="Enviar formulario" />
            </form>
        </div>
    );
}