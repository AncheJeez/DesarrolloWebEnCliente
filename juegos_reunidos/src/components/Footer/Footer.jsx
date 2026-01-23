import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export default function Footer(){
    return(
        <footer>
            Hey esto es el final de la página
            <Link to="/contact">Contáctanos</Link>
        </footer>
    );
}