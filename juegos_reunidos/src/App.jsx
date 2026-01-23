// import React from 'react';
// import ReactDOM from 'react-dom/client';
import './App.scss';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from './components/Contact/Contact';

export default function App(){

    return (
        <main>
            <Router>
            <Nav />

            <Routes>
                <Route path="/contact" element={<Contact />} />
            </Routes>

            <Footer />
            </Router>
        </main>
    );
}