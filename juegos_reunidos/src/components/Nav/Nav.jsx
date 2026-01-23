import React, { useState } from 'react';
import './Nav.scss';
import accountIcon from '../../assets/account_circle.svg';
import backIcon from '../../assets/arrow_back.svg';
import forwardIcon from '../../assets/arrow_forward.svg'

export default function Nav() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    return (
        <>
            <div className='nav'>
                <div className="container-header">
                    <h1>Juegos Reunidos</h1>
                </div>
                <div className="container-nav">
                    <a href="">Principal</a>
                    <a href="">Tienda</a>
                    <div className="dropdown">
                        <button className="dropbtn">
                            Juegos
                        </button>
                        <div className="dropdown-content">
                            <a href="./pages/juego_pelota.html">Juego eventos</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    <a href="">Administración</a>
                    <div className="clickable" onClick={toggleSidebar}>
                        <img src={accountIcon} alt="Profile" />
                    </div>
                </div>
            </div>
            <div className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
                <div className="clickable" onClick={toggleSidebar}>
                    <img src={forwardIcon} alt="Back" />
                </div>

                <button>Cerrar sesión</button>
                <button>Borrar todos los datos almacenados</button>
            </div>
        </>
    );
}