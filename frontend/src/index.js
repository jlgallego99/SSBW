import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
//import App from './App';
import Main from './components/main';
import Persona from './components/persona';
import Table from './components/table';
import reportWebVitals from './reportWebVitals';
import CrearPersona from './components/crear_persona';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Main />
    <Routes>
      <Route path="/" element={<Table />} />
      <Route path="/persona/:id" element={<Persona />} />
      <Route path="crear" element={<CrearPersona />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
