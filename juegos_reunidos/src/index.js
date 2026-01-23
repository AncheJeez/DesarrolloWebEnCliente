import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Nav />
    <Footer />
  </React.StrictMode>
);