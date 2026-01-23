import React from 'react';
import './Nav.scss';
import accountIcon from '../../assets/account_circle.svg';

export default function Nav() {

    return (
        <div className='nav'>
            <div className="container-header">
                <h1>Juegos Reunidos</h1>
            </div>
            <div class="container-nav">
                <a href="">Principal</a>
                <a href="">Tienda</a>
                <div class="dropdown">
                    <button class="dropbtn">
                        Juegos
                    </button>
                    <div class="dropdown-content">
                        <a href="./pages/juego_pelota.html">Juego eventos</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
                <a href="">Administración</a>
                <div id="profile-button" class="clickable">
                    <img src={accountIcon} alt="Profile" />
                </div>
            </div>
        </div>
    );
}