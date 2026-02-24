console.log("Modulo cargado correctamente");

export default class Popup {

    constructor(mensaje) {
        this.mensaje = mensaje;
        this.insertarEstilos();
        this.crearModal();
    }

    insertarEstilos() {

        // Evita duplicar estilos si ya existen
        if (document.getElementById("popup-styles")) return;

        const style = document.createElement("style");
        style.id = "popup-styles";

        style.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.6);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
            }

            .modal-content {
                background: white;
                padding: 2rem;
                border-radius: 10px;
                width: 350px;
                text-align: center;
                animation: fadeIn 0.3s ease;
            }

            .modal-content button {
                margin-top: 1rem;
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 5px;
                background: #6BAD6B;
                color: white;
                cursor: pointer;
            }

            @keyframes fadeIn {
                from { transform: scale(0.9); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;

        document.head.appendChild(style);
    }

    crearModal() {
        this.overlay = document.createElement("div");
        this.overlay.className = "modal-overlay";

        this.modal = document.createElement("div");
        this.modal.className = "modal-content";

        const texto = document.createElement("p");
        texto.textContent = this.mensaje;

        const botonCerrar = document.createElement("button");
        botonCerrar.textContent = "Cerrar";

        botonCerrar.addEventListener("click", () => {
            this.cerrar();
        });

        this.overlay.addEventListener("click", (e) => {
            if (e.target === this.overlay) {
                this.cerrar();
            }
        });


        this.modal.appendChild(texto);
        this.modal.appendChild(botonCerrar);
        this.overlay.appendChild(this.modal);
    }

    mostrar() {
        document.body.appendChild(this.overlay);
    }

    cerrar() {
        this.overlay.remove();
    }
}