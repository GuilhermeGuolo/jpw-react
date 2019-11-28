import React from 'react';
import logo from './logo.svg';
import './App.css';
import ItemPage from './components/ItemPage';
import BolsaPage from './components/BolsaPage';
import MapaPage from './components/MapaPage';
import PersonagemPage from './components/PersonagemPage';
import InventarioPage from './components/InventarioPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Form, FormControl } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Itens" id="basic-nav-dropdown">
              <NavDropdown.Divider />
              <NavDropdown.Item href="/itens">Itens</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Bolsas" id="basic-nav-dropdown">
              <NavDropdown.Divider />
              <NavDropdown.Item href="/bolsas">Bolsas</NavDropdown.Item>

            </NavDropdown>

            <NavDropdown title="Mapas" id="basic-nav-dropdown">
              <NavDropdown.Divider />
              <NavDropdown.Item href="/mapas">Mapas</NavDropdown.Item>

            </NavDropdown>

            <NavDropdown title="Personagens" id="basic-nav-dropdown">
              <NavDropdown.Divider />
              <NavDropdown.Item href="/personagens">Personagens</NavDropdown.Item>
    
            </NavDropdown>

            <NavDropdown title="Inventarios" id="basic-nav-dropdown">
              <NavDropdown.Divider />
              <NavDropdown.Item href="/inventarios">Inventarios</NavDropdown.Item>
 
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <BrowserRouter>
        <Switch>
          <Route path="/itens"
            render={() => <ItemPage />}
          />
          <Route path="/bolsas"
            render={() => <BolsaPage />}
          />
          <Route path="/mapas"
            render={() => <MapaPage />}
          />
          <Route path="/personagens"
            render={() => <PersonagemPage />}
          />
          <Route path="/inventarios"
            render={() => <InventarioPage />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}



export default App;
